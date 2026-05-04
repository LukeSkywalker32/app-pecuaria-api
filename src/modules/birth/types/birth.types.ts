import type { BirthSituation, BirthType, CalfStatus, Gender } from "@prisma/client";

// --- Payload: Registra parto
export interface CreateBirthRequest {
   damId: string; // Id da mãe
   attemptId?: string; // tentativa vinculada(opcional - parto avulso permitido)
   birthDate: string; // Data de nascimento ISO 8601
   birthTime?: string; // Hora de nascimento ISO 8601
   birthType: BirthType; //normal | assisted | c_section
   situation: BirthSituation; //normal | dead
   deathReason?: string; // razão da morte (opcional)
   calfGender?: Gender; // M | F
   calfWeight?: number; // kg
   calfEarTag?: string; //brinco do bezerro
   calfChip?: string; // chip do bezerro
   notes?: string; // notas adicionais
   veterinarianId?: string; // id do vet
   registerCalfAsAnimal?: boolean;
}

// ---- Payload: Atualiza parto -----
export interface UpdateBirthRequest {
   birthDate?: string;
   birthTime?: string;
   birthType?: BirthType;
   situation?: BirthSituation;
   deathReason?: string;
   calfGender?: Gender;
   calfWeight?: number;
   calfEarTag?: string;
   calfChip?: string;
   calfStatus?: CalfStatus;
   notes?: string;
   veterinarianId?: string;
}
// ─── Filtros para listagem ───
export interface ListBirthsQuery {
   damId?: string;
   situation?: BirthSituation;
   dateFrom?: string;
   dateTo?: string;
}

// --- Resposta pública
export interface BirthResponse {
   id: string;
   farmId: string;
   damId: string;
   damEarTag: string | null;
   damName: string | null;
   attemptId: string | null;
   birthDate: Date;
   birthTime: string | null;
   birthType: BirthType;
   situation: BirthSituation;
   deathReason: string | null;
   calfGender: Gender | null;
   calfWeight: number | null;
   calfEarTag: string | null;
   calfChip: string | null;
   calfStatus: CalfStatus;
   calfAnimalId: string | null; // ID do Animal criado automaticamente
   notes: string | null;
   veterinarianId: string | null;
   veterinarianName: string | null;
   createdAt: Date;
   updatedAt: Date;
}
