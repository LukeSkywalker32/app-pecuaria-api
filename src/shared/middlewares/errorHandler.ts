/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import type { NextFunction, Request, Response } from "express";

export interface CustomError extends Error {
   statusCode?: number;
}

export function errorHandler(
   error: CustomError,
   _req: Request,
   res: Response,
   _next: NextFunction,
) {
   const isDev = process.env.NODE_ENV === "development";
   const statusCode = error.statusCode || 500;

   // em produção: mensagem generica para erros 500
   const message =
      !isDev && statusCode === 500
         ? "Erro interno do servidor"
         : error.message || "Erro desconhecido, tente novamente";
   //Stack tracer apenas em dev — nunca em produção
   if (isDev) {
      console.error(`[${new Date().toISOString()}] Error:`, error);
   } else {
      console.error(`[${new Date().toISOString()}] Error ${statusCode}: ${error.message}`);
   }

   res.status(statusCode).json({
      error: message,
      statusCode,
      timestamp: new Date().toISOString(),
      //stack apenas em dev — nunca em produção
      ...(isDev && { stack: error.stack }),
   });
}
