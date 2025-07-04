import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { SupportTicket, TicketStatus } from "../entities/SupportTicket";
import { SupportMessage } from "../entities/SupportMessage";

export class SupportService {
  private ticketRepo: Repository<SupportTicket> =
    AppDataSource.getRepository(SupportTicket);
  private messageRepo: Repository<SupportMessage> =
    AppDataSource.getRepository(SupportMessage);

  async createTicket(data: Partial<SupportTicket>) {
    const ticket = this.ticketRepo.create(data);
    return this.ticketRepo.save(ticket);
  }

  async findTicketsByUser(userId: string) {
    return this.ticketRepo.find({
      where: { userId },
      relations: ["messages", "assignedAdmin"],
      order: { createdAt: "DESC" },
    });
  }

  async findAllTickets() {
    return this.ticketRepo.find({
      relations: ["user", "assignedAdmin", "messages"],
      order: { createdAt: "DESC" },
    });
  }

  async findTicketById(id: string) {
    return this.ticketRepo.findOne({
      where: { id },
      relations: ["user", "assignedAdmin", "messages", "messages.sender"],
    });
  }

  async updateTicket(id: string, data: Partial<SupportTicket>) {
    return this.ticketRepo.update(id, data);
  }

  async deleteTicket(id: string) {
    return this.ticketRepo.delete(id);
  }

  async addMessage(data: Partial<SupportMessage>) {
    const message = this.messageRepo.create(data);
    return this.messageRepo.save(message);
  }
}
