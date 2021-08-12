const fs = require('fs');

/*
createReadStream - cria um stream
pipe - pega o stream e repassa para o createWriteStream
on - escuta um evento e dispara uma função.
*/
fs.createReadStream('./assets/dog.jpg')
    .pipe(fs.createWriteStream('./assets/dog_stream.jpg'))
    .on('finish', () => console.log('imagem foi escrita com sucesso!'));