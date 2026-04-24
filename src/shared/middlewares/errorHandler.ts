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
   const statusCode = error.statusCode || 500;
   const message = error.message || "Internal server error";

   console.error(`[${new Date().toISOString()}] Error:`, error);

   res.status(statusCode).json({
      error: message,
      statusCode,
      timestamp: new Date().toISOString(),
   });
}
