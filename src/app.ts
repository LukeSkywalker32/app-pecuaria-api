import cors from "cors";
import express from "express";
import { CORS_ORIGIN } from "./config/env";
import authRoutes from "./modules/auth/routes/auth.routes";
import farmRoutes from "./modules/farm/routes/farm.routes";
import userRoutes from "./modules/user/routes/user.routes";
import { errorHandler } from "./shared/middlewares/errorHandler";

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
app.use("/api/users", userRoutes);
app.use("/api/farms", farmRoutes);

// Error Handler (must be the last middleware)
app.use(errorHandler);

export default app;
