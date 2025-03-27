import express from 'express';
import knexdb from './knexfile.js';
const app = express();
import cors from 'cors';
app.use(express.json());
app.use(cors());
app.get('/', (_, res) => {
  res.send('Hello World!');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000') 
});


app.get('/Diretor', async(_, res) => {
const diretores = await knexdb('Diretor').select('*');
res.json(diretores);
});

app.post('/Diretor', async(req, res) => {
  const {nome} = req.body;
  await knexdb('Diretor').insert({nome});
  res.send('Diretor criado com sucesso!');
});

app.get('/Diretor/:diretorId', async(req, res) => {
  const {id} = req.params;
  const diretor = await knexdb('Diretor').where({id}).select('*');
 if(diretor.length === 0){
   res.status(404).send('Diretor não encontrado');
} else {
  res.json(diretor[0]);
  }
});

app.delete('/Diretor/:diretorId', async(req, res) => {  
  const {id} = req.params;
  await knexdb('Diretor').where({id}).delete();
  res.json('Diretor deletado com sucesso!');
});



app.get('/Filme', async (_, res) => {
  const filmes = await knexdb('Filme').select('*');
  res.json(filmes);
});


app.post('/Filme', async (req, res) => {
  const { filmeNome, filmeDescricao, diretorNome, anoLancamento, genero, duracao, imgUrl } = req.body;
  try {
    await knexdb('Filme').insert({
      filmeNome,
      filmeDescricao,
      diretorNome,
      anoLancamento,
      genero,
      duracao,
      imgUrl
    });
    res.send('Filme criado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao criar o filme: ' + error.message);
  }
});


app.get('/Filme/:filmeId', async (req, res) => {
  const { filmeId } = req.params;
  try {
    const filme = await knexdb('Filme').where({ filmeId }).select('*');
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
    await knexdb('Filme').where({ filmeId }).delete();
    res.json('Filme deletado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao deletar o filme: ' + error.message);
  }
});


app.put('/Filme/:filmeId', async (req, res) => {
  const { filmeId } = req.params;
  const { filmeNome, filmeDescricao, diretorNome, anoLancamento, genero, duracao, imgUrl } = req.body;
  try {
    await knexdb('Filme').where({ filmeId }).update({
      filmeNome,
      filmeDescricao,
      diretorNome,
      anoLancamento,
      genero,
      duracao,
      imgUrl
    });
    res.send('Filme atualizado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao atualizar o filme: ' + error.message);
  }
});
