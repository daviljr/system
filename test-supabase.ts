import { supabase } from "./adapters/supabase.client";

async function test() {
  console.log("Testando conexão com Supabase...\n");

  // 🔹 INSERT
  const id = Date.now().toString();

  const { error: insertError } = await supabase
    .from("toys")
    .insert([
      {
        id,
        name: "Toy Teste",
      },
    ]);

  if (insertError) {
    console.error("Erro ao inserir:", insertError);
    return;
  }

  console.log("✔️ Inserção OK");

  // 🔹 SELECT
  const { data, error: selectError } = await supabase
    .from("toys")
    .select("*");

  if (selectError) {
    console.error("Erro ao buscar:", selectError);
    return;
  }

  console.log("✔️ Leitura OK");
  console.log("Dados:", data);
}

test();
