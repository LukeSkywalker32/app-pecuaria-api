/**
 * Utilitario de data para garantir consistencia no calculo de <GMD>
 */

export function toWeighingDate(input: Date | string): Date {
   const d = input instanceof Date ? input : new Date(input);
   //Normaliza o UTC para meia noite - descarta horario mantem o dia
   return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

/**
 * Calcula a diferença em dias entre duas datas, desconsiderando horario
 */
export function daysBetween(from: Date, to: Date): number {
   const fromUTC = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
   const toUTC = Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate());
   return Math.floor((toUTC - fromUTC) / (1000 * 60 * 60 * 24));
}
