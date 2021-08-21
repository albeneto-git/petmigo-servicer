const fs = require('fs');
const path = require('path');

/*
createReadStream - cria um stream
pipe - pega o stream e repassa para o createWriteStream
on - escuta um evento e dispara uma função.
*/

module.exports = (caminho, nomeDoArquivo, callBackImagemCriada) => {
    
    const tipoValidos = ['jpg', 'png', 'jpeg'];
    const tipo = path.extname(caminho);
    const tipoEhValido = tipoValidos.indexOf(tipo.substring(1)) !== -1;

    if(tipoEhValido){
        
        const novoCaminho  = `./assets/imagens/${nomeDoArquivo}${tipo}`;
        
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callBackImagemCriada(false, novoCaminho));

    }else{
        const erro = "Tipo é inválido";
        callBackImagemCriada(erro);
    }

}
