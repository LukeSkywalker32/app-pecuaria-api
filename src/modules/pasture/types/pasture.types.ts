//Tipo de pastos disponiveis
export type PastureType = "native" | "planted" | "irrigated" | "feedlot" | "quarantine";
//Payload para criação de pasto
export interface CreatePastureRequest {
   name: string;
   hectares: number;
   type: PastureType;
   animalCapacity: number;
}
//Payload para atualização de pasto
export interface UpdatePastureRequest {
   name?: string;
   hectares?: number;
   type?: PastureType;
   animalCapacity?: number;
}
//Resposta pública de pasto
export interface PastureResponse {
   id: string;
   name: string;
   hectares: number;
   type: string;
   animalCapacity: number;
   currentAnimals: number;
   occupancyRate: number; //% de animals ocupados
   active: boolean;
   farmId: string;
   createdAt: Date;
   updatedAt: Date;
}
//Filtros para listagem de pastos
export interface ListPasturesQuery {
   active?: boolean;
   type?: PastureType;
   search?: string;
}
