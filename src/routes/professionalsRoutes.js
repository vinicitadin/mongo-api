const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db');

db.connect();

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: String,
    specialty: String,
    contact: String,
    phone_number: String,
    status: Boolean
});

const Blog = mongoose.model('Professional', blogSchema);

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
        const docs = await Blog.find({ _id: id });
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Consultar um profissional específico por nome
router.get('/name/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const docs = await Blog.find({ name: name });
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
    const n_prof = req.body;
    try {
        const updatedPost = await Blog.findByIdAndUpdate(id,
            {
                name: n_prof.name,
                specialty: n_prof.specialty,
                contact: n_prof.contact,
                phone_number: n_prof.phone_number,
                status: n_prof.status
            });
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
