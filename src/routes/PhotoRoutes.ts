import { Router } from "express";
import PhotoController from "../controllers/PhotoController";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";

const router = Router();
const controller = new PhotoController();

router.post("/upload", uploadMiddleware.single("photo"), controller.upload);
router.get("/:id", controller.getOne);

export default router;
