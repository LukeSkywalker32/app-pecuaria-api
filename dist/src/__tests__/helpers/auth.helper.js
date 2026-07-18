// ========================================
// HELPERS COMPARTILHADOS ENTRE OS TESTES
// ========================================
export const TEST_FARM_ID = "test-farm-id";
export const TEST_USER_ID = "test-user-id";
// ─── Fixtures: dados falsos padronizados ───
// Evita repetição de mock data em cada arquivo de teste
export const mockFarm = {
    id: TEST_FARM_ID,
    name: "Fazenda Teste",
    location: "Guararapes - SP",
    cnpj: null,
    logoUrl: null,
    active: true,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
};
export const mockUser = {
    id: TEST_USER_ID,
    fullName: "Admin Teste",
    username: "admin",
    email: "admin@teste.com",
    phone: null,
    role: "admin",
    active: true,
    farmId: TEST_FARM_ID,
    farm: { name: "Fazenda Teste" },
    crmv: null,
    graduationDate: null,
    specialties: [],
    lastLogin: null,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
};
export const mockPasture = {
    id: "test-pasture-id",
    name: "Pasto A",
    hectares: 10.5,
    type: "Braquiária",
    animalCapacity: 30,
    currentAnimals: 0,
    active: true,
    farmId: TEST_FARM_ID,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
};
export const mockAnimal = {
    id: "test-animal-id",
    chipId: "CHIP-001",
    currentEarTag: "BR-001",
    name: "Vaca 001",
    breed: "Nelore",
    gender: "F",
    birthDate: new Date("2020-01-01"),
    status: "active",
    pastureId: "test-pasture-id",
    pastureName: "Pasto A",
    sireId: null,
    damId: null,
    sireExternalName: null,
    sireExternalChip: null,
    damExternalName: null,
    damExternalChip: null,
    farmId: TEST_FARM_ID,
    origin: "born",
    deathDate: null,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
};
export const mockBull = {
    ...mockAnimal,
    id: "test-bull-id",
    chipId: "CHIP-BULL-001",
    currentEarTag: "BR-T001",
    name: "Touro 001",
    gender: "M",
};
export const mockBuyer = {
    id: "test-buyer-id",
    name: "João da Silva",
    document: "12345678901",
    phone: "18999999999",
    email: "joao@teste.com",
    city: "Araçatuba",
    notes: null,
    farmId: TEST_FARM_ID,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
};
//# sourceMappingURL=auth.helper.js.map