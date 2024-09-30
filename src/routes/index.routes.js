const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const indexController = require('../controllers/indexController');
const usuariosRouter = require('./usuarios.routes')
const reservasRouter = require('./reservas.routes')
const apiRouter = require('./api.routes')


router.get('/', indexController.index); 
router.use('/usuarios', usuariosRouter);
router.use('/reservas', reservasRouter);
router.use('/api/', apiRouter);

module.exports = router;