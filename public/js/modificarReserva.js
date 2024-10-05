document.addEventListener('DOMContentLoaded', () => {
    const tipoEventoSelect = document.getElementById('tipo_evento');
    const disponibilidadSelect = document.getElementById('disponibilidad');
    const fechaReservaInput = document.getElementById('fecha_reserva');
    const fechaEventoInput = document.getElementById('fecha_evento');
    const asistentesInput = document.getElementById('asistentes');

     function actualizarMaximoAsistentes() {
        const tipoEvento = tipoEventoSelect.value;
        let maxAsistentes = 50

        asistentesInput.setAttribute('max', maxAsistentes);
        asistentesInput.setAttribute('placeholder', `1-${maxAsistentes}`);
    }

    function actualizarFechaEvento() {
        const fechaInicial = new Date(fechaReservaInput.value);
        
        if (!isNaN(fechaInicial.getTime())) {
            const fechaEvento = new Date(fechaInicial);
            fechaEvento.setDate(fechaInicial.getDate() + 8);
            
            const fechaEventoString = fechaEvento.toISOString().split('T')[0];
            fechaEventoInput.value = fechaEventoString;
        }
    }

    disponibilidadSelect.addEventListener('change', manejarCambioDisponibilidad);
    fechaReservaInput.addEventListener('change', actualizarFechaEvento);
    

    manejarCambioDisponibilidad();
    actualizarMaximoAsistentes();

});