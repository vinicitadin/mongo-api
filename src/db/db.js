const mongoose = require('mongoose');

function connect() {

    mongoose.connect('mongodb://localhost:27017/gee');

    mongoose.connection.on('connected', () => {
        console.log("Conectado ao banco MongoDB");
    });

    mongoose.connection.on('error', (err) => {
        console.error('Erro na conexão com o MongoDB:', err);
    });
}

module.exports = {
    connect
}