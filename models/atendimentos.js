const axios = require('axios');
const moment = require('moment');
const atendimentos = require('../controllers/atendimentos');
const conexao = require('../infraestrutura/database/conexao');
const repositorio = require('../repositorios/atendimentos');

class Atendimento{

    constructor(){
        this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);
        this.clienteEhValido = (tamanho) => tamanho >= 5;
        this.valida = (parametros)=> this.validacoes.filter(campo =>{
            const {nome} = campo;
            const parametro = parametros[nome];
            return !campo.valido(parametro);
        })
        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'O nome do cliente tem que ter no mínimo cinco caracteres'
            }
        ];
    }

    adiciona(atendimento, res){
        
        const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss');
        const data = moment(atendimento.data,'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');

        const parametros = {
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.cliente.length}
        }
        const erros = this.valida(parametros);
        const existemErros = erros.length;
        if(existemErros){
            return new Promise((resolve, reject) => reject(erros));
        }else{
            const atendimentoDatado = {...atendimento, data, dataCriacao};
            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId;
                    return {...atendimentoDatado, id};
                });
        }
    }

    lista(){
        return repositorio.lista();
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