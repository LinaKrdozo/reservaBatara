// Función para incrementar los números hasta su valor final
function incrementarNumeros() {
    // Define los números finales (ajustados para incrementar de 5 en 5)
    let numerosFinales = [130, 135, 32];

    // Selecciona todos los elementos h4 con clase informacion__numero
    let elementosNumeros = document.querySelectorAll('.informacion__numero');

    // Itera sobre cada elemento y realiza el incremento
    elementosNumeros.forEach(function(elemento, indice) {
        // Obtiene el número actual
        let numeroActual = 0;

        // Define un intervalo para incrementar el número cada 100ms
        let intervalo = setInterval(function() {
            numeroActual += 5; // Incrementa de 5 en 5
            elemento.textContent = numeroActual;
            if (numeroActual >= numerosFinales[indice]) {
                clearInterval(intervalo);
            }
        }, 100);
    });
}

// Llama a la función cuando el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    incrementarNumeros();
});