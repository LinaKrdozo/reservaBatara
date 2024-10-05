function incrementarNumeros() {
    let numerosFinales = [133, 133, 32];
    let elementosNumeros = document.querySelectorAll('.informacion__numero');

    elementosNumeros.forEach(function(elemento, indice) {
        let numeroActual = 0;

        let intervalo = setInterval(function() {
            numeroActual += 4; 
            elemento.textContent = numeroActual;
            if (numeroActual >= numerosFinales[indice]) {
                clearInterval(intervalo);
            }
        }, 100);
    });
}

// Función para manejar la animación de scroll
function animarElementos() {
    const anuncios = document.querySelectorAll('.caracteristicas__anuncio');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Deja de observar una vez que es visible
            }
        });
    });

    anuncios.forEach(anuncio => {
        observer.observe(anuncio);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    incrementarNumeros();
    animarElementos(); // Llama a la función para animar elementos al hacer scroll
});
