import type { Gender } from "@prisma/client";

/*
 * Calculando o peso de um animal
 * idade em meses
 * categoria (com base em idade/sexo)
 */

export function calculateAnimalCategory(
   birthDate: Date,
   gender: Gender,
): { category: string; ageMonths: number } {
   const now = new Date();
   const diffTime = Math.abs(now.getTime() - birthDate.getTime());
   const ageMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));

   let category = "";

   if (ageMonths < 12) {
      category = gender === "M" ? "Bezerro" : "Bezerra";
   } else if (ageMonths >= 12 && ageMonths <= 24) {
      category = gender === "M" ? "Garrote" : "Novilha";
   } else {
      category = gender === "M" ? "Touro" : "Vaca";
   }
   return { category, ageMonths };
}
