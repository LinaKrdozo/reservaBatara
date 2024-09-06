//aqui va toda la logica 
const fs = require('fs');
const path = require('path');
//con el require y la ruta ya me parsea el archivo JSON
const reservas = require('../../data/reservas.json');

let reservasService = {  
    
    reservas: reservas,
    //me retorna todos las reservas del archivo JSON
    getAll: function(){
        //aqui va la relacion con usuarios para que en la tabla salga el nombre de quien reservo
        return this.reservas;
    },
    
    getOneBy: function(id){
          
        let idNumber = Number(id);
        // Busca la reserva en el array de reservas
        let reservaEncontrada = this.reservas.find((reserva) => reserva.id === idNumber);
        
        return reservaEncontrada;
    },

    save: function(reserva){
       

         let idMayor = reservas.reduce((contador, reserva) => {
            if (reserva.id > contador) {
                return reserva.id;
            }
            return contador;
        }, 0);
        
        let idIncrementado = idMayor + 1;

        let NuevaReserva = {
            id: idIncrementado,
            fechaReserva: reserva.fechaReserva,
            fechaEvento: reserva.fechaEvento,
            asistentes: reserva.asistentes,
            tipo_evento: reserva.tipo_evento,
            descripcion: reserva.descripcion,
            hora_inicio: reserva.hora_inicio,
            hora_fin: reserva.hora_fin,
            cantidadHoras: reserva.cantidadHoras,
            fotoPago: reserva.fotoPago,
            disponibilidad: reserva.disponibilidad
        };     

        //guardo la reserva en el array reservas
        this.reservas.push(NuevaReserva);
        fs.writeFileSync(path.join(__dirname, '../../data/reservas.json'), JSON.stringify(this.reservas))
        return "OK"
    },

    update: function(formReservaActualizacion,id){
    
        let buscarReserva= reservas.find(buscarReserva => buscarReserva.id == id)
        
        if (buscarReserva) {
            buscarReserva.fechaReserva = formReservaActualizacion.fechaReserva;
            buscarReserva.fechaEvento = formReservaActualizacion.fechaEvento;
            buscarReserva.asistentes = formReservaActualizacion.asistentes;
            buscarReserva.tipo_evento = formReservaActualizacion.tipo_evento;
            buscarReserva.descripcion = formReservaActualizacion.descripcion;
            if (formReservaActualizacion.fotoPago) {
                buscarReserva.fotoPago = formReservaActualizacion.fotoPago;
            }
            buscarReserva.hora_inicio = formReservaActualizacion.hora_inicio;
            buscarReserva.hora_fin = formReservaActualizacion.hora_fin;
            buscarReserva.cantidadHoras = formReservaActualizacion.cantidadHoras;
            buscarReserva.disponibilidad = formReservaActualizacion.disponibilidad;
        }

        fs.writeFileSync(path.join(__dirname, '../../data/reservas.json'), JSON.stringify(this.reservas))
        
        return buscarReserva;

    },

    delete: function (id) {
        // contiene la nueva lista de reservas sin incluir el que quiero eliminar    
        let nuevasReservas = this.reservas.filter((reserva) => reserva.id != id);
        // sobreescribo la lista de reservas por la nueva lista
        this.reservas = nuevasReservas;
        fs.writeFileSync(path.join(__dirname, '../../data/reservas.json'), JSON.stringify(this.reservas))
        return nuevasReservas;
    }

}

module.exports = reservasService;