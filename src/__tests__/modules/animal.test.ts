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

   // ─── LIST ───
   describe("GET /api/animals", () => {
      it("deve listar animais da fazenda", async () => {
         prismaMock.animal.findMany.mockResolvedValue([mockAnimal]);
         const res = await request(app).get("/api/animals");
         expect(res.status).toBe(200);
         expect(res.body[0]).toHaveProperty("ageInMonths");
         expect(res.body[0]).toHaveProperty("uaValue");
      });

      it("deve listar com filtro de status", async () => {
         prismaMock.animal.findMany.mockResolvedValue([mockAnimal]);
         const res = await request(app).get("/api/animals?status=active");
         expect(res.status).toBe(200);
      });

      it("deve listar com filtro de gender", async () => {
         prismaMock.animal.findMany.mockResolvedValue([mockAnimal]);
         const res = await request(app).get("/api/animals?gender=F");
         expect(res.status).toBe(200);
      });

      it("deve listar com filtro de pastureId", async () => {
         prismaMock.animal.findMany.mockResolvedValue([mockAnimal]);
         const res = await request(app).get("/api/animals?pastureId=test-pasture-id");
         expect(res.status).toBe(200);
      });

      it("deve listar com filtro de search", async () => {
         prismaMock.animal.findMany.mockResolvedValue([mockAnimal]);
         const res = await request(app).get("/api/animals?search=Vaca");
         expect(res.status).toBe(200);
      });

      it("deve retornar lista vazia", async () => {
         prismaMock.animal.findMany.mockResolvedValue([]);
         const res = await request(app).get("/api/animals");
         expect(res.status).toBe(200);
         expect(res.body).toEqual([]);
      });

      it("deve listar macho jovem (Bezerro)", async () => {
         const baby = { ...mockAnimal, gender: "M", birthDate: new Date() };
         prismaMock.animal.findMany.mockResolvedValue([baby]);
         const res = await request(app).get("/api/animals");
         expect(res.status).toBe(200);
         expect(res.body[0].category).toBe("Bezerro");
      });

      it("deve listar femea jovem (Bezerra)", async () => {
         const baby = { ...mockAnimal, gender: "F", birthDate: new Date() };
         prismaMock.animal.findMany.mockResolvedValue([baby]);
         const res = await request(app).get("/api/animals");
         expect(res.status).toBe(200);
         expect(res.body[0].category).toBe("Bezerra");
      });

      it("deve listar macho adolescente (Garrote)", async () => {
         const d = new Date();
         d.setMonth(d.getMonth() - 18);
         const teen = { ...mockAnimal, gender: "M", birthDate: d };
         prismaMock.animal.findMany.mockResolvedValue([teen]);
         const res = await request(app).get("/api/animals");
         expect(res.status).toBe(200);
         expect(res.body[0].category).toBe("Garrote");
      });

      it("deve listar femea adolescente (Novilha)", async () => {
         const d = new Date();
         d.setMonth(d.getMonth() - 18);
         const teen = { ...mockAnimal, gender: "F", birthDate: d };
         prismaMock.animal.findMany.mockResolvedValue([teen]);
         const res = await request(app).get("/api/animals");
         expect(res.status).toBe(200);
         expect(res.body[0].category).toBe("Novilha");
      });

      it("deve listar macho adulto (Touro)", async () => {
         const d = new Date();
         d.setMonth(d.getMonth() - 36);
         const bull = { ...mockAnimal, gender: "M", birthDate: d };
         prismaMock.animal.findMany.mockResolvedValue([bull]);
         const res = await request(app).get("/api/animals");
         expect(res.status).toBe(200);
         expect(res.body[0].category).toBe("Touro");
      });
   });

   // ─── CREATE ───
   describe("POST /api/animals", () => {
      const validPayload = {
         chipId: "CHIP-001",
         currentEarTag: "BR-001",
         name: "Vaca 001",
         breed: "Nelore",
         gender: "F",
         birthDate: "2020-01-01",
         pastureId: "test-pasture-id",
         origin: "born",
      };

      it("deve criar animal com sucesso", async () => {
         prismaMock.animal.findUnique.mockResolvedValue(null);
         prismaMock.pasture.findFirst.mockResolvedValue(mockPasture);
         prismaMock.animal.create.mockResolvedValue(mockAnimal);
         prismaMock.pasture.update.mockResolvedValue({ ...mockPasture, currentAnimals: 1 });

         const res = await request(app).post("/api/animals").send(validPayload);
         expect(res.status).toBe(201);
         expect(prismaMock.pasture.update).toHaveBeenCalledWith(
            expect.objectContaining({ data: { currentAnimals: { increment: 1 } } }),
         );
      });

      it("deve retornar 409 para chip duplicado", async () => {
         prismaMock.animal.findUnique.mockResolvedValue(mockAnimal);
         const res = await request(app).post("/api/animals").send(validPayload);
         expect(res.status).toBe(409);
      });

      it("deve criar animal comprado sem pasto (quarantine)", async () => {
         prismaMock.animal.findUnique.mockResolvedValue(null);
         prismaMock.animal.create.mockResolvedValue({ ...mockAnimal, status: "quarantine", pastureId: null });

         const res = await request(app).post("/api/animals").send({
            ...validPayload,
            origin: "purchased",
            pastureId: undefined,
         });
         expect(res.status).toBe(201);
      });

      it("deve erro para born sem pasto", async () => {
         prismaMock.animal.findUnique.mockResolvedValue(null);
         const res = await request(app).post("/api/animals").send({
            chipId: "CHIP-NEW",
            name: "Teste",
            breed: "Nelore",
            gender: "F",
            birthDate: "2020-01-01",
            origin: "born",
         });
         expect(res.status).toBe(500);
      });

      it("deve erro 404 para pasto inexistente", async () => {
         prismaMock.animal.findUnique.mockResolvedValue(null);
         prismaMock.pasture.findFirst.mockResolvedValue(null);
         const res = await request(app).post("/api/animals").send(validPayload);
         expect(res.status).toBe(404);
      });

      // ─── Validator: chipId ───
      it("erro: chipId curto", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, chipId: "AB" });
         expect(res.status).toBe(500);
      });

      it("erro: chipId longo", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, chipId: "A".repeat(31) });
         expect(res.status).toBe(500);
      });

      it("erro: chipId com caracteres invalidos", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, chipId: "CHIP @#!" });
         expect(res.status).toBe(500);
      });

      // ─── Validator: earTag ───
      it("erro: earTag vazio", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, currentEarTag: "  " });
         expect(res.status).toBe(500);
      });

      it("erro: earTag longo", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, currentEarTag: "A".repeat(21) });
         expect(res.status).toBe(500);
      });

      // ─── Validator: name ───
      it("erro: nome vazio", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, name: "  " });
         expect(res.status).toBe(500);
      });

      it("erro: nome longo", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, name: "A".repeat(51) });
         expect(res.status).toBe(500);
      });

      // ─── Validator: breed ───
      it("erro: raça curta", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, breed: "A" });
         expect(res.status).toBe(500);
      });

      it("erro: raça longa", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, breed: "A".repeat(51) });
         expect(res.status).toBe(500);
      });

      // ─── Validator: gender ───
      it("erro: gender invalido", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, gender: "X" });
         expect(res.status).toBe(500);
      });

      // ─── Validator: birthDate ───
      it("erro: birthDate ausente", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, birthDate: undefined });
         expect(res.status).toBe(500);
      });

      it("erro: birthDate invalida", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, birthDate: "not-a-date" });
         expect(res.status).toBe(500);
      });

      it("erro: birthDate futura", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, birthDate: "2099-01-01" });
         expect(res.status).toBe(500);
      });

      // ─── Validator: origin ───
      it("erro: origin invalida", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, origin: "stolen" });
         expect(res.status).toBe(500);
      });

      // ─── Validator: status ───
      it("erro: status invalido", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, status: "unknown" });
         expect(res.status).toBe(500);
      });

      // ─── Validator: genealogia ───
      it("erro: sireId vazio", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, sireId: "  " });
         expect(res.status).toBe(500);
      });

      it("erro: damId vazio", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, damId: "  " });
         expect(res.status).toBe(500);
      });

      it("erro: sireExternalName longo", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, sireExternalName: "A".repeat(101) });
         expect(res.status).toBe(500);
      });

      it("erro: damExternalName longo", async () => {
         const res = await request(app).post("/api/animals").send({ ...validPayload, damExternalName: "A".repeat(101) });
         expect(res.status).toBe(500);
      });
   });

   // ─── FIND BY ID ───
   describe("GET /api/animals/:id", () => {
      it("deve retornar animal por ID", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         const res = await request(app).get("/api/animals/test-animal-id");
         expect(res.status).toBe(200);
         expect(res.body.category).toBe("Vaca");
      });

      it("deve retornar 404 quando animal não existe", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).get("/api/animals/id-inexistente");
         expect(res.status).toBe(404);
      });
   });

   // ─── UPDATE ───
   describe("PUT /api/animals/:id", () => {
      it("deve atualizar nome do animal", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.animal.update.mockResolvedValue({ ...mockAnimal, name: "Novo Nome" });

         const res = await request(app).put("/api/animals/test-animal-id").send({ name: "Novo Nome" });
         expect(res.status).toBe(200);
      });

      it("deve remover animal do pasto ao mudar status para quarantine", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.animal.update.mockResolvedValue({ ...mockAnimal, status: "quarantine", pastureId: null });
         prismaMock.pasture.update.mockResolvedValue({});

         const res = await request(app).put("/api/animals/test-animal-id").send({ status: "quarantine" });
         expect(res.status).toBe(200);
         expect(prismaMock.pasture.update).toHaveBeenCalledWith(
            expect.objectContaining({ data: { currentAnimals: { decrement: 1 } } }),
         );
      });

      it("deve remover animal do pasto ao mudar status para treatment", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.animal.update.mockResolvedValue({ ...mockAnimal, status: "treatment", pastureId: null });
         prismaMock.pasture.update.mockResolvedValue({});

         const res = await request(app).put("/api/animals/test-animal-id").send({ status: "treatment" });
         expect(res.status).toBe(200);
      });

      it("deve mudar de pasto (decrementa antigo, incrementa novo)", async () => {
         const newPasture = { ...mockPasture, id: "new-pasture-id", name: "Pasto B" };
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.pasture.findFirst.mockResolvedValue(newPasture);
         prismaMock.pasture.update.mockResolvedValue({});
         prismaMock.animal.update.mockResolvedValue({ ...mockAnimal, pastureId: "new-pasture-id" });

         const res = await request(app).put("/api/animals/test-animal-id").send({ pastureId: "new-pasture-id" });
         expect(res.status).toBe(200);
      });

      it("deve retornar 404 para pasto de destino inexistente", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.pasture.findFirst.mockResolvedValue(null);
         prismaMock.pasture.update.mockResolvedValue({});

         const res = await request(app).put("/api/animals/test-animal-id").send({ pastureId: "bad-id" });
         expect(res.status).toBe(404);
      });

      it("deve atualizar birthDate", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.animal.update.mockResolvedValue({ ...mockAnimal, birthDate: new Date("2019-06-01") });

         const res = await request(app).put("/api/animals/test-animal-id").send({ birthDate: "2019-06-01" });
         expect(res.status).toBe(200);
      });

      it("deve quarantine sem pasto atual (sem decrement)", async () => {
         const noPasture = { ...mockAnimal, pastureId: null, pastureName: null };
         prismaMock.animal.findFirst.mockResolvedValue(noPasture);
         prismaMock.animal.update.mockResolvedValue({ ...noPasture, status: "quarantine" });

         const res = await request(app).put("/api/animals/test-animal-id").send({ status: "quarantine" });
         expect(res.status).toBe(200);
         expect(prismaMock.pasture.update).not.toHaveBeenCalled();
      });

      it("deve 404 quando animal não existe", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).put("/api/animals/bad-id").send({ name: "X" });
         expect(res.status).toBe(404);
      });

      // ─── Validator update ───
      it("erro update: earTag vazio", async () => {
         const res = await request(app).put("/api/animals/test-animal-id").send({ currentEarTag: " " });
         expect(res.status).toBe(500);
      });

      it("erro update: earTag longo", async () => {
         const res = await request(app).put("/api/animals/test-animal-id").send({ currentEarTag: "A".repeat(21) });
         expect(res.status).toBe(500);
      });

      it("erro update: nome vazio", async () => {
         const res = await request(app).put("/api/animals/test-animal-id").send({ name: " " });
         expect(res.status).toBe(500);
      });

      it("erro update: nome longo", async () => {
         const res = await request(app).put("/api/animals/test-animal-id").send({ name: "A".repeat(51) });
         expect(res.status).toBe(500);
      });

      it("erro update: raça curta", async () => {
         const res = await request(app).put("/api/animals/test-animal-id").send({ breed: "A" });
         expect(res.status).toBe(500);
      });

      it("erro update: raça longa", async () => {
         const res = await request(app).put("/api/animals/test-animal-id").send({ breed: "A".repeat(51) });
         expect(res.status).toBe(500);
      });

      it("erro update: gender invalido", async () => {
         const res = await request(app).put("/api/animals/test-animal-id").send({ gender: "X" });
         expect(res.status).toBe(500);
      });

      it("erro update: birthDate invalida", async () => {
         const res = await request(app).put("/api/animals/test-animal-id").send({ birthDate: "abc" });
         expect(res.status).toBe(500);
      });

      it("erro update: birthDate futura", async () => {
         const res = await request(app).put("/api/animals/test-animal-id").send({ birthDate: "2099-01-01" });
         expect(res.status).toBe(500);
      });

      it("erro update: status invalido", async () => {
         const res = await request(app).put("/api/animals/test-animal-id").send({ status: "xyz" });
         expect(res.status).toBe(500);
      });

      it("erro update: pastureId vazio", async () => {
         const res = await request(app).put("/api/animals/test-animal-id").send({ pastureId: " " });
         expect(res.status).toBe(500);
      });
   });

   // ─── DELETE ───
   describe("DELETE /api/animals/:id", () => {
      it("deve remover animal e decrementar pasto", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(mockAnimal);
         prismaMock.pasture.update.mockResolvedValue({});
         prismaMock.animal.delete.mockResolvedValue(mockAnimal);

         const res = await request(app).delete("/api/animals/test-animal-id");
         expect(res.status).toBe(204);
         expect(prismaMock.pasture.update).toHaveBeenCalled();
      });

      it("deve remover animal sem pasto (sem decrement)", async () => {
         const noPasture = { ...mockAnimal, pastureId: null };
         prismaMock.animal.findFirst.mockResolvedValue(noPasture);
         prismaMock.animal.delete.mockResolvedValue(noPasture);

         const res = await request(app).delete("/api/animals/test-animal-id");
         expect(res.status).toBe(204);
         expect(prismaMock.pasture.update).not.toHaveBeenCalled();
      });

      it("deve 404 quando animal não existe", async () => {
         prismaMock.animal.findFirst.mockResolvedValue(null);
         const res = await request(app).delete("/api/animals/bad-id");
         expect(res.status).toBe(404);
      });
   });
});
