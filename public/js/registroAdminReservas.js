// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', (event) => {
    // Obtiene referencias a los elementos del DOM
    const disponibilidadSelect = document.getElementById('disponibilidad');
    const fotoPagoGrupo = document.getElementById('fotoPagoGrupo');

    // Función para manejar el cambio en el menú desplegable
    function manejarCambioDisponibilidad() {
        const valorSeleccionado = disponibilidadSelect.value;

        if (valorSeleccionado === 'confirmada') {
            fotoPagoGrupo.classList.remove('oculto'); // Muestra el campo de foto de pago
        } else {
            fotoPagoGrupo.classList.add('oculto'); // Oculta el campo de foto de pago
        }
    }

    // Agrega un listener para el evento de cambio en el menú desplegable
    disponibilidadSelect.addEventListener('change', manejarCambioDisponibilidad);

    // Ejecuta la función para aplicar el estado inicial
    manejarCambioDisponibilidad();
});
