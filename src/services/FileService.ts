import { Repository } from "typeorm";
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
}

export default FileService;
