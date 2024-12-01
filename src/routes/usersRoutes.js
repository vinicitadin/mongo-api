const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    email: String,
    level: String,
    name: String,
    pwd: String,
    status: Boolean,
    user: String
});

const Blog = mongoose.model('Users', blogSchema);

// Consultar todos usuários no banco
router.get('/', async (req, res) => {
    try {
        const docs = await Blog.find();
        res.status(200).json(docs);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um usuário específico por id
router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const docs = await Blog.find({ _id: id });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um usuário específico por nome
router.get('/name/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const docs = await Blog.find({ name: name });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cadastrar um novo usuário
router.post('/', async (req, res) => {
    const user = req.body;
    try {
        const newPost = await Blog.create(user);
        console.log('Objeto salvo com sucesso!');
        res.json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Substituir o cadastro de um professor
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const n_user = req.body;
    try {
        const updatedPost = await Blog.findByIdAndUpdate(id,
            {
                email: n_user.email,
                level: n_user.level,
                name: n_user.name,
                pwd: n_user.pwd,
                status: n_user.status,
                user: n_user.user
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
