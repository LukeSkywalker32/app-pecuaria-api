import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "";
export const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";
export const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || "10d";
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

// Validações
if (!JWT_SECRET) {
	throw new Error("JWT_SECRET não configurado");
}

if (!DATABASE_URL) {
	throw new Error("DATABASE_URL não configurado");
}
