const fs = require('fs');

/*
createReadStream - cria um stream
pipe - pega o stream e repassa para o createWriteStream
on - escuta um evento e dispara uma função.
*/

module.exports = (caminho, nomeDoArquivo, callBackImagemCriada) => {
    const novoCaminho  = `./assets/imagens/${nomeDoArquivo}`;
    fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on('finish', () => callBackImagemCriada(novoCaminho));
}
