import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { SupportMessage } from "./SupportMessage";

export enum TicketStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  RESOLVED = "resolved",
  CLOSED = "closed",
}

export enum TicketPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

@Entity({ name: "support_tickets" })
export class SupportTicket {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({ name: "user_id", type: "bigint", unsigned: true })
  userId: string;

  @Column({
    name: "assigned_admin_id",
    type: "bigint",
    unsigned: true,
    nullable: true,
  })
  assignedAdminId: string | null;

  @Column({ type: "varchar", length: 200 })
  subject: string;

  @Column({ type: "text" })
  description: string;

  @Column({
    type: "enum",
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @Column({
    type: "enum",
    enum: TicketPriority,
    default: TicketPriority.MEDIUM,
  })
  priority: TicketPriority;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.supportTickets)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => User, (admin) => admin.assignedTickets)
  @JoinColumn({ name: "assigned_admin_id" })
  assignedAdmin: User | null;

  @OneToMany(() => SupportMessage, (message) => message.ticket)
  messages: SupportMessage[];
}
