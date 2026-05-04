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

describe("Birth Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   describe("POST /api/births", () => {
      it("deve registrar parto avulso com sucesso", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.birth.create.mockResolvedValue(mockBirth);

         const res = await request(app).post("/api/births").send({
            damId: "test-animal-id",
            birthDate: "2025-06-01",
            birthTime: "08:30",
            birthType: "normal",
            situation: "normal",
            calfGender: "F",
            calfWeight: 35,
         });

         expect(res.status).toBe(201);
         expect(res.body.situation).toBe("normal");
      });

      it("deve criar Mortality automaticamente quando bezerro nasce morto", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.birth.create.mockResolvedValue({ ...mockBirth, situation: "dead" });
         prismaMock.mortality.create.mockResolvedValue({ id: "mortality-id" });

         const res = await request(app).post("/api/births").send({
            damId: "test-animal-id",
            birthDate: "2025-06-01",
            birthType: "normal",
            situation: "dead",
            deathReason: "Hipóxia neonatal",
         });

         expect(res.status).toBe(201);
         // Verifica que a mortalidade foi criada automaticamente
         expect(prismaMock.mortality.create).toHaveBeenCalledWith(
            expect.objectContaining({
               data: expect.objectContaining({ origin: "natimorto" }),
            }),
         );
      });

      it("deve criar animal quando registerCalfAsAnimal = true", async () => {
         prismaMock.animal.findFirst
            .mockResolvedValueOnce(mockAnimal) // mãe
            .mockResolvedValueOnce(null); // chip livre
         prismaMock.birth.create.mockResolvedValue(mockBirth);
         prismaMock.animal.create.mockResolvedValue({ id: "calf-id", name: "Bezerro" });
         prismaMock.pasture.update.mockResolvedValue({});
         prismaMock.birth.update.mockResolvedValue({ ...mockBirth, calfStatus: "complete" });

         const res = await request(app).post("/api/births").send({
            damId: "test-animal-id",
            birthDate: "2025-06-01",
            birthType: "normal",
            situation: "normal",
            calfGender: "F",
            calfChip: "CHIP-CALF-NEW",
            registerCalfAsAnimal: true,
         });

         expect(res.status).toBe(201);
         expect(prismaMock.animal.create).toHaveBeenCalled();
      });

      it("deve rejeitar registro de bezerro morto como animal", async () => {
         const res = await request(app).post("/api/births").send({
            damId: "test-animal-id",
            birthDate: "2025-06-01",
            birthType: "normal",
            situation: "dead",
            deathReason: "Hipóxia",
            registerCalfAsAnimal: true, // inválido!
            calfChip: "CHIP-CALF",
         });

         expect(res.status).toBe(500);
         expect(res.body.error).toContain("Não é possível registrar como animal");
      });
   });

   describe("DELETE /api/births/:id", () => {
      it("deve impedir exclusão quando bezerro foi registrado como animal", async () => {
         prismaMock.birth.findFirst.mockResolvedValue({
            ...mockBirth,
            calfStatus: "complete", // bezerro já foi registrado
         });

         const res = await request(app).delete("/api/births/test-birth-id");
         expect(res.status).toBe(400);
         expect(res.body.error).toContain("bezerro já foi registrado como animal");
      });

      it("deve excluir parto pendente", async () => {
         prismaMock.birth.findFirst.mockResolvedValue(mockBirth); // calfStatus: pending
         prismaMock.birth.delete.mockResolvedValue(mockBirth);

         const res = await request(app).delete("/api/births/test-birth-id");
         expect(res.status).toBe(204);
      });
   });
});
