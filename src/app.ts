import cors from "cors";
import express from "express";
import { prisma } from "./config/database";
import { CORS_ORIGIN } from "./config/env";
import animalRoutes from "./modules/animals/routes/animal.routes";
import authRoutes from "./modules/auth/routes/auth.routes";
import farmRoutes from "./modules/farm/routes/farm.routes";
import managementRoutes from "./modules/management/routes/management.routes";
import pastureRoutes from "./modules/pasture/routes/pasture.routes";
import pregnancyRoutes from "./modules/pregnancy/routes/pregnancy.routes";
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
app.get("/health", async (req, res) => {
   try {
      await prisma.$queryRaw`SELECT 1`;
      res.json({
         status: "ok",
         timestamp: new Date().toISOString(),
         database: "Connectado",
      });
   } catch (error) {
      res.status(503).json({
         status: "error",
         database: "Disconectado",
      });
   }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/pastures", pastureRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/pregnancies", pregnancyRoutes);

// Error Handler (must be the last middleware)
app.use(errorHandler);

export default app;
