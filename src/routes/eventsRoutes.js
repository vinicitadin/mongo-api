const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    description: String,
    comments: String,
    date: String
});

const Blog = mongoose.model('Users', blogSchema);

// Consultar todos eventos no banco
router.get('/', async (req, res) => {
    try {
        const docs = await Blog.find();
        res.status(200).json(docs);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um evento específico por id
router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const docs = await Blog.find({ _id: id });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um evento específico por data
router.get('/date/:date', async (req, res) => {
    const date = req.params.date;
    try {
        const docs = await Blog.find({ date: date });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cadastrar um novo evento
router.post('/', async (req, res) => {
    const event = req.body;
    try {
        const newPost = await Blog.create(event);
        console.log('Objeto salvo com sucesso!');
        res.json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Substituir o cadastro de um evento
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const n_event = req.body;
    try {
        const updatedPost = await Blog.findByIdAndUpdate(id,
            {
                description: n_event.description,
                comments: n_event.comments,
                date: n_event.date
            });
        console.log('Objeto Atualizado:', updatedPost);
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deletar o cadastro de um usuário
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