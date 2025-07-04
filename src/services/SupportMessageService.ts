import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { SupportMessage } from "../entities/SupportMessage";

export class SupportMessageService {
  private repo: Repository<SupportMessage> =
    AppDataSource.getRepository(SupportMessage);

  async create(data: Partial<SupportMessage>) {
    const message = this.repo.create(data);
    return this.repo.save(message);
  }

  async findByTicketId(ticketId: string) {
    return this.repo.find({
      where: { ticketId },
      relations: ["sender"],
      order: { createdAt: "ASC" },
    });
  }

  async findById(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ["sender", "ticket"],
    });
  }

  async update(id: string, data: Partial<SupportMessage>) {
    return this.repo.update(id, data);
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }
}
