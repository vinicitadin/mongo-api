const express = require('express');
const app = express();
const routes = require('./src/routes');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use('/', routes);

app.listen(8080, function () {
    console.log('Escutando na porta 8080, link: http://localhost:8080/')});