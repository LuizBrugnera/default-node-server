import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { UserStatus, OnlineStatus } from "../entities/UserStatus";

export class StatusController {
  private repo = AppDataSource.getRepository(UserStatus);

  getUserStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const status = await this.repo.findOne({
        where: { userId },
        relations: ["user"]
      });
      
      if (!status) {
        res.json({ status: OnlineStatus.OFFLINE, lastSeen: null });
        return;
      }
      
      res.json(status);
    } catch (err) {
      next(err);
    }
  };

  getOnlineUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const onlineUsers = await this.repo.find({
        where: { status: OnlineStatus.ONLINE },
        relations: ["user"],
        select: {
          userId: true,
          status: true,
          user: {
            id: true,
            fullName: true
          }
        }
      });
      
      res.json(onlineUsers);
    } catch (err) {
      next(err);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.body;
      const userId = req.user.id.toString();
      
      let userStatus = await this.repo.findOne({ where: { userId } });
      
      if (!userStatus) {
        userStatus = this.repo.create({
          userId,
          status,
          lastSeen: status === OnlineStatus.OFFLINE ? new Date() : null
        });
      } else {
        userStatus.status = status;
        userStatus.lastSeen = status === OnlineStatus.OFFLINE ? new Date() : null;
      }
      
      await this.repo.save(userStatus);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };
}