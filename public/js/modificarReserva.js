document.addEventListener('DOMContentLoaded', () => {
    const disponibilidadSelect = document.getElementById('disponibilidad');
    const fotoPagoContainer = document.getElementById('fotoPago');

    // Función para actualizar la visibilidad del campo de fotoPago
    function updateFotoPagoVisibility() {
        const selectedValue = disponibilidadSelect.value;
        if (selectedValue === 'confirmada') {
            fotoPagoContainer.style.display = 'block'; // Muestra el campo de fotoPago
        } else {
            fotoPagoContainer.style.display = 'none'; // Oculta el campo de fotoPago
        }
    }

    // Llama a la función inicialmente para establecer el estado correcto
    updateFotoPagoVisibility();

    // Añade un listener para actualizar el estado cada vez que cambie la disponibilidad
    disponibilidadSelect.addEventListener('change', updateFotoPagoVisibility);
});