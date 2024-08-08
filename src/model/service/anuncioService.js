const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../data/anuncios.json');
const anuncios = require(filePath);


let anuncioService = {
    anuncios:anuncios,

    getAll:function () {
        return this.anuncios;
    }
}

module.exports = anuncioService;