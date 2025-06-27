import { DataSource, DataSourceOptions } from "typeorm";
import { dirname, join } from "path";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import dotenv from "dotenv";
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "./seeds/main-seeder";
import userFactory from "./factories/user.factory";
import roleFactory from "./factories/role.factory";

dotenv.config();

const dir = __dirname;

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(dir, "entities", "*.{js,ts}")],
  migrations: [join(dir, "migrations", "*.{js,ts}")],
  factories: [userFactory, roleFactory],
  seeds: [MainSeeder],
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDataSource = new DataSource(options);
