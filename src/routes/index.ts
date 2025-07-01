import { Router } from "express";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";
import FileRoutes from "./FileRoutes";
import PhotoRoutes from "./PhotoRoutes";
import VideoRoutes from "./VideoRoutes";

const router = Router();

router.get("/health-check", (_req, res) => {
  res.sendStatus(200);
  return;
});

router.use("/users", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/files", FileRoutes);
router.use("/photos", PhotoRoutes);
router.use("/videos", VideoRoutes);

export default router;
