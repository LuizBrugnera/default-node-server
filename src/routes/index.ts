import { Router } from "express";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";
import FileRoutes from "./FileRoutes";
import PhotoRoutes from "./PhotoRoutes";
import VideoRoutes from "./VideoRoutes";
import SupportRoutes from "./SupportRoutes";
import SupportMessageRoutes from "./SupportMessageRoutes";
import NotificationRoutes from "./NotificationRoutes";
import BackupRoutes from "./BackupRoutes";
import StatusRoutes from "./StatusRoutes";

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
router.use("/support", SupportRoutes);
router.use("/support", SupportMessageRoutes);
router.use("/notifications", NotificationRoutes);
router.use("/backup", BackupRoutes);
router.use("/status", StatusRoutes);

export default router;
