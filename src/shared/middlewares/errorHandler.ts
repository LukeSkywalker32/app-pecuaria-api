import type { NextFunction, Request, Response } from "express";

export interface CustomError extends Error {
	statusCode?: number;
}

export function errorHandler(
	error: CustomError,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const statusCode = error.statusCode || 500;
	const message = error.message || "Erro interno do servidor";

	console.error(`[${new Date().toISOString()}] Error:`, error);

	res.status(statusCode).json({
		erro: message,
		statusCode,
		timestamp: new Date().toISOString(),
	});
}
