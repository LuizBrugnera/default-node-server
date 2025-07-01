import { Request, Response, NextFunction } from "express";
import FileService from "../services/FileService";

export class FileController {
  private service = new FileService();

  upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file || !req.user) {
        res.status(400).json({ message: "File not provided" });
        return;
      }
      const created = await this.service.create({
        userId: String(req.user.id),
        filename: req.uuidFile!,
        originalName: req.originalFilename!,
        path: req.file.path,
      });
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  };

  download = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = await this.service.findById(req.params.id);
      if (!file) {
        res.status(404).json({ message: "File not found" });
        return;
      }
      res.download(file.path, file.originalName);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await this.service.delete(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: "File not found" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

export default FileController;
