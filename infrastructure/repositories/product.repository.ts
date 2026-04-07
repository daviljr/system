import { supabase } from "../database/supabase.client";

export async function listProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) throw error;

  return data;
}

export async function createProduct(name: string) {
  const { data, error } = await supabase
    .from("products")
    .insert([{ name }])
    .select()
    .single();

  if (error) throw error;

  return data;
}
