// PayLoad: Registra pesagem
export interface CreateWeighingRequest {
   animalId: string; // ID do animal Pesado
   weightKg: number; // Peso do animal em Kg
   date: string; // Data da pesagem
   notes?: string; // Notas adicionais
}

// PayLoad: Atualiza Pesagem
export interface UpdateWeighingRequest {
   weightKg?: number;
   date?: string;
   notes?: string;
}

// Filtros para listagem
export interface ListWeighingQuery {
   animalId?: string;
   dateFrom?: string;
   dateTo?: string;
}

// Resposta Publica
export interface WeighingResponse {
   id: string;
   farmId: string;
   animalId: string;
   animalEarTag: string | null;
   animalName: string | null;
   weightKg: number;
   date: Date;
   notes: string | null;
   registeredById: string | null;
   registeredByName: string | null;
   createdAt: Date;
   updatedAt: Date;
   // GMD - Ganho Médio Diário, kg/dia calculado em relação a pesagem anterior
   // do mesmo animal. null quando não houver pesagem anterior
   gmd: number | null;
}
