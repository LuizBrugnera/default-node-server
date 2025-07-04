import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Notification, NotificationType } from "../entities/Notification";

export class NotificationService {
  private repo: Repository<Notification> = AppDataSource.getRepository(Notification);
  private static webSocketService: any;

  static setWebSocketService(wsService: any) {
    NotificationService.webSocketService = wsService;
  }

  async create(data: {
    userId: string;
    title: string;
    message: string;
    type?: NotificationType;
    actionUrl?: string;
  }) {
    const notification = this.repo.create(data);
    const saved = await this.repo.save(notification);
    
    // Send real-time notification
    if (NotificationService.webSocketService) {
      NotificationService.webSocketService.sendNotification(data.userId, saved);
    }
    
    return saved;
  }

  async findByUser(userId: string, unreadOnly = false) {
    const where: any = { userId };
    if (unreadOnly) where.isRead = false;

    return this.repo.find({
      where,
      order: { createdAt: "DESC" },
      take: 50
    });
  }

  async markAsRead(id: string, userId: string) {
    return this.repo.update({ id, userId }, { isRead: true });
  }

  async markAllAsRead(userId: string) {
    return this.repo.update({ userId, isRead: false }, { isRead: true });
  }

  async delete(id: string, userId: string) {
    return this.repo.delete({ id, userId });
  }

  async getUnreadCount(userId: string) {
    return this.repo.count({ where: { userId, isRead: false } });
  }
}