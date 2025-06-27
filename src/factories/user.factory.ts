import { setSeederFactory } from "typeorm-extension";
import { User } from "../entities/User";
import { faker } from "@faker-js/faker";

export default setSeederFactory(User, () => {
  const user = new User();
  user.fullName = faker.person.fullName();
  user.email = faker.internet.email().toLowerCase();
  user.cpfOrCnpj = faker.string.numeric(11);
  user.passwordHash = "$2b$10$hashFakeSoParaSeeders";
  user.roleId = 2; // student padrão
  return user;
});
