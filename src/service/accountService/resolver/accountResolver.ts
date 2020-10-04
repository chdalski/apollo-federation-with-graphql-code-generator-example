import { Resolvers, User } from "../domain/types";

const users: User[] = [
  {
    id: "1",
    name: "Ada Lovelace",
    username: "@ada",
  },
  {
    id: "2",
    name: "Alan Turing",
    username: "@complete",
  },
];

export const resolvers: Resolvers = {
  Query: {
    me() {
      return users[0];
    },
  },
  User: {
    __resolveReference(object) {
      const user = users.find((user) => user.id === object.id);
      return user ? user  : null;
    },
  },
};
