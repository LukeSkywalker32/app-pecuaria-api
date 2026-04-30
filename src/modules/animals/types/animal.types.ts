import type { AnimalStatus, Gender } from "@prisma/client";

export interface CreateAnimalRequest {
   chipId: string;
   currentEarTag: string;
   name: string;
   breed: string;
   gender: Gender;
   birthDate: string; //ISO Date String
   pastureId?: string;
   status?: AnimalStatus;
   // Genealogia interna
   sireId?: string;
   damId?: string;
   //Genealogia externa
   sireExternalName?: string;
   sireExternalChip?: string;
   damExternalName?: string;
   damExternalChip?: string;
   // Origem
   origin?: "born" | "purchased";
}

export interface UpdateAnimalRequest {
   currentEarTag?: string;
   name?: string;
   breed?: string;
   gender?: Gender;
   birthDate?: string;
   status?: AnimalStatus;
   pastureId?: string;
}

export interface AnimalResponse {
   id: string;
   chipId: string;
   currentEarTag: string | null;
   name: string;
   breed: string;
   gender: Gender;
   birthDate: string;
   ageInMonths: number;
   category: string;
   uaValue: number; //Valor em unidade animal
   status: AnimalStatus;
   pastureId: string | null;
   pastureName: string | null;
   //Genealogia
   sireId?: string | null;
   damId?: string | null;
   sireExternalName?: string | null;
   sireExternalChip?: string | null;
   damExternalName?: string | null;
   damExternalChip?: string | null;
   farmId: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface ListAnimalsQuery {
   status?: AnimalStatus;
   gender?: Gender;
   pastureId?: string;
   search?: string;
}
