document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener valores
    const nombre = document.getElementById('prodNombre').value;
    const autor = document.getElementById('prodAutor').value;
    const precio = document.getElementById('prodPrecio').value;
    const stock = document.getElementById('prodStock').value;

    // Aquí iría la lógica para agregar a la tabla o base de datos
    console.log("Alta de producto:", { nombre, autor, precio, stock });

    alert(`Producto "${nombre}" dado de alta correctamente.`);

    // Limpiar formulario
    this.reset();
});

// Ejemplo de delegación de eventos para botones de la tabla
document.querySelector('#productTable').addEventListener('click', function (e) {
    if (e.target.closest('.btn-delete')) {
        if (confirm('¿Estás seguro de eliminar este libro?')) {
            alert('Producto eliminado (simulación)');
        }
    }

    if (e.target.closest('.btn-edit')) {
        alert('Abriendo modo edición para el producto...');
    }
});