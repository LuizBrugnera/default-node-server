import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Role } from "../entities/Role";

export class RoleService {
  private repo: Repository<Role> = AppDataSource.getRepository(Role);

  findAll() {
    return this.repo.find();
  }

  findById(id: any) {
    return this.repo.findOne({ where: { id } });
  }

  findByName(name: string) {
    return this.repo.findOne({ where: { name } });
  }

  async create(data: Partial<Role>) {
    const instance = this.repo.create(data);
    return this.repo.save(instance);
  }

  update(id: any, data: Partial<Role>) {
    return this.repo.update(id, data);
  }

  remove(id: any) {
    return this.repo.delete(id);
  }
}
