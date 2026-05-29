export interface BreedResponse {
   id: string;
   name: string;
   active: boolean;
   createdAt: Date;
   updatedAt: Date;
}

export interface CreateBreedRequest {
   name: string;
}

export interface UpdateBreedRequest {
   name?: string;
   active?: boolean;
}

export interface ListBreedsQuery {
   name?: string;
   active?: boolean;
   search?: string;
}
