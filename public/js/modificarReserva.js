document.addEventListener('DOMContentLoaded', () => {
    const tipoEventoSelect = document.getElementById('tipo_evento');
    const disponibilidadSelect = document.getElementById('disponibilidad');
    const fotoPago = document.getElementById('fotoPago');
    const fechaReservaInput = document.getElementById('fechaReserva');
    const fechaEventoInput = document.getElementById('fechaEvento');
    const asistentesInput = document.getElementById('asistentes');


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
    fechaReservaInput.addEventListener('change', actualizarFechaEvento);
    
    updateFotoPagoVisibility();
    manejarCambioDisponibilidad();
    actualizarMaximoAsistentes();

});