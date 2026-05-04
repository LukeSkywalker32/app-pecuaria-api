import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockAnimal } from "../helpers/auth.helper";

const { prismaMock } = vi.hoisted(() => {
   const prismaMock = {
      animal: { findFirst: vi.fn(), update: vi.fn() },
      pasture: { update: vi.fn() },
      pregnancy: { updateMany: vi.fn() },
      mortality: { findFirst: vi.fn(), findMany: vi.fn(), create: vi.fn(), update: vi.fn() },
      birth: { findFirst: vi.fn() },
      $transaction: vi.fn(),
      $queryRaw: vi.fn(),
   };
   return { prismaMock };
});

vi.mock("@/config/database", () => ({ prisma: prismaMock }));

import app from "@/app";

const mockMortality = {
   id: "test-mortality-id",
   farmId: "test-farm-id",
   animalId: "test-animal-id",
   birthId: null,
   deathDate: new Date("2025-03-15"),
   deathTime: "14:30",
   deathLocation: "Pasto A",
   causeOfDeath: "Intoxicação por planta",
   severity: "severe",
   necropsy: false,
   disposal: null,
   photos: [],
   origin: null,
   notes: null,
   registeredById: "test-user-id",
   createdAt: new Date(),
   updatedAt: new Date(),
   animal: { currentEarTag: "BR-001", name: "Vaca 001" },
   registeredBy: { fullName: "Admin Teste" },
};

describe("Mortality Module", () => {
   beforeEach(() => {
      vi.clearAllMocks();
      prismaMock.$transaction.mockImplementation(async (cb: any) => cb(prismaMock));
   });

   describe("POST /api/mortalities", () => {
      it("deve registrar morte e atualizar status do animal", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal); // status: active
         prismaMock.mortality.create.mockResolvedValue(mockMortality);
         prismaMock.animal.update.mockResolvedValue({ ...mockAnimal, status: "dead" });
         prismaMock.pasture.update.mockResolvedValue({});
         prismaMock.pregnancy.updateMany.mockResolvedValue({ count: 0 });

         const res = await request(app).post("/api/mortalities").send({
            animalId: "test-animal-id",
            deathDate: "2025-03-15",
            deathTime: "14:30",
            deathLocation: "Pasto A",
            causeOfDeath: "Intoxicação por planta",
            severity: "severe",
         });

         expect(res.status).toBe(201);
         // Verifica que o animal foi marcado como morto
         expect(prismaMock.animal.update).toHaveBeenCalledWith(
            expect.objectContaining({
               data: expect.objectContaining({ status: "dead" }),
            }),
         );
         // Verifica que o pasto foi decrementado (animal tinha pasto)
         expect(prismaMock.pasture.update).toHaveBeenCalledWith(
            expect.objectContaining({
               data: { currentAnimals: { decrement: 1 } },
            }),
         );
         // Verifica que prenhezes ativas foram encerradas
         expect(prismaMock.pregnancy.updateMany).toHaveBeenCalledWith(
            expect.objectContaining({
               data: { currentStatus: "failed", currentStatusDate: expect.any(Date) },
            }),
         );
      });

      it("deve recusar morte de animal já morto", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({
            ...mockAnimal,
            status: "dead",
         });

         const res = await request(app).post("/api/mortalities").send({
            animalId: "test-animal-id",
            deathDate: "2025-03-15",
            deathLocation: "Pasto A",
            causeOfDeath: "Desconhecida",
         });

         expect(res.status).toBe(409);
         expect(res.body.error).toContain("já está registrado como morto");
      });

      it("deve recusar morte de animal vendido", async () => {
         prismaMock.animal.findFirst.mockResolvedValue({
            ...mockAnimal,
            status: "sold",
         });

         const res = await request(app).post("/api/mortalities").send({
            animalId: "test-animal-id",
            deathDate: "2025-03-15",
            deathLocation: "Pasto A",
            causeOfDeath: "Desconhecida",
         });

         expect(res.status).toBe(400);
         expect(res.body.error).toContain("vendido");
      });

      it("deve retornar 404 quando animal não existe", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);

         const res = await request(app).post("/api/mortalities").send({
            animalId: "id-inexistente",
            deathDate: "2025-03-15",
            deathLocation: "Pasto A",
            causeOfDeath: "Desconhecida",
         });

         expect(res.status).toBe(404);
      });
   });

   describe("GET /api/mortalities", () => {
      it("deve listar mortalidades com filtro de severidade", async () => {
         prismaMock.mortality.findMany.mockResolvedValue([mockMortality]);
         const res = await request(app).get("/api/mortalities?severity=severe");
         expect(res.status).toBe(200);
         expect(res.body[0].registeredByName).toBe("Admin Teste");
      });
   });

   describe("GET /api/mortalities/:id", () => {
      it("deve retornar mortalidade por ID", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue(mockMortality);
         const res = await request(app).get("/api/mortalities/test-mortality-id");
         expect(res.status).toBe(200);
      });

      it("deve retornar 404 quando não existe", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/mortalities/id-inexistente");
         expect(res.status).toBe(404);
      });
   });

   describe("PUT /api/mortalities/:id", () => {
      it("deve atualizar dados do registro sem alterar status do animal", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue(mockMortality);
         prismaMock.mortality.update.mockResolvedValue({
            ...mockMortality,
            necropsy: true,
            disposal: "Enterrado no campo",
         });

         const res = await request(app).put("/api/mortalities/test-mortality-id").send({
            necropsy: true,
            disposal: "Enterrado no campo",
         });

         expect(res.status).toBe(200);
         // O status do animal NÃO foi alterado no update (já está dead desde o create)
         expect(prismaMock.animal.update).not.toHaveBeenCalled();
      });
   });

   describe("PATCH /api/mortalities/:id/photos", () => {
      it("deve adicionar fotos ao registro", async () => {
         prismaMock.mortality.findFirst.mockResolvedValue(mockMortality); // photos: []
         prismaMock.mortality.update.mockResolvedValue({
            ...mockMortality,
            photos: ["https://cloudinary.com/foto1.jpg"],
         });

         const res = await request(app)
            .patch("/api/mortalities/test-mortality-id/photos")
            .send({ photoUrls: ["https://cloudinary.com/foto1.jpg"] });

         expect(res.status).toBe(200);
      });

      it("deve recusar array vazio de fotos", async () => {
         const res = await request(app)
            .patch("/api/mortalities/test-mortality-id/photos")
            .send({ photoUrls: [] });

         expect(res.status).toBe(400);
      });
   });
});
