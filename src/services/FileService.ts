import { Repository } from "typeorm";
import fs from "fs/promises";
import { AppDataSource } from "../data-source";
import { File } from "../entities/File";

export class FileService {
  private repo: Repository<File> = AppDataSource.getRepository(File);

  create(data: Partial<File>) {
    const instance = this.repo.create(data);
    return this.repo.save(instance);
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async delete(id: string) {
    const file = await this.repo.findOne({ where: { id } });
    if (!file) return null;
    await fs.unlink(file.path).catch(() => {});
    return this.repo.remove(file);
  }
}

export default FileService;
