document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    cargarLibrosDinamicos();
});

function checkAuth() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        document.getElementById('user-icon').style.display = 'none';
        
        const userInfo = document.getElementById('user-info');
        userInfo.textContent = 'Hola, ' + user.nombre;
        userInfo.style.display = 'inline-block';
        
        const logoutIcon = document.getElementById('logout-icon');
        logoutIcon.style.display = 'inline-block';
        
        logoutIcon.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.reload();
        });
    }
}

async function cargarLibrosDinamicos() {
    try {
        const response = await fetch('http://localhost:5000/api/libros');
        const librosDB = await response.json();
        
        if (librosDB && librosDB.length > 0) {
            const grid = document.getElementById('productos-dinamicos-grid');
            
            // Recorremos en orden inverso para que el más nuevo quede primero al hacer prepend
            librosDB.reverse().forEach(libro => {
                const card = document.createElement('div');
                card.classList.add('producto-card');
                
                card.innerHTML = `
                    <div class="producto-imagen">
                        <img src="${libro.imagen_url || '../../imagenes/almendra.jpg'}" alt="Portada ${libro.titulo}"
                            style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                    <div class="producto-info">
                        <h3 class="producto-nombre">${libro.titulo}</h3>
                        <p class="producto-descripcion">${libro.autor}</p>
                        <p style="font-size: 0.8rem; color: var(--primary); margin-bottom: 5px;">${libro.categorias || ''}</p>
                        <div class="producto-footer">
                            <span class="producto-precio">$${libro.precio}</span>
                            <button class="btn-ver-detalles">Ver Detalles</button>
                        </div>
                    </div>
                `;
                
                // Prepend añade el elemento al principio del grid
                grid.prepend(card);
            });
        }
    } catch (error) {
        console.error('Error cargando los libros de la base de datos:', error);
    }
}
