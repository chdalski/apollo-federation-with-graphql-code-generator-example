import { Product, Resolvers } from "../domain/types";
import assert from "assert";

const inventory: Product[] = [
  { upc: "1", inStock: true },
  { upc: "2", inStock: false },
  { upc: "3", inStock: true },
];

export const resolvers: Resolvers = {
  Product: {
    __resolveReference(object: Product) {
      return {
        ...object,
        ...inventory.find((product) => product.upc === object.upc),
      };
    },
    shippingEstimate(object: Product) {
      assert(object.price);
      assert(object.weight);
      // free for expensive items
      if (object.price > 1000) return 0;
      // estimate is based on weight
      return object.weight * 0.5;
    },
  },
};
