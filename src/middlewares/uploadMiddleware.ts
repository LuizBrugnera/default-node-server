import multer from "multer";
import { resolve } from "path";
import { randomUUID } from "crypto";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, resolve("images"));
  },
  filename: (_req, file, cb) => {
    const unique = `${randomUUID()}-${file.originalname}`;
    cb(null, unique);
  },
});

export const uploadMiddleware = multer({ storage });
