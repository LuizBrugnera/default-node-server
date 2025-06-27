import { setSeederFactory } from "typeorm-extension";
import { Role } from "../entities/Role";

export default setSeederFactory(Role, () => {
  const role = new Role();
  role.name = "student";
  return role;
});
