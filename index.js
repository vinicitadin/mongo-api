const express = require('express');
const app = express();
const routes = require('./src/routes');
const cors = require('cors');

app.use(cors());

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'API - MongoDB',
            version: '1.0.0',
            description: `API utilizando MongoDB
            
            ### TD 02
            Disciplina: DAII 2024.02 Turma 02
            `,
            license: {
                name: 'DAII',
            },
            contact: {
                name: 'Vinicius Ferreira Citadin',
            },
        },
        servers: [
            {
                url: 'http://localhost:8080/',
                description: 'Development server',
            },
        ],
    },
    apis: ["src/routes/*.js"],
}

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

const specs = swaggerJsDoc(options);

app.use('/', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)),

    app.listen(8080, function () {
        console.log('Escutando na porta 8080, link: http://localhost:8080/')
    });