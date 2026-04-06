import { createToy, listToys } from "../adapters/toy.repository";

export async function create_toy() {
  const toy = await createToy("Toy automático");

  console.log("Toy criado:", toy);
}

export async function list_toys() {
  const toys = await listToys();

  console.log("Toys:", toys);
}
