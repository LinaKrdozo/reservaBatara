const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../data/documentos.json');
const documentos = require(filePath);


let documentoService = {
    documentos:documentos,

    getAll:function () {
        return this.documentos;
    }
}

module.exports = documentoService;