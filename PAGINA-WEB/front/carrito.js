/* ======================================= */
/* LÓGICA DEL CARRITO LATERAL */
/* ======================================= */
const carritoLateral = document.getElementById('carritoLateral');
const carritoOverlay = document.getElementById('carritoOverlay');
const abrirCarritoBtn = document.getElementById('abrirCarrito');
const cerrarCarritoBtn = document.getElementById('cerrarCarrito');

// Función para abrir el carrito
function abrirCarrito(e) {
    if (e) e.preventDefault();
    carritoLateral.classList.add('active');
    carritoOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el carrito
function cerrarCarrito() {
    carritoLateral.classList.remove('active');
    carritoOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event Listeners
if (abrirCarritoBtn) abrirCarritoBtn.addEventListener('click', abrirCarrito);
if (cerrarCarritoBtn) cerrarCarritoBtn.addEventListener('click', cerrarCarrito);
if (carritoOverlay) carritoOverlay.addEventListener('click', cerrarCarrito);
