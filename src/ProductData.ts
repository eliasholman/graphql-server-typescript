import Product from "./Product";

export const products: Product[] = [
    createProduct({
        id: "1",
        name: "Ultrawide Sunscreen",
        description: "Sunscreen that can cover any surface"
    }),
    createProduct({
        id: "2",
        name: "Gripping Anecdote",
        description: "A story that really grabs you"
    }),
    createProduct({
        id: "3",
        name: "Cobra Honey",
        description: "Honey, straight from the cobra"
    }),
];

function createProduct(productData: Partial<Product>) {
    return Object.assign(new Product(), productData);
}