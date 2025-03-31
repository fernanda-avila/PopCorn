import express from 'express';
import knexdb from './knexfile.js'; // Certifique-se que o knexfile.js está configurado corretamente
const app = express();
import cors from 'cors';

app.use(express.json());
app.use(cors());

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Diretor endpoints

app.get('/Diretor', async (_, res) => {
  try {
    const diretores = await knexdb('Diretor').select('*');
    res.json(diretores);
  } catch (error) {
    res.status(500).send('Erro ao obter diretores: ' + error.message);
  }
});

app.post('/Diretor', async (req, res) => {
  const { nome, data_nascimento } = req.body;
  if (!nome && !data_nascimento) {
    return res.status(400).send('Nome do diretor é obrigatório');
  }
  try {
    await knexdb('Diretor').insert({ diretorNome: nome, nascimentoDiretor: data_nascimento });
    res.send('Diretor criado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao criar o diretor: ' + error.message);
  }
});

app.get('/Diretor/:diretorId', async (req, res) => {
  const { diretorId } = req.params;
  try {
    const diretor = await knexdb('Diretor').where({ id: diretorId }).select('*');
    if (diretor.length === 0) {
      res.status(404).send('Diretor não encontrado');
    } else {
      res.json(diretor[0]);
    }
  } catch (error) {
    res.status(500).send('Erro ao obter o diretor: ' + error.message);
  }
});

app.delete('/Diretor/:diretorId', async (req, res) => {
  const { diretorId } = req.params;
  try {
    const rowsDeleted = await knexdb('Diretor').where({ id: diretorId }).delete();
    if (rowsDeleted === 0) {
      return res.status(404).send('Diretor não encontrado');
    }
    res.json('Diretor deletado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao deletar o diretor: ' + error.message);
  }
});



app.get('/Filme', async (req, res) => {
  try {
    const filmes = await knexdb('Filme').select('*');
    res.json(filmes);
  } catch (error) {
    res.status(500).send('Erro ao obter filmes: ' + error.message);
  }
});

app.post('/Filme', async (req, res) => {
  const { filmeNome, filmeDescricao, diretorNome, anoLancamento, genero, duracao, filmeImgUrl } = req.body;
  
  if (!filmeNome || !anoLancamento) {
    return res.status(400).send('Campos obrigatórios não preenchidos');
  }

  try {
    const diretor = await knexdb('Diretor').where({ diretorNome: diretorNome }).first();
    if (!diretor) {
      return res.status(400).send('Diretor não encontrado');
    }

    await knexdb('Filme').insert({
      filmeNome: filmeNome,
      filmeDescricao: filmeDescricao,
      diretorNome: diretorNome,
      anoLancamento: anoLancamento,
      genero: genero,
      duracao: duracao,
      filmeImgUrl: filmeImgUrl
    });
    res.send('Filme criado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao criar o filme: ' + error.message);
  }
});

app.get('/Filme/:filmeId', async (req, res) => {
  const { filmeId } = req.params;
  try {
    const filme = await knexdb('Filme').where({ id: filmeId }).select('*');
    if (filme.length === 0) {
      res.status(404).send('Filme não encontrado');
    } else {
      res.json(filme[0]);
    }
  } catch (error) {
    res.status(500).send('Erro ao obter o filme: ' + error.message);
  }
});

app.delete('/Filme/:filmeId', async (req, res) => {
  const { filmeId } = req.params;
  try {
    const rowsDeleted = await knexdb('Filme').where({ id: filmeId }).delete();
    if (rowsDeleted === 0) {
      return res.status(404).send('Filme não encontrado');
    }
    res.json('Filme deletado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao deletar o filme: ' + error.message);
  }
});

app.put('/Filme/:filmeId', async (req, res) => {
  const { filmeId } = req.params;
  const { filmeNome, filmeDescricao, diretorId, anoLancamento, genero, duracao, filmeImgUrl } = req.body;

  if (!filmeNome || !diretorId || !anoLancamento) {
    return res.status(400).send('Campos obrigatórios não preenchidos');
  }

  try {
    const filme = await knexdb('Filme').where({ id: filmeId }).update({
      filmeNome,
      filmeDescricao,
      diretorId, 
      anoLancamento,
      genero,
      duracao,
      filmeImgUrl
    });
    if (filme === 0) {
      return res.status(404).send('Filme não encontrado');
    }
    res.send('Filme atualizado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao atualizar o filme: ' + error.message);
  }
});
