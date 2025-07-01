import { Request, Response, NextFunction } from "express";
import VideoService from "../services/VideoService";
import { resolve } from "path";

export class VideoController {
  private service = new VideoService();

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
      const video = await this.service.findById(req.params.id);
      if (!video) {
        res.status(404).json({ message: "Video not found" });
        return;
      }
      res.sendFile(resolve(video.path));
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await this.service.delete(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: "Video not found" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

export default VideoController;
