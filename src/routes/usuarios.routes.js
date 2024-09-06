const express = require('express');
const router = express.Router();
const validacionesRegistro = require('../middlewares/validacionesRegistro');
const guestMid= require('../middlewares/guestMid')
const authMid= require('../middlewares/authMid');
const credentialsMid = require('../middlewares/credentialsMid');

// ************ Controller Require ************
const usuariosController = require('../controllers/usuariosController');
const uploadMulterUsers = require("../middlewares/multerUsuarios");

//********** METODOS PARA EL USUARIO********/

//***** formulario de registro *****/
router.get('/registro', guestMid, usuariosController.registro )
router.post('/registro', uploadMulterUsers.single('foto'), validacionesRegistro, usuariosController.processRegistro)

//***** formulario de login *****/
router.get('/login', guestMid, usuariosController.login)
router.post('/inicioSesion', usuariosController.loginProcess)

//***** perfil de usuario *****/
router.get('/perfil', uploadMulterUsers.single('foto'), authMid , usuariosController.perfil )
//logout
router.get('/logout', usuariosController.logout)


//********** METODOS PARA EL ADMINISTRADOR********/

//*******Traer todos los usuarios ********/
router.get('/panelAdmin', credentialsMid.adminMid ,usuariosController.getAllUsers); 
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