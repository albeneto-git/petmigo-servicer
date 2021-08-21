const { text } = require("body-parser");

class Tabelas{
    init(conexao){
        this.conexao = conexao;
        this.criarAtendimentos();
        this.criarPets();
    }

    criarAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS atendimentos (id INT NOT NULL AUTO_INCREMENT, cliente VARCHAR(11) NOT NULL, pet VARCHAR(20) NOT NULL, servico VARCHAR(20) NOT NULL, status VARCHAR(20) NOT NULL, observacao TEXT, data DATETIME NOT NULL, dataCriacao DATETIME NOT NULL, PRIMARY KEY (id))';
        this.conexao.query(sql, erro =>{
            if(erro){
                console.log(erro);
            }else{
                console.log('Tabela atendimento criada com sucesso');
            }
        });
    }

    criarPets(){
        const sql = 'CREATE TABLE IF NOT EXISTS pets (id int NOT NULL AUTO_INCREMENT, nome VARCHAR(50), imagem VARCHAR(200), PRIMARY KEY(id))';
        this.conexao.query(sql, (erro) =>{
            if(erro){
                console.log(erro);
            }else{
                console.log('Tabela PETS criada com sucesso');
            }
        });
    }
}

module.exports = new Tabelas;