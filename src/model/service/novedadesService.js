const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../data/novedades.json');
const novedades = require(filePath);


let novedadesService = {
    novedades:novedades,

    getAll:function () {
        return this.novedades;
    }
}

module.exports = novedadesService;