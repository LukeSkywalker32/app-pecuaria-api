import type { Gender } from "@prisma/client";

/**
 * Tabela de Unidade Animal (UA) técnica:
 * - Bezerros/Bezerras (< 12 meses): 0.3 UA
 * - Garrotes/Novilhas (12-24 meses): 0.7 UA
 * - Vacas (> 24 meses): 1.0 UA
 * - Touros (> 24 meses): 1.2 UA
 */

export function calculateAnimalUA(
   birthDate: Date,
   gender: Gender,
): { ua: number; category: string; ageMonths: number } {
   const now = new Date();
   const diffTime = Math.abs(now.getTime() - birthDate.getTime());
   const ageMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));

   let ua = 0;
   let category = "";

   if (ageMonths < 12) {
      ua = 0.3;
      category = gender === "M" ? "Bezerro" : "Bezerra";
   } else if (ageMonths >= 12 && ageMonths <= 24) {
      ua = 0.7;
      category = gender === "M" ? "Garrote" : "Novilha";
   } else {
      if (gender === "M") {
         ua = 1.2;
         category = "Touro";
      } else {
         ua = 1.0;
         category = "Vaca";
      }
   }

   return { ua, category, ageMonths };
}
