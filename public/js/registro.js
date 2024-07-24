// Función para mostrar u ocultar el campo de apartamento según la opción seleccionada
function toggleApartamento(select) {
    var apartamentoField = document.getElementById('apartamento-field');
    if (select.value === 'si') {
        apartamentoField.style.display = 'block';
    } else {
        apartamentoField.style.display = 'none';
    }
}

function togglePasswordVisibility() {
    var passwordInput = document.getElementById('contraseña');
    var checkbox = document.getElementById('showPassword');
  
    if (checkbox.checked) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
  