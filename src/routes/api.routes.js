const express = require('express');
const router = express.Router();

const apiReservasController = require('../controllers/apiReservasController')

//reservas

router.get('/reservas/', apiReservasController.getAllReservasConDetalle)

module.exports = router;