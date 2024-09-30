const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../data/junta.json');
const junta = require(filePath);


let juntaService = {
    junta:junta,

    getAll:function () {
        return this.junta;
    }
}

module.exports = juntaService;