// Rate limiter simples sem dependências externas
// Usa Map em memória — suficiente para single-instance
// Para multi-instance (cluster/k8s), usar Redis
const store = new Map();
// Limpa entradas expiradas periodicamente — evita memory leak
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
        if (entry.resetAt < now)
            store.delete(key);
    }
}, 60 * 1000);
export function rateLimiter(options) {
    const { windowMs, maxRequests, message = "Muitas requisições. Tente novamente mais tarde.", } = options;
    return (req, res, next) => {
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
//# sourceMappingURL=rateLimiter.js.map