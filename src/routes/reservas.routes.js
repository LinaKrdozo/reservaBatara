const express = require('express');
const router = express.Router();
//const path = require('path');
const uploadMulter = require("../middlewares/multerReservas");
const reservasController = require('../controllers/reservasController');

/*** GET ALL BOOKINGS ADMIN ***/ 
router.get('/', reservasController.getAllReservas);
router.get('/reservas/detalle/:id', reservasController.detail);

/****CREATE ADMIN BOOKINGS */
router.get('/reservas/create/', reservasController.create); 
router.post('/reservas',uploadMulter.single('fotoPago'), reservasController.store); 

/*** EDIT ONE BOOKING ***/ 
router.get('/reservas/edit/:id', reservasController.edit); 
router.put('/reservas/:id', uploadMulter.single('fotoPago'), reservasController.update);

/*** DELETE ONE BOOKINGS***/ 
router.delete('/:id', reservasController.destroy); 

module.exports = router;