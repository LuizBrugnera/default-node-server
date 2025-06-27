import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "./routes";
import { resolve } from "path";

const app = express();

// ─── Middlewares ────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use("/images", express.static(resolve("images")));

// ─── Rotas principais ──────────────────────────────────────────────────
app.use("/api/v1", routes);

// error-handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
