
// Función para mostrar/ocultar la contraseña
function togglePasswordVisibility() {
    let passwordInput = document.getElementById('password');
    let showPasswordCheckbox = document.getElementById('showPassword');
    if (passwordInput && showPasswordCheckbox) {
        if (showPasswordCheckbox.checked) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    }
}

// Agregar eventos a los elementos del DOM cuando esté cargado
document.addEventListener('DOMContentLoaded', function() {
    var showPasswordCheckbox = document.getElementById('showPassword');
    
    if (showPasswordCheckbox) {
        showPasswordCheckbox.addEventListener('change', togglePasswordVisibility);
    }
});