const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/database/conexao');
const Tabelas = require('./infraestrutura/database/tabelas')

conexao.connect(erro =>{
    if(erro){
        console.log('Ocorreu erro ao conectar com banco de dados: ' + erro);
    }else{
        console.log('conectado com banco de dados');
        Tabelas.init(conexao);
        const app = customExpress();
        app.listen(3000, ()=> console.log('Servidor rodando na porta 3000'));
    }
})


