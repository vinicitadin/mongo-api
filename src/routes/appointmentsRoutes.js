const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    specialty: String,
    comments: String,
    date: String,
    student: String,
    professional: String,
});

const Blog = mongoose.model('Appointments', blogSchema);

// Consultar todos os agendamentos no banco
router.get('/', async (req, res) => {
    try {
        const docs = await Blog.find();
        res.status(200).json(docs);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um agendamento específico por id
router.get('/id/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const docs = await Blog.find({ _id: id });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um agendamento específico por estudante
router.get('/student/:student', async (req, res) => {
    const student = req.params.student;
    try {
        const docs = await Blog.find({ student: student });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um agendamento específico por data
router.get('/date/:date', async (req, res) => {
    const date = req.params.date;
    try {
        const docs = await Blog.find({ date: date });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Cadastrar um novo agendamento
router.post('/', async (req, res) => {
    const appointments = req.body;
    try {
        const newPost = await Blog.create(appointments);
        console.log('Objeto salvo com sucesso!');
        res.json(newPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Substituir o cadastro de um agendamento
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const n_appoint = req.body;
    try {
        const updatedPost = await Blog.findByIdAndUpdate(id,
            {
                specialty: n_appoint.specialty,
                comments: n_appoint.comments,
                date: n_appoint.date,
                student: n_appoint.student,
                professional: n_appoint.professional,
            });
        console.log('Objeto Atualizado:', updatedPost);
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deletar o cadastro de um agendamento
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