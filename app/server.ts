import express from 'express';
import { CoreDecisions } from '../domain/decisions';
import { supabase } from '../core/supabase';

const app = express();

app.use(express.json());

// Health check (ESSENCIAL pra Vercel)
app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

// Endpoint principal
app.post('/decidir', async (req, res) => {
  try {
    const result = CoreDecisions.confirmarExecucao(req.body);
      console.log('INPUT:', req.body);
      console.log('RESULT:', result);
    if (!result.ok) {
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }

    // 🔹 Salva no Supabase
    const { error } = await supabase
      .from('decisions')
      .insert([
        {
          input: req.body,
          output: result.data,
        },
      ]);

    if (error) {
      console.error('Erro ao salvar no Supabase:', error);
    }

    return res.json({
      success: true,
      data: result.data,
    });
  } catch (err) {
    console.error('Erro interno:', err);

    return res.status(500).json({
      success: false,
      error: {
        message: 'Erro interno',
      },
    });
  }
});

export default app;
