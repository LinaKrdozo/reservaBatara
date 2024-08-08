const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usuariosControllers = require('../controllers/usuariosController');


//********** METODOS PARA EL ADMINISTRADOR********/

//*******Traer todos los usuarios ********/
router.get('/admin', usuariosControllers.getAllUsers); 
//******** Traer usuario por id ******/
router.get('/detalle/:id', usuariosControllers.detalleUsuarios);

module.exports = router;