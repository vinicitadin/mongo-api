const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/professionals');

mongoose.connection.on('connected', () => {
    console.log("Conectado ao banco MongoDB");
});

mongoose.connection.on('error', (err) => {
    console.error('Erro na conexão com o MongoDB:', err);
});

const blogSchema = new mongoose.Schema({
    name: String,
    specialty: String,
    contact: String,
    phone_number: String,
    status: Boolean
});

const Blog = mongoose.model('Blog', blogSchema);

// Consultar todos profissionais no banco
router.get('/', async (req, res) => {
    try {
        const docs = await Blog.find();
        res.status(200).json(docs);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um profissional específico por id
router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const docs = await Blog.find({ author: id });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um profissional específico por nome
router.get('/name/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const docs = await Blog.find({ author: name });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cadastrar um novo profissional
router.post('/', async (req, res) => {
    const professional = req.body;
    try {
        const newPost = await Blog.create(professional);
        console.log('Objeto salvo com sucesso!');
        res.json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Substituir o cadastro de um profissional
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const n_author = req.body;
    try {
      const updatedPost = await Blog.findByIdAndUpdate(id, { title: n_author.title, author: n_author.author }, { new: true });
      console.log('Objeto Atualizado:', updatedPost);
      res.json(updatedPost);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// Deletar o cadastro de um profissional
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const deletedPost = await Blog.findByIdAndDelete(id);
      console.log('Objeto deletado:', deletedPost);
      res.json(deletedPost);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = router;
