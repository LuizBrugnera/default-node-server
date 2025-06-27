import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import UserSeeder from "./02-user.seeder";
import RoleSeeder from "./01-role.seeder";

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, RoleSeeder);
    await runSeeder(dataSource, UserSeeder);
  }
}
