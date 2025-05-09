import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let livros = [];


// Listar todos os livros
app.get('/livros', (req, res) => {
  res.json(livros);
});

// Obter um livro específico
app.get('/livros/:id', (req, res) => {
  const id = Number(req.params.id);
  const livro = livros.find(l => l.id === id);
  if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
  res.json(livro);
});

// Criar um novo livro
app.post('/livros', (req, res) => {
  const livro = { id: Date.now(), ...req.body };
  livros.push(livro);
  res.status(201).json({ mensagem: 'Livro criado', livro });
});

// Atualizar um livro
app.put('/livros/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = livros.findIndex(l => l.id === id);
  if (index === -1) return res.status(404).json({ error: 'Livro não encontrado' });

  livros[index] = { ...livros[index], ...req.body };
  res.json({ mensagem: 'Livro atualizado', livro: livros[index] });
});

// Apagar um livro
app.delete('/livros/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = livros.length;
  livros = livros.filter(l => l.id !== id);
  if (livros.length === before) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }
  // devolve um JSON com a mensagem
  return res.json({ mensagem: 'Livro apagado com sucesso' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API a correr em http://localhost:${PORT}`));
