import { Review, Resolvers } from "../domain/types";

const reviews: Review[] = [
  {
    id: "1",
    author: { id: "1" },
    product: { upc: "1" },
    body: "Love it!",
  },
  {
    id: "2",
    author: { id: "1" },
    product: { upc: "2" },
    body: "Too expensive.",
  },
  {
    id: "3",
    author: { id: "2" },
    product: { upc: "3" },
    body: "Could be better.",
  },
  {
    id: "4",
    author: { id: "2" },
    product: { upc: "1" },
    body: "Prefer something else.",
  },
];

const usernames = [
  { id: "1", username: "@ada" },
  { id: "2", username: "@complete" },
];

export const resolvers: Resolvers = {
  Review: {
    author(review) {
      return { __typename: "User", id: review.author ? review.author.id : ""  };
    },
  },
  User: {
    reviews(user) {
      return reviews.filter((review) => review.author?.id === user.id);
    },
    username(user) {
      const found = usernames.find((username) => username.id === user.id);
      return found ? found.username : null;
    },
  },
  Product: {
    reviews(product) {
      return reviews.filter((review) => review.product?.upc === product.upc);
    },
  },
};
