function fixImagePath(url) {
    if (!url) return '../imagenes/almendra.jpg';
    if (url.startsWith('http')) return url;
    const filename = url.split('/').pop();
    return `https://kobo-backend-bwf8evc5eggkg5gk.canadacentral-01.azurewebsites.net/imagenes/${filename}`;
}

async function cargarProductos() {
    const carruselTrack = document.getElementById('carruselTrack');
    if (!carruselTrack) return;
    
    try {
        const response = await fetch('https://kobo-backend-bwf8evc5eggkg5gk.canadacentral-01.azurewebsites.net/api/libros');
        const librosDB = await response.json();
        
        carruselTrack.innerHTML = '';
        
        // Mostrar solo los primeros 6 para el carrusel
        librosDB.slice(0, 6).forEach(libro => {
            const card = document.createElement('div');
            card.classList.add('swiper-slide', 'producto-card');
            if (libro.cantidad <= 0) card.classList.add('agotado');
            
            card.innerHTML = `
                <div class="producto-imagen" style="padding: 1rem;">
                    <img src="${fixImagePath(libro.imagen_url)}" alt="Portada ${libro.titulo}" style="width: 100%; height: 100%; object-fit: contain;">
                </div>
                <div class="producto-info">
                    <h3 style="font-size: 1.8rem; text-align: center; color: var(--dark); margin-bottom: 1rem;">${libro.titulo}</h3>
                    <div style="text-align: center; margin-bottom: 1rem;">
                        <span style="font-size: 1.6rem; color: var(--pink); font-weight: bold;">$${libro.precio}</span>
                    </div>
                    ${libro.cantidad > 0 
                        ? `<button class="btn-producto" onclick='agregarAlCarrito(${JSON.stringify(libro).replace(/'/g, "&apos;")})'>Añadir al Carrito</button>`
                        : `<div style="text-align: center;"><span class="agotado-badge">Agotado</span></div>`
                    }
                </div>
            `;
            carruselTrack.appendChild(card);
        });

        new Swiper('.carrusel-contenedor', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: librosDB.length > 3,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: {
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 }
            }
        });
    } catch (error) {
        console.error('Error cargando productos para el carrusel:', error);
    }
}

function checkAuth() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        
        // Redirigir al admin a su panel si entra al index (Requerimiento)
        if (user.rol === 'admin') {
            window.location.href = 'admin/dashboard.html';
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

const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

function iniciarAnimaciones() {
    const elementosAnimados = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .zoom-in');
    elementosAnimados.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    cargarProductos();
    iniciarAnimaciones();
});
