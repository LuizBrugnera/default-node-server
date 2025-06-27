import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "roles" })
@Unique(["name"])
export class Role {
  @PrimaryGeneratedColumn({ type: "tinyint", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 30 })
  name: string; // 'admin' | 'student'

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
