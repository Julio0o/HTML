const productos = [
    { id: 1, nombre: "Producto Premium 1", icono: "fa-book" },
    { id: 2, nombre: "Producto Premium 2", icono: "fa-book" },
    { id: 3, nombre: "Producto Premium 3", icono: "fa-book" },
    { id: 4, nombre: "Producto Premium 4", icono: "fa-book" },
    { id: 5, nombre: "Producto Premium 5", icono: "fa-book" },
    { id: 6, nombre: "Producto Premium 6", icono: "fa-book" }
];

const carruselTrack = document.getElementById('carruselTrack');
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

const btnIzquierda = document.querySelector('.btn-izquierda');
const btnDerecha = document.querySelector('.btn-derecha');
const indicadores = document.querySelectorAll('.indicador');
let index = 0;
function actualizarCarrusel() {
    const anchoTarjeta = document.querySelector('.producto-card').offsetWidth + 20; 
    carruselTrack.style.transform = `translateX(${-index * anchoTarjeta}px)`;

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
function iniciarAnimaciones() {
    const elementosAnimados = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .zoom-in');
    elementosAnimados.forEach(el => observer.observe(el));
}
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    iniciarAnimaciones();
});

