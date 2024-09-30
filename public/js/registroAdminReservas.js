document.addEventListener('DOMContentLoaded', (event) => {
    const tipoEventoSelect = document.getElementById('tipo_evento');
    const disponibilidadSelect = document.getElementById('disponibilidad');
    const fotoPago = document.getElementById('foto_pago');
    const fechaReservaInput = document.getElementById('fecha_reserva');
    const fechaEventoInput = document.getElementById('fecha_evento');
    const asistentesInput = document.getElementById('asistentes');
    const horaInicio = document.getElementById('hora_inicio');
    const horaFin = document.getElementById('hora_fin');
    const cantidadHoras = document.getElementById('cantidad_horas');


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

    function calcularHoras() {
        const inicio = horaInicio.value;
        const fin = horaFin.value;

        if (inicio && fin) {
            const [inicioHoras, inicioMinutos] = inicio.split(':').map(Number);
            const [finHoras, finMinutos] = fin.split(':').map(Number);

            const horaInicioDate = new Date(2000, 0, 1, inicioHoras, inicioMinutos);
            const horaFinDate = new Date(2000, 0, 1, finHoras, finMinutos);

            const diferenciaHoras = Math.max(0, (horaFinDate - horaInicioDate) / (1000 * 60 * 60));
            cantidadHoras.value = diferenciaHoras;
        } else {
            cantidadHoras.value = '';
        }
    }

    function actualizarVisibilidadFotoPagoTipoEvento() {
        const valorSeleccionado = tipoEventoSelect.value;

        if (valorSeleccionado === 'educativo' || valorSeleccionado === 'laboral' || valorSeleccionado === 'didactico') {
            fotoPago.style.display = 'none';
        } else if (valorSeleccionado === 'otro') {
            fotoPago.style.display = 'block';
        } else {
            fotoPago.style.display = 'none'; 
        }
    }

    function manejarCambioDisponibilidad() {
        const valorSeleccionado = disponibilidadSelect.value;

        if (valorSeleccionado === 'confirmada') {
            fotoPago.classList.remove('oculto'); 
        } else {
            fotoPago.classList.add('oculto'); 
        }
    }

    function actualizarMaximoAsistentes() {
        const tipoEvento = tipoEventoSelect.value;
        let maxAsistentes;

        if (tipoEvento === 'educativo' || tipoEvento === 'laboral' || tipoEvento === 'didactico') {
            maxAsistentes = 8;
        } else {
            maxAsistentes = 50;
        }

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
        actualizarVisibilidadFotoPagoTipoEvento();
        actualizarMaximoAsistentes();
    });
    disponibilidadSelect.addEventListener('change', manejarCambioDisponibilidad);
    horaInicio.addEventListener('change', calcularHoras);
    horaFin.addEventListener('change', calcularHoras);
    fechaReservaInput.addEventListener('change', actualizarFechaEvento);

    establecerFechaMinimaReserva();
    bloquearFechas();
    actualizarVisibilidadFotoPagoTipoEvento();
    manejarCambioDisponibilidad();
    actualizarMaximoAsistentes();
});
