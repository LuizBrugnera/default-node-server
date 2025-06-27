import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Role } from "../entities/Role";

export default class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Role);
    const count = await repo.count();
    if (!count) {
      await repo.insert([
        { id: 1, name: "admin" },
        { id: 2, name: "student" },
      ]);
    }
  }
}
