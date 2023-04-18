import { faker } from "@faker-js/faker";
import type { User } from "@/models";

export const user: User = {
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  id: faker.datatype.string(),
  name: faker.name.fullName(),
};
