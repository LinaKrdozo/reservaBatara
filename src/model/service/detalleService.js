let db = require('../db/models')

module.exports = {
    getAllDetalleReservas: async function() {
        try {
            return await db.DetalleReservas.findAll();
        } catch (error) {
            console.log(error);
        } 
    },
    getOneDetail: async function(idReserva) {
        try {
            return await db.DetalleReservas.findOne({
                where: {
                    reserva_idReserva: idReserva
                } 
            });

        } catch (error) {
            console.log(error);
        } 
    },

    
};

