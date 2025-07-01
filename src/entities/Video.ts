import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "videos" })
export class Video {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({ type: "varchar", length: 255 })
  filename: string;

  @Column({ name: "original_name", type: "varchar", length: 255 })
  originalName: string;

  @Column({ name: "mime_type", type: "varchar", length: 100 })
  mimeType: string;

  @Column({ type: "varchar", length: 255 })
  path: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}

export default Video;
