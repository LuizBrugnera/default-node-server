import { Router } from "express";
import { SupportMessageController } from "../controllers/SupportMessageController";
import { authMiddleware, adminAndBasic } from "../middlewares";

const router = Router();
const controller = new SupportMessageController();

// Buscar mensagens de um ticket
router.get(
  "/tickets/:ticketId/messages",
  authMiddleware,
  adminAndBasic,
  controller.getMessages
);

// Criar nova mensagem
router.post(
  "/tickets/:ticketId/messages",
  authMiddleware,
  adminAndBasic,
  controller.createMessage
);

// Editar mensagem (apenas o próprio autor)
router.put(
  "/messages/:id",
  authMiddleware,
  adminAndBasic,
  controller.updateMessage
);

// Excluir mensagem (autor ou admin)
router.delete(
  "/messages/:id",
  authMiddleware,
  adminAndBasic,
  controller.deleteMessage
);

export default router;
