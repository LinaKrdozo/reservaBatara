const detalleService = require("../model/service/detalleService");
const reservasService = require("../model/service/reservasService");

module.exports ={

    getAllReservasConDetalle: async function(req, res) {
        try {
            let reservas = await reservasService.getAll();
            let detalleReservas = await detalleService.getAllDetalleReservas();
            let reservasCompletas = [];
    
            const fechasReservadas = reservas.map(reserva => ({
                fechaReserva: reserva.fecha_reserva,
                fechaEvento: reserva.fecha_evento
            }));
    
            for (let i = 0; i < reservas.length; i++) {
                let reserva = reservas[i];
                let detallesParaReserva = detalleReservas.filter(detalle => detalle.reserva_idReserva === reserva.idReserva);
                
                reservasCompletas.push({
                    reserva: reserva,
                    detalles: detallesParaReserva
                });
            }
            
            return res.status(200).json({ reservasCompletas, fechasReservadas });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    
};