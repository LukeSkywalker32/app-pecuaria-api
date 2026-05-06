import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockFarm, TEST_FARM_ID } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      farm: {
         findFirst: vi.fn(),
         findUnique: vi.fn(),
         findMany: vi.fn(),
         create: vi.fn(),
         update: vi.fn(),
         delete: vi.fn(),
      },
      $transaction: vi.fn(),
      $queryRaw: vi.fn(),
   };
   return { prismaMock };
});

vi.mock("@/config/database", () => ({ prisma: prismaMock }));

import app from "@/app";
import { protectRoute } from "@/shared/middlewares/authMiddleware";

describe("Farm Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   // ─── LIST ───
   describe("GET /api/farms", () => {
      it("deve listar fazendas para admin", async () => {
         prismaMock.farm.findMany.mockResolvedValue([mockFarm]);
         const res = await request(app).get("/api/farms");
         expect(res.status).toBe(200);
         expect(res.body).toHaveLength(1);
      });

      it("deve listar com filtro active=true", async () => {
         prismaMock.farm.findMany.mockResolvedValue([mockFarm]);
         const res = await request(app).get("/api/farms?active=true");
         expect(res.status).toBe(200);
      });

      it("deve listar com filtro search", async () => {
         prismaMock.farm.findMany.mockResolvedValue([mockFarm]);
         const res = await request(app).get("/api/farms?search=Teste");
         expect(res.status).toBe(200);
      });

      it("deve listar apenas a própria fazenda se não for admin", async () => {
         vi.mocked(protectRoute).mockImplementationOnce((req: any, _res: any, next: any) => {
            req.userId = "vet-id";
            req.role = "veterinarian";
            req.farmId = TEST_FARM_ID;
            next();
         });
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         const res = await request(app).get("/api/farms");
         expect(res.status).toBe(200);
         expect(res.body).toHaveLength(1);
         expect(res.body[0].id).toBe(TEST_FARM_ID);
      });
   });

   // ─── CREATE ───
   describe("POST /api/farms", () => {
      it("deve criar fazenda com sucesso", async () => {
         prismaMock.farm.findFirst.mockResolvedValue(null);
         prismaMock.farm.create.mockResolvedValue(mockFarm);
         const res = await request(app).post("/api/farms").send({
            name: "Fazenda Teste",
            location: "Guararapes - SP",
         });
         expect(res.status).toBe(201);
         expect(prismaMock.farm.create).toHaveBeenCalledOnce();
      });

      it("deve retornar 409 quando nome já está em uso", async () => {
         prismaMock.farm.findFirst.mockResolvedValue(mockFarm);
         const res = await request(app).post("/api/farms").send({
            name: "Fazenda Teste",
            location: "Araçatuba - SP",
         });
         expect(res.status).toBe(409);
      });

      // Validator create
      it("erro: nome curto", async () => {
         const res = await request(app).post("/api/farms").send({ name: "A", location: "SP" });
         expect(res.status).toBe(500);
      });

      it("erro: nome longo", async () => {
         const res = await request(app).post("/api/farms").send({ name: "A".repeat(51), location: "Guararapes" });
         expect(res.status).toBe(500);
      });

      it("erro: location curta", async () => {
         const res = await request(app).post("/api/farms").send({ name: "Fazenda OK", location: "SP" });
         expect(res.status).toBe(500);
      });

      it("erro: CNPJ inválido", async () => {
         const res = await request(app).post("/api/farms").send({
            name: "Fazenda OK",
            location: "Guararapes - SP",
            cnpj: "12345",
         });
         expect(res.status).toBe(500);
      });

      it("deve aceitar CNPJ válido", async () => {
         prismaMock.farm.findFirst.mockResolvedValue(null);
         prismaMock.farm.create.mockResolvedValue(mockFarm);
         const res = await request(app).post("/api/farms").send({
            name: "Fazenda OK",
            location: "Guararapes - SP",
            cnpj: "11.222.333/0001-81",
         });
         expect(res.status).toBe(201);
      });
   });

   // ─── FIND BY ID ───
   describe("GET /api/farms/:id", () => {
      it("deve retornar fazenda por ID", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         const res = await request(app).get(`/api/farms/${TEST_FARM_ID}`);
         expect(res.status).toBe(200);
      });

      it("deve retornar 404 quando fazenda não existe", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(null);
         const res = await request(app).get("/api/farms/id-inexistente");
         expect(res.status).toBe(404);
      });

      it("deve dar erro 403 se owner tentar buscar fazenda de outro", async () => {
         vi.mocked(protectRoute).mockImplementationOnce((req: any, _res: any, next: any) => {
            req.userId = "owner-id";
            req.role = "owner";
            req.farmId = "minha-fazenda";
            next();
         });
         const res = await request(app).get(`/api/farms/${TEST_FARM_ID}`);
         expect(res.status).toBe(403);
      });
   });

   // ─── UPDATE ───
   describe("PUT /api/farms/:id", () => {
      it("deve atualizar fazenda com sucesso", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         prismaMock.farm.findFirst.mockResolvedValue(null);
         prismaMock.farm.update.mockResolvedValue({ ...mockFarm, name: "Fazenda Atualizada" });
         const res = await request(app).put(`/api/farms/${TEST_FARM_ID}`).send({ name: "Fazenda Atualizada" });
         expect(res.status).toBe(200);
      });

      it("deve retornar 409 para conflito de nome", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         prismaMock.farm.findFirst.mockResolvedValue({ ...mockFarm, id: "other-id" });
         const res = await request(app).put(`/api/farms/${TEST_FARM_ID}`).send({ name: "Outra Fazenda" });
         expect(res.status).toBe(409);
      });

      it("deve atualizar location e cnpj", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         prismaMock.farm.update.mockResolvedValue({ ...mockFarm, location: "Nova Loc" });
         const res = await request(app).put(`/api/farms/${TEST_FARM_ID}`).send({ location: "Nova Localização", cnpj: null });
         expect(res.status).toBe(200);
      });

      // Validator update
      it("erro update: nome curto", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         const res = await request(app).put(`/api/farms/${TEST_FARM_ID}`).send({ name: "A" });
         expect(res.status).toBe(500);
      });

      it("erro update: nome longo", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         const res = await request(app).put(`/api/farms/${TEST_FARM_ID}`).send({ name: "A".repeat(101) });
         expect(res.status).toBe(500);
      });

      it("erro update: location curta", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         const res = await request(app).put(`/api/farms/${TEST_FARM_ID}`).send({ location: "SP" });
         expect(res.status).toBe(500);
      });

      it("erro update: CNPJ inválido", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         const res = await request(app).put(`/api/farms/${TEST_FARM_ID}`).send({ cnpj: "invalido" });
         expect(res.status).toBe(500);
      });
   });

   // ─── ACTIVATE / DEACTIVATE ───
   describe("PATCH /api/farms/:id/activate", () => {
      it("deve ativar fazenda", async () => {
         prismaMock.farm.findUnique.mockResolvedValue({ ...mockFarm, active: false });
         prismaMock.farm.update.mockResolvedValue({ ...mockFarm, active: true });
         const res = await request(app).patch(`/api/farms/${TEST_FARM_ID}/activate`);
         expect(res.status).toBe(200);
         expect(res.body.active).toBe(true);
      });

      it("deve 404 para ativar fazenda inexistente", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(null);
         const res = await request(app).patch("/api/farms/bad-id/activate");
         expect(res.status).toBe(404);
      });
   });

   describe("PATCH /api/farms/:id/deactivate", () => {
      it("deve desativar fazenda", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         prismaMock.farm.update.mockResolvedValue({ ...mockFarm, active: false });
         const res = await request(app).patch(`/api/farms/${TEST_FARM_ID}/deactivate`);
         expect(res.status).toBe(200);
         expect(res.body.active).toBe(false);
      });
   });

   // ─── UPLOAD LOGO ───
   describe("PATCH /api/farms/:id/logo", () => {
      it("deve retornar 400 sem arquivo", async () => {
         const res = await request(app).patch(`/api/farms/${TEST_FARM_ID}/logo`);
         expect(res.status).toBe(400);
         expect(res.body.error).toContain("No file");
      });

      it("deve retornar 400 para tipo inválido", async () => {
         const res = await request(app)
            .patch(`/api/farms/${TEST_FARM_ID}/logo`)
            .attach("logo", Buffer.from("fake"), { filename: "test.gif", contentType: "image/gif" });
         expect(res.status).toBe(400);
         expect(res.body.error).toContain("Invalid file type");
      });

      it("erro: Cloudinary não configurado", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         process.env.CLOUDINARY_CLOUD_NAME = "";
         const res = await request(app)
            .patch(`/api/farms/${TEST_FARM_ID}/logo`)
            .attach("logo", Buffer.from("fake"), { filename: "test.jpg", contentType: "image/jpeg" });
         expect(res.status).toBe(500);
      });

      it("deve fazer upload da logo com sucesso", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         process.env.CLOUDINARY_CLOUD_NAME = "testcloud";
         process.env.CLOUDINARY_API_KEY = "testkey";
         process.env.CLOUDINARY_API_SECRET = "testsecret";
         
         // Mock global.fetch
         const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ secure_url: "https://cloudinary.com/logo.jpg" }),
         });
         global.fetch = fetchMock as any;

         // Mock crypto.subtle
         const signMock = vi.fn().mockResolvedValue(new ArrayBuffer(8));
         const importKeyMock = vi.fn().mockResolvedValue({} as CryptoKey);
         Object.defineProperty(global, 'crypto', {
            value: {
               subtle: {
                  importKey: importKeyMock,
                  sign: signMock,
               }
            }
         });

         prismaMock.farm.update.mockResolvedValue({ ...mockFarm, logoUrl: "https://cloudinary.com/logo.jpg" });
         
         const res = await request(app)
            .patch(`/api/farms/${TEST_FARM_ID}/logo`)
            .attach("logo", Buffer.from("fake"), { filename: "test.jpg", contentType: "image/jpeg" });
            
         expect(res.status).toBe(200);
         expect(fetchMock).toHaveBeenCalled();
      });

      it("erro no upload da logo (fetch not ok)", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         process.env.CLOUDINARY_CLOUD_NAME = "testcloud";
         process.env.CLOUDINARY_API_KEY = "testkey";
         process.env.CLOUDINARY_API_SECRET = "testsecret";
         
         const fetchMock = vi.fn().mockResolvedValue({
            ok: false,
            statusText: "Bad Request",
            json: vi.fn().mockResolvedValue({ error: { message: "Invalid image" } }),
         });
         global.fetch = fetchMock as any;

         const signMock = vi.fn().mockResolvedValue(new ArrayBuffer(8));
         const importKeyMock = vi.fn().mockResolvedValue({} as CryptoKey);
         Object.defineProperty(global, 'crypto', {
            value: {
               subtle: {
                  importKey: importKeyMock,
                  sign: signMock,
               }
            }
         });

         const res = await request(app)
            .patch(`/api/farms/${TEST_FARM_ID}/logo`)
            .attach("logo", Buffer.from("fake"), { filename: "test.jpg", contentType: "image/jpeg" });
            
         expect(res.status).toBe(502);
      });
   });

   // ─── DELETE ───
   describe("DELETE /api/farms/:id", () => {
      it("deve remover fazenda", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(mockFarm);
         prismaMock.farm.delete.mockResolvedValue(mockFarm);
         const res = await request(app).delete(`/api/farms/${TEST_FARM_ID}`);
         expect(res.status).toBe(204);
      });

      it("deve 404 para fazenda inexistente", async () => {
         prismaMock.farm.findUnique.mockResolvedValue(null);
         const res = await request(app).delete("/api/farms/bad-id");
         expect(res.status).toBe(404);
      });
   });
});
