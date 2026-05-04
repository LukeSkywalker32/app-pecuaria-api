import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { mockAnimal } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      animal: { findFirst: vi.fn() },
      estrus: { findFirst: vi.fn(), findMany: vi.fn(), create: vi.fn(), update: vi.fn() },
      $transaction: vi.fn(),
      $queryRaw: vi.fn(),
   };
   return { prismaMock };
});

vi.mock("@/config/database", () => ({ prisma: prismaMock }));
import app from "@/app";

const mockEstrus = {
   id: "test-estrus-id",
   farmId: "test-farm-id",
   animalId: "test-animal-id",
   date: new Date("2025-01-10"),
   intensity: "normal",
   nextEstrus: new Date("2025-01-31"), // +21 dias
   notes: null,
   detectedById: "test-user-id",
   createdAt: new Date(),
   updatedAt: new Date(),
   animal: { currentEarTag: "BR-001", name: "Vaca 001" },
   detectedBy: { fullName: "Admin Teste" },
};

describe("Estrus Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
   });

   describe("POST /api/estrus", () => {
      it("deve registrar CIO em fêmea ativa", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal); // fêmea ativa
         prismaMock.estrus.create.mockResolvedValue(mockEstrus);

         const res = await request(app).post("/api/estrus").send({
            animalId: "test-animal-id",
            date: "2025-01-10",
            intensity: "normal",
         });

         expect(res.status).toBe(201);
         // Verifica que nextEstrus foi calculado (+21 dias da data do CIO)
         expect(new Date(res.body.nextEstrus).getDate()).toBe(
            new Date("2025-01-31").getDate(),
         );
      });

      it("deve recusar CIO em macho", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, gender: "M" });

         const res = await request(app).post("/api/estrus").send({
            animalId: "test-animal-id",
            date: "2025-01-10",
            intensity: "normal",
         });

         expect(res.status).toBe(400);
         expect(res.body.error).toContain("fêmeas");
      });

      it("deve recusar CIO em animal inativo", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({
            ...mockAnimal,
            status: "quarantine",
         });

         const res = await request(app).post("/api/estrus").send({
            animalId: "test-animal-id",
            date: "2025-01-10",
            intensity: "normal",
         });

         expect(res.status).toBe(400);
      });
   });

   describe("GET /api/estrus", () => {
      it("deve listar CIOs com filtros", async () => {
         prismaMock.estrus.findMany.mockResolvedValue([mockEstrus]);
         const res = await request(app).get("/api/estrus?intensity=normal");
         expect(res.status).toBe(200);
         expect(res.body[0].detectedByName).toBe("Admin Teste");
      });
   });

   describe("GET /api/estrus/upcoming", () => {
      it("deve retornar CIOs esperados nos próximos 7 dias", async () => {
         prismaMock.estrus.findMany.mockResolvedValue([mockEstrus]);
         const res = await request(app).get("/api/estrus/upcoming");
         expect(res.status).toBe(200);
      });
   });

   describe("GET /api/estrus/:id", () => {
      it("deve retornar CIO por ID", async () => {
         prismaMock.estrus.findFirst.mockResolvedValue(mockEstrus);
         const res = await request(app).get("/api/estrus/test-estrus-id");
         expect(res.status).toBe(200);
      });

      it("deve retornar 404 quando CIO não existe", async () => {
         prismaMock.estrus.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/estrus/id-inexistente");
         expect(res.status).toBe(404);
      });
   });

   describe("PUT /api/estrus/:id", () => {
      it("deve recalcular nextEstrus ao atualizar a data", async () => {
         prismaMock.estrus.findFirst.mockResolvedValue(mockEstrus);
         prismaMock.estrus.update.mockResolvedValue({
            ...mockEstrus,
            date: new Date("2025-02-01"),
            nextEstrus: new Date("2025-02-22"),
         });

         const res = await request(app)
            .put("/api/estrus/test-estrus-id")
            .send({ date: "2025-02-01" });

         expect(res.status).toBe(200);
         // nextEstrus = 2025-02-01 + 21 dias = 2025-02-22
         expect(new Date(res.body.nextEstrus).getMonth()).toBe(1); // fevereiro
      });
   });
});
