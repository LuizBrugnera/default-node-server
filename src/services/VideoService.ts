import { Repository } from "typeorm";
import fs from "fs/promises";
import { AppDataSource } from "../data-source";
import Video from "../entities/Video";

export class VideoService {
  private repo: Repository<Video> = AppDataSource.getRepository(Video);

  findById(id: any) {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: Partial<Video>) {
    const instance = this.repo.create(data);
    return this.repo.save(instance);
  }

  async delete(id: string) {
    const video = await this.repo.findOne({ where: { id } });
    if (!video) return null;
    await fs.unlink(video.path).catch(() => {});
    return this.repo.remove(video);
  }
}

export default VideoService;
