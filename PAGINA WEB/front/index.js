
const track = document.querySelector('.carrusel-track'); 
const cards = Array.from(track.children);
const btnIzq = document.querySelector('.btn-izquierda'); 
const btnDer = document.querySelector('.btn-derecha'); 
const indicadores = Array.from(document.querySelectorAll('.indicador')); 

const cardWidth = cards[0].getBoundingClientRect().width + 20; // 20px de gap

let currentIndex = 0; 
const cardsPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 991 ? 2 : 3; 
const maxIndex = Math.ceil(cards.length / cardsPerView) - 1; 

function moverCarrusel(targetIndex) {
    if (targetIndex < 0) {
        currentIndex = 0;
    } else if (targetIndex > maxIndex) {
        currentIndex = maxIndex;
    } else {
        currentIndex = targetIndex;
    }
    const moveDistance = currentIndex * cardWidth * cardsPerView;
    track.style.transform = `translateX(-${moveDistance}px)`;
    actualizarIndicadores();
}
function actualizarIndicadores() {
    indicadores.forEach(ind => ind.classList.remove('active'));
    if (indicadores[currentIndex]) {
        indicadores[currentIndex].classList.add('active');
    }
}

btnDer.addEventListener('click', () => {
    moverCarrusel(currentIndex + 1);
});

btnIzq.addEventListener('click', () => {
    moverCarrusel(currentIndex - 1);
});

indicadores.forEach((indicador, index) => {
    indicador.addEventListener('click', () => {
        moverCarrusel(index);
    });
});

window.addEventListener('resize', () => {
    const newCardsPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 991 ? 2 : 3;
    if (newCardsPerView !== cardsPerView) {
        currentIndex = 0;
        moverCarrusel(0);
    }
});
const observerOptions = {
    threshold: 0.1, 
    rootMargin: '0px 0px -100px 0px' 
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

const heroContent = document.querySelector('.home .contenido');
const heroImage = document.querySelector('.home .imagen-hero');

if (heroContent) heroContent.classList.add('fade-in-left');
if (heroImage) heroImage.classList.add('fade-in-right');

// Animar sección de características
const caracteristicasItems = document.querySelectorAll('.caracteristica-item');
caracteristicasItems.forEach((item, index) => {
    item.classList.add('fade-in');
    item.style.transitionDelay = `${index * 0.2}s`; 
    observer.observe(item);
});

const productoCards = document.querySelectorAll('.producto-card');
productoCards.forEach((card, index) => {
    card.classList.add('zoom-in');
    card.style.transitionDelay = `${(index % 3) * 0.15}s`; 
    observer.observe(card);
});

const ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
    ctaSection.classList.add('fade-in');
    observer.observe(ctaSection);
}
const footerColumns = document.querySelectorAll('.footer-columna');
footerColumns.forEach((column, index) => {
    column.classList.add('fade-in');
    column.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(column);
});

const titulosSecciones = document.querySelectorAll('.titulo-seccion');
titulosSecciones.forEach(titulo => {
    titulo.classList.add('fade-in');
    observer.observe(titulo);
});


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    const header = document.querySelector('header');
    if (scrolled > 100) {
        header.style.boxShadow = '0 1rem 2rem rgba(0,0,0,.15)';
        header.style.padding = '1.5rem 9%';
    } else {
        header.style.boxShadow = '0.5rem 1rem rgba(0,0,0,.1)';
        header.style.padding = '2rem 9%';
    }
});

const navLinks = document.querySelectorAll('.barranav a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Solo para enlaces internos (#)
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Cerrar menú móvil si está abierto
                const toggler = document.getElementById('toggler');
                if (toggler) {
                    toggler.checked = true; // Cerrar menú
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

const mainHeader = document.querySelector('.main-header');
if (mainHeader) {
    const text = mainHeader.textContent;
    mainHeader.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            mainHeader.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    window.addEventListener('load', typeWriter);
}

productoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});


console.log('✅ KUBO Website cargado correctamente');
console.log(`📱 Tarjetas visibles: ${cardsPerView}`);
console.log(`📊 Total de productos: ${cards.length}`);
console.log(`🎯 Páginas del carrusel: ${maxIndex + 1}`);