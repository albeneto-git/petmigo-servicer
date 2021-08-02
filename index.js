const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(error =>{
    if(error){
        console.log('Ocorreu erro ao conectar com banco de dados: ' + error);
    }else{
        console.log('conectado com banco de dados');
        Tabelas.init(conexao);
        const app = customExpress();
        app.listen(3000, ()=> console.log('Servidor rodando na porta 3000'));
    }
})


