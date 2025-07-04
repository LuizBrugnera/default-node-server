import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AuditLog, AuditAction } from "../entities/AuditLog";
import { Request } from "express";

export class AuditService {
  private repo: Repository<AuditLog> = AppDataSource.getRepository(AuditLog);

  async log(data: {
    userId?: string;
    action: AuditAction;
    tableName: string;
    recordId?: string;
    oldValues?: any;
    newValues?: any;
    req?: Request;
  }) {
    const auditLog = this.repo.create({
      userId: data.userId || null,
      action: data.action,
      tableName: data.tableName,
      recordId: data.recordId || null,
      oldValues: data.oldValues || null,
      newValues: data.newValues || null,
      ipAddress: data.req?.ip || null,
      userAgent: data.req?.get('User-Agent') || null
    });

    return this.repo.save(auditLog);
  }

  async findByUser(userId: string) {
    return this.repo.find({
      where: { userId },
      order: { createdAt: "DESC" },
      take: 100
    });
  }

  async findByTable(tableName: string) {
    return this.repo.find({
      where: { tableName },
      relations: ["user"],
      order: { createdAt: "DESC" },
      take: 100
    });
  }
}