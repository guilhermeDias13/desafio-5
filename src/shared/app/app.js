import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const livros = [
    {
      "id": 1,
      "titulo": "1984",
      "num_paginas": 328,
      "isbn": "9780451524935",
      "editora": "Signet Classic"
    },
    {
      "id": 2,
      "titulo": "O Sol é para Todos",
      "num_paginas": 364,
      "isbn": "9788535902788",
      "editora": "Editora José Olympio"
    },
    {
      "id": 3,
      "titulo": "O Apanhador no Campo de Centeio",
      "num_paginas": 240,
      "isbn": "9788535910899",
      "editora": "Editora do Autor"
    }
  ];

app.get('/', (req,res)=>{
    res.status(200).send("API em Execução")
})

app.get('/livros', (req,res)=>{
    res.status(200).json(livros)
})

app.post('/livros',(req,res)=>{
    let erro = 0;

    livros.map((livro)=>{
        if(req.body.id==livro.id){
            erro++;
        }
    }) 

    if(req.body.id=="" || req.body.titulo=="" || req.body.num_paginas=="" || req.body.isbn=="" || req.body.editora==""){
        erro++;
    }

    if(erro!=0){
        res.status(404).send('Falha ao inserir livro. ID já existente ou dados vazios.')
    }else{
        livros.push(req.body)
        res.status(201).send('Livro Cadastrado com sucesso.')
    }
})

app.get('/livros/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    try {
        const livroEncontrado = buscarLivroPorId(id);
        res.status(200).json(livroEncontrado);
      } catch (erro) {
        res.status(erro.status || 500).json({ erro: erro.message });
      }
})

    function buscarLivroPorId(id) {
        const livroEncontrado = livros.find(livro => livro.id === id);
    
        if (livroEncontrado) {
            return livroEncontrado;
        } else {
        // retornar um erro 404 caso o livro não seja encontrado
            const erro = new Error('Livro não encontrado');
            erro.status = 404;
            throw erro;
        }
    }

app.put('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livroDados = req.body;

  if (atualizarLivro(id, livroDados)) {
    res.status(200).json({ mensagem: 'Livro atualizado!' });
  } else {
    res.status(404).json({ mensagem: 'Livro não encontrado' });
  }
});

    function atualizarLivro(id, livroDados) {
        const index = livros.findIndex(livro => livro.id === id);
    
        if (index !== -1) {
            livros[index] = {
                ...livros[index],
                ...livroDados
            };
            return true;
        } else {
            return false;
        }
    }

app.delete('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (removerLivro(id)) {
        res.status(200).json({ mensagem: 'Livro removido!' });
    } else {
        res.status(404).json({ mensagem: 'Livro não encontrado' });
    }
});

    function removerLivro(id) {
        const index = livros.findIndex(livro => livro.id === id);
        if (index !== -1) {
            livros.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }



export default app