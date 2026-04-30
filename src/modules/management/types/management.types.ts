export interface CreateManagementRequest {
   animalId: string;
   destinationPastureId: string;
   reason: string;
   employee: string;
   movementDate?: string;
}
export interface CreateBatchManagementRequest {
   animalIds: string[];
   destinationPastureId: string;
   reason: string;
   employee: string;
   movementDate?: string;
}
export interface ManagementResponse {
   id: string;
   animalId: string;
   originPasture: string;
   destinationPasture: string;
   movementDate: Date;
   reason: string;
   employee: string;
   farmId: string;
   createdAt: Date;
}
