import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server";
import * as accountService from "./service/accountService/accountService";
import * as productService from "./service/productService/productService";
import * as reviewService from "./service/reviewService/reviewService";
import * as inventoryService from "./service/inventoryService/inventoryService";

async function init() {
  const serviceList = [
    { name: "accountService", url: await accountService.listen(3001) },
    { name: "productService", url: await productService.listen(3002) },
    { name: "reviewService", url: await reviewService.listen(3003) },
    { name: "inventoryService", url: await inventoryService.listen(3004) },
  ];

  const gateway = new ApolloGateway({
    serviceList,
  });

  const server = new ApolloServer({ gateway, subscriptions: false });

  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`Apollo Gateway ready at ${url}`);
  });
}

init().catch(console.error);
