import { Request, Response, NextFunction } from "express";
import PhotoService from "../services/PhotoService";
import { resolve } from "path";

export class PhotoController {
  private service = new PhotoService();

  upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const created = await this.service.create({
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        path: file.path,
      });

      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const photo = await this.service.findById(req.params.id);
      if (!photo) {
        res.status(404).json({ message: "Photo not found" });
        return;
      }
      res.sendFile(resolve(photo.path));
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await this.service.delete(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: "Photo not found" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

export default PhotoController;
