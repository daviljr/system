import express from 'express';
import { CoreDecisions } from '../domain/decisions';

const app = express();
app.use(express.json());

app.post('/decidir', (req, res) => {
  try {
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
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        message: 'Erro interno',
      },
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 CoreHub rodando em http://localhost:${PORT}`);
});
