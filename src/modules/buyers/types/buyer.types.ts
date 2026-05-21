// BUYER TYPES

export interface BuyerResponse {
   id: string;
   name: string;
   document: string | null;
   phone: string | null;
   email: string | null;
   city: string | null;
   notes: string | null;
   createdAt: Date;
   updatedAt: Date;
   farmId: string;
}

export interface CreateBuyerRequest {
   name: string;
   document?: string;
   phone?: string;
   email?: string;
   city?: string;
   notes?: string;
   farmId: string;
}

export interface UpdateBuyerRequest {
   name?: string;
   document?: string | null;
   phone?: string | null;
   email?: string | null;
   city?: string | null;
   notes?: string | null;
}

export interface ListBuyersQuery {
   search?: string;
}
