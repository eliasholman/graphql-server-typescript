"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
const apollo_server_1 = require("apollo-server");
const resolver_1 = __importDefault(require("./resolver"));
const product_1 = __importDefault(require("./product"));
const product_reference_1 = require("./product-reference");
const buildFederatedSchema_1 = require("../helpers/buildFederatedSchema");
function listen(port) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield buildFederatedSchema_1.buildFederatedSchema({
            resolvers: [resolver_1.default],
            orphanedTypes: [product_1.default],
        }, {
            Product: { __resolveReference: product_reference_1.resolveProductReference },
        });
        const server = new apollo_server_1.ApolloServer({
            schema,
            tracing: false,
            playground: true,
        });
        const { url } = yield server.listen({ port });
        console.log(`Products service ready at ${url}`);
        return url;
    });
}
exports.listen = listen;
