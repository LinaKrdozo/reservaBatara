const express = require('express');
const router = express.Router();
//const path = require('path');
const uploadMulter = require("../middlewares/multerReservas");
const reservasController = require('../controllers/reservasController');
const usuariosController = require('../controllers/usuariosController');

/******** RUTAS DE RESERVA USUARIO ************* */
router.get('/perfil', usuariosController.perfil);

/****DETAIL BOOKINGS */
router.get('/perfil/detalle/:id', reservasController.detailReservaUser);

/****CREATE USER BOOKINGS */
router.get('/perfil/create/', reservasController.createReserva); 
router.post('/perfil',uploadMulter.single('foto_pago'), reservasController.storeReserva); 


/******** RUTAS DE RESERVA ADMINISTRADOR ************* */

/*** GET ALL BOOKINGS ADMIN ***/ 
router.get('/', reservasController.getAllReservas);
router.get('/admin/detalle/:id', reservasController.detail);

/****CREATE ADMIN BOOKINGS */
router.get('/admin/create/', reservasController.create); 
router.post('/admin',uploadMulter.single('foto_pago'), reservasController.store); 

/*** EDIT ONE BOOKING ***/ 
router.get('/admin/edit/:id', reservasController.edit); 
router.put('/admin/:id', uploadMulter.single('foto_pago'), reservasController.update);

/*** DELETE ONE BOOKING***/ 
router.delete('/:id', reservasController.destroy); 

module.exports = router;