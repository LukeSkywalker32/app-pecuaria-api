// ---- Payload: Registra vacinação -----

export interface CreateVaccinationRequest {
   animalId: string;
   vaccineType: string; //Ex: "Febre Aftosa", "Brucelose", "Raiva".
   brand: string; //Fabricante/Marca
   batch: string; //número do lote
   vaccinationDate: string; //Data da vacinação ISO 8601
   expirationDate: string; // data da validado da vacina ISO 8601
   nextDoseDate?: string; // data da próxima dose ISO 8601
   photoUrl?: string; // url da foto
   reaction?: string; // reação da vacinação(opcional)
   notes?: string; // notas adicionais
   veterinarianId?: string;
}

// ---- Payload: Atualiza vacinação -----
export interface UpdateVaccinationRequest {
   vaccineType?: string;
   brand?: string;
   batch?: string;
   vaccinationDate?: string;
   expirationDate?: string;
   nextDoseDate?: string;
   photoUrl?: string;
   reaction?: string;
   notes?: string;
   veterinarianId?: string;
}

// --- Filtros para listagem -----
export interface ListVaccinationsQuery {
   animalId?: string;
   vaccineType?: string;
   dateFrom?: string;
   dateTo?: string;
   upcoming?: boolean; // Próximas doses nos próximos X dias
}

//--- Resposta pública -----
export interface VaccinationResponse {
   id: string;
   farmId: string;
   animalId: string;
   animalEarTag: string | null;
   animalName: string | null;
   vaccineType: string;
   brand: string;
   batch: string;
   vaccinationDate: Date;
   expirationDate: Date;
   nextDoseDate: Date | null;
   photoUrl: string | null;
   reaction: string | null;
   notes: string | null;
   veterinarianId: string | null;
   veterinarianName: string | null;
   createdAt: Date;
   updatedAt: Date;
}
