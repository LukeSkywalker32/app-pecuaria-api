// Rate limiter simples sem dependências externas
// Usa Map em memória — suficiente para single-instance
// Para multi-instance (cluster/k8s), usar Redis

interface RateLimitEntry {
   count: number;
   resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Limpa entradas expiradas periodicamente — evita memory leak
setInterval(() => {
   const now = Date.now();
   for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) store.delete(key);
   }
}, 60 * 1000);

interface RateLimitOptions {
   // Janela de tempo em milissegundos
   windowMs: number;
   // Máximo de requisições por janela
   maxRequests: number;
   // Mensagem de erro
   message?: string;
}

export function rateLimiter(options: RateLimitOptions) {
   const {
      windowMs,
      maxRequests,
      message = "Muitas requisições. Tente novamente mais tarde.",
   } = options;

   return (req: any, res: any, next: any) => {
      // Chave única por IP + rota
      const key = `${req.ip}:${req.path}`;
      const now = Date.now();

      const entry = store.get(key);

      if (!entry || entry.resetAt < now) {
         // Primeira requisição ou janela expirada — reinicia contador
         store.set(key, { count: 1, resetAt: now + windowMs });
         return next();
      }

      if (entry.count >= maxRequests) {
         // Limite atingido — informa quando pode tentar novamente
         const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
         res.setHeader("Retry-After", retryAfter);
         return res.status(429).json({
            error: message,
            statusCode: 429,
            retryAfterSeconds: retryAfter,
         });
      }

      // Incrementa contador
      entry.count++;
      return next();
   };
}

// Rate limiters pré-configurados para rotas de auth
export const authRateLimiter = rateLimiter({
   windowMs: 15 * 60 * 1000, // 15 minutos
   maxRequests: 10, // 10 tentativas por 15 min
   message: "Muitas tentativas de autenticação. Tente novamente em 15 minutos.",
});

export const forgotPasswordRateLimiter = rateLimiter({
   windowMs: 60 * 60 * 1000, // 1 hora
   maxRequests: 3, // 3 tentativas por hora
   message: "Muitas solicitações de reset. Tente novamente em 1 hora.",
});
