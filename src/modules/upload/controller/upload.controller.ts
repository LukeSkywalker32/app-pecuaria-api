// ========================================
// UPLOAD CONTROLLER
// POST /api/upload/image
// Aceita: multipart/form-data com campo "file"
// Query param opcional: ?folder=vaccinations (default: "app-pecuaria")
// Retorna: { url, publicId }
// ========================================

import type { NextFunction, Request, Response } from "express";
import { uploadToCloudinary } from "@/modules/upload/services/upload.service";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"] as const;
const MAX_SIZE_MB = 5;

class UploadController {
   async uploadImage(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         //multer já processou o arquivo e colocou em req.file
         if (!req.file) {
            res.status(400).json({ error: "Nenhum arquivo enviado. Use o campo 'file'." });
            return;
         }
         const { buffer, mimetype, size } = req.file;

         //Valida tipoe MIME
         if (!ALLOWED_MIME_TYPES.includes(mimetype as any)) {
            res.status(400).json({
               error: `Tipo de arquivo invalido: ${mimetype}. Use um dos tipos: ${ALLOWED_MIME_TYPES.join(", ")}.`,
            });
            return;
         }

         // Valida tamanho (multer já limita, mas validamos aqui como defesa)
         if (size > MAX_SIZE_MB * 1024 * 1024) {
            res.status(400).json({ error: `Tamanho máximo permitido: ${MAX_SIZE_MB} MB.` });
            return;
         }
         // Pasta de destino no Cloudinary - parametrizavel via query string
         // Ex: /api/upload/image?folder=vaccinations
         const folder = (req.query.folder as string) || "app-pecuaria";
         const result = await uploadToCloudinary(buffer, mimetype, folder);

         res.status(200).json({
            url: result.url,
            publicId: result.publicId,
         });
      } catch (error) {
         next(error);
      }
   }
}
export default new UploadController();
