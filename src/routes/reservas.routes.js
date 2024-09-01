const express = require('express');
const router = express.Router();
//const path = require('path');
const uploadMulter = require("../middlewares/multerReservas");
const reservasController = require('../controllers/reservasController');

/******** RUTAS DE RESERVA USUARIO ************* */
router.get('/user/create/', reservasController.createReserva); 
router.post('/user',uploadMulter.single('fotoPago'), reservasController.storeReserva); 


/******** RUTAS DE RESERVA ADMIN ************* */
/*** GET ALL BOOKINGS ADMIN ***/ 
router.get('/', reservasController.getAllReservas);
router.get('/admin/detalle/:id', reservasController.detail);

/****CREATE ADMIN BOOKINGS */
router.get('/admin/create/', reservasController.create); 
router.post('/admin',uploadMulter.single('fotoPago'), reservasController.store); 

/*** EDIT ONE BOOKING ***/ 
router.get('/admin/edit/:id', reservasController.edit); 
router.put('/admin/:id', uploadMulter.single('fotoPago'), reservasController.update);

/*** DELETE ONE BOOKING***/ 
router.delete('/:id', reservasController.destroy); 

module.exports = router;