const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let db = require('../db/models')


module.exports = {  
    
    getAll: async function() {
        try {
            return await db.Reservas.findAll();
        } catch (error) {
            console.log(err);
            reject([])
        } 
    },

    getOneBy: async function(id) {
        try {
            return await db.Reservas.findByPk(id);
        } catch (error) {
            console.log(error);
        } 
    },

    getByUser: async function(userId) {
        try {
            return await db.Reservas.findAll({
                where: {
                    usuarios_idUsuarios: userId 
                }
            });
        } catch (error) {
            console.log(error);
        }
    },

    save: async function(nuevaReserva, idUsuario){
       
        let reserva = new Reserva(nuevaReserva);
        let reservaCreada = await db.Reservas.create(reserva)
        let idReserva = reservaCreada.idReserva

        let detalleReserva = new DetalleReserva(nuevaReserva);
        detalleReserva.reserva_idReserva = idReserva
        detalleReserva.usuarios_idUsuarios = idUsuario

        await db.DetalleReservas.create(detalleReserva)

        return reservaCreada.dataValues

    },

    update: async function (body, idDeReserva){

        try {
            let reserva = new Reserva (body);
            
            await db.Reservas.update(reserva, 
                {where: {idReserva: idDeReserva}
            });

            let detalle_reservas = await db.DetalleReservas.findOne({
                where: {
                    reserva_idReserva: idDeReserva
                }
            });

            let detalleReserva = new DetalleReserva(body);
            detalleReserva.idDetalle_reserva = detalle_reservas.dataValues.idDetalle_reserva;

            await db.DetalleReservas.update(detalleReserva, 
                { where: {
                    idDetalle_reserva: detalleReserva.idDetalle_reserva
                }
            });

        } catch (error) {
            console.log(error);
            throw new Error("Un error");
        }

    },

    delete: async function (idReserva) {

        try {

            let detalle_reservas = await db.DetalleReservas.findAll({
                where: {
                    reserva_idReserva: idReserva
                }
            });
           
            await db.DetalleReservas.destroy({
                where: {
                    reserva_idReserva: idReserva
                }
            });
            

            let ReservaEliminada = await db.Reservas.destroy({
                where: {
                    idReserva : idReserva
                }
            });

            return ReservaEliminada;

        } catch (error) {
            console.log(error);
            throw new Error("Error al eliminar la reserva");
        }
    }

}

function Reserva({fecha_reserva, fecha_evento, tipo_evento, disponibilidad }){
    this.fecha_reserva = fecha_reserva;
    this.fecha_evento = fecha_evento;
    this.tipo_evento = tipo_evento;
    this.disponibilidad = disponibilidad;
}

function DetalleReserva({ asistentes, descripcion, hora_inicio, hora_fin, cantidad_horas, foto_pago }){
    this.asistentes = asistentes;
    this.descripcion = descripcion;
    this.hora_inicio = hora_inicio;
    this.hora_fin = hora_fin;
    this.cantidad_horas = cantidad_horas;
    this.foto_pago = foto_pago;
}
