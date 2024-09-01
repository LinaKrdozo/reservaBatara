document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const usuarioId = this.getAttribute('data-usuario-id');

            Swal.fire({
                title: '¿Estás seguro?',
                text: "Esta acción no se puede deshacer",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`/usuarios/${usuarioId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        console.log('Response Status:', response.status); 
                        return response.json();
                    }).then(data => {
                        if (data.success) {
                            Swal.fire(
                                'Eliminado!',
                                'El usuario ha sido eliminado.',
                                'success'
                            ).then(() => {
                                button.closest('.lista-usuarios__item').remove();
                            });
                        } else {
                            Swal.fire(
                                'Error!',
                                'No se pudo eliminar el usuario.',
                                'error'
                            );
                        }
                    }).catch(error => {
                        console.error('Fetch Error:', error);
                        Swal.fire(
                            'Error!',
                            'Ocurrió un error al eliminar el usuario.',
                            'error'
                        );
                    });
                }
            });
        });
    });
});
