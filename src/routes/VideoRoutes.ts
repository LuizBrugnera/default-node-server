import { Router } from "express";
import VideoController from "../controllers/VideoController";
import { videoUploadMiddleware } from "../middlewares/videoUploadMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const controller = new VideoController();

router.post(
  "/upload",
  videoUploadMiddleware.single("video"),
  controller.upload
);
router.get("/:id", controller.getOne);
router.delete("/:id", authMiddleware, controller.delete);

export default router;
