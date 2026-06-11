// ==========================================
// BASE DE DATOS LOCAL SIMULADA (MOCK DATA)
// ==========================================
const SERVICES = [
    {
        id: 'pelo-clasico',
        title: 'Corte Clásico',
        price: 15000,
        duration: '30 min',
        category: 'pelo',
        description: 'Corte tradicional a tijera y/o máquina. Incluye lavado y peinado con cera de primera marca.'
    },
    {
        id: 'pelo-fade',
        title: 'Corte Degradado con Diseño',
        price: 17000,
        duration: '50 min',
        category: 'pelo',
        description: 'Degradado de alta precisión (high, mid o low fade) con diseño freestyle a navaja. Definición de patillas y cuello.'
    },
    {
        id: 'barba-perfilado',
        title: 'Perfilado de Cejas y Barba',
        price: 9000,
        duration: '30 min',
        category: 'barba',
        description: 'Diseño y rebaje de barba completa con ritual de toalla caliente más perfilado detallado de cejas a navaja.'
    },
    {
        id: 'combo-avrz',
        title: 'Combo AVRZ',
        price: 25000,
        duration: '60 min',
        category: 'combos',
        description: 'El servicio completo de la casa: Corte (a elección) + Perfilado de Barba + Perfilado de Cejas para un estilo impecable.'
    }
];
const BARBERS = [
    {
        id: 'avrz',
        name: 'AVRZ',
        specialty: 'Estilista & Fundador',
        rating: 5.0,
        avatarInitials: 'AV'
    }
];
const PRODUCTS = [
    {
        id: 'powder',
        type: 'simple',
        title: 'Polvo Texturizador',
        price: 14500,
        desc: 'Da volumen al instante y acabado mate natural de larga duración. Ideal para peinados urbanos y desestructurados.',
        img: 'assets/powder.png',
        category: 'Texturizador',
        badge: 'Popular'
    },
    {
        id: 'waxes',
        type: 'grouped',
        title: 'Pomadas / Ceras',
        price: 20000,
        desc: 'Fijación profesional y acabados a medida. Elegí el tipo que mejor se adapte a tu estilo de peinado.',
        img: 'assets/wax-desert.jpg',
        category: 'Fijación',
        badge: 'Exclusivo',
        variants: [
            {
                id: 'wax-desert',
                title: 'Desert Matte Pomade',
                desc: 'Fijación fuerte, base oleosa, acabado mate y fácil enjuague.',
                img: 'assets/wax-desert.jpg',
                badge: 'Mate'
            },
            {
                id: 'wax-native',
                title: 'Native Strong Paste',
                desc: 'Fijación extra fuerte, base oleosa, manteca de karité y textura espesa.',
                img: 'assets/wax-native.jpg',
                badge: 'Fuerte'
            },
            {
                id: 'wax-marine',
                title: 'Marine Fiber Cream',
                desc: 'Fijación media-alta, base acuosa, aporta volumen con textura natural.',
                img: 'assets/wax-marine.jpg',
                badge: 'Fibra'
            },
            {
                id: 'wax-blackpearl',
                title: 'Black Pearl Pomade',
                desc: 'Fijación fuerte, base oleosa, fácil de enjuagar y brillo medio.',
                img: 'assets/wax-blackpearl.jpg',
                badge: 'Brillo'
            }
        ]
    },
    {
        id: 'oils',
        type: 'grouped',
        title: 'Aceites para Barba',
        price: 12500,
        desc: 'Fórmula ligera que nutre, suaviza, da brillo y protege el vello y la piel. Elegí tu aroma favorito.',
        img: 'assets/oil-melon.jpg',
        category: 'Cuidado Barba',
        badge: 'Premium',
        variants: [
            {
                id: 'oil-melon',
                title: 'Aceite de Barba - Melón',
                desc: 'Fórmula que hidrata y nutre en profundidad dejando un refrescante aroma a melón.',
                img: 'assets/oil-melon.jpg',
                badge: 'Fresco'
            },
            {
                id: 'oil-welcome',
                title: 'Aceite de Barba - Welcome',
                desc: 'Aporta máxima suavidad y dominio con una fragancia amaderada de bienvenida.',
                img: 'assets/oil-welcome.jpg',
                badge: 'Clásico'
            },
            {
                id: 'oil-musicman',
                title: 'Aceite de Barba - Dr. Music Man',
                desc: 'Protege, fortalece y da un brillo natural con un aroma audaz y distintivo.',
                img: 'assets/oil-musicman.jpg',
                badge: 'Intenso'
            }
        ]
    }
];
// ==========================================
// ESTADO DE LA APLICACIÓN
// ==========================================
let cart = JSON.parse(localStorage.getItem('avrz_cart')) || [];
let bookings = JSON.parse(localStorage.getItem('avrz_bookings')) || [];
// Datos seleccionados para el turno actual
let activeBooking = {
    service: null,
    barber: null,
    date: null, // Objeto Date
    time: null,  // String "15:00"
};
// Control de calendario
let currentCalendarDate = new Date(); // Para navegar meses en turnero
// ==========================================
// SELECTORES DOM
// ==========================================
const servicesContainer = document.getElementById('services-container');
const productsContainer = document.getElementById('products-container');
const bookingsList = document.getElementById('bookings-list');
const bookingsCountBadge = document.getElementById('bookings-count');
const cartBadge = document.getElementById('cart-badge');
const cartPanel = document.getElementById('cart-panel');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSummaryFooter = document.getElementById('cart-summary-footer');
const cartTotalPrice = document.getElementById('cart-total-price');
// Wizard Turnos
const bookingModal = document.getElementById('booking-modal');
const closeBookingModalBtn = document.getElementById('close-booking-modal');
const wizardServicesList = document.getElementById('wizard-services-list');
const wizardBarbersList = document.getElementById('wizard-barbers-list');
const calendarDaysGrid = document.getElementById('calendar-days-grid');
const calendarMonthTitle = document.getElementById('calendar-month-title');
const prevMonthBtn = document.getElementById('calendar-prev-month');
const nextMonthBtn = document.getElementById('calendar-next-month');
const selectedDateLabel = document.getElementById('selected-date-label');
const timeslotsGrid = document.getElementById('timeslots-grid-container');
const clientForm = document.getElementById('booking-client-form');
// Resumen del Wizard
const summaryService = document.getElementById('summary-service');
const summaryBarber = document.getElementById('summary-barber');
const summaryDate = document.getElementById('summary-date');
const summaryTime = document.getElementById('summary-time');
const summaryCost = document.getElementById('summary-cost');
// Éxito / Ticket
const ticketBookingCode = document.getElementById('ticket-booking-code');
const ticketService = document.getElementById('ticket-service');
const ticketBarber = document.getElementById('ticket-barber');
const ticketDate = document.getElementById('ticket-date');
const ticketTime = document.getElementById('ticket-time');
const ticketClient = document.getElementById('ticket-client');
const ticketPrice = document.getElementById('ticket-price');
const closeSuccessBtn = document.getElementById('close-success-btn');
// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderServices('all');
    renderProducts();
    updateCartUI();
    renderBookingsList();
    setupEventListeners();
});
// Escribir cambios en el header en base al scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// ==========================================
// EVENT LISTENERS PRINCIPALES
// ==========================================
function setupEventListeners() {
    // Menu mobile toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav-panel');
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        if (mobileNav.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });
    // Cerrar nav móvil al hacer click en un link
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            menuToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });
    // Filtros de servicios en la sección principal
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderServices(e.target.dataset.category);
        });
    });
    // Botones globales de reservas
    document.querySelectorAll('.btn-booking-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            openBookingWizard();
        });
    });
    closeBookingModalBtn.addEventListener('click', closeBookingWizard);
    
    // Navegación Calendario
    prevMonthBtn.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar();
    });
    nextMonthBtn.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar();
    });
    // Formulario de reserva
    clientForm.addEventListener('submit', handleBookingSubmit);
    // Botón de éxito cerrar
    closeSuccessBtn.addEventListener('click', () => {
        closeBookingWizard();
    });
    // Volver a pasos anteriores
    document.querySelectorAll('.btn-prev-step').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentActiveStep = document.querySelector('.wizard-step.active');
            const stepNumber = parseInt(currentActiveStep.id.split('-')[1]);
            goToStep(stepNumber - 1);
        });
    });
    // Carrito de compras panel toggle
    document.getElementById('open-cart-btn').addEventListener('click', () => {
        cartPanel.classList.add('open');
    });
    document.getElementById('close-cart-btn').addEventListener('click', () => {
        cartPanel.classList.remove('open');
    });
    document.getElementById('cart-overlay').addEventListener('click', () => {
        cartPanel.classList.remove('open');
    });
    // Botón finalizar compra carrito
    document.getElementById('checkout-cart-btn').addEventListener('click', handleCartCheckout);
    // Modal de Guía de Aplicación
    const guideModal = document.getElementById('guide-modal');
    const openWaxGuideBtn = document.getElementById('open-wax-guide-btn');
    const openOilGuideBtn = document.getElementById('open-oil-guide-btn');
    const waxGuideThumb = document.getElementById('wax-guide-thumb');
    const oilGuideThumb = document.getElementById('oil-guide-thumb');
    const closeGuideModalBtn = document.getElementById('close-guide-modal');
    const guideModalOverlay = document.getElementById('guide-modal-overlay');
    const guideModalImg = guideModal.querySelector('.guide-modal-img');
    const guideModalTitle = guideModal.querySelector('.guide-modal-title');
    const openGuide = (type) => {
        if (type === 'wax') {
            guideModalImg.src = 'assets/pomada-guia.jpg';
            guideModalTitle.innerText = 'GUÍA DE APLICACIÓN - CERAS';
        } else if (type === 'oil') {
            guideModalImg.src = 'assets/oil-guia.jpg';
            guideModalTitle.innerText = 'GUÍA DE APLICACIÓN - ACEITES';
        }
        guideModal.classList.add('open');
    };
    const closeGuide = () => {
        guideModal.classList.remove('open');
    };
    if (openWaxGuideBtn) openWaxGuideBtn.addEventListener('click', () => openGuide('wax'));
    if (openOilGuideBtn) openOilGuideBtn.addEventListener('click', () => openGuide('oil'));
    if (waxGuideThumb) waxGuideThumb.addEventListener('click', () => openGuide('wax'));
    if (oilGuideThumb) oilGuideThumb.addEventListener('click', () => openGuide('oil'));
    if (closeGuideModalBtn) closeGuideModalBtn.addEventListener('click', closeGuide);
    if (guideModalOverlay) guideModalOverlay.addEventListener('click', closeGuide);
}
// ==========================================
// RENDERIZADO DE CONTENIDO (MAIN SECTIONS)
// ==========================================
// Servicios y precios de la sección principal
function renderServices(filter = 'all') {
    servicesContainer.innerHTML = '';
    const filtered = filter === 'all' ? SERVICES : SERVICES.filter(s => s.category === filter);
    
    filtered.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card glass-card';
        card.innerHTML = `
            <div class="service-meta">
                <span class="service-category">${service.category}</span>
                <span class="service-duration"><i class="fa-regular fa-clock"></i> ${service.duration}</span>
            </div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
            <div class="service-footer">
                <span class="service-price">$${service.price}</span>
                <button class="btn btn-primary btn-sm" onclick="selectServiceAndOpen('${service.id}')">Reservar</button>
            </div>
        `;
        servicesContainer.appendChild(card);
    });
}
// Productos en la sección Tienda
function renderProducts() {
    productsContainer.innerHTML = '';
    PRODUCTS.forEach(prod => {
        const isGrouped = prod.type === 'grouped';
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrapper">
                ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
                <img src="${prod.img}" alt="${prod.title}" class="product-img" onerror="this.src='https://placehold.co/400x400/191c26/FFF?text=${prod.title}'">
            </div>
            <div class="product-info">
                <h3 class="product-title">${prod.title}</h3>
                <p class="product-desc">${prod.desc}</p>
                <div class="product-footer">
                    <span class="product-price">${isGrouped ? 'Desde ' : ''}$${prod.price}</span>
                    ${isGrouped ? `
                        <button class="btn btn-primary btn-sm" onclick="openVariantSelector('${prod.id}')">
                            <i class="fa-solid fa-layer-group"></i> Elegir Opciones
                        </button>
                    ` : `
                        <button class="btn btn-primary btn-sm" onclick="addToCart('${prod.id}')">
                            <i class="fa-solid fa-cart-plus"></i> Añadir
                        </button>
                    `}
                </div>
            </div>
        `;
        productsContainer.appendChild(card);
    });
}
// ==========================================
// SISTEMA DE TURNERO / RESERVAS
// ==========================================
function openBookingWizard() {
    // Resetear reserva activa (siempre con AVRZ como estilista)
    activeBooking = { service: null, barber: BARBERS[0], date: null, time: null };
    
    // Limpiar campos form
    clientForm.reset();
    
    // Ocultar addon prompt y restablecer opacidad de la lista
    const prompt = document.getElementById('addon-prompt');
    const list = document.getElementById('wizard-services-list');
    if (prompt) prompt.style.display = 'none';
    if (list) {
        list.style.opacity = '1';
        list.style.pointerEvents = 'auto';
    }
    
    // Iniciar Wizard
    renderWizardServices();
    goToStep(1);
    bookingModal.classList.add('open');
}
function closeBookingWizard() {
    bookingModal.classList.remove('open');
    // Reiniciar éxito si está activo
    document.getElementById('step-success').classList.remove('active');
    document.getElementById('step-1').classList.add('active');
}
// Selecciona un servicio directo desde el Home
function selectServiceAndOpen(serviceId) {
    openBookingWizard();
    const service = SERVICES.find(s => s.id === serviceId);
    if (service) {
        selectWizardService(service);
    }
}
// Controlar navegación de pasos del Turnero
function goToStep(stepNum) {
    // Ocultar todos los pasos del wizard
    document.querySelectorAll('.wizard-step').forEach(step => step.classList.remove('active'));
    
    // Mostrar el paso indicado
    if (stepNum === 'success') {
        document.getElementById('step-success').classList.add('active');
    } else {
        document.getElementById(`step-${stepNum}`).classList.add('active');
    }
    
    // Actualizar barra de progreso visual
    document.querySelectorAll('.progress-step').forEach(pStep => {
        const stepVal = parseInt(pStep.dataset.step);
        if (stepVal === stepNum) {
            pStep.className = 'progress-step active';
        } else if (stepVal < stepNum) {
            pStep.className = 'progress-step completed';
        } else {
            pStep.className = 'progress-step';
        }
    });
    // Comportamientos especiales al ingresar a un paso
    if (stepNum === 2) {
        renderCalendar();
    } else if (stepNum === 3) {
        renderBookingSummary();
    }
}
// Paso 1: Renderizar Servicios en el Wizard
function renderWizardServices() {
    wizardServicesList.innerHTML = '';
    SERVICES.forEach(service => {
        const item = document.createElement('div');
        item.className = 'wizard-service-item';
        item.innerHTML = `
            <div class="w-service-info">
                <h5>${service.title}</h5>
                <span><i class="fa-regular fa-clock"></i> ${service.duration}</span>
            </div>
            <span class="w-service-price">$${service.price}</span>
        `;
        item.addEventListener('click', () => {
            selectWizardService(service);
        });
        wizardServicesList.appendChild(item);
    });
}
