import app from '../app/server';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 CoreHub rodando em http://localhost:${PORT}`);
});
