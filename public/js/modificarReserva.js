document.addEventListener('DOMContentLoaded', () => {
    const tipoEventoSelect = document.getElementById('tipo_evento');
    const disponibilidadSelect = document.getElementById('disponibilidad');
    const fotoPago = document.getElementById('foto_pago');
    const fechaReservaInput = document.getElementById('fecha_reserva');
    const fechaEventoInput = document.getElementById('fecha_evento');
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

    // Función para configurar la fecha de reserva basada en la fecha inicial
    function actualizarFechaEvento() {
        const fechaInicial = new Date(fechaReservaInput.value);
        
        if (!isNaN(fechaInicial.getTime())) {
            const fechaEvento = new Date(fechaInicial);
            fechaEvento.setDate(fechaInicial.getDate() + 8);
            
            const fechaEventoString = fechaEvento.toISOString().split('T')[0];
            fechaEventoInput.value = fechaEventoString;
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

    // Función para actualizar la visibilidad del campo de fotoPago
    function updateFotoPagoVisibility() {
        const selectedValue = disponibilidadSelect.value;
        if (selectedValue === 'confirmada') {
            fotoPago.style.display = 'block'; // Muestra el campo de fotoPago
        } else {
            fotoPago.style.display = 'none'; // Oculta el campo de fotoPago
        }
    }

    // Event listeners para los cambios en los selectores
    tipoEventoSelect.addEventListener('change', () => {
        updateFotoPagoVisibility();
        actualizarMaximoAsistentes();
    });
    disponibilidadSelect.addEventListener('change', manejarCambioDisponibilidad);
    horaInicio.addEventListener('change', calcularHoras);
    horaFin.addEventListener('change', calcularHoras);
    fechaReservaInput.addEventListener('change', actualizarFechaEvento);
    
    updateFotoPagoVisibility();
    manejarCambioDisponibilidad();
    actualizarMaximoAsistentes();

});