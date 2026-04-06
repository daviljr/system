import { saveToy } from "../../core/toy/toy.memory";
import { Toy } from "../../core/toy/toy.entity";

export function createToy(name: string): Toy {
  const newToy: Toy = {
    id: Date.now().toString(),
    name,
  };

  saveToy(newToy);

  return newToy;
}