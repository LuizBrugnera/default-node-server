import { Router } from "express";
import FileController from "../controllers/FileController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { uploadMiddleware } from "../middlewares/fileUploadMiddleware";

const router = Router();
const controller = new FileController();

router.post(
  "/upload",
  authMiddleware,
  uploadMiddleware.single("file"),
  controller.upload
);
router.get("/:id/download", authMiddleware, controller.download);
router.delete("/:id", authMiddleware, controller.delete);

export default router;
