/**
 * Utilitario de data para garantir consistencia no calculo de <GMD>
 */

export function toWeighingDate(input: Date | string): Date {
   if (input instanceof Date) {
      return new Date(input.getFullYear(), input.getMonth(), input.getDate());
   }
   const [year, month, day] = input.split("-").map(Number);
   return new Date(year, month - 1, day);
}

/**
 * Calcula a diferença em dias entre duas datas, desconsiderando horario
 */
export function daysBetween(from: Date, to: Date): number {
   const fromUTC = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
   const toUTC = Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate());
   return Math.floor((toUTC - fromUTC) / (1000 * 60 * 60 * 24));
}
