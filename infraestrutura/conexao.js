const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'neto',
    password: 'neto',
    database: 'agenda_petshop'
});

module.exports = conexao;