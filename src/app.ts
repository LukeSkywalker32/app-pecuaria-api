import cors from "cors";
import express from "express";
import { CORS_ORIGIN } from "./config/env";
import { errorHandler } from "./shared/middlewares/errorHandler";
import authRoutes from "./modules/auth/routes/auth.routes";

const app = express();

// Global Middlewares
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

// Routes
app.use("/api/auth", authRoutes);

// Error Handler (must be the last middleware)
app.use(errorHandler);

export default app;
