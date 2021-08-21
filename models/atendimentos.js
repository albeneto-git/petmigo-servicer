const axios = require('axios');
const moment = require('moment');
const atendimentos = require('../controllers/atendimentos');
const conexao = require('../infraestrutura/conexao');
class Atendimento{

    adiciona(atendimento, res){
        
        const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss');
        const data = moment(atendimento.data,'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'O nome do cliente tem que ter no mínimo cinco caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;
        if(existemErros){
            res.status(400).json(erros);
        }else{
            const atendimentoDatado = {...atendimento, data, dataCriacao};
            const sql = 'INSERT INTO atendimentos SET ?';
            
            conexao.query(sql, atendimentoDatado, (erro, resultados)=>{
    
                if(erro){
                    res.status(400).json(erro);
                }else{
                    res.status(201).json(atendimentoDatado);
                }
            });
        }
    }

    lista(res){
        const sql = 'SELECT * FROM atendimentos';

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        })

    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;
        conexao.query(sql, async (erro, resultados) => {
            const atendimento = resultados[0];
            const cpf = atendimento.cliente;
            if(erro){
                res.status(400).json(erro);
            }else{
                const {data} = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data;
                res.status(200).json(atendimento);
            }
        })
    }

    altera(id, valores, res){

        if(valores.data){
            valores.data = moment(valores.data,'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
        }

        const sql = 'UPDATE atendimentos SET ? WHERE id = ?';
        conexao.query(sql, [valores, id], (erro, resultado) =>{

            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({...valores, id});
            }

        });
    }

    deleta(id, res){

        const sql = 'DELETE FROM atendimentos WHERE id = ?';
        conexao.query(sql, id, (erro, resultado) =>{

            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({id});
            }

        });

    }
}

module.exports = new Atendimento;