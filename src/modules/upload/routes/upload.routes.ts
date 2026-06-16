// ========================================
// UPLOAD ROUTES
// POST /api/upload/image
// ========================================

import { Router } from "express";
import multer from "multer";
import uploadController from "@/modules/upload/controller/upload.controller";
import { protectRoute } from "@/shared/middlewares/authMiddleware";

const uploadRoutes = Router();
// Multer em memória — o buffer é passado diretamente para o Cloudinary
// sem gravar nada em disco. Limite de 5MB por arquivo.
const upload = multer({
   storage: multer.memoryStorage(),
   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Toda rota de upload exige autenticação
uploadRoutes.use(protectRoute);

/**
 * POST /api/upload/image
 * Faz upload de uma imagem para o Cloudinary.
 *
 * Form-data:
 *   file: <arquivo de imagem>  (campo obrigatório)
 *
 * Query params:
 *   folder: string  (opcional, default: "app-pecuaria")
 *     Ex: ?folder=vaccinations  → salva em /vaccinations/ no Cloudinary
 *         ?folder=mortalities   → salva em /mortalities/
 *
 * Retorna:
 *   { url: string, publicId: string }
 */
uploadRoutes.post(
   "/image",
   upload.single("file"),
   uploadController.uploadImage.bind(uploadController),
);

export default uploadRoutes;
