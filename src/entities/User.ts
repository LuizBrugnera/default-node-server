import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { Role } from "./Role";
import { File } from "./File";
import { SupportTicket } from "./SupportTicket";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: string;

  @Column({ name: "role_id", type: "tinyint", unsigned: true })
  roleId: number;

  @Column({ name: "full_name", type: "varchar", length: 120 })
  fullName: string;

  @Column({ type: "varchar", length: 120, unique: true })
  email: string;

  @Column({ name: "cpf_or_cnpj", type: "varchar", length: 18 })
  cpfOrCnpj: string;

  @Column({ name: "password_hash", type: "char", length: 60 })
  passwordHash: string;

  @Column({ name: "phone_number", type: "varchar", length: 20 })
  phoneNumber: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @OneToMany(() => File, (file) => file.user)
  files: File[];

  @OneToMany(() => SupportTicket, (ticket) => ticket.user)
  supportTickets: SupportTicket[];

  @OneToMany(() => SupportTicket, (ticket) => ticket.assignedAdmin)
  assignedTickets: SupportTicket[];
}
