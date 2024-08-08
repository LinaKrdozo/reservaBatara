const servicioService = require('../model/service/servicioService');
const novedadesService = require('../model/service/novedadesService');
const documentosService = require('../model/service/documentoService');

const vistasController = {
    principalesServicios: (req,res) =>{
        let servicios = servicioService.getAll();
        res.render('servicios',{'servicios': servicios})
    }, 
    novedades: (req,res) =>{
        let novedades = novedadesService.getAll();
        res.render('novedades',{'novedades': novedades})
    },
    documentos: (req,res) =>{
        let documentos = documentosService.getAll();
        res.render('documentos',{'documentos': documentos})
    },
    ubicacion: (req,res) =>{
        res.render('ubicacion')
    }
}
module.exports = vistasController ;