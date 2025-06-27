import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export class UserService {
  private repo: Repository<User> = AppDataSource.getRepository(User);

  findAll() {
    return this.repo.find();
  }

  findById(id: any) {
    return this.repo.findOne({ where: { id } });
  }

  findUserByEmail(email: string) {
    return this.repo.findOne({
      where: { email },
      relations: ["role", "enrollments"],
    });
  }

  async create(data: Partial<User>) {
    const instance = this.repo.create(data);
    return this.repo.save(instance);
  }

  update(id: any, data: Partial<User>) {
    return this.repo.update(id, data);
  }

  async updatePasswordByEmail(
    email: string,
    passwordHash: string
  ): Promise<void> {
    const user = await this.repo.findOneBy({ email: email });
    if (!user) {
      return;
    }
    this.repo.update(user.id, { passwordHash });

    await this.repo.save(user);
  }

  remove(id: any) {
    return this.repo.delete(id);
  }
}
