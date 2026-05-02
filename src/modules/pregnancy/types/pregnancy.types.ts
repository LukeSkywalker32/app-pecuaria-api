import type { AttemptStatus, MatingType, PregnancyStatus, UltrasoundResult } from "@prisma/client";

// ─── Payload: Iniciar prenhez (após CIO) ───
export interface CreatePregnancyRequest {
  animalId: string;
  estrusId?: string; // CIO que originou — opcional para rastreabilidade
}

// ─── Payload: Registrar cobertura ───
export interface CreateAttemptRequest {
  matingDate: string;        // ISO 8601
  matingType: MatingType;    // NATURAL ou AI
  bullId?: string;           // ID do touro (para NATURAL)
  semenName?: string;        // Nome do sêmen (para AI)
  technician?: string;       // Técnico responsável pela IA
  notes?: string;
}

// ─── Payload: Registrar ultrassom ───
export interface CreateUltrasoundRequest {
  days: 30 | 60 | 260;         // Qual ultrassom (30d, 60d ou final ~260d)
  result: UltrasoundResult;    // PREGNANT, EMPTY, ABSORPTION, VIABLE
  ultrasoundDate: string;      // ISO 8601
  notes?: string;
  veterinarianId?: string;
}

// ─── Filtros para listagem ───
export interface ListPregnanciesQuery {
  animalId?: string;
  status?: PregnancyStatus;
}

// ─── Resposta: Ultrassom ───
export interface UltrasoundResponse {
  id: string;
  attemptId: string;
  days: number;
  result: UltrasoundResult;
  notes: string | null;
  ultrasoundDate: Date;
  veterinarianId: string | null;
  veterinarianName: string | null;
  createdAt: Date;
}

// ─── Resposta: Tentativa ───
export interface AttemptResponse {
  id: string;
  pregnancyId: string;
  number: number;
  matingDate: Date;
  matingType: MatingType;
  bullId: string | null;
  bullEarTag: string | null;  // Brinco do touro para facilitar exibição
  semenName: string | null;
  technician: string | null;
  estimatedBirthDate: Date;   // Auto-calculado: matingDate + 283 dias
  attemptStatus: AttemptStatus;
  notes: string | null;
  ultrasounds: UltrasoundResponse[];
  createdAt: Date;
}

// ─── Resposta: Prenhez ───
export interface PregnancyResponse {
  id: string;
  farmId: string;
  animalId: string;
  animalEarTag: string | null;
  animalName: string | null;
  currentStatus: PregnancyStatus;
  currentStatusDate: Date;
  totalAttempts: number;
  attempts: AttemptResponse[];
  createdAt: Date;
  updatedAt: Date;
}
