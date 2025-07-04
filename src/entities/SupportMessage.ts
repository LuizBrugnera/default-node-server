import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { SupportTicket } from "./SupportTicket";

@Entity({ name: "support_messages" })
export class SupportMessage {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({ name: "ticket_id", type: "bigint", unsigned: true })
  ticketId: string;

  @Column({ name: "sender_id", type: "bigint", unsigned: true })
  senderId: string;

  @Column({ type: "text" })
  message: string;

  @Column({ name: "is_admin_message", type: "boolean", default: false })
  isAdminMessage: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => SupportTicket, (ticket) => ticket.messages)
  @JoinColumn({ name: "ticket_id" })
  ticket: SupportTicket;

  @ManyToOne(() => User)
  @JoinColumn({ name: "sender_id" })
  sender: User;
}
