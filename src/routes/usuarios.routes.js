const express = require('express');
const router = express.Router();
const validacionesRegistro = require('../middlewares/validacionesRegistro');
const validacionesLogin= require('../middlewares/validacionesLogin')

// ************ Controller Require ************
const usuariosController = require('../controllers/usuariosController');
const uploadMulterUsers = require("../middlewares/multerUsuarios");

//********** METODOS PARA EL USUARIO********/

//***** formulario de registro *****/
router.get('/registro',usuariosController.registro )
router.post('/registro', uploadMulterUsers.single('foto'), validacionesRegistro, usuariosController.processRegistro)

//***** formulario de login *****/
router.get('/login',usuariosController.login)

//***** perfil de usuario *****/
//router.get('/perfil/:userId',usuariosController.perfil )
router.get('/perfil/:userId',usuariosController.perfil )


//********** METODOS PARA EL ADMINISTRADOR********/

//*******Traer todos los usuarios ********/
router.get('/', usuariosController.getAllUsers); 
//******** Traer usuario por id ******/
router.get('/admin/detalle/:id', usuariosController.detalleUsuarios);

/****CREATE ADMIN USERS */
router.get('/admin/create/', usuariosController.create); 
router.post('/admin',uploadMulterUsers.single('foto'), usuariosController.store); 

/*** EDIT ONE USERS ***/ 
router.get('/admin/edit/:id', usuariosController.edit); 
router.put('/admin/:id', uploadMulterUsers.single('foto'), usuariosController.update);

/*** DELETE ONE USER***/ 
router.delete('/:id', usuariosController.destroy); 

module.exports = router;