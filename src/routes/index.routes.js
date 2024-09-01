const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const indexController = require('../controllers/indexController');
const usuariosRouter = require('./usuarios.routes')
const reservasRouter = require('./reservas.routes')

router.get('/', indexController.index); 
router.use('/usuarios', usuariosRouter);
router.use('/reservas', reservasRouter);

module.exports = router;