import { Router } from "express";
import { BackupController } from "../controllers/BackupController";
import { authMiddleware, adminOnly } from "../middlewares";

const router = Router();
const controller = new BackupController();

router.post("/database", authMiddleware, adminOnly, controller.createBackup);
router.get("/user-data", authMiddleware, controller.exportUserData);
router.post("/export-all", authMiddleware, adminOnly, controller.exportAllData);

export default router;