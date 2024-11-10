const express = require('express');
const router = express.Router();
var professionalsDB = require('../db/professionals.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const professionalsFilePath = path.join(__dirname, '../db/professionals.json');

/**
 * @swagger
 * components:
 *   schemas:
 *     Professional:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - specialty
 *         - contact
 *         - phone_number
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: O id é gerado automáticamente pelo cadasdro do profissional
 *         name:
 *           type: string
 *           description: Nome do profissional
 *         specialty:
 *           type: string
 *           description: Especialidade do profissional
 *         contact:
 *           type: string
 *           description: E-mail de contato do profissional
 *         phone_number:
 *           type: string
 *           description: Telefone de contato do profissional
 *         status:
 *           type: string
 *           description: Situação do profissional
 *       example:
 *         id: fa1c7b2e-e41d-4d30-b3a0-8030eebbc9bb
 *         name: Dr. Carlos Silva
 *         specialty: Pediatra
 *         contact: carlos.silva@gmail.com
 *         phone_number: 48 9876 5432
 *         status: on
 */

 /**
  * @swagger
  * tags:
  *   name: Professionals
  *   description: 
  *     API de Controle de Profissionais
  *     **Por Vinicius Ferreira Citadin**
  */

const readProfessionalsDB = () => {
    const data = fs.readFileSync(professionalsFilePath);
    return JSON.parse(data);
};

/**
 * @swagger
 * /professionals:
 *   get:
 *     summary: Retorna uma lista de todos os profissionais
 *     tags: [Professionals]
 *     responses:
 *       200:
 *         description: A lista de profissionais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Professional'
 */
// Consultar todos profissionais no banco
router.get('/', (req, res) =>{
    console.log("getroute");
    professionalsDB = readProfessionalsDB();
    res.json(professionalsDB);
});

/**
 * @swagger
 * /professionals/id/{id}:
 *   get:
 *     summary: Retorna um profissional pelo ID
 *     tags: [Professionals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do profissional
 *     responses:
 *       200:
 *         description: Um profissional pelo ID
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professional'
 *       404:
 *         description: Profissional não encontrado
 */
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

/**
 * @swagger
 * /professionals/name/{name}:
 *   get:
 *     summary: Retorna um profissional pelo nome
 *     tags: [Professionals]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do profissional
 *     responses:
 *       200:
 *         description: Um profissional pelo nome
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professional'
 *       404:
 *         description: Profissional não encontrado
 */
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

/**
 * @swagger
 * /professionals:
 *   post:
 *     summary: Cadastra um novo profissional
 *     tags: [Professionals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Professional'
 *     responses:
 *       200:
 *         description: O profissional foi criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professional'
 *       404:
 *         description: Não foi possível cadastrar o profissional
 */
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

/**
 * @swagger
 * /professionals/{id}:
 *  put:
 *    summary: Atualiza um profissional pelo ID
 *    tags: [Professionals]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do profissional
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Professional'
 *    responses:
 *      200:
 *        description: O profissional foi atualizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Professional'
 *      404:
 *        description: Profissional não encontrado
 */
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

/**
 * @swagger
 * /professionals/{id}:
 *   delete:
 *     summary: Remove um profissional pelo ID
 *     tags: [Professionals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do profissional
 *     responses:
 *       200:
 *         description: O profissional foi removido com sucesso
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Professional'
 *       404:
 *         description: Profissional não encontrado
 */
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
