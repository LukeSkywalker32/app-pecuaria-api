//Payload: Registrar novo brinco

export interface PlaceEarTagRequest {
   animalId: string;
   earTagNumber: string;
   placementDate: string;
   reason?: string; // Motivo da colocação ( Nascimento, Compra, Recuperação, etc...)
}

//Payload: Registrar remoção de brinco
export interface RemoveEarTagRequest {
   removalDate: string;
   reason?: string; // Motivo da remoção (ex: "perdido", "danificado", "substituído")
}

//Resposta pública
export interface EarTagHistoryResponse {
   id: string;
   farmId: string;
   animalId: string;
   animalName: string | null;
   animalEarTag: string | null; // currentEarTag do animal no momento
   earTagNumber: string;
   placementDate: Date;
   removalDate: Date | null;
   reason: string | null;
   isActive: boolean; // true quando removalDate === null
   createdAt: Date;
}

// ---- Filtros para listagem -----
export interface ListEarTagsQuery {
   animalId?: string;
   activeOnly?: boolean;
}
