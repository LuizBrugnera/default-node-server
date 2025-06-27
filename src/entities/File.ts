import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "files" })
export class File {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({ name: "user_id", type: "bigint", unsigned: true })
  userId: string;

  @Column({ type: "varchar", length: 255 })
  filename: string;

  @Column({ name: "original_name", type: "varchar", length: 255 })
  originalName: string;

  @Column({ type: "varchar", length: 255 })
  path: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.files)
  @JoinColumn({ name: "user_id" })
  user: User;
}
