import { Router } from "express";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";
import FileRoutes from "./FileRoutes";

const router = Router();

router.get("/health-check", (_req, res) => {
  res.sendStatus(200);
  return;
});

router.use("/users", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/files", FileRoutes);

export default router;
