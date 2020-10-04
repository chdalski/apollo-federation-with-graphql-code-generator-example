import { Product, Resolvers } from "../domain/types";

const products: Product[] = [
  {
    upc: "1",
    name: "Table",
    price: 899,
    weight: 100,
  },
  {
    upc: "2",
    name: "Couch",
    price: 1299,
    weight: 1000,
  },
  {
    upc: "3",
    name: "Chair",
    price: 54,
    weight: 50,
  },
];

export const resolvers: Resolvers = {
  Product: {
    __resolveReference(object) {
      const product = products.find((product) => product.upc === object.upc);
      return product ? product : null;
    },
  },

  Query: {
    topProducts(_, args) {
      return products.slice(0, args.first);
    },
  },
};
