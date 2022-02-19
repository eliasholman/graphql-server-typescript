import { products } from "./ProductData";
import Product from "./Product";

export async function resolveProductReference(
    reference: Pick<Product, "id">,
): Promise<Product | undefined> {
    return products.find(p => p.id === reference.id);
}