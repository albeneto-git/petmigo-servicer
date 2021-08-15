const conexao = require('../infraestrutura/conexao');

class Pet{

    adiciona(pet, res){
        const sql = 'INSERT INTO pets SET ?';
        console.log(pet);
        conexao.query(sql, pet, erro => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(pet);
            }
        });

    }

}

module.exports = new Pet();