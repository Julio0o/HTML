document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulación de validación
    if (email && password) {
        alert('Intentando iniciar sesión para: ' + email);
        // Aquí conectarías con tu lógica de backend más adelante
    } else {
        alert('Por favor, completa todos los campos');
    }
});