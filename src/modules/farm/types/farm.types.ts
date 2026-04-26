//Payload para criação da fazenda
//Apenas admin do sistema pode criar
export interface CreateFarmRequest {
   name: string;
   location: string;
   cnpj: string;
}
//Payload para atualização da fazenda
export interface UpdateFarmRequest {
   name?: string;
   location?: string;
   cnpj?: string;
}

//Resposta pública da fazenda
export interface FarmResponse {
   id: string;
   name: string;
   location: string;
   cnpj: string | null;
   logoUrl: string | null;
   active: boolean;
   createdAt: Date;
   updatedAt: Date;
}
//Filtros para listagem de fazendas
export interface ListFarmsQuery {
   active?: boolean;
   search?: string;
}
