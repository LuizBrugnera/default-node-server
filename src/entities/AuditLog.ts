import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

export enum AuditAction {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LOGIN = "login",
  LOGOUT = "logout"
}

@Entity({ name: "audit_logs" })
export class AuditLog {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({ name: "user_id", type: "bigint", unsigned: true, nullable: true })
  userId: string | null;

  @Column({
    type: "enum",
    enum: AuditAction
  })
  action: AuditAction;

  @Column({ name: "table_name", type: "varchar", length: 100 })
  tableName: string;

  @Column({ name: "record_id", type: "varchar", length: 100, nullable: true })
  recordId: string | null;

  @Column({ name: "old_values", type: "json", nullable: true })
  oldValues: any;

  @Column({ name: "new_values", type: "json", nullable: true })
  newValues: any;

  @Column({ name: "ip_address", type: "varchar", length: 45, nullable: true })
  ipAddress: string | null;

  @Column({ name: "user_agent", type: "text", nullable: true })
  userAgent: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User | null;
}