const productos = [
    { id: 1, nombre: "Almendra", imagen: "../imagenes/almendra.jpg" },
    { id: 2, nombre: "Atlas", imagen: "../imagenes/atlas.jpg" },
    { id: 3, nombre: "Fahrenheit 451", imagen: "../imagenes/farenheit.jpg" },
    { id: 4, nombre: "Haikyu!!", imagen: "../imagenes/haikyu.jpg" },
    { id: 5, nombre: "La Tregua", imagen: "../imagenes/tregua.jpg" },
    { id: 6, nombre: "Wigetta", imagen: "../imagenes/wigetta.jpg" }
];

const carruselTrack = document.getElementById('carruselTrack');
function cargarProductos() {
    productos.forEach(prod => {
        const card = document.createElement('div');
        card.classList.add('producto-card');
        card.innerHTML = `
            <div class="producto-imagen">
                <img src="${prod.imagen}" alt="Portada ${prod.nombre}" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div class="producto-info">
                <h3 style="font-size: 1.8rem; text-align: center; color: var(--dark); margin-bottom: 1.5rem;">${prod.nombre}</h3>
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

