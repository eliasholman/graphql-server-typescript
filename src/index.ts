import { ApolloServer } from "apollo-server";
import 'reflect-metadata';
import Product from "./Product";
import { resolveProductReference } from "./ProductReference";
import { buildFederatedSchema } from "./util";
import ProductsResolver from "./ProductResolver";

export async function listen(port: number): Promise<string> {
    const schema = await buildFederatedSchema(
        {
            resolvers: [ProductsResolver],
            orphanedTypes: [Product],
        },
        {
            Product: { __resolveReference: resolveProductReference },
        },
    );
    const server = new ApolloServer({
        schema
    });

    const { url } = await server.listen({ port });

    console.log(`Products service ready at ${url}`);

    return url;
}

listen(8082).catch(e => console.error(e));