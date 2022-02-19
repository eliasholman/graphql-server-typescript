import { specifiedDirectives } from "graphql";
import gql from "graphql-tag";
import { buildSubgraphSchema} from "@apollo/federation";
import { addResolversToSchema, GraphQLResolverMap } from "apollo-graphql";
import {buildSchema, BuildSchemaOptions, createResolversMap} from "type-graphql";
import {printSubgraphSchema} from "@apollo/subgraph";


export async function buildFederatedSchema(
    options: Omit<BuildSchemaOptions, "skipCheck">,
    referenceResolvers?: GraphQLResolverMap<any>,
) {
    const schema = await buildSchema({
        ...options,
        directives: [...specifiedDirectives, ...(options.directives || [])],
        skipCheck: true,
    });
    const federatedSchema = buildSubgraphSchema({
        typeDefs: gql(printSubgraphSchema(schema)),
        resolvers: createResolversMap(schema) as any,
    });

    if (referenceResolvers) {
        addResolversToSchema(federatedSchema, referenceResolvers);
    }
    return federatedSchema;
}