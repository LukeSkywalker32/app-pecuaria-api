export function errorHandler(error, _req, res, _next) {
    const env = process.env.NODE_ENV;
    const isDev = env === "development" || env === "node" || !!process.env.VITEST;
    const statusCode = error.statusCode || 500;
    // em produção: mensagem generica para erros 500
    const message = !isDev && statusCode === 500
        ? "Erro interno do servidor"
        : error.message || "Erro desconhecido, tente novamente";
    //Stack tracer apenas em dev — nunca em produção
    if (isDev) {
        console.error(`[${new Date().toISOString()}] Error:`, error);
    }
    else {
        console.error(`[${new Date().toISOString()}] Error ${statusCode}: ${error.message}`);
    }
    res.status(statusCode).json({
        error: message,
        statusCode,
        timestamp: new Date().toISOString(),
        //stack apenas em dev — nunca em produção
        ...(isDev && { stack: error.stack }),
    });
}
//# sourceMappingURL=errorHandler.js.map