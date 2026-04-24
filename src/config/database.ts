import mongoose from "mongoose";
import { DATABASE_URL } from "./env";

export async function connectDataBase() {
	try {
		await mongoose.connect(DATABASE_URL);
		console.log("🚀 Conectado ao MongoDB");
	} catch (error) {
		console.error("Erro ao conectar ao MongoDB", error);
		throw error;
	}
}

export function disconnectDataBase() {
	return mongoose.disconnect();
}
