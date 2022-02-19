import {Arg, Query, Resolver} from "type-graphql";

import Product from "./Product";
import { products } from "./ProductData";


@Resolver(of => Product)
export default class ProductsResolver {

    @Query(returns => [Product], { description: "Get all available products" })
    products() : Product[] {
        return products;
    }
}