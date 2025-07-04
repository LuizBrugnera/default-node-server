import { Router } from "express";
import { StatusController } from "../controllers/StatusController";
import { authMiddleware } from "../middlewares";

const router = Router();
const controller = new StatusController();

router.get("/user/:userId", authMiddleware, controller.getUserStatus);
router.get("/online", authMiddleware, controller.getOnlineUsers);
router.put("/update", authMiddleware, controller.updateStatus);

export default router;