import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { uploadToCloudinary } from "@/modules/upload/services/upload.service";
const ORIGINAL_ENV = { ...process.env };
describe("upload.service (Cloudinary)", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        process.env.CLOUDINARY_CLOUD_NAME = "test-cloud";
        process.env.CLOUDINARY_API_KEY = "test-key";
        process.env.CLOUDINARY_API_SECRET = "test-secret";
    });
    afterEach(() => {
        process.env = { ...ORIGINAL_ENV };
    });
    it("deve lançar 500 se CLOUDINARY_CLOUD_NAME não estiver configurado", async () => {
        delete process.env.CLOUDINARY_CLOUD_NAME;
        await expect(uploadToCloudinary(Buffer.from("x"), "image/png", "app-pecuaria")).rejects.toMatchObject({
            statusCode: 500,
            message: expect.stringContaining("Cloudinary não configurado"),
        });
    });
    it("deve lançar 500 se CLOUDINARY_API_KEY não estiver configurado", async () => {
        delete process.env.CLOUDINARY_API_KEY;
        await expect(uploadToCloudinary(Buffer.from("x"), "image/png", "app-pecuaria")).rejects.toMatchObject({ statusCode: 500 });
    });
    it("deve lançar 500 se CLOUDINARY_API_SECRET não estiver configurado", async () => {
        delete process.env.CLOUDINARY_API_SECRET;
        await expect(uploadToCloudinary(Buffer.from("x"), "image/png", "app-pecuaria")).rejects.toMatchObject({ statusCode: 500 });
    });
    it("deve fazer upload com sucesso e retornar url/publicId", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                secure_url: "https://res.cloudinary.com/test-cloud/image/upload/v1/abc.png",
                public_id: "app-pecuaria/abc",
            }),
        });
        vi.stubGlobal("fetch", fetchMock);
        const result = await uploadToCloudinary(Buffer.from("conteudo"), "image/png", "vaccinations");
        expect(result).toEqual({
            url: "https://res.cloudinary.com/test-cloud/image/upload/v1/abc.png",
            publicId: "app-pecuaria/abc",
        });
        // Confirma que foi pro endpoint certo, com o cloud name configurado
        expect(fetchMock).toHaveBeenCalledWith("https://api.cloudinary.com/v1_1/test-cloud/image/upload", expect.objectContaining({ method: "POST" }));
    });
    it("deve incluir publicId nos parâmetros assinados quando informado", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                secure_url: "https://res.cloudinary.com/test-cloud/image/upload/v1/fixo.png",
                public_id: "vaccinations/fixo",
            }),
        });
        vi.stubGlobal("fetch", fetchMock);
        const result = await uploadToCloudinary(Buffer.from("conteudo"), "image/png", "vaccinations", "fixo");
        expect(result.publicId).toBe("vaccinations/fixo");
        const body = fetchMock.mock.calls[0][1].body;
        expect(body.get("public_id")).toBe("fixo");
    });
    it("deve lançar 502 com mensagem do Cloudinary quando a resposta não for ok", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: false,
            statusText: "Bad Request",
            json: async () => ({ error: { message: "Invalid signature" } }),
        });
        vi.stubGlobal("fetch", fetchMock);
        await expect(uploadToCloudinary(Buffer.from("x"), "image/png", "app-pecuaria")).rejects.toMatchObject({
            statusCode: 502,
            message: expect.stringContaining("Invalid signature"),
        });
    });
    it("deve usar response.statusText como fallback quando o Cloudinary não retorna mensagem de erro", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: false,
            statusText: "Internal Server Error",
            json: async () => ({}),
        });
        vi.stubGlobal("fetch", fetchMock);
        await expect(uploadToCloudinary(Buffer.from("x"), "image/png", "app-pecuaria")).rejects.toMatchObject({
            statusCode: 502,
            message: expect.stringContaining("Internal Server Error"),
        });
    });
});
//# sourceMappingURL=upload.service.test.js.map