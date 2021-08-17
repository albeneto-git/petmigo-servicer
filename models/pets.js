const conexao = require('../infraestrutura/conexao');
const upLoadDeArquivo = require('../arquivos/uploadDeArquivo');
class Pet{

    adiciona(pet, res){
        const sql = 'INSERT INTO pets SET ?';
        upLoadDeArquivo(pet.imagem, pet.nome, (novoCaminho)=>{
            
            const novoPet = {nome: pet.nome, imagem: novoCaminho};

            conexao.query(sql, novoPet, erro => {
                if(erro){
                    res.status(400).json(erro);
                }else{
                    res.status(200).json(novoPet);
                }
            });

        })

    }

}

module.exports = new Pet();