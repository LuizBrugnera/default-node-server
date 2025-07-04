import { roleMiddleware } from "./roleMiddleware";

export { authMiddleware } from "./authMiddleware";
export { roleMiddleware } from "./roleMiddleware";
export { loggingMiddleware } from "./loggingMiddleware";

// Funções auxiliares para roles específicas
export const adminOnly = roleMiddleware(["admin"]);
export const studentOnly = roleMiddleware(["student"]);
export const adminAndBasic = roleMiddleware(["admin", "basic"]);
