import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAnimal, mockPasture, TEST_FARM_ID } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      animal: {
         findFirst: vi.fn(),
         findUnique: vi.fn(),
         findMany: vi.fn(),
         create: vi.fn(),
         update: vi.fn(),
         delete: vi.fn(),
      },
      pasture: { findFirst: vi.fn(), update: vi.fn() },
      $transaction: vi.fn(),
      $queryRaw: vi.fn(),
   };
   return { prismaMock };
});

vi.mock("@/config/database", () => ({ prisma: prismaMock }));

import app from "@/app";

describe("Animal Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   describe("GET /api/animals", () => {
      it("deve listar animais da fazenda", async () => {
         prismaMock.animal.findMany.mockResolvedValue([mockAnimal]);
         const res = await request(app).get("/api/animals");
         expect(res.status).toBe(200);
         // Service calcula ageInMonths, category, uaValue
         expect(res.body[0]).toHaveProperty("ageInMonths");
         expect(res.body[0]).toHaveProperty("uaValue");
      });
   });

   describe("POST /api/animals", () => {
      it("deve criar animal com sucesso", async () => {
         prismaMock.animal.findUnique.mockResolvedValue(null); // chip livre
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);
         prismaMock.animal.create.mockResolvedValue(mockAnimal);
         prismaMock.pasture.update.mockResolvedValue({ ...mockPasture, currentAnimals: 1 });

         const res = await request(app).post("/api/animals").send({
            chipId: "CHIP-001",
            currentEarTag: "BR-001",
            name: "Vaca 001",
            breed: "Nelore",
            gender: "F",
            birthDate: "2020-01-01",
            pastureId: "test-pasture-id",
            origin: "born",
         });

         expect(res.status).toBe(201);
         // Verifica que o pasto foi incrementado
         expect(prismaMock.pasture.update).toHaveBeenCalledWith(
            expect.objectContaining({
               data: { currentAnimals: { increment: 1 } },
            }),
         );
      });

      it("deve retornar 409 para chip duplicado", async () => {
         prismaMock.animal.findUnique.mockResolvedValue(mockAnimal);

         const res = await request(app).post("/api/animals").send({
            chipId: "CHIP-001",
            name: "Outro Animal",
            breed: "Nelore",
            gender: "F",
            birthDate: "2020-01-01",
            origin: "born",
            pastureId: "test-pasture-id",
         });

         expect(res.status).toBe(409);
         expect(res.body.error).toContain("Chip ID já cadastrado");
      });
   });

   describe("GET /api/animals/:id", () => {
      it("deve retornar animal por ID", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         const res = await request(app).get("/api/animals/test-animal-id");
         expect(res.status).toBe(200);
         expect(res.body.category).toBe("Vaca"); // fêmea com > 24 meses
      });

      it("deve retornar 404 quando animal não existe", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/animals/id-inexistente");
         expect(res.status).toBe(404);
      });
   });

   describe("PUT /api/animals/:id", () => {
      it("deve remover animal do pasto ao mudar status para quarantine", async () => {
         // Arrange: animal com pasto
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.animal.update.mockResolvedValue({
            ...mockAnimal,
            status: "quarantine",
            pastureId: null,
         });
         prismaMock.pasture.update.mockResolvedValue({});

         const res = await request(app)
            .put("/api/animals/test-animal-id")
            .send({ status: "quarantine" });

         expect(res.status).toBe(200);
         // Verifica que o pasto foi decrementado
         expect(prismaMock.pasture.update).toHaveBeenCalledWith(
            expect.objectContaining({
               data: { currentAnimals: { decrement: 1 } },
            }),
         );
      });
   });

   describe("DELETE /api/animals/:id", () => {
      it("deve remover animal e decrementar pasto", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.pasture.update.mockResolvedValue({});
         prismaMock.animal.delete.mockResolvedValue(mockAnimal);

         const res = await request(app).delete("/api/animals/test-animal-id");
         expect(res.status).toBe(204);
         expect(prismaMock.pasture.update).toHaveBeenCalled();
      });
   });
});
