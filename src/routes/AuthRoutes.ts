import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const controller = new AuthController();

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/generate-code", controller.generateCode);
router.post("/verify-code", controller.verifyCode);
router.post("/reset-password", controller.resetPassword);
router.post(
  "/update-password",
  authMiddleware,
  controller.updatePasswordWithPassword
);
router.post(
  "/update-email",
  authMiddleware,
  controller.updateEmailWithPassword
);

export default router;
