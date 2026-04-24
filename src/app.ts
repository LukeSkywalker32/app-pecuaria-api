import cors from "cors";
import express from "express";
import { CORS_ORIGIN } from "./config/env";
import authRoutes from "./modules/auth/routes/authRoutes";
import { errorHandler } from "./shared/middleware/errorHandler";

const app = express();

// Middlewares globais
app.use(
	cors({
		origin: CORS_ORIGIN?.split(","),
		credentials: true,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() });
});

//Routes
app.use("/api/auth", authRoutes);

//Error Handler (deve ser o ultimo middleware)
app.use(errorHandler);

export default app;
