document.addEventListener('DOMContentLoaded', (event) => {
    const tipoEventoSelect = document.getElementById('tipo_evento');
    const disponibilidadSelect = document.getElementById('disponibilidad');
    const fotoPago = document.getElementById('fotoPago');
    const fechaReservaInput = document.getElementById('fechaReserva');
    const fechaEventoInput = document.getElementById('fechaEvento');
    const asistentesInput = document.getElementById('asistentes');
    const horaInicio = document.getElementById('hora_inicio');
    const horaFin = document.getElementById('hora_fin');
    const cantidadHoras = document.getElementById('cantidadHoras');

    // Función para calcular la diferencia en horas entre hora de inicio y fin
    function calcularHoras() {
        const inicio = horaInicio.value;
        const fin = horaFin.value;

        if (inicio && fin) {
            const [inicioHoras, inicioMinutos] = inicio.split(':').map(Number);
            const [finHoras, finMinutos] = fin.split(':').map(Number);

            const horaInicioDate = new Date(2000, 0, 1, inicioHoras, inicioMinutos);
            const horaFinDate = new Date(2000, 0, 1, finHoras, finMinutos);

            // Calcula la diferencia en horas y asegura que no sea negativa
            const diferenciaHoras = Math.max(0, (horaFinDate - horaInicioDate) / (1000 * 60 * 60));
            cantidadHoras.value = diferenciaHoras;
        } else {
            cantidadHoras.value = '';
        }
    }

    // Función para actualizar la visibilidad del campo Foto Pago basado en el tipo de evento
    function actualizarVisibilidadFotoPagoTipoEvento() {
        const valorSeleccionado = tipoEventoSelect.value;

        if (valorSeleccionado === 'educativo' || valorSeleccionado === 'laboral' || valorSeleccionado === 'didactico') {
            fotoPago.style.display = 'none';
        } else if (valorSeleccionado === 'otro') {
            fotoPago.style.display = 'block';
        } else {
            fotoPago.style.display = 'none'; // Opcional: Ocultar en caso de no seleccionar una opción válida
        }
    }

    // Función para actualizar la visibilidad del campo Foto Pago basado en la disponibilidad
    function manejarCambioDisponibilidad() {
        const valorSeleccionado = disponibilidadSelect.value;

        if (valorSeleccionado === 'confirmada') {
            fotoPago.classList.remove('oculto'); 
        } else {
            fotoPago.classList.add('oculto'); 
        }
    }

    // Función para ajustar el máximo permitido de asistentes basado en el tipo de evento
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

    // Establece la fecha mínima para la fecha de reserva (hoy menos un día)
    function establecerFechaMinimaReserva() {
        const hoy = new Date();
        hoy.setUTCHours(0, 0, 0, 0); // Establece la hora a las 00:00:00 para asegurar que solo la fecha sea considerada
        hoy.setDate(hoy.getDate() - 1); // Resta un día a la fecha actual
        const hoyMenosUnDiaStr = hoy.toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
        
        console.log("Fecha mínima establecida: " + hoyMenosUnDiaStr);
        
        // Asigna la fecha mínima en el formato correcto al input de la fecha de reserva
        fechaReservaInput.setAttribute('min', hoyMenosUnDiaStr);
    }

    // Actualiza la fecha del evento agregando 8 días a la fecha de reserva
    function actualizarFechaEvento() {
        const fechaReserva = new Date(fechaReservaInput.value);
        
        if (!isNaN(fechaReserva.getTime())) {
            const fechaEvento = new Date(fechaReserva);
            fechaEvento.setUTCDate(fechaReserva.getUTCDate() + 7); // Agrega 8 días a la fecha de reserva
            const fechaEventoStr = fechaEvento.toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
            
            // Asigna la fecha calculada al input de la fecha del evento
            fechaEventoInput.value = fechaEventoStr;
        } else {
            fechaEventoInput.value = ''; // Limpia el valor si la fecha de reserva no es válida
        }
    }

    // Event listeners para los cambios en los selectores y otros campos
    tipoEventoSelect.addEventListener('change', () => {
        actualizarVisibilidadFotoPagoTipoEvento();
        actualizarMaximoAsistentes();
    });
    disponibilidadSelect.addEventListener('change', manejarCambioDisponibilidad);
    horaInicio.addEventListener('change', calcularHoras);
    horaFin.addEventListener('change', calcularHoras);
    fechaReservaInput.addEventListener('change', actualizarFechaEvento);

    // Inicializar el estado del campo Foto Pago, el límite de asistentes y la fecha del evento en base a las selecciones al cargar la página
    establecerFechaMinimaReserva();
    actualizarVisibilidadFotoPagoTipoEvento();
    manejarCambioDisponibilidad();
    actualizarMaximoAsistentes();
});
