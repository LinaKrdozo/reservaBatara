document.addEventListener('DOMContentLoaded', (event) => {
    const tipoEventoSelect = document.getElementById('tipo_evento');
    const disponibilidadSelect = document.getElementById('disponibilidad');
    const fechaReservaInput = document.getElementById('fecha_reserva');
    const fechaEventoInput = document.getElementById('fecha_evento');
    const asistentesInput = document.getElementById('asistentes');


     async function obtenerFechasReservadas() {
        try {
            const response = await fetch('/api/reservas'); 
            const data = await response.json();
            return data.fechasReservadas;
        } catch (error) {
            console.error("Error al obtener fechas reservadas:", error);
            return [];
        }
    }

    async function bloquearFechas() {
        const fechasReservadas = await obtenerFechasReservadas();
        
        const fechasReservadasFormateadas = fechasReservadas.map(fecha => ({
            reserva: new Date(fecha.fechaReserva).toISOString().split('T')[0],
            evento: new Date(fecha.fechaEvento).toISOString().split('T')[0]
        }));
    
        fechaReservaInput.addEventListener('input', () => {
            const fechaSeleccionada = fechaReservaInput.value;
    
            const reservasOcupadas = fechasReservadasFormateadas.filter(f => f.reserva === fechaSeleccionada);
            if (reservasOcupadas.length > 0) {
                alert('La fecha de reserva seleccionada ya está reservada. Elija otra fecha.');
                fechaReservaInput.value = ''; 
            }

            if (fechaEventoInput.value) {
                const eventosOcupados = fechasReservadasFormateadas.filter(f => f.evento === fechaEventoInput.value);
                if (eventosOcupados.length > 0) {
                    alert('La fecha del evento ya está reservada. Elija otra fecha.');
                    fechaEventoInput.value = ''; 
                }
            }
        });
    
        fechaEventoInput.addEventListener('input', () => {
            const fechaSeleccionada = fechaEventoInput.value;

            const eventosOcupados = fechasReservadasFormateadas.filter(f => f.evento === fechaSeleccionada);
            if (eventosOcupados.length > 0) {
                alert('La fecha del evento seleccionada ya está reservada. Elija otra fecha.');
                fechaEventoInput.value = ''; 
            }

            if (fechaReservaInput.value) {
                const reservasOcupadas = fechasReservadasFormateadas.filter(f => f.reserva === fechaReservaInput.value);
                if (reservasOcupadas.length > 0) {
                    alert('La fecha de reserva ya está ocupada por un evento. Elija otra fecha.');
                    fechaReservaInput.value = ''; 
                }
            }
        });
    }

    function actualizarMaximoAsistentes() {
        const tipoEvento = tipoEventoSelect.value;
        let maxAsistentes = 50; 
    
        asistentesInput.setAttribute('max', maxAsistentes);
        asistentesInput.setAttribute('placeholder', `1-${maxAsistentes}`);
    }

    function establecerFechaMinimaReserva() {
        const hoy = new Date();
        hoy.setUTCHours(0, 0, 0, 0); 
        hoy.setDate(hoy.getDate() - 1);
        const hoyMenosUnDiaStr = hoy.toISOString().split('T')[0]; 
        
        console.log("Fecha mínima establecida: " + hoyMenosUnDiaStr);

        fechaReservaInput.setAttribute('min', hoyMenosUnDiaStr);
    }

    function actualizarFechaEvento() {
        const fechaReserva = new Date(fechaReservaInput.value);
        
        if (!isNaN(fechaReserva.getTime())) {
            const fechaEvento = new Date(fechaReserva);
            fechaEvento.setUTCDate(fechaReserva.getUTCDate() + 7); 
            const fechaEventoStr = fechaEvento.toISOString().split('T')[0]; 
            
            fechaEventoInput.value = fechaEventoStr;
        } else {
            fechaEventoInput.value = ''; 
        }
    }

    tipoEventoSelect.addEventListener('change', () => {
        actualizarMaximoAsistentes();
    });
    fechaReservaInput.addEventListener('change', actualizarFechaEvento);

    establecerFechaMinimaReserva();
    bloquearFechas();
   /* manejarCambioDisponibilidad();*/
    actualizarMaximoAsistentes();
});
