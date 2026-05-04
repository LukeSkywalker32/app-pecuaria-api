import type { MortalitySeverity } from "@prisma/client";

// ---- Payload: Registra morte -----
export interface CreateMortalityRequest {
   animalId: string;
   deathDate: string; // Data da morte ISO 8601
   deathTime?: string; // Hora da morte ISO 8601
   deathLocation: string; // Local da morte
   causeOfDeath: string; // Motivo da morte
   severity?: MortalitySeverity; // mild | moderate | severe
   necropsy?: boolean; // Foi feita necropsia?
   disposal?: string; // Destinação do corpo
   photos?: string[]; // URLs das fotos(Cloudinary)
   notes?: string;
   birthId?: string; // Vinculado a um  parto (natimorto)
}

// ---- Payload: Atualiza morte -----
export interface UpdateMortalityRequest {
   deathDate?: string;
   deathTime?: string;
   deathLocation?: string;
   causeOfDeath?: string;
   severity?: MortalitySeverity;
   necropsy?: boolean;
   disposal?: string;
   notes?: string;
}

// --- Filtros para listagem -----
export interface ListMortalitiesQuery {
   dateFrom?: string;
   dateTo?: string;
   severity?: MortalitySeverity;
   necropsy?: boolean;
}

// --- Resposta pública -----
export interface MortalityResponse {
   id: string;
   farmId: string;
   animalId: string;
   animalEarTag: string | null;
   animalName: string | null;
   birthId: string | null;
   deathDate: Date;
   deathTime: string | null;
   deathLocation: string;
   causeOfDeath: string;
   severity: MortalitySeverity | null;
   necropsy: boolean;
   disposal: string | null;
   photos: string[] | null;
   notes: string | null;
   registeredById: string | null;
   registeredByName: string | null;
   createdAt: Date;
   updatedAt: Date;
}
