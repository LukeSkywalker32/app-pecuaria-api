// ========================================
// UPLOAD SERVICE
// Responsabilidade única: subir um arquivo para o Cloudinary e retornar a URL.
// Reutilizado por Farm (logo), Vaccination (photo) e Mortality (photos).
// ========================================

/**
 * Gera assinatura HMAC-SHA1 dos parâmetros para upload autenticado.
 * Usa a Web Crypto API nativa do Node 18+ — sem dependências extras.
 */

async function signParams(params: string, secret: string): Promise<string> {
   const encoder = new TextEncoder();
   const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-1" },
      false,
      ["sign"],
   );
   const buffer = await crypto.subtle.sign("HMAC", key, encoder.encode(params));
   return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
}

export interface UploadResult {
   url: string; // URL pública dp Cloudinary (secure_url)
   publicId: string; // public_id para referencia futura (ex: deletar arquivo)
}
/**
 * Faz upload de um buffer de imagem para o Cloudinary.
 *
 * @param fileBuffer  Buffer do arquivo recebido via multer
 * @param mimeType    Ex: "image/jpeg", "image/png", "image/webp"
 * @param folder      Pasta no Cloudinary onde o arquivo será salvo (ex: "vaccinations")
 * @param publicId    ID público opcional — se omitido, o Cloudinary gera um UUID
 */

export async function uploadToCloudinary(
   fileBuffer: Buffer,
   mimeType: string,
   folder: string,
   publicId?: string,
): Promise<UploadResult> {
   const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
   const apiKey = process.env.CLOUDINARY_API_KEY;
   const apiSecret = process.env.CLOUDINARY_API_SECRET;

   //Valida configurações antes de tentar o upload
   if (!cloudName || !apiKey || !apiSecret) {
      throw Object.assign(
         new Error(
            "Cloudinary não configurado. Defina CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET",
         ),
         { statusCode: 500 },
      );
   }
   const timestamp = Math.floor(Date.now() / 1000).toString();

   // Monta os parametros que vao ser assinados (em ordem alfabética - requisito do Cloudinary)
   const paramsToSign = [
      `folder=${folder}`,
      ...(publicId ? [`public_id=${publicId}`] : []),
      `timestamp=${timestamp}`,
   ].join("&");

   const signature = await signParams(paramsToSign, apiSecret);
   // Converte buffer para base64 data URI(padrao aceito pelo Cloudinary)
   const dataUri = `data:${mimeType};base64,${fileBuffer.toString("base64")}`;

   const formData = new FormData();
   formData.append("file", dataUri);
   formData.append("folder", folder);
   formData.append("timestamp", timestamp);
   formData.append("signature", signature);
   formData.append("api_key", apiKey);
   if (publicId) formData.append("public_id", publicId);

   const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
   });

   if (!response.ok) {
      const err = (await response.json()) as { error?: { message?: string } };
      throw Object.assign(
         new Error(`Cloudinary upload falhou: ${err.error?.message ?? response.statusText}`),
         { statusCode: 502 },
      );
   }

   const result = (await response.json()) as { secure_url: string; public_id: string };
   return { url: result.secure_url, publicId: result.public_id };
}
