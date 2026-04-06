import { Toy } from "./toy.entity";

const toys: Toy[] = [];

export function saveToy(toy: Toy) {
  toys.push(toy);
}

export function getAllToys(): Toy[] {
  return toys;
}