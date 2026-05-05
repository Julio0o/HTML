// logica del carrito
const carritoLateral = document.getElementById('carritoLateral');
const carritoOverlay = document.getElementById('carritoOverlay');
const abrirCarritoBtn = document.getElementById('abrirCarrito');
const cerrarCarritoBtn = document.getElementById('cerrarCarrito');
const carritoItemsContenedor = document.getElementById('carritoItems');
const precioTotalElemento = document.getElementById('carritoPrecioTotal');

// Función para obtener la clave del carrito según el usuario
function getCartKey() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? `kuBoCart_${user.id}` : 'kuBoCart_guest';
}

let carrito = JSON.parse(localStorage.getItem(getCartKey())) || [];

// Abrir el carrito
function abrirCarrito(e) {
    if (e) e.preventDefault();
    carritoLateral.classList.add('active');
    carritoOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderizarCarrito();
}

// Cerrar el carrito
function cerrarCarrito() {
    carritoLateral.classList.remove('active');
    carritoOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Agregar al carrito
function agregarAlCarrito(libro) {
    const user = localStorage.getItem('user');
    
    // Si no ha iniciado sesión, mostrar advertencia y no permitir agregar
    if (!user) {
        Swal.fire({
            title: '<span style="font-size: 3.5rem;">¡Atención!</span>',
            html: '<p style="font-size: 2rem; margin-top: 1.5rem;">Necesitas iniciar sesión para poder agregar productos al carrito.</p>',
            icon: 'warning',
            iconColor: '#963001',
            width: '60rem',
            padding: '4rem',
            showCancelButton: true,
            confirmButtonColor: '#963001',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Iniciar Sesión',
            cancelButtonText: 'Seguir mirando',
            customClass: {
                confirmButton: 'swal-btn-lg',
                cancelButton: 'swal-btn-lg'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Determinar la ruta correcta al login
                const path = window.location.pathname.includes('productos') ? '../login/login.htm' : 'login/login.htm';
                window.location.href = path;
            }
        });
        return;
    }

    const itemExistente = carrito.find(item => item.id === libro.id);
    const stockDisponible = libro.cantidad || 0;

    if (itemExistente) {
        if (itemExistente.quantity < stockDisponible) {
            itemExistente.quantity++;
        } else {
            Swal.fire('Límite de stock', 'No hay más unidades disponibles de este libro.', 'error');
            return;
        }
    } else {
        if (stockDisponible > 0) {
            carrito.push({
                id: libro.id,
                titulo: libro.titulo,
                precio: parseFloat(libro.precio),
                imagen: libro.imagen_url,
                quantity: 1,
                stock: stockDisponible
            });
        } else {
            Swal.fire('Agotado', 'Este libro no tiene existencias por el momento.', 'info');
            return;
        }
    }
    
    guardarYRenderizar();
    abrirCarrito();
}

// Actualizar cantidad
function actualizarCantidad(id, delta) {
    const item = carrito.find(item => item.id === id);
    if (item) {
        const nuevaCantidad = item.quantity + delta;
        if (nuevaCantidad > 0 && nuevaCantidad <= item.stock) {
            item.quantity = nuevaCantidad;
        } else if (nuevaCantidad > item.stock) {
            Swal.fire('Límite de stock', 'No puedes agregar más unidades de las disponibles.', 'warning');
        } else if (nuevaCantidad <= 0) {
            eliminarDelCarrito(id);
            return;
        }
    }
    guardarYRenderizar();
}

// Eliminar del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarYRenderizar();
}

// Guardar en localStorage y actualizar UI
function guardarYRenderizar() {
    localStorage.setItem(getCartKey(), JSON.stringify(carrito));
    renderizarCarrito();
}

// Renderizar items del carrito
function renderizarCarrito() {
    if (!carritoItemsContenedor) return;

    // Recargar el carrito por si cambió el usuario
    carrito = JSON.parse(localStorage.getItem(getCartKey())) || [];

    if (carrito.length === 0) {
        carritoItemsContenedor.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
        precioTotalElemento.textContent = '$0.00';
        return;
    }

    carritoItemsContenedor.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.quantity;
        total += subtotal;

        const div = document.createElement('div');
        div.classList.add('cart-item');
        if (item.quantity >= item.stock) {
            div.classList.add('limite-alcanzado');
        }

        div.innerHTML = `
            <img src="${fixImagePath(item.imagen)}" alt="${item.titulo}">
            <div class="cart-item-info">
                <h4>${item.titulo}</h4>
                <div class="price">$${item.precio.toFixed(2)}</div>
                <div class="cart-quantity-controls">
                    <div class="qty-btn" onclick="actualizarCantidad(${item.id}, -1)">-</div>
                    <span class="qty-val">${item.quantity}</span>
                    <div class="qty-btn" onclick="actualizarCantidad(${item.id}, 1)">+</div>
                </div>
                ${item.quantity >= item.stock ? '<small class="stock-warning">Límite de stock</small>' : ''}
            </div>
            <i class="fas fa-trash remove-item" onclick="eliminarDelCarrito(${item.id})"></i>
        `;
        carritoItemsContenedor.appendChild(div);
    });

    precioTotalElemento.textContent = `$${total.toFixed(2)}`;
}

// Event Listeners
if (abrirCarritoBtn) abrirCarritoBtn.addEventListener('click', abrirCarrito);
if (cerrarCarritoBtn) cerrarCarritoBtn.addEventListener('click', cerrarCarrito);
if (carritoOverlay) carritoOverlay.addEventListener('click', cerrarCarrito);

// Cargar al inicio
document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
});
