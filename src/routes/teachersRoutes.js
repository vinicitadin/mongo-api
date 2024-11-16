const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: String,
    school_disciplines: String,
    contact: String,
    phone_number: String,
    status: Boolean
});

const Blog = mongoose.model('Teachers', blogSchema);

// Consultar todos professores no banco
router.get('/', async (req, res) => {
    try {
        const docs = await Blog.find();
        res.status(200).json(docs);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um professor específico por id
router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const docs = await Blog.find({ _id: id });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um professor específico por nome
router.get('/name/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const docs = await Blog.find({ name: name });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cadastrar um novo professor
router.post('/', async (req, res) => {
    const teacher = req.body;
    try {
        const newPost = await Blog.create(teacher);
        console.log('Objeto salvo com sucesso!');
        res.json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Substituir o cadastro de um professor
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const n_teacher = req.body;
    try {
        const updatedPost = await Blog.findByIdAndUpdate(id,
            {
                name: n_teacher.name,
                school_disciplines: n_teacher.school_disciplines,
                contact: n_teacher.contact,
                phone_number: n_teacher.phone_number,
                status: n_teacher.status
            });
        console.log('Objeto Atualizado:', updatedPost);
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deletar o cadastro de um professor
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