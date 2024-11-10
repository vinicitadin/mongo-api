const express = require('express');
const router = express.Router();
var professionalsDB = require('../db/professionals.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const professionalsFilePath = path.join(__dirname, '../db/professionals.json');

const readProfessionalsDB = () => {
    const data = fs.readFileSync(professionalsFilePath);
    return JSON.parse(data);
};

// Consultar todos profissionais no banco
router.get('/', (req, res) =>{
    console.log("getroute");
    professionalsDB = readProfessionalsDB();
    res.json(professionalsDB);
});

// Consultar um profissional específico por id
router.get('/id/:id', (req, res) => {
    professionalsDB = readProfessionalsDB();
    const id = req.params.id;
    var professional;
    for(var i = 0; i < professionalsDB.length; i++) {
        if(id == professionalsDB[i].id) {
            professional = professionalsDB[i];
        }
    }
    if(!professional) return res.status(404).json({
        "erro": "Profissional não encontrado"
    });
    res.json(professional);
});

// Consultar um profissional específico por nome
router.get('/name/:name', (req, res) => {
    professionalsDB = readProfessionalsDB();
    console.log(req.params.name)
    const name = decodeURIComponent(req.params.name).trim();
    var professional;
    for(var i = 0; i < professionalsDB.length; i++) {
        if(name.toLowerCase() == professionalsDB[i].name.toLowerCase()) {
            professional = professionalsDB[i];
        }
    }
    if(!professional) return res.status(404).json({
        "erro": "Profissional não encontrado"
    });
    res.json(professional);
});

// Cadastrar um novo profissional
router.post('/', (req, res) => {
    
    professionalsDB = readProfessionalsDB();

    const professional = {
        id: uuidv4(),
        ...req.body
    } 

    if(!professional.name) return res.status(400).json({
        "erro": "profissional precisa ter um 'nome'"
    });
    if(!professional.specialty) return res.status(400).json({
        "erro": "profissional precisa ter uma 'especialidade'"
    });
    if(!professional.contact) return res.status(400).json({
        "erro": "profissional precisa ter um 'contato'"
    });
    if(!professional.phone_number) return res.status(400).json({
        "erro": "profissional precisa ter um 'número de telefone'"
    });
    if(!professional.status) return res.status(400).json({
        "erro": "profissional precisa ter um 'status'"
    });

    professionalsDB.push(professional);
    fs.writeFileSync(professionalsFilePath, JSON.stringify(professionalsDB, null, 2));
    return res.json(professional);
});

// Substituir o cadastro de um profissional
router.put('/:id', (req, res) => {
    const id = req.params.id;
    professionalsDB = readProfessionalsDB();
    var idProfessional;

    for(var i = 0; i < professionalsDB.length; i++) {
        if(id == professionalsDB[i].id) {
            idProfessional = i;
        }
    }

    const newProfessional = req.body;
    const atualProfessional = professionalsDB[idProfessional];

    if(!atualProfessional) 
        return res.status(404).json({
        "erro": "Profissional não encontrado"
    });

    if(newProfessional.id != professionalsDB[idProfessional].id) return res.status(400).json({
        "erro": "o 'id' do profissional não deve ser alterado!"
    });

    if(!newProfessional.name) return res.status(400).json({
        "erro": "profissional precisa ter um 'nome'"
    });
    if(!newProfessional.specialty) return res.status(400).json({
        "erro": "profissional precisa ter uma 'especialidade'"
    });
    if(!newProfessional.contact) return res.status(400).json({
        "erro": "profissional precisa ter um 'contato'"
    });
    if(!newProfessional.phone_number) return res.status(400).json({
        "erro": "profissional precisa ter um 'número de telefone'"
    });
    if(!newProfessional.status) return res.status(400).json({
        "erro": "profissional precisa ter um 'status'"
    });

    professionalsDB[idProfessional] = newProfessional;
    fs.writeFileSync(professionalsFilePath, JSON.stringify(professionalsDB, null, 2));
    return res.json(newProfessional);
});

// Deletar o cadastro de um profissional
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    professionalsDB = readProfessionalsDB();
    var deleted;
    var idProfessional;

    for(var i = 0; i < professionalsDB.length; i++) {
        if(id == professionalsDB[i].id) {
            idProfessional = i;
        }
    }

    if(!professionalsDB[idProfessional]) return res.status(404).json({
        "erro": "Profissional não encontrado"
    });
    
    deleted = professionalsDB.splice(idProfessional, 1);
    fs.writeFileSync(professionalsFilePath, JSON.stringify(professionalsDB, null, 2));
    res.json(deleted);
});

module.exports = router;
