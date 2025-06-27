import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Photo } from "../entities/Photo";

export class PhotoService {
  private repo: Repository<Photo> = AppDataSource.getRepository(Photo);

  findById(id: any) {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: Partial<Photo>) {
    const instance = this.repo.create(data);
    return this.repo.save(instance);
  }
}

export default PhotoService;
