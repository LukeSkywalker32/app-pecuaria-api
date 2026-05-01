import type { EstrusIntensity } from "@prisma/client";

//Payload para registrar CIO
export interface CreateEstrusRequest {
   animalId: string;
   date: string;
   intensity: EstrusIntensity;
   notes?: string;
}
//Payload para atualizar CIO
export interface UpdateEstrusRequest {
   date?: string;
   intensity?: EstrusIntensity;
   notes?: string;
}
//Resposta pública
export interface EstrusResponse {
   id: string;
   farmId: string;
   animalId: string;
   animalEarTag: string | null;
   animalName: string | null;
   date: Date;
   intensity: EstrusIntensity;
   nextEstrus: Date;         // Calculado automaticamente (date + 21 dias)
   notes: string | null;
   detectedById: string | null;
   detectedByName: string | null;
   createdAt: Date;
   updatedAt: Date;
}

export interface ListEstrusQuery {
   animalId?: string;
   intensity?: EstrusIntensity;
   dateFrom?: string;      // Filtro de data inicial
   dateTo?: string;        // Filtro de data final
   upcoming?: boolean;     // Apenas CIOs esperados nos próximos 7 dias
}
