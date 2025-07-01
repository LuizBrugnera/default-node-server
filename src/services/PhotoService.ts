import { Repository } from "typeorm";
import fs from "fs/promises";
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

  async delete(id: string) {
    const photo = await this.repo.findOne({ where: { id } });
    if (!photo) return null;
    await fs.unlink(photo.path).catch(() => {});
    return this.repo.remove(photo);
  }
}

export default PhotoService;
