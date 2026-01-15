// Clase para crear carruseles reutilizables
class Carrusel {
    constructor(container, images, autoPlayDelay = 5000) {
        this.container = container;
        this.images = images;
        this.autoPlayDelay = autoPlayDelay;
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isAutoPlaying = true;
        
        this.init();
    }
    
    init() {
        // Crear elementos del carrusel
        this.createSlides();
        this.createControls();
        
        // Iniciar autoplay
        this.startAutoPlay();
        
        // Agregar event listeners
        this.addEventListeners();
    }
    
    createSlides() {
        const slidesContainer = this.container.querySelector('.carousel-slides');
        slidesContainer.innerHTML = '';
        
        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.style.backgroundImage = `url('${image}')`;
            slide.dataset.index = index;
            slidesContainer.appendChild(slide);
        });
        
        this.updateSlides();
    }
    
    createControls() {
        // Crear puntos de navegación para el hero carrusel
        if (this.container.classList.contains('hero-carousel')) {
            const dotsContainer = this.container.querySelector('.carousel-dots');
            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                
                this.images.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
                    dot.dataset.index = index;
                    dotsContainer.appendChild(dot);
                });
            }
        }
    }
    
    updateSlides() {
        const slidesContainer = this.container.querySelector('.carousel-slides');
        const translateX = -this.currentIndex * 100;
        slidesContainer.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar puntos activos
        const dots = this.container.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateSlides();
        this.resetAutoPlay();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateSlides();
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlides();
        this.resetAutoPlay();
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        
        this.autoPlayInterval = setInterval(() => {
            if (this.isAutoPlaying) {
                this.nextSlide();
            }
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        this.isAutoPlaying = false;
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.isAutoPlaying = true;
        this.startAutoPlay();
    }
    
    addEventListeners() {
        // Botones anterior/siguiente
        const prevBtn = this.container.querySelector('.prev-btn');
        const nextBtn = this.container.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }
        
        // Puntos de navegación
        const dots = this.container.querySelectorAll('.carousel-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            });
        });
        
        // Pausar autoplay al hacer hover
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.isAutoPlaying = true;
            this.startAutoPlay();
        });
    }
}

// Imágenes para cada carrusel
const heroImages = [
    'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80', 'imagenes/inicio/Inicio2.jpeg', 'imagenes/inicio/inicio3.jpeg','imagenes/inicio/inicio4.jpeg','imagenes/inicio/inicio5.jpeg','imagenes/inicio/inicio6.jpeg','imagenes/inicio/inicio7.jpeg',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80', 'imagenes/inicio/img1.jpeg'
];

const aeropuertoImages = [
    'imagenes/servicios/AeropuertoHotel/Aeropuerto1.jpeg','imagenes/servicios/AeropuertoHotel/Aeropuerto2.jpeg','imagenes/servicios/AeropuertoHotel/Aeropuerto3.jpeg'
];

const privadoImages = [
    'imagenes/servicios/TrasladosPriv/TrasladoPrivados1.jpeg','imagenes/servicios/TrasladosPriv/TrasladoPrivado2.jpeg','imagenes/servicios/TrasladosPriv/TrasladoPrivado3.jpeg'
];

const grupalImages = [
    'imagenes/servicios/Grupal/Grupal1.jpeg','imagenes/servicios/Grupal/Grupal2.jpeg','imagenes/servicios/Grupal/Grupal3.jpeg',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

const chichenImages = [
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

const tulumImages = [
    'https://images.unsplash.com/photo-1552465011-b4e30bf7349d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

const xcaretImages = [
    'https://images.unsplash.com/photo-1564574662336-88c9f5a6c8d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

const xelhaImages = [
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

const islaImages = [
    'https://images.unsplash.com/photo-1526392399-b8c4d6c8d6b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

// Objeto para almacenar las instancias de los carruseles
const carruseles = {};

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ============================================
// FUNCIÓN CONFIGURACIÓN WHATSAPP - SIMPLE
// ============================================

function configurarWhatsApp() {
    // TU NÚMERO DE WHATSAPP - CAMBIA SOLO ESTO
    const MI_NUMERO = '5219983407784';
    
    console.log('🔧 Configurando WhatsApp para LEON TRANSFER...');
    
    // 1. CONFIGURAR BOTÓN FLOTANTE (el verde fijo)
    const btnFlotante = document.querySelector('.whatsapp-float .whatsapp-btn');
    if (btnFlotante) {
        // Cambiamos el href a algo simple
        btnFlotante.href = '#';
        
        btnFlotante.addEventListener('click', function(e) {
            e.preventDefault(); // Evita que el # suba la página
            
            // Mensaje para el botón flotante
            const mensaje = 'Hola LEON TRANSFER, me interesa información sobre sus servicios de traslados y tours';
            const mensajeCodificado = encodeURIComponent(mensaje);
            
            // Crear URL de WhatsApp
            const urlWhatsApp = `https://wa.me/${MI_NUMERO}?text=${mensajeCodificado}`;
            
            // Abrir en nueva pestaña
            window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
            
            console.log('📱 WhatsApp flotante abierto');
        });
        
        console.log('✅ Botón flotante configurado');
    }
    
    // 2. CONFIGURAR BOTONES DE SERVICIOS/TOURS (los que están en tarjetas)
    const botonesServicios = document.querySelectorAll('.btn-whatsapp');
    
    botonesServicios.forEach(boton => {
        // Asegurarnos de que no sea el botón flotante
        if (!boton.closest('.whatsapp-float')) {
            boton.addEventListener('click', function() {
                // Obtener el servicio del atributo data-service
                const servicio = this.getAttribute('data-service');
                
                // Crear mensaje personalizado para cada servicio
                const mensaje = `Hola LEON TRANSFER, me interesa cotizar el servicio: ${servicio}`;
                const mensajeCodificado = encodeURIComponent(mensaje);
                
                // Crear URL de WhatsApp
                const urlWhatsApp = `https://wa.me/${MI_NUMERO}?text=${mensajeCodificado}`;
                
                // Abrir en nueva pestaña
                window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
                
                console.log(`📱 WhatsApp para servicio: ${servicio}`);
            });
        }
    });
    
    console.log(`✅ ${botonesServicios.length} botones de servicios configurados`);
    
    // 3. ACTUALIZAR ENLACES DEL FOOTER
    const enlacesFooter = document.querySelectorAll('footer a[href*="whatsapp"], footer a[href*="wa.me"]');
    
    if (enlacesFooter.length > 0) {
        enlacesFooter.forEach(enlace => {
            const mensaje = 'Hola LEON TRANSFER, quisiera información sobre sus servicios';
            const mensajeCodificado = encodeURIComponent(mensaje);
            enlace.href = `https://wa.me/${MI_NUMERO}?text=${mensajeCodificado}`;
        });
        
        console.log(`✅ ${enlacesFooter.length} enlaces del footer actualizados`);
    }
    
    console.log('✅ Configuración WhatsApp completa');
}

// ============================================
// INICIALIZAR TODO CUANDO EL DOM ESTÉ LISTO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Carrusel principal (hero)
    const heroCarousel = document.querySelector('.hero-carousel .carousel-container');
    if (heroCarousel) {
        carruseles.hero = new Carrusel(heroCarousel.closest('.hero-carousel'), heroImages, 6000);
    }
    
    // Carruseles de servicios
    const serviceCarousels = document.querySelectorAll('.service-carousel');
    serviceCarousels.forEach((carousel, index) => {
        let images;
        switch(index) {
            case 0: images = aeropuertoImages; break;
            case 1: images = privadoImages; break;
            case 2: images = grupalImages; break;
            default: images = aeropuertoImages;
        }
        
        carruseles[`service-${index}`] = new Carrusel(carousel, images, 7000);
    });
    
    // Carruseles de tours
    const tourCarousels = document.querySelectorAll('.tour-carousel');
    tourCarousels.forEach((carousel, index) => {
        let images;
        switch(index) {
            case 0: images = chichenImages; break;
            case 1: images = tulumImages; break;
            case 2: images = xcaretImages; break;
            case 3: images = xelhaImages; break; 
            case 4: images = islaImages; break;
            default: images = chichenImages;
        }
        
        carruseles[`tour-${index}`] = new Carrusel(carousel, images, 8000);
    });
    
    // Configurar WhatsApp
    configurarWhatsApp();
    
    // Update copyright year
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // WhatsApp floating button hover effect
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const whatsappText = document.querySelector('.whatsapp-text');
    
    if (whatsappBtn && whatsappText) {
        whatsappBtn.addEventListener('mouseenter', () => {
            if(window.innerWidth > 992) {
                whatsappText.style.opacity = '1';
                whatsappText.style.right = '75px';
            }
        });
        
        whatsappBtn.addEventListener('mouseleave', () => {
            if(window.innerWidth > 992) {
                whatsappText.style.opacity = '0';
                whatsappText.style.right = '70px';
            }
        });
    }
    
    // Optional: Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe service and tour cards
    document.querySelectorAll('.service-card, .tour-card').forEach(card => {
        observer.observe(card);
    });
    
    // Optional: Add simple animation class to CSS
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .tour-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .tour-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Función para cambiar manualmente imágenes (puede usarse desde la consola)
function cambiarImagenCarrusel(carruselId, imagenIndex) {
    if (carruseles[carruselId]) {
        carruseles[carruselId].goToSlide(imagenIndex);
    }
}

// Función para pausar/reanudar todos los carruseles
function toggleAutoPlayTodos(pausar) {
    Object.values(carruseles).forEach(carrusel => {
        if (pausar) {
            carrusel.stopAutoPlay();
        } else {
            carrusel.isAutoPlaying = true;
            carrusel.startAutoPlay();
        }
    });
}

// ============================================
// VERIFICACIÓN WHATSAPP (OPCIONAL)
// ============================================

// Esta función puedes eliminarla después de verificar
function verificarWhatsApp() {
    setTimeout(() => {
        console.log('=== VERIFICACIÓN WHATSAPP ===');
        console.log('1. Haz clic en el botón flotante verde (abajo a la derecha)');
        console.log('2. Haz clic en cualquier botón "Cotizar por WhatsApp"');
        console.log('3. Ambos deben abrir WhatsApp con tu número: 5219984116078');
        console.log('=== FIN VERIFICACIÓN ===');
    }, 2000);
}

// Descomenta la siguiente línea para activar la verificación
// verificarWhatsApp();