import { Router } from "express";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";

const router = Router();

router.get("/health-check", (_req, res) => {
  res.sendStatus(200);
  return;
});

router.use("/users", UserRoutes);
router.use("/auth", AuthRoutes);

export default router;
