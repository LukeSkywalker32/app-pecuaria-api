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

const mockVac = {
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

const validCreate = {
   animalId: "test-animal-id",
   vaccineType: "Febre Aftosa",
   brand: "Boehringer",
   batch: "LOT-001",
   vaccinationDate: "2025-01-01",
   expirationDate: "2026-01-01",
};

describe("Vaccination Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
   });

   // ─── CREATE ───
   describe("POST /api/vaccinations", () => {
      it("deve registrar vacinação", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.vaccination.create.mockResolvedValue(mockVac);
         const res = await request(app).post("/api/vaccinations").send(validCreate);
         expect(res.status).toBe(201);
      });

      it("deve registrar com veterinário", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.user.findFirst.mockResolvedValue({ id: "vet-id" });
         prismaMock.vaccination.create.mockResolvedValue(mockVac);
         const res = await request(app).post("/api/vaccinations").send({ ...validCreate, veterinarianId: "vet-id" });
         expect(res.status).toBe(201);
      });

      it("deve 404 para animal inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/vaccinations").send(validCreate);
         expect(res.status).toBe(404);
      });

      it("deve recusar animal morto", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, status: "dead" });
         const res = await request(app).post("/api/vaccinations").send(validCreate);
         expect(res.status).toBe(400);
      });

      it("deve recusar animal vendido", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, status: "sold" });
         const res = await request(app).post("/api/vaccinations").send(validCreate);
         expect(res.status).toBe(400);
      });

      it("deve 404 para veterinário inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.user.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/vaccinations").send({ ...validCreate, veterinarianId: "bad-vet" });
         expect(res.status).toBe(404);
      });

      // Validator create
      it("erro: animalId vazio", async () => {
         const res = await request(app).post("/api/vaccinations").send({ ...validCreate, animalId: "" });
         expect(res.status).toBe(500);
      });

      it("erro: vaccineType curto", async () => {
         const res = await request(app).post("/api/vaccinations").send({ ...validCreate, vaccineType: "A" });
         expect(res.status).toBe(500);
      });

      it("erro: brand curto", async () => {
         const res = await request(app).post("/api/vaccinations").send({ ...validCreate, brand: "A" });
         expect(res.status).toBe(500);
      });

      it("erro: batch vazio", async () => {
         const res = await request(app).post("/api/vaccinations").send({ ...validCreate, batch: "" });
         expect(res.status).toBe(500);
      });

      it("erro: vaccinationDate ausente", async () => {
         const res = await request(app).post("/api/vaccinations").send({ ...validCreate, vaccinationDate: undefined });
         expect(res.status).toBe(500);
      });

      it("erro: vaccinationDate futura", async () => {
         const res = await request(app).post("/api/vaccinations").send({ ...validCreate, vaccinationDate: "2099-01-01" });
         expect(res.status).toBe(500);
      });

      it("erro: expirationDate ausente", async () => {
         const res = await request(app).post("/api/vaccinations").send({ ...validCreate, expirationDate: undefined });
         expect(res.status).toBe(500);
      });

      it("erro: expirationDate anterior à vacinação", async () => {
         const res = await request(app).post("/api/vaccinations").send({
            ...validCreate,
            vaccinationDate: "2025-06-01",
            expirationDate: "2025-01-01",
         });
         expect(res.status).toBe(500);
      });

      it("erro: nextDoseDate anterior à vacinação", async () => {
         const res = await request(app).post("/api/vaccinations").send({
            ...validCreate,
            nextDoseDate: "2024-01-01",
         });
         expect(res.status).toBe(500);
      });

      it("erro: reaction longa", async () => {
         const res = await request(app).post("/api/vaccinations").send({ ...validCreate, reaction: "A".repeat(301) });
         expect(res.status).toBe(500);
      });

      it("erro: notes longa", async () => {
         const res = await request(app).post("/api/vaccinations").send({ ...validCreate, notes: "A".repeat(501) });
         expect(res.status).toBe(500);
      });
   });

   // ─── LIST ───
   describe("GET /api/vaccinations", () => {
      it("deve listar vacinações", async () => {
         prismaMock.vaccination.findMany.mockResolvedValue([mockVac]);
         const res = await request(app).get("/api/vaccinations");
         expect(res.status).toBe(200);
      });

      it("deve listar com filtro animalId", async () => {
         prismaMock.vaccination.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/vaccinations?animalId=test-animal-id");
         expect(res.status).toBe(200);
      });

      it("deve listar com filtro vaccineType", async () => {
         prismaMock.vaccination.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/vaccinations?vaccineType=Aftosa");
         expect(res.status).toBe(200);
      });

      it("deve listar com filtro de datas", async () => {
         prismaMock.vaccination.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/vaccinations?dateFrom=2025-01-01&dateTo=2025-12-31");
         expect(res.status).toBe(200);
      });

      it("deve listar upcoming", async () => {
         prismaMock.vaccination.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/vaccinations?upcoming=true");
         expect(res.status).toBe(200);
      });
   });

   // ─── GET BY ID ───
   describe("GET /api/vaccinations/:id", () => {
      it("deve retornar vacinação por ID", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(mockVac);
         const res = await request(app).get("/api/vaccinations/test-vac-id");
         expect(res.status).toBe(200);
      });

      it("deve 404", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/vaccinations/bad-id");
         expect(res.status).toBe(404);
      });
   });

   // ─── UPCOMING ───
   describe("GET /api/vaccinations/upcoming", () => {
      it("deve listar próximas doses", async () => {
         prismaMock.vaccination.findMany.mockResolvedValue([mockVac]);
         const res = await request(app).get("/api/vaccinations/upcoming");
         expect(res.status).toBe(200);
      });
   });

   // ─── LIST BY ANIMAL ───
   describe("GET /api/vaccinations/animal/:animalId", () => {
      it("deve retornar histórico", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.vaccination.findMany.mockResolvedValue([mockVac]);
         const res = await request(app).get("/api/vaccinations/animal/test-animal-id");
         expect(res.status).toBe(200);
      });

      it("deve 404 para animal inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/vaccinations/animal/bad-id");
         expect(res.status).toBe(404);
      });
   });

   // ─── UPDATE ───
   describe("PUT /api/vaccinations/:id", () => {
      it("deve atualizar vacinação", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(mockVac);
         prismaMock.vaccination.update.mockResolvedValue({ ...mockVac, brand: "MSD" });
         const res = await request(app).put("/api/vaccinations/test-vac-id").send({ brand: "MSD" });
         expect(res.status).toBe(200);
      });

      it("deve atualizar com veterinário", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(mockVac);
         prismaMock.user.findFirst.mockResolvedValue({ id: "vet-id" });
         prismaMock.vaccination.update.mockResolvedValue(mockVac);
         const res = await request(app).put("/api/vaccinations/test-vac-id").send({ veterinarianId: "vet-id" });
         expect(res.status).toBe(200);
      });

      it("deve 404 para vet inexistente no update", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(mockVac);
         prismaMock.user.findFirst.mockResolvedValue(null);
         const res = await request(app).put("/api/vaccinations/test-vac-id").send({ veterinarianId: "bad" });
         expect(res.status).toBe(404);
      });

      it("deve atualizar removendo nextDoseDate e veterinarianId", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(mockVac);
         prismaMock.vaccination.update.mockResolvedValue({ ...mockVac, nextDoseDate: null, veterinarianId: null });
         const res = await request(app).put("/api/vaccinations/test-vac-id").send({
            nextDoseDate: null,
            veterinarianId: null,
            vaccinationDate: "2025-01-01",
            expirationDate: "2026-01-01",
            photoUrl: "http://photo.com",
            reaction: "None",
            notes: "Nothing"
         });
         expect(res.status).toBe(200);
      });

      // Validator update
      it("erro update: vaccineType curto", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(mockVac);
         const res = await request(app).put("/api/vaccinations/test-vac-id").send({ vaccineType: "A" });
         expect(res.status).toBe(500);
      });

      it("erro update: batch vazio", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(mockVac);
         const res = await request(app).put("/api/vaccinations/test-vac-id").send({ batch: "" });
         expect(res.status).toBe(500);
      });

      it("erro update: vaccinationDate futura", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(mockVac);
         const res = await request(app).put("/api/vaccinations/test-vac-id").send({ vaccinationDate: "2099-01-01" });
         expect(res.status).toBe(500);
      });

      it("erro update: nextDoseDate invalida", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(mockVac);
         const res = await request(app).put("/api/vaccinations/test-vac-id").send({ nextDoseDate: "invalido" });
         expect(res.status).toBe(500);
      });

      it("erro update: reaction longa", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(mockVac);
         const res = await request(app).put("/api/vaccinations/test-vac-id").send({ reaction: "A".repeat(301) });
         expect(res.status).toBe(500);
      });

      it("erro update: notes longo", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(mockVac);
         const res = await request(app).put("/api/vaccinations/test-vac-id").send({ notes: "A".repeat(501) });
         expect(res.status).toBe(500);
      });
   });

   // ─── DELETE ───
   describe("DELETE /api/vaccinations/:id", () => {
      it("deve remover vacinação", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(mockVac);
         prismaMock.vaccination.delete.mockResolvedValue(mockVac);
         const res = await request(app).delete("/api/vaccinations/test-vac-id");
         expect(res.status).toBe(204);
      });

      it("deve 404", async () => {
         prismaMock.vaccination.findFirst.mockResolvedValue(null);
         const res = await request(app).delete("/api/vaccinations/bad-id");
         expect(res.status).toBe(404);
      });
   });
});
