function toggleApartamento(selectElement) {
    let apartamentoGrupo = document.getElementById('apartamento');
    if (apartamentoGrupo) {
        if (selectElement.value === 'si') {
            apartamentoGrupo.classList.remove('oculto');
        } else {
            apartamentoGrupo.classList.add('oculto');
        }
    }
    toggleRolOptions(selectElement.value);
}

function toggleRolOptions(isResidente) {
    let nombreRolSelect = document.getElementById('nombreRol');
    if (nombreRolSelect) {
        let options = nombreRolSelect.querySelectorAll('option');
        options.forEach(option => {
            if (option.value === 'residente') {
                if (isResidente === 'si') {
                    option.style.display = 'block';
                } else {
                    option.style.display = 'none';
                    if (nombreRolSelect.value === 'residente') {
                        nombreRolSelect.value = '';
                    }
                }
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    let residenteSelect = document.getElementById('residente');

    if (residenteSelect) {
        residenteSelect.addEventListener('change', function() {
            toggleApartamento(this);
        });
        // Inicializar el estado del campo de apartamento y las opciones de rol en base al valor actual
        toggleApartamento(residenteSelect);
    }

});
