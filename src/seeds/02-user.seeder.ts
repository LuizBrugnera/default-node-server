import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Role } from "../entities/Role";

export default class UserSeeder implements Seeder {
  async run(ds: DataSource, fm: SeederFactoryManager): Promise<void> {
    const roleRepo = ds.getRepository(Role);
    const userRepo = ds.getRepository(User);

    const adminRole = await roleRepo.findOneByOrFail({ name: "admin" });
    const studentRole = await roleRepo.findOneByOrFail({ name: "student" });

    const userFactory = fm.get(User);

    // ───────── ADMIN FIXO ─────────
    const existingAdmin = await userRepo.findOneBy({
      email: "admin@example.com",
    });
    if (!existingAdmin) {
      await userFactory.save({
        roleId: adminRole.id,
        fullName: "Administrador Raiz",
        email: "admin@example.com",
        cpfOrCnpj: "00000000000",
        passwordHash: "$2b$10$hashFakeSoParaSeeders",
      });
    }

    // ───────── 20 ESTUDANTES ─────────
    const studentCount = await userRepo.countBy({ roleId: studentRole.id });
    if (studentCount < 20) {
      await userFactory.saveMany(20 - studentCount, {
        roleId: studentRole.id,
      });
    }
  }
}
