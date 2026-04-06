import express from "express";
import { decide } from "../core/decision.engine";
import { runQueue } from "../core/executor";
import { listToys, createToy } from "../adapters/toy.repository";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("CoreHub API rodando 🚀");
});

// rodar o sistema (loop)
app.post("/run", async (req, res) => {
  const state = {};

  const queue = decide(state);

  await runQueue(queue);

  res.json({
    status: "executado",
    queue,
  });
});

// listar toys (dados reais)
app.get("/toys", async (req, res) => {
  const toys = await listToys();
  res.json(toys);
});

// criar toy manual
app.post("/toys", async (req, res) => {
  const { name } = req.body;

  const toy = await createToy(name || "Toy via API");

  res.json(toy);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
