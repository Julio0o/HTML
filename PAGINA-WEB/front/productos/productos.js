function fixImagePath(url) {
    if (!url) return '../../imagenes/almendra.jpg';
    if (url.startsWith('http')) return url;
    const filename = url.split('/').pop();
    return `https://kobo-backend.azurewebsites.net/imagenes/${filename}`;
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    cargarLibrosDinamicos();
});

function checkAuth() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        
        // Redirigir al admin a su panel (Requerimiento)
        if (user.rol === 'admin') {
            window.location.href = '../../admin/dashboard.html';
            return;
        }

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
        const response = await fetch('https://kobo-backend.azurewebsites.net/api/libros');
        const librosDB = await response.json();
        
        if (librosDB && librosDB.length > 0) {
            const grid = document.getElementById('productos-dinamicos-grid');
            grid.innerHTML = ''; // Limpiar antes de cargar
            
            librosDB.reverse().forEach(libro => {
                const card = document.createElement('div');
                card.classList.add('producto-card');
                if (libro.cantidad <= 0) card.classList.add('agotado');
                
                card.innerHTML = `
                    <div class="producto-imagen">
                        <img src="${fixImagePath(libro.imagen_url)}" alt="Portada ${libro.titulo}"
                            style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                    <div class="producto-info">
                        <h3 class="producto-nombre">${libro.titulo}</h3>
                        <p class="producto-descripcion">${libro.autor}</p>
                        <p style="font-size: 0.8rem; color: var(--primary); margin-bottom: 5px;">${libro.categorias || ''}</p>
                        <div class="producto-footer">
                            <span class="producto-precio">$${libro.precio}</span>
                            ${libro.cantidad > 0 
                                ? `<button class="btn-cart-icon" onclick='agregarAlCarrito(${JSON.stringify(libro).replace(/'/g, "&apos;")})'><i class="fas fa-cart-plus"></i></button>`
                                : `<span class="agotado-badge">Agotado</span>`
                            }
                        </div>
                    </div>
                `;
                
                grid.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error cargando los libros de la base de datos:', error);
    }
}
