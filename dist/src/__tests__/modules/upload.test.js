import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
const { uploadToCloudinaryMock } = vi.hoisted(() => ({
    uploadToCloudinaryMock: vi.fn(),
}));
// Mocka só a chamada externa ao Cloudinary — multer continua real,
// porque é exatamente o multer (limite de tamanho, parsing do multipart)
// que estamos testando aqui.
vi.mock("@/modules/upload/services/upload.service", () => ({
    uploadToCloudinary: uploadToCloudinaryMock,
}));
// O módulo de upload em si não usa Prisma, mas app.ts carrega TODOS os
// módulos juntos, e outros módulos importam @/config/database no topo do
// arquivo — sem esse mock, o teste tentaria instanciar o Prisma Client real.
vi.mock("@/config/database", () => ({ prisma: {} }));
import app from "@/app";
// Buffer mínimo de 1x1 px válido (PNG), só pra ter conteúdo real no upload
const TINY_PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUAAdfbgnYAAAAASUVORK5CYII=", "base64");
describe("Upload Module", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        uploadToCloudinaryMock.mockResolvedValue({
            url: "https://res.cloudinary.com/teste/image/upload/v1/app-pecuaria/abc123.png",
            publicId: "app-pecuaria/abc123",
        });
    });
    describe("POST /api/upload/image", () => {
        it("deve fazer upload com sucesso e retornar url/publicId", async () => {
            const res = await request(app)
                .post("/api/upload/image")
                .attach("file", TINY_PNG, { filename: "foto.png", contentType: "image/png" });
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                url: "https://res.cloudinary.com/teste/image/upload/v1/app-pecuaria/abc123.png",
                publicId: "app-pecuaria/abc123",
            });
        });
        it("deve usar a pasta default 'app-pecuaria' quando ?folder não é informado", async () => {
            await request(app)
                .post("/api/upload/image")
                .attach("file", TINY_PNG, { filename: "foto.png", contentType: "image/png" });
            expect(uploadToCloudinaryMock).toHaveBeenCalledWith(expect.any(Buffer), "image/png", "app-pecuaria");
        });
        it("deve usar a pasta informada via query string ?folder=vaccinations", async () => {
            await request(app)
                .post("/api/upload/image?folder=vaccinations")
                .attach("file", TINY_PNG, { filename: "foto.png", contentType: "image/png" });
            expect(uploadToCloudinaryMock).toHaveBeenCalledWith(expect.any(Buffer), "image/png", "vaccinations");
        });
        it("deve aceitar jpeg", async () => {
            const res = await request(app)
                .post("/api/upload/image")
                .attach("file", TINY_PNG, { filename: "foto.jpg", contentType: "image/jpeg" });
            expect(res.status).toBe(200);
        });
        it("deve aceitar webp", async () => {
            const res = await request(app)
                .post("/api/upload/image")
                .attach("file", TINY_PNG, { filename: "foto.webp", contentType: "image/webp" });
            expect(res.status).toBe(200);
        });
        it("deve retornar 400 quando nenhum arquivo é enviado", async () => {
            const res = await request(app).post("/api/upload/image");
            expect(res.status).toBe(400);
            expect(res.body.error).toContain("Nenhum arquivo enviado");
            expect(uploadToCloudinaryMock).not.toHaveBeenCalled();
        });
        it("deve retornar 400 para tipo de arquivo não permitido (ex: pdf)", async () => {
            const res = await request(app)
                .post("/api/upload/image")
                .attach("file", Buffer.from("conteudo falso"), {
                filename: "documento.pdf",
                contentType: "application/pdf",
            });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain("Tipo de arquivo invalido");
            expect(uploadToCloudinaryMock).not.toHaveBeenCalled();
        });
        it("deve retornar 400 com mensagem clara quando o arquivo excede 5MB (multer)", async () => {
            const bigBuffer = Buffer.alloc(6 * 1024 * 1024, 1); // 6MB > limite de 5MB
            const res = await request(app)
                .post("/api/upload/image")
                .attach("file", bigBuffer, { filename: "grande.png", contentType: "image/png" });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain("Arquivo muito grande");
            expect(res.body.error).toContain("5MB");
            expect(uploadToCloudinaryMock).not.toHaveBeenCalled();
        });
        it("deve propagar o statusCode quando o Cloudinary falha (ex: 502)", async () => {
            uploadToCloudinaryMock.mockRejectedValue(Object.assign(new Error("Cloudinary upload falhou: timeout"), { statusCode: 502 }));
            const res = await request(app)
                .post("/api/upload/image")
                .attach("file", TINY_PNG, { filename: "foto.png", contentType: "image/png" });
            expect(res.status).toBe(502);
            expect(res.body.error).toContain("Cloudinary upload falhou");
        });
        it("deve retornar 500 quando o Cloudinary não está configurado (sem statusCode → fallback)", async () => {
            uploadToCloudinaryMock.mockRejectedValue(new Error("Erro inesperado sem statusCode"));
            const res = await request(app)
                .post("/api/upload/image")
                .attach("file", TINY_PNG, { filename: "foto.png", contentType: "image/png" });
            expect(res.status).toBe(500);
        });
        it("deve retornar 400 quando o campo do arquivo tem nome diferente de 'file'", async () => {
            // multer.single("file") só aceita arquivo no campo "file" — outro
            // nome de campo dispara um MulterError genérico (LIMIT_UNEXPECTED_FILE),
            // caminho diferente do de "arquivo muito grande".
            const res = await request(app)
                .post("/api/upload/image")
                .attach("campoErrado", TINY_PNG, { filename: "foto.png", contentType: "image/png" });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain("Erro no upload");
            expect(uploadToCloudinaryMock).not.toHaveBeenCalled();
        });
        it("checagem de defesa: controller rejeita size > limite mesmo se algo passar pelo multer", async () => {
            // Esse branch é inalcançável via HTTP normal porque o multer já bloqueia
            // arquivos grandes antes do controller rodar. É só uma defesa em profundidade
            // (ex: se o limite do multer for alterado/removido por engano no futuro).
            // Por isso o teste chama o controller diretamente, sem passar pela rota.
            const uploadController = (await import("@/modules/upload/controller/upload.controller"))
                .default;
            const fakeReq = {
                file: { buffer: Buffer.from("x"), mimetype: "image/png", size: 6 * 1024 * 1024 },
                query: {},
            };
            const fakeRes = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn().mockReturnThis(),
            };
            const fakeNext = vi.fn();
            await uploadController.uploadImage(fakeReq, fakeRes, fakeNext);
            expect(fakeRes.status).toHaveBeenCalledWith(400);
            expect(fakeRes.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.stringContaining("Tamanho máximo permitido") }));
            expect(uploadToCloudinaryMock).not.toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=upload.test.js.map