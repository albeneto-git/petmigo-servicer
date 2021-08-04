const moment = require('moment');
const atendimentos = require('../controllers/atendimentos');
const conexao = require('../infraestrutura/conexao');
class Atendimento{

    adiciona(atendimento, res){
        
        const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss');
        const data = moment(atendimento.data,'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const atendimentoDatado = {...atendimento, data, dataCriacao};
        const sql = 'INSERT INTO atendimentos SET ?';
        
        conexao.query(sql, atendimentoDatado, (erro, resultados)=>{

            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(201).json(resultados);
            }
        })
    }

}

module.exports = new Atendimento;