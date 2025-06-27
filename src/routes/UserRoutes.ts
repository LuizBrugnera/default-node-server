import { Router } from "express";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const controller = new UserController();

router.put("/update", authMiddleware, controller.update);
router.get("/me", authMiddleware, controller.getMe);

export default router;
