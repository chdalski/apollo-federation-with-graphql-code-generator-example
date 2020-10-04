import path from "path";
import { ApolloServer } from "apollo-server";
import { resolvers as productResolver } from "./resolver/productResolver";
import { buildFederatedSchema } from "@apollo/federation";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const schema = loadFilesSync(path.join(__dirname, "./schema.graphql"));
const typeDefs = mergeTypeDefs(schema);
const resolvers = mergeResolvers([productResolver]);

const SERVICE_NAME = "Product Service";

export async function listen(port: number): Promise<string> {
  const server = new ApolloServer({
    schema: buildFederatedSchema([
      {
        typeDefs,
        resolvers,
      },
    ]),
    tracing: false,
    playground: true,
  });

  const { url } = await server.listen({ port });
  console.log(`${SERVICE_NAME} is listening on url: ${url}`);

  return url;
}
