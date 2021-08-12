const fs = require('fs');
fs.readFile('./assets/dog.jpg', (erro, buffer) => {
    console.log('a imagem foi buferizada');
    
    fs.writeFile('./assets/dog2.jpg', buffer, (erro) =>{
        console.log('A imagem foi escrita dog2.jpg');
    })
});