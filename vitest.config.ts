import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
   test: {
      globals: true, // describe/it/expect disponíveis sem import
      environment: "node", // ambiente Node.js (não browser)

      // Executado ANTES de cada arquivo de teste
      setupFiles: ["src/__tests__/setup.ts"],

      // Variáveis de ambiente para os testes
      // Necessário porque env.ts valida JWT_SECRET e DATABASE_URL na inicialização
      env: {
         NODE_ENV: "test",
         DATABASE_URL: "postgresql://test:test@localhost/test_db",
         DIRECT_URL: "postgresql://test:test@localhost/test_db",
         JWT_SECRET: "test-jwt-secret-supersecure-for-unit-tests-only",
         JWT_REFRESH_SECRET: "test-jwt-refresh-secret-supersecure",
         JWT_EXPIRE: "7d",
         JWT_REFRESH_EXPIRE: "10d",
         CORS_ORIGIN: "http://localhost:5173",
      },

      coverage: {
         provider: "v8", // motor de cobertura do Node.js
         reporter: ["text", "html", "lcov"], // relatório no terminal + pasta coverage/
         include: ["src/modules/**/*.ts", "src/shared/**/*.ts"],
         exclude: ["src/**/*.types.ts", "src/__tests__/**"],
         // Falha o CI se a cobertura cair abaixo de 80%
         thresholds: {
            lines: 80,
            functions: 80,
            branches: 75, // branches são mais difíceis de cobrir 100%
            statements: 80,
         },
      },
   },
   resolve: {
      // Mesmo alias do tsconfig.json — @/ aponta para src/
      alias: {
         "@": path.resolve(__dirname, "src"),
      },
   },
});
