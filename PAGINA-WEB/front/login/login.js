document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulación de validación
    if (email && password) {
        Swal.fire({
            title: '¡Éxito!',
            text: 'Intentando iniciar sesión para: ' + email,
            icon: 'info',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6'
        });
        // Aquí conectarías con tu lógica de backend más adelante
    } else {
        Swal.fire({
            title: 'Oops...',
            text: 'Por favor, completa todos los campos',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo',
            confirmButtonColor: '#d33'
        });
    }
});