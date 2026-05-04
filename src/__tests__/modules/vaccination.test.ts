import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAnimal } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      animal: { findFirst: vi.fn() },
      user: { findFirst: vi.fn() },
      vaccination: {
         findFirst: vi.fn(),
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

const mockVaccination = {
   id: "test-vac-id",
   farmId: "test-farm-id",
   animalId: "test-animal-id",
   vaccineType: "Febre Aftosa",
   brand: "Boehringer",
   batch: "LOT-001",
   vaccinationDate: new Date("2025-01-01"),
   expirationDate: new Date("2026-01-01"),
   nextDoseDate: new Date("2025-07-01"),
   photoUrl: null,
   reaction: null,
   notes: null,
   veterinarianId: null,
   createdAt: new Date(),
   updatedAt: new Date(),
   animal: { currentEarTag: "BR-001", name: "Vaca 001" },
   veterinarian: null,
};

describe("Vaccination Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
   });

   describe("POST /api/vaccinations", () => {
      it("deve registrar vacinação com sucesso", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.vaccination.create.mockResolvedValue(mockVaccination);

         const res = await request(app).post("/api/vaccinations").send({
            animalId: "test-animal-id",
            vaccineType: "Febre Aftosa",
            brand: "Boehringer",
            batch: "LOT-001",
            vaccinationDate: "2025-01-01",
            expirationDate: "2026-01-01",
            nextDoseDate: "2025-07-01",
         });

         expect(res.status).toBe(201);
         expect(res.body.vaccineType).toBe("Febre Aftosa");
      });

      it("deve recusar vacinação em animal morto", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({
            ...mockAnimal,
            status: "dead",
         });

         const res = await request(app).post("/api/vaccinations").send({
            animalId: "test-animal-id",
            vaccineType: "Febre Aftosa",
            brand: "Boehringer",
            batch: "LOT-001",
            vaccinationDate: "2025-01-01",
            expirationDate: "2026-01-01",
         });

         expect(res.status).toBe(400);
         expect(res.body.error).toContain("dead");
      });

      it("deve recusar quando data de validade é anterior à vacinação", async () => {
         const res = await request(app).post("/api/vaccinations").send({
            animalId: "test-animal-id",
            vaccineType: "Febre Aftosa",
            brand: "Boehringer",
            batch: "LOT-001",
            vaccinationDate: "2025-06-01",
            expirationDate: "2025-01-01", // anterior!
         });

         expect(res.status).toBe(500);
         expect(res.body.error).toContain("posterior");
      });
   });

   describe("GET /api/vaccinations/upcoming", () => {
      it("deve listar próximas doses nos próximos 30 dias", async () => {
         prismaMock.vaccination.findMany.mockResolvedValue([mockVaccination]);
         const res = await request(app).get("/api/vaccinations/upcoming");
         expect(res.status).toBe(200);
      });
   });

   describe("GET /api/vaccinations/animal/:animalId", () => {
      it("deve retornar histórico de vacinações do animal", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.vaccination.findMany.mockResolvedValue([mockVaccination]);

         const res = await request(app).get("/api/vaccinations/animal/test-animal-id");
         expect(res.status).toBe(200);
         expect(res.body[0].vaccineType).toBe("Febre Aftosa");
      });
   });

   describe("DELETE /api/vaccinations/:id", () => {
      it("deve remover vacinação", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(mockVaccination);
         prismaMock.vaccination.delete.mockResolvedValue(mockVaccination);

         const res = await request(app).delete("/api/vaccinations/test-vac-id");
         expect(res.status).toBe(204);
      });
   });
});
