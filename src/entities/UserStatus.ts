import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

export enum OnlineStatus {
  ONLINE = "online",
  OFFLINE = "offline",
  AWAY = "away"
}

@Entity({ name: "user_status" })
export class UserStatus {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({ name: "user_id", type: "bigint", unsigned: true, unique: true })
  userId: string;

  @Column({
    type: "enum",
    enum: OnlineStatus,
    default: OnlineStatus.OFFLINE
  })
  status: OnlineStatus;

  @Column({ name: "last_seen", type: "timestamp", nullable: true })
  lastSeen: Date | null;

  @Column({ name: "socket_id", type: "varchar", length: 100, nullable: true })
  socketId: string | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}