function crearTarjetaProducto(numero) {
    return `
        <div class="producto-card">
            <div class="producto-imagen">
                <i class="fas fa-image"></i>
            </div>
            <div class="producto-info">
                <div class="lineas-producto">
                    <div class="linea-prod"></div>
                    <div class="linea-prod"></div>
                    <div class="linea-prod"></div>
                </div>
                <button class="btn-producto">Ver Más</button>
            </div>
        </div>
    `;
}

// Insertar 15 productos en el track del carrusel
const track = document.getElementById('carruselTrack');
if (track) {
    let productosHTML = '';
    for (let i = 1; i <= 15; i++) {
        productosHTML += crearTarjetaProducto(i);
    }
    track.innerHTML = productosHTML;
}

// ==================== FUNCIONALIDAD DEL CARRUSEL ====================

// Seleccionar elementos del DOM después de crear los productos
const carruselTrack = document.querySelector('.carrusel-track');
const cards = Array.from(document.querySelectorAll('.producto-card'));
const btnIzq = document.querySelector('.btn-izquierda');
const btnDer = document.querySelector('.btn-derecha');
const indicadores = Array.from(document.querySelectorAll('.indicador'));

// Variables de control
let currentIndex = 0; // Índice actual (página actual)
const cardsPerView = 3; // Tarjetas visibles a la vez en desktop
const totalCards = 15; // Total de productos
const maxIndex = Math.ceil(totalCards / cardsPerView) - 1; // Número máximo de páginas (0-4)

// ========== FUNCIÓN PRINCIPAL: MOVER EL CARRUSEL ==========
function moverCarrusel(targetIndex) {
    // Validar que el índice esté dentro del rango permitido
    if (targetIndex < 0) {
        currentIndex = 0; // No puede ir antes del inicio
    } else if (targetIndex > maxIndex) {
        currentIndex = maxIndex; // No puede ir después del final
    } else {
        currentIndex = targetIndex;
    }
    
    // Calcular cuánto mover el track
    // Ancho de tarjeta + gap entre tarjetas
    const card = cards[0];
    if (!card) return;
    
    const cardWidth = card.offsetWidth; // Ancho de una tarjeta
    const gap = 20; // Gap de 2rem = 20px
    const moveDistance = currentIndex * (cardWidth + gap) * cardsPerView;
    
    // Aplicar la transformación al track
    carruselTrack.style.transform = `translateX(-${moveDistance}px)`;
    
    // Actualizar los indicadores
    actualizarIndicadores();
}

// ========== FUNCIÓN: ACTUALIZAR INDICADORES ==========
function actualizarIndicadores() {
    // Remover la clase 'active' de todos los indicadores
    indicadores.forEach(ind => ind.classList.remove('active'));
    
    // Añadir la clase 'active' al indicador actual
    if (indicadores[currentIndex]) {
        indicadores[currentIndex].classList.add('active');
    }
}

// ========== EVENT LISTENERS DE LOS BOTONES ==========

// Botón derecha: avanzar al siguiente grupo de productos
if (btnDer) {
    btnDer.addEventListener('click', () => {
        moverCarrusel(currentIndex + 1);
    });
}

// Botón izquierda: retroceder al grupo anterior
if (btnIzq) {
    btnIzq.addEventListener('click', () => {
        moverCarrusel(currentIndex - 1);
    });
}

// ========== EVENT LISTENERS DE LOS INDICADORES ==========
indicadores.forEach((indicador, index) => {
    indicador.addEventListener('click', () => {
        // Al hacer clic en un indicador, ir a esa página
        moverCarrusel(index);
    });
});

// ========== RESPONSIVE: Recalcular al cambiar tamaño de ventana ==========
let resizeTimeout;
window.addEventListener('resize', () => {
    // Debounce: esperar a que el usuario termine de redimensionar
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalcular posición del carrusel
        moverCarrusel(currentIndex);
    }, 250);
});

const observerOptions = {
    threshold: 0.1, // Se activa cuando el 10% del elemento es visible
    rootMargin: '0px 0px -100px 0px' // Margen para activar antes de que llegue
};

// Callback que se ejecuta cuando un elemento es visible
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Añadir clase 'visible' cuando el elemento entra en el viewport
            entry.target.classList.add('visible');
        }
    });
};

// Crear el observador
const observer = new IntersectionObserver(observerCallback, observerOptions);

// ========== ANIMAR ELEMENTOS AL SCROLL ==========

// Animar sección de características
const caracteristicasItems = document.querySelectorAll('.caracteristica-item');
caracteristicasItems.forEach((item, index) => {
    item.classList.add('fade-in');
    item.style.transitionDelay = `${index * 0.2}s`; // Delay escalonado
    observer.observe(item);
});

// Animar tarjetas de productos
const productoCards = document.querySelectorAll('.producto-card');
productoCards.forEach((card, index) => {
    card.classList.add('zoom-in');
    card.style.transitionDelay = `${(index % 3) * 0.15}s`;
    observer.observe(card);
});

// Animar sección CTA
const ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
    ctaSection.classList.add('fade-in');
    observer.observe(ctaSection);
}

// Animar columnas del footer
const footerColumns = document.querySelectorAll('.footer-columna');
footerColumns.forEach((column, index) => {
    column.classList.add('fade-in');
    column.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(column);
});

// Animar títulos de secciones
const titulosSecciones = document.querySelectorAll('.titulo-seccion');
titulosSecciones.forEach(titulo => {
    titulo.classList.add('fade-in');
    observer.observe(titulo);
});

// ==================== EFECTOS AL SCROLL ====================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Cambiar header al hacer scroll
    const header = document.querySelector('header');
    if (header) {
        if (scrolled > 100) {
            header.style.boxShadow = '0 1rem 2rem rgba(0,0,0,.15)';
            header.style.padding = '1.5rem 9%';
        } else {
            header.style.boxShadow = '0.5rem 1rem rgba(0,0,0,.1)';
            header.style.padding = '2rem 9%';
        }
    }
});

// ==================== SMOOTH SCROLL PARA LOS ENLACES ====================

const navLinks = document.querySelectorAll('.barranav a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Solo para enlaces internos que empiezan con #
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Cerrar menú móvil si está abierto
                const toggler = document.getElementById('toggler');
                if (toggler) {
                    toggler.checked = true; // Marca el checkbox para cerrar el menú
                }
                
                // Scroll suave a la sección
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== EFECTOS HOVER ADICIONALES ====================

// Efecto hover mejorado en tarjetas de productos
productoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== LOG DE INICIALIZACIÓN ====================
console.log('✅ KUBO Website cargado correctamente');
console.log(`📱 Tarjetas por vista: ${cardsPerView}`);
console.log(`📊 Total de productos: ${totalCards}`);
console.log(`🎯 Páginas del carrusel: ${maxIndex + 1}`);
console.log(`📍 Índice actual: ${currentIndex}`);