import { getAllToys } from "../../core/toy/toy.memory";
import { Toy } from "../../core/toy/toy.entity";

export function listToys(): Toy[] {
  return getAllToys();
}