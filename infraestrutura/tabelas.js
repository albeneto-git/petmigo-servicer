const { text } = require("body-parser");

class Tabelas{
    init(conexao){
        this.conexao = conexao;
        this.criarAtendimentos();
    }

    criarAtendimentos(){
        const sql = 'CREATE TABLE atendimentos (id INT NOT NULL AUTO_INCREMENT, cliente VARCHAR(50) NOT NULL, pet VARCHAR(20) NOT NULL, servico VARCHAR(20) NOT NULL, status VARCHAR(20) NOT NULL, observacao TEXT, PRIMARY KEY (id))';
        this.conexao.query(sql, error =>{
            if(error){
                console.log(error);
            }else{
                console.log('Tabela atendimento criada com sucesso');
            }
        });
    }
}

module.exports = new Tabelas;