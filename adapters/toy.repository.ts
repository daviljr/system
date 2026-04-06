import { supabase } from "./supabase.client";

export async function createToy(name: string) {
  const id = Date.now().toString();

  const { error } = await supabase
    .from("toys")
    .insert([{ id, name }]);

  if (error) {
    throw new Error("Erro ao criar toy: " + error.message);
  }

  return { id, name };
}

export async function listToys() {
  const { data, error } = await supabase
    .from("toys")
    .select("*");

  if (error) {
    throw new Error("Erro ao listar toys: " + error.message);
  }

  return data;
}
