const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../data/servicios.json');
const servicios = require(filePath);


let servicioService = {
    servicios:servicios,

    getAll:function () {
        return this.servicios;
    }
}

module.exports = servicioService;