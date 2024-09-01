document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            const reservaId = this.getAttribute('data-reserva-id');
            console.log('Reserva ID:', reservaId); // Verifica que el ID sea correcto

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
                    fetch(`/reservas/${reservaId}`, {
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
                                'La reserva ha sido eliminada.',
                                'success'
                            ).then(() => {
                                button.closest('.reservas__item').remove();
                            });
                        } else {
                            Swal.fire(
                                'Error!',
                                'No se pudo eliminar la reserva.',
                                'error'
                            );
                        }
                    }).catch(error => {
                        console.error('Fetch Error:', error);
                        Swal.fire(
                            'Error!',
                            'Ocurrió un error al eliminar la reserva.',
                            'error'
                        );
                    });
                }
            });
        });
    });
});
