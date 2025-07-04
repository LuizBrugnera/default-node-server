import { Request, Response, NextFunction } from "express";
import { BackupService } from "../services/BackupService";

export class BackupController {
  private service = new BackupService();

  createBackup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filepath = await this.service.createDatabaseBackup();
      res.json({ 
        message: "Backup created successfully",
        filepath: filepath.split("\\").pop()
      });
    } catch (err) {
      next(err);
    }
  };

  exportUserData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id.toString();
      const data = await this.service.exportUserData(userId);
      res.json(data);
    } catch (err) {
      next(err);
    }
  };

  exportAllData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filepath = await this.service.exportAllData();
      res.json({ 
        message: "Data export created successfully",
        filepath: filepath.split("\\").pop()
      });
    } catch (err) {
      next(err);
    }
  };
}