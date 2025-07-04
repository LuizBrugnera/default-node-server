import { Router } from "express";
import { SupportController } from "../controllers/SupportController";
import { authMiddleware, adminOnly, adminAndBasic } from "../middlewares";

const router = Router();
const controller = new SupportController();

// Rotas para usuários (criar ticket e ver seus próprios tickets)
router.post("/tickets", authMiddleware, adminAndBasic, controller.createTicket);
router.get(
  "/my-tickets",
  authMiddleware,
  adminAndBasic,
  controller.getMyTickets
);

// Rotas para admins (ver todos os tickets, editar e excluir)
router.get("/tickets", authMiddleware, adminOnly, controller.getAllTickets);
router.put("/tickets/:id", authMiddleware, adminOnly, controller.updateTicket);
router.delete(
  "/tickets/:id",
  authMiddleware,
  adminOnly,
  controller.deleteTicket
);

// Rota compartilhada (ver ticket específico)
router.get("/tickets/:id", authMiddleware, adminAndBasic, controller.getTicket);

export default router;
