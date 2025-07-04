import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuditService } from "./AuditService";
import { NotificationService } from "./NotificationService";
import { AuditAction } from "../entities/AuditLog";
import { NotificationType } from "../entities/Notification";
import { Request } from "express";

dotenv.config();

export class AuthService {
  private auditService = new AuditService();
  private notificationService = new NotificationService();

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async generateToken(payload: any): Promise<string> {
    return jwt.sign(payload, process.env.SECRET_KEY as string, {
      expiresIn: "1y",
    });
  }

  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  generateEmailToken(email: string, code: string): string {
    return bcrypt.hashSync(email + code, 10);
  }

  async logLogin(userId: string, req?: Request) {
    await this.auditService.log({
      userId,
      action: AuditAction.LOGIN,
      tableName: "users",
      recordId: userId,
      req
    });

    await this.notificationService.create({
      userId,
      title: "Login Successful",
      message: "You have successfully logged into your account",
      type: NotificationType.SUCCESS
    });
  }

  async logRegistration(userId: string, req?: Request) {
    await this.auditService.log({
      userId,
      action: AuditAction.CREATE,
      tableName: "users",
      recordId: userId,
      req
    });

    await this.notificationService.create({
      userId,
      title: "Welcome!",
      message: "Your account has been created successfully",
      type: NotificationType.SUCCESS
    });
  }
}
