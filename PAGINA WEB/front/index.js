// 1. Datos de los productos (puedes agregar más aquí)
const productos = [
    { id: 1, nombre: "Producto Premium 1", icono: "fa-tshirt" },
    { id: 2, nombre: "Producto Premium 2", icono: "fa-mobile-alt" },
    { id: 3, nombre: "Producto Premium 3", icono: "fa-couch" },
    { id: 4, nombre: "Producto Premium 4", icono: "fa-laptop" },
    { id: 5, nombre: "Producto Premium 5", icono: "fa-headphones" },
    { id: 6, nombre: "Producto Premium 6", icono: "fa-camera" }
];

const carruselTrack = document.getElementById('carruselTrack');

// 2. Función para renderizar los productos en el HTML
function cargarProductos() {
    productos.forEach(prod => {
        const card = document.createElement('div');
        card.classList.add('producto-card');
        card.innerHTML = `
            <div class="producto-imagen">
                <i class="fas ${prod.icono}"></i>
            </div>
            <div class="producto-info">
                <div class="lineas-producto">
                    <div class="linea-prod"></div>
                    <div class="linea-prod"></div>
                    <div class="linea-prod"></div>
                </div>
                <button class="btn-producto">Añadir al Carrito</button>
            </div>
        `;
        carruselTrack.appendChild(card);
    });
}

// 3. Lógica del Carrusel
const btnIzquierda = document.querySelector('.btn-izquierda');
const btnDerecha = document.querySelector('.btn-derecha');
const indicadores = document.querySelectorAll('.indicador');

let index = 0;

function actualizarCarrusel() {
    // Calculamos cuánto desplazar (depende del ancho de la tarjeta)
    const anchoTarjeta = document.querySelector('.producto-card').offsetWidth + 20; // 20 es el gap
    carruselTrack.style.transform = `translateX(${-index * anchoTarjeta}px)`;

    // Actualizar puntitos (indicadores)
    indicadores.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

btnDerecha.addEventListener('click', () => {
    if (index < productos.length - 1) {
        index++;
        actualizarCarrusel();
    }
});

btnIzquierda.addEventListener('click', () => {
    if (index > 0) {
        index--;
        actualizarCarrusel();
    }
});

// 4. Animaciones al hacer scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Aplicar el observador a los elementos con clases de animación
function iniciarAnimaciones() {
    const elementosAnimados = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .zoom-in');
    elementosAnimados.forEach(el => observer.observe(el));
}

// Inicializar todo
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    iniciarAnimaciones();
});

