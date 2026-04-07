import express from 'express';
import { CoreDecisions } from '@domain/decisions';

const app = express();

app.use(express.json());

// 🔹 Health check (essencial pra deploy)
app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

// 🔹 Endpoint principal
app.post('/decidir', (req, res) => {
  const result = CoreDecisions.confirmarExecucao(req.body);

  if (!result.ok) {
    return res.status(400).json({
      success: false,
      error: result.error,
    });
  }

  return res.json({
    success: true,
    data: result.data,
  });
});

export default app;
