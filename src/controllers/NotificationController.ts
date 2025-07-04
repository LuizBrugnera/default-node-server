import { Request, Response, NextFunction } from "express";
import { NotificationService } from "../services/NotificationService";

export class NotificationController {
  private service = new NotificationService();

  getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const unreadOnly = req.query.unread === 'true';
      const notifications = await this.service.findByUser(req.user.id.toString(), unreadOnly);
      res.json(notifications);
    } catch (err) {
      next(err);
    }
  };

  getUnreadCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const count = await this.service.getUnreadCount(req.user.id.toString());
      res.json({ count });
    } catch (err) {
      next(err);
    }
  };

  markAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.markAsRead(req.params.id, req.user.id.toString());
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };

  markAllAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.markAllAsRead(req.user.id.toString());
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };

  deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id, req.user.id.toString());
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };
}