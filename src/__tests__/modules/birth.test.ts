import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAnimal } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      animal: { findFirst: vi.fn(), create: vi.fn(), update: vi.fn() },
      attempt: { findFirst: vi.fn(), update: vi.fn() },
      pregnancy: { update: vi.fn() },
      pasture: { update: vi.fn() },
      birth: {
         findFirst: vi.fn(),
         findMany: vi.fn(),
         create: vi.fn(),
         update: vi.fn(),
         delete: vi.fn(),
      },
      mortality: { create: vi.fn() },
      user: { findFirst: vi.fn() },
      $transaction: vi.fn(),
      $queryRaw: vi.fn(),
   };
   return { prismaMock };
});

vi.mock("@/config/database", () => ({ prisma: prismaMock }));

import app from "@/app";

const mockBirth = {
   id: "test-birth-id",
   farmId: "test-farm-id",
   damId: "test-animal-id",
   attemptId: null,
   birthDate: new Date("2025-06-01"),
   birthTime: "08:30",
   birthType: "normal",
   situation: "normal",
   deathReason: null,
   calfGender: "F",
   calfWeight: 35,
   calfEarTag: "BR-B001",
   calfChip: null,
   calfStatus: "pending",
   notes: null,
   veterinarianId: null,
   createdAt: new Date(),
   updatedAt: new Date(),
   dam: { currentEarTag: "BR-001", name: "Vaca 001" },
   veterinarian: null,
};

const validCreate = {
   damId: "test-animal-id",
   birthDate: "2025-06-01",
   birthTime: "08:30",
   birthType: "normal",
   situation: "normal",
   calfGender: "F",
   calfWeight: 35,
};

describe("Birth Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   // ─── CREATE ───
   describe("POST /api/births", () => {
      it("deve registrar parto com sucesso", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.birth.create.mockResolvedValue(mockBirth);
         const res = await request(app).post("/api/births").send(validCreate);
         expect(res.status).toBe(201);
      });

      it("deve 404 para mãe inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/births").send(validCreate);
         expect(res.status).toBe(404);
      });

      it("deve 400 para mãe macho", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, gender: "M" });
         const res = await request(app).post("/api/births").send(validCreate);
         expect(res.status).toBe(400);
      });

      it("deve 400 para mãe inativa", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({ ...mockAnimal, status: "dead" });
         const res = await request(app).post("/api/births").send(validCreate);
         expect(res.status).toBe(400);
      });

      it("deve criar Mortality para bezerro morto", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.birth.create.mockResolvedValue({ ...mockBirth, situation: "dead" });
         prismaMock.mortality.create.mockResolvedValue({ id: "mortality-id" });
         const res = await request(app).post("/api/births").send({
            ...validCreate,
            situation: "dead",
            deathReason: "Hipóxia",
         });
         expect(res.status).toBe(201);
         expect(prismaMock.mortality.create).toHaveBeenCalled();
      });

      it("deve criar animal com registerCalfAsAnimal", async () => {
         prismaMock.animal.findFirst
            .mockResolvedValueOnce(mockAnimal)
            .mockResolvedValueOnce(null); // chip livre
         prismaMock.birth.create.mockResolvedValue(mockBirth);
         prismaMock.animal.create.mockResolvedValue({ id: "calf-id" });
         prismaMock.pasture.update.mockResolvedValue({});
         prismaMock.birth.update.mockResolvedValue({ ...mockBirth, calfStatus: "complete" });
         const res = await request(app).post("/api/births").send({
            ...validCreate,
            calfChip: "CHIP-NEW-001",
            registerCalfAsAnimal: true,
         });
         expect(res.status).toBe(201);
         expect(prismaMock.animal.create).toHaveBeenCalled();
      });

      it("deve 409 para chip duplicado", async () => {
         prismaMock.animal.findFirst
            .mockResolvedValueOnce(mockAnimal) // mãe
            .mockResolvedValueOnce({ id: "existing" }); // chip já existe
         const res = await request(app).post("/api/births").send({
            ...validCreate,
            calfChip: "CHIP-EXIST",
         });
         expect(res.status).toBe(409);
      });

      it("deve 404 para veterinário inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.user.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/births").send({ ...validCreate, veterinarianId: "bad-vet" });
         expect(res.status).toBe(404);
      });

      it("deve vincular tentativa", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.attempt.findFirst.mockResolvedValue({
            id: "att-id",
            pregnancyId: "preg-id",
            pregnancy: { farmId: "test-farm-id", animalId: "test-animal-id" },
         });
         prismaMock.birth.create.mockResolvedValue(mockBirth);
         prismaMock.attempt.update.mockResolvedValue({});
         prismaMock.pregnancy.update.mockResolvedValue({});
         const res = await request(app).post("/api/births").send({ ...validCreate, attemptId: "att-id" });
         expect(res.status).toBe(201);
      });

      it("deve 404 para tentativa inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.attempt.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/births").send({ ...validCreate, attemptId: "bad-att" });
         expect(res.status).toBe(404);
      });

      // Validator create
      it("erro: damId vazio", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, damId: "" });
         expect(res.status).toBe(500);
      });

      it("erro: birthDate ausente", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, birthDate: undefined });
         expect(res.status).toBe(500);
      });

      it("erro: birthDate futura", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, birthDate: "2099-01-01" });
         expect(res.status).toBe(500);
      });

      it("erro: birthTime formato inválido", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, birthTime: "0830" });
         expect(res.status).toBe(500);
      });

      it("erro: birthType inválido", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, birthType: "xxx" });
         expect(res.status).toBe(500);
      });

      it("erro: situation inválida", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, situation: "xxx" });
         expect(res.status).toBe(500);
      });

      it("erro: deathReason obrigatório quando dead", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, situation: "dead" });
         expect(res.status).toBe(500);
      });

      it("erro: calfGender inválido", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, calfGender: "X" });
         expect(res.status).toBe(500);
      });

      it("erro: calfWeight negativo", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, calfWeight: -1 });
         expect(res.status).toBe(500);
      });

      it("erro: calfWeight acima de 999", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, calfWeight: 1000 });
         expect(res.status).toBe(500);
      });

      it("erro: calfEarTag longo", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, calfEarTag: "A".repeat(21) });
         expect(res.status).toBe(500);
      });

      it("erro: calfChip curto", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, calfChip: "AB" });
         expect(res.status).toBe(500);
      });

      it("erro: calfChip caracteres inválidos", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, calfChip: "CHIP @!" });
         expect(res.status).toBe(500);
      });

      it("erro: registerCalfAsAnimal sem chip", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, registerCalfAsAnimal: true });
         expect(res.status).toBe(500);
      });

      it("erro: registerCalfAsAnimal + dead", async () => {
         const res = await request(app).post("/api/births").send({
            ...validCreate,
            situation: "dead",
            deathReason: "Teste",
            registerCalfAsAnimal: true,
            calfChip: "CHIP-001",
         });
         expect(res.status).toBe(500);
      });

      it("erro: notes longo", async () => {
         const res = await request(app).post("/api/births").send({ ...validCreate, notes: "A".repeat(501) });
         expect(res.status).toBe(500);
      });
   });

   // ─── LIST ───
   describe("GET /api/births", () => {
      it("deve listar partos", async () => {
         prismaMock.birth.findMany.mockResolvedValue([mockBirth]);
         const res = await request(app).get("/api/births");
         expect(res.status).toBe(200);
      });

      it("deve filtrar por damId", async () => {
         prismaMock.birth.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/births?damId=test-animal-id");
         expect(res.status).toBe(200);
      });

      it("deve filtrar por situation", async () => {
         prismaMock.birth.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/births?situation=normal");
         expect(res.status).toBe(200);
      });

      it("deve filtrar por datas", async () => {
         prismaMock.birth.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/births?dateFrom=2025-01-01&dateTo=2025-12-31");
         expect(res.status).toBe(200);
      });
   });

   // ─── GET BY ID ───
   describe("GET /api/births/:id", () => {
      it("deve retornar parto por ID", async () => {
         prismaMock.birth.findFirst.mockResolvedValue(mockBirth);
         const res = await request(app).get("/api/births/test-birth-id");
         expect(res.status).toBe(200);
      });

      it("deve 404", async () => {
         prismaMock.birth.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/births/bad-id");
         expect(res.status).toBe(404);
      });
   });

   // ─── LIST BY ANIMAL ───
   describe("GET /api/births/animal/:damId", () => {
      it("deve retornar histórico de partos", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.birth.findMany.mockResolvedValue([mockBirth]);
         const res = await request(app).get("/api/births/animal/test-animal-id");
         expect(res.status).toBe(200);
      });

      it("deve 404 para animal inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/births/animal/bad-id");
         expect(res.status).toBe(404);
      });
   });

   // ─── UPDATE ───
   describe("PUT /api/births/:id", () => {
      it("deve atualizar parto", async () => {
         prismaMock.birth.findFirst.mockResolvedValue(mockBirth);
         prismaMock.birth.update.mockResolvedValue({ ...mockBirth, calfWeight: 40 });
         const res = await request(app).put("/api/births/test-birth-id").send({ calfWeight: 40 });
         expect(res.status).toBe(200);
      });

      it("deve atualizar múltiplos campos", async () => {
         prismaMock.birth.findFirst.mockResolvedValue(mockBirth);
         prismaMock.birth.update.mockResolvedValue(mockBirth);
         const res = await request(app).put("/api/births/test-birth-id").send({
            birthDate: "2025-06-02",
            birthTime: "09:00",
            birthType: "assisted",
            situation: "normal",
            calfGender: "M",
            notes: "Obs",
         });
         expect(res.status).toBe(200);
      });

      // Validator update
      it("erro update: birthDate futura", async () => {
         prismaMock.birth.findFirst.mockResolvedValue(mockBirth);
         const res = await request(app).put("/api/births/test-birth-id").send({ birthDate: "2099-01-01" });
         expect(res.status).toBe(500);
      });

      it("erro update: birthTime inválido", async () => {
         prismaMock.birth.findFirst.mockResolvedValue(mockBirth);
         const res = await request(app).put("/api/births/test-birth-id").send({ birthTime: "abc" });
         expect(res.status).toBe(500);
      });

      it("erro update: birthType inválido", async () => {
         prismaMock.birth.findFirst.mockResolvedValue(mockBirth);
         const res = await request(app).put("/api/births/test-birth-id").send({ birthType: "xxx" });
         expect(res.status).toBe(500);
      });

      it("erro update: calfWeight negativo", async () => {
         prismaMock.birth.findFirst.mockResolvedValue(mockBirth);
         const res = await request(app).put("/api/births/test-birth-id").send({ calfWeight: -1 });
         expect(res.status).toBe(500);
      });

      it("erro update: notes longo", async () => {
         prismaMock.birth.findFirst.mockResolvedValue(mockBirth);
         const res = await request(app).put("/api/births/test-birth-id").send({ notes: "A".repeat(501) });
         expect(res.status).toBe(500);
      });
   });

   // ─── DELETE ───
   describe("DELETE /api/births/:id", () => {
      it("deve impedir exclusão com bezerro registrado", async () => {
         prismaMock.birth.findFirst.mockResolvedValue({ ...mockBirth, calfStatus: "complete" });
         const res = await request(app).delete("/api/births/test-birth-id");
         expect(res.status).toBe(400);
      });

      it("deve excluir parto pendente", async () => {
         prismaMock.birth.findFirst.mockResolvedValue(mockBirth);
         prismaMock.birth.delete.mockResolvedValue(mockBirth);
         const res = await request(app).delete("/api/births/test-birth-id");
         expect(res.status).toBe(204);
      });
   });
});
