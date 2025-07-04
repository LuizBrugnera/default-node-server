import { Router } from "express";
import { NotificationController } from "../controllers/NotificationController";
import { authMiddleware } from "../middlewares";

const router = Router();
const controller = new NotificationController();

router.get("/", authMiddleware, controller.getNotifications);
router.get("/unread-count", authMiddleware, controller.getUnreadCount);
router.put("/:id/read", authMiddleware, controller.markAsRead);
router.put("/mark-all-read", authMiddleware, controller.markAllAsRead);
router.delete("/:id", authMiddleware, controller.deleteNotification);

export default router;