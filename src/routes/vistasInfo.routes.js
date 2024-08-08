const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const vistasInfoController = require('../controllers/vistasInfoController');

router.get('/servicios', vistasInfoController.principalesServicios); 
router.get('/novedades', vistasInfoController.novedades); 
router.get('/documentos', vistasInfoController.documentos); 
router.get('/ubicacion', vistasInfoController.ubicacion); 

module.exports = router;