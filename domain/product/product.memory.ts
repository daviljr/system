export type Product = {
  id: string;
  name: string;
};

const products: Product[] = [];

export const ProductMemory = {
  list(): Product[] {
    return products;
  },

  create(name: string): Product {
    const product: Product = {
      id: crypto.randomUUID(),
      name,
    };

    products.push(product);
    return product;
  },
};
