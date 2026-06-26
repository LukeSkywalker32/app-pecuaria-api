// ========================================
// UPLOAD ROUTES
// POST /api/upload/image
// ========================================

import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import multer from "multer";
import uploadController from "@/modules/upload/controller/upload.controller";
import { protectRoute } from "@/shared/middlewares/authMiddleware";

const uploadRoutes = Router();
// Multer em memória — o buffer é passado diretamente para o Cloudinary
// sem gravar nada em disco. Limite de 5MB por arquivo.
const MAX_SIZE_MB = 5;
const upload = multer({
   storage: multer.memoryStorage(),
   limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 }, // 5MB
});

// O multer.MulterError não tem `statusCode`, então sem este wrapper
// qualquer erro dele (ex: arquivo maior que o limite) caía no fallback
// genérico de 500 do errorHandler em vez de retornar 400 com mensagem clara.

function handleUpload(req: Request, res: Response, next: NextFunction) {
   upload.single("file")(req, res, (err: unknown) => {
      if (err instanceof multer.MulterError) {
         if (err.code === "LIMIT_FILE_SIZE") {
            return next(
               Object.assign(new Error(`Arquivo muito grande. Tamanho máximo: ${MAX_SIZE_MB}`), {
                  statusCode: 400,
               }),
            );
         }
         return next(
            Object.assign(new Error(`Erro no upload: ${err.message}`), { statusCode: 400 }),
         );
      }
      if (err) return next(err);
      next();
   });
}

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
uploadRoutes.post("/image", handleUpload, uploadController.uploadImage.bind(uploadController));

export default uploadRoutes;
