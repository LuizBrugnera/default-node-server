import { roleMiddleware } from "./roleMiddleware";

export { authMiddleware } from "./authMiddleware";

// Funções auxiliares para roles específicas
export const adminOnly = roleMiddleware(["admin"]);
export const basicOnly = roleMiddleware(["basic"]);
export const adminAndBasic = roleMiddleware(["admin", "basic"]);
