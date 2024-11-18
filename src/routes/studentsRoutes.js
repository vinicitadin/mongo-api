const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: String,
    age: String,
    parents: String,
    phone_number: String,
    special_needs: String,
    status: Boolean
});

const Blog = mongoose.model('Students', blogSchema);

// Consultar todos os estudantes no banco
router.get('/', async (req, res) => {
    try {
        const docs = await Blog.find();
        res.status(200).json(docs);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um estudante específico por id
router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const docs = await Blog.find({ _id: id });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um estudante específico por nome
router.get('/name/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const docs = await Blog.find({ name: name });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cadastrar um novo estudante
router.post('/', async (req, res) => {
    const student = req.body;
    try {
        const newPost = await Blog.create(student);
        console.log('Objeto salvo com sucesso!');
        res.json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Substituir o cadastro de um estudante
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const n_stud = req.body;
    try {
        const updatedPost = await Blog.findByIdAndUpdate(id,
            {
                name: n_stud.name,
                age: n_stud.age,
                parents: n_stud.parents,
                phone_number: n_stud.phone_number,
                special_needs: n_stud.special_needs,
                status: n_stud.status
            });
        console.log('Objeto Atualizado:', updatedPost);
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deletar o cadastro de um estudante
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
