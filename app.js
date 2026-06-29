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
        description: 'Degradado de alta precisión con diseño freestyle a navaja. Definición de patillas y cuello.'
    },
    {
        id: 'barba-perfilado',
        title: 'Perfilado de Cejas y Barba',
        price: 9000,
        duration: '30 min',
        category: 'barba',
        description: 'Diseño y rebaje de barba completa con ritual de toalla caliente más perfilado detallado de cejas.'
    },
    {
        id: 'combo-avrz',
        title: 'Combo AVRZ',
        price: 25000,
        duration: '60 min',
        category: 'combos',
        description: 'Corte a elección + Perfilado de Barba + Perfilado de Cejas para un estilo impecable.'
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
        desc: 'Da volumen al instante y acabado mate natural de larga duración.',
        img: 'assets/powder.png',
        category: 'Texturizador',
        badge: 'Popular'
    },
    {
        id: 'waxes',
        type: 'grouped',
        title: 'Pomadas / Ceras',
        price: 20000,
        desc: 'Fijación profesional y acabados a medida.',
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
        desc: 'Fórmula ligera que nutre, suaviza, da brillo y protege el vello y la piel.',
        img: 'assets/oil-melon.jpg',
        category: 'Cuidado Barba',
        badge: 'Premium',
        variants: [
            {
                id: 'oil-melon',
                title: 'Aceite de Barba - Melón',
                desc: 'Hidrata y nutre dejando un refrescante aroma a melón.',
                img: 'assets/oil-melon.jpg',
                badge: 'Fresco'
            },
            {
                id: 'oil-welcome',
                title: 'Aceite de Barba - Welcome',
                desc: 'Aporta suavidad y dominio con una fragancia amaderada.',
                img: 'assets/oil-welcome.jpg',
                badge: 'Clásico'
            },
            {
                id: 'oil-musicman',
                title: 'Aceite de Barba - Dr. Music Man',
                desc: 'Protege, fortalece y da brillo natural con aroma intenso.',
                img: 'assets/oil-musicman.jpg',
                badge: 'Intenso'
            }
        ]
    }
];

let cart = JSON.parse(localStorage.getItem('avrz_cart')) || [];
let bookings = JSON.parse(localStorage.getItem('avrz_bookings')) || [];

let activeBooking = {
    service: null,
    barber: BARBERS[0],
    date: null,
    time: null
};

let currentCalendarDate = new Date();

const servicesContainer = document.getElementById('services-container');
const productsContainer = document.getElementById('products-container');
const bookingsList = document.getElementById('bookings-list');
const bookingsCountBadge = document.getElementById('bookings-count');
const cartBadge = document.getElementById('cart-badge');
const cartPanel = document.getElementById('cart-panel');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSummaryFooter = document.getElementById('cart-summary-footer');
const cartTotalPrice = document.getElementById('cart-total-price');

const bookingModal = document.getElementById('booking-modal');
const closeBookingModalBtn = document.getElementById('close-booking-modal');
const wizardServicesList = document.getElementById('wizard-services-list');
const calendarDaysGrid = document.getElementById('calendar-days-grid');
const calendarMonthTitle = document.getElementById('calendar-month-title');
const prevMonthBtn = document.getElementById('calendar-prev-month');
const nextMonthBtn = document.getElementById('calendar-next-month');
const selectedDateLabel = document.getElementById('selected-date-label');
const timeslotsGrid = document.getElementById('timeslots-grid-container');
const clientForm = document.getElementById('booking-client-form');

const summaryService = document.getElementById('summary-service');
const summaryBarber = document.getElementById('summary-barber');
const summaryDate = document.getElementById('summary-date');
const summaryTime = document.getElementById('summary-time');
const summaryCost = document.getElementById('summary-cost');

const ticketBookingCode = document.getElementById('ticket-booking-code');
const ticketService = document.getElementById('ticket-service');
const ticketBarber = document.getElementById('ticket-barber');
const ticketDate = document.getElementById('ticket-date');
const ticketTime = document.getElementById('ticket-time');
const ticketClient = document.getElementById('ticket-client');
const ticketPrice = document.getElementById('ticket-price');
const closeSuccessBtn = document.getElementById('close-success-btn');

let selectedVariantId = null;
let variantQty = 1;

document.addEventListener('DOMContentLoaded', () => {
    renderServices('all');
    renderProducts();
    updateCartUI();
    renderBookingsList();
    setupEventListeners();
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function setupEventListeners() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav-panel');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            icon.className = mobileNav.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });
    }

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav) mobileNav.classList.remove('open');
            if (menuToggle) menuToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            renderServices(e.currentTarget.dataset.category);
        });
    });

    document.querySelectorAll('.btn-booking-trigger').forEach(btn => {
        btn.addEventListener('click', openBookingWizard);
    });

    if (closeBookingModalBtn) closeBookingModalBtn.addEventListener('click', closeBookingWizard);

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderCalendar();
        });
    }

    if (clientForm) clientForm.addEventListener('submit', handleBookingSubmit);
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeBookingWizard);

    document.querySelectorAll('.btn-prev-step').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentActiveStep = document.querySelector('.wizard-step.active');
            if (!currentActiveStep) return;

            const stepNumber = parseInt(currentActiveStep.id.split('-')[1]);
            goToStep(stepNumber - 1);
        });
    });

    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const checkoutCartBtn = document.getElementById('checkout-cart-btn');

    if (openCartBtn) openCartBtn.addEventListener('click', () => cartPanel.classList.add('open'));
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => cartPanel.classList.remove('open'));
    if (cartOverlay) cartOverlay.addEventListener('click', () => cartPanel.classList.remove('open'));
    if (checkoutCartBtn) checkoutCartBtn.addEventListener('click', handleCartCheckout);

    setupGuideModal();
    setupVariantModal();
}

function setupGuideModal() {
    const guideModal = document.getElementById('guide-modal');
    if (!guideModal) return;

    const openGuidesBtn = document.getElementById('open-guides-selector-btn');
    const guidesThumb = document.getElementById('guides-selector-thumb');
    const closeGuideModalBtn = document.getElementById('close-guide-modal');
    const guideModalOverlay = document.getElementById('guide-modal-overlay');
    const guideModalImg = guideModal.querySelector('.guide-modal-img');
    const guideModalTitle = guideModal.querySelector('.guide-modal-title');
    const guideTabBtns = guideModal.querySelectorAll('.guide-tab-btn');

    const updateGuideUI = (type) => {
        guideTabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.guide === type);
        });

        if (type === 'wax') {
            guideModalImg.src = 'assets/pomada-guia.jpg';
            guideModalImg.alt = 'Guía visual de aplicación de pomadas';
            guideModalTitle.innerText = 'GUÍA DE APLICACIÓN - CERAS / POMADAS';
        }

        if (type === 'oil') {
            guideModalImg.src = 'assets/oil-guia.jpg';
            guideModalImg.alt = 'Guía visual de aplicación de aceites';
            guideModalTitle.innerText = 'GUÍA DE APLICACIÓN - ACEITES PARA BARBA';
        }

        if (type === 'powder') {
            guideModalImg.src = 'assets/powder-guia.jpg';
            guideModalImg.alt = 'Guía visual de aplicación de polvo texturizador';
            guideModalTitle.innerText = 'GUÍA DE APLICACIÓN - POLVO TEXTURIZADOR';
        }
    };

    const openGuideModal = (initialType = 'wax') => {
        updateGuideUI(initialType);
        guideModal.classList.add('open');
    };

    const closeGuideModal = () => {
        guideModal.classList.remove('open');
    };

    if (openGuidesBtn) openGuidesBtn.addEventListener('click', () => openGuideModal('wax'));
    if (guidesThumb) guidesThumb.addEventListener('click', () => openGuideModal('wax'));
    if (closeGuideModalBtn) closeGuideModalBtn.addEventListener('click', closeGuideModal);
    if (guideModalOverlay) guideModalOverlay.addEventListener('click', closeGuideModal);

    guideTabBtns.forEach(btn => {
        btn.addEventListener('click', () => updateGuideUI(btn.dataset.guide));
    });
}

function setupVariantModal() {
    const variantModal = document.getElementById('variant-modal');
    if (!variantModal) return;

    const closeVariantModalBtn = document.getElementById('close-variant-modal');
    const variantModalOverlay = document.getElementById('variant-modal-overlay');
    const variantQtyMinus = document.getElementById('variant-qty-minus');
    const variantQtyPlus = document.getElementById('variant-qty-plus');
    const addVariantToCartBtn = document.getElementById('add-variant-to-cart-btn');

    const closeVariantModal = () => {
        variantModal.classList.remove('open');
    };

    if (closeVariantModalBtn) closeVariantModalBtn.addEventListener('click', closeVariantModal);
    if (variantModalOverlay) variantModalOverlay.addEventListener('click', closeVariantModal);

    if (variantQtyMinus) {
        variantQtyMinus.addEventListener('click', () => {
            if (variantQty > 1) {
                variantQty--;
                document.getElementById('variant-qty-value').innerText = variantQty;
            }
        });
    }

    if (variantQtyPlus) {
        variantQtyPlus.addEventListener('click', () => {
            variantQty++;
            document.getElementById('variant-qty-value').innerText = variantQty;
        });
    }

    if (addVariantToCartBtn) {
        addVariantToCartBtn.addEventListener('click', () => {
            if (selectedVariantId) {
                addToCart(selectedVariantId, variantQty);
                closeVariantModal();
            }
        });
    }
}

function renderServices(filter = 'all') {
    if (!servicesContainer) return;

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

function renderProducts() {
    if (!productsContainer) return;

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
                    ${
                        isGrouped
                            ? `<button class="btn btn-primary btn-sm" onclick="openVariantSelector('${prod.id}')"><i class="fa-solid fa-layer-group"></i> Elegir Opciones</button>`
                            : `<button class="btn btn-primary btn-sm" onclick="addToCart('${prod.id}')"><i class="fa-solid fa-cart-plus"></i> Añadir</button>`
                    }
                </div>
            </div>
        `;

        productsContainer.appendChild(card);
    });
}

function openBookingWizard() {
    activeBooking = { service: null, barber: BARBERS[0], date: null, time: null };

    if (clientForm) clientForm.reset();

    const prompt = document.getElementById('addon-prompt');
    const list = document.getElementById('wizard-services-list');

    if (prompt) prompt.style.display = 'none';

    if (list) {
        list.style.opacity = '1';
        list.style.pointerEvents = 'auto';
    }

    renderWizardServices();
    goToStep(1);
    bookingModal.classList.add('open');
}

function closeBookingWizard() {
    bookingModal.classList.remove('open');

    const successStep = document.getElementById('step-success');
    const firstStep = document.getElementById('step-1');

    if (successStep) successStep.classList.remove('active');
    if (firstStep) firstStep.classList.add('active');
}

function selectServiceAndOpen(serviceId) {
    openBookingWizard();
    const service = SERVICES.find(s => s.id === serviceId);
    if (service) selectWizardService(service);
}

function goToStep(stepNum) {
    document.querySelectorAll('.wizard-step').forEach(step => step.classList.remove('active'));

    if (stepNum === 'success') {
        document.getElementById('step-success').classList.add('active');
    } else {
        document.getElementById(`step-${stepNum}`).classList.add('active');
    }

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

    if (stepNum === 2) renderCalendar();
    if (stepNum === 3) renderBookingSummary();
}

function renderWizardServices() {
    if (!wizardServicesList) return;

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

        item.addEventListener('click', () => selectWizardService(service));
        wizardServicesList.appendChild(item);
    });
}

function selectWizardService(service) {
    activeBooking.service = { ...service };

    document.querySelectorAll('.wizard-service-item').forEach((el, index) => {
        el.classList.toggle('selected', SERVICES[index] && SERVICES[index].id === service.id);
    });

    if (service.category === 'pelo') {
        const prompt = document.getElementById('addon-prompt');
        const list = document.getElementById('wizard-services-list');

        list.style.opacity = '0.3';
        list.style.pointerEvents = 'none';
        prompt.style.display = 'flex';

        const btnYes = document.getElementById('btn-addon-yes');
        const btnNo = document.getElementById('btn-addon-no');

        const newBtnYes = btnYes.cloneNode(true);
        const newBtnNo = btnNo.cloneNode(true);

        btnYes.parentNode.replaceChild(newBtnYes, btnYes);
        btnNo.parentNode.replaceChild(newBtnNo, btnNo);

        newBtnYes.addEventListener('click', () => {
            activeBooking.service.title += ' + Perfilado de Cejas';
            activeBooking.service.price += 2000;

            list.style.opacity = '1';
            list.style.pointerEvents = 'auto';
            prompt.style.display = 'none';

            goToStep(2);
        });

        newBtnNo.addEventListener('click', () => {
            list.style.opacity = '1';
            list.style.pointerEvents = 'auto';
            prompt.style.display = 'none';

            goToStep(2);
        });
    } else {
        setTimeout(() => goToStep(2), 250);
    }
}

function renderCalendar() {
    if (!calendarDaysGrid) return;

    calendarDaysGrid.innerHTML = '';

    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    calendarMonthTitle.innerText = `${monthNames[month]} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDayIndex; i++) {
        calendarDaysGrid.appendChild(document.createElement('div'));
    }

    for (let day = 1; day <= totalDays; day++) {
        const dayButton = document.createElement('div');
        dayButton.className = 'calendar-day';
        dayButton.innerText = day;

        const thisDate = new Date(year, month, day);
        const isSunday = thisDate.getDay() === 0;
        const isPast = thisDate < today;

        if (isSunday || isPast) {
            dayButton.classList.add('disabled');
        } else {
            if (thisDate.toDateString() === today.toDateString()) dayButton.classList.add('today');
            if (activeBooking.date && thisDate.toDateString() === activeBooking.date.toDateString()) dayButton.classList.add('selected');

            dayButton.addEventListener('click', () => {
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                dayButton.classList.add('selected');
                activeBooking.date = thisDate;
                renderTimeSlots(thisDate);
            });
        }

        calendarDaysGrid.appendChild(dayButton);
    }

    selectedDateLabel.innerText = 'Seleccioná un día';
    timeslotsGrid.innerHTML = '<p class="select-date-prompt">Primero debés seleccionar un día del calendario que esté disponible.</p>';
}

function renderTimeSlots(date) {
    selectedDateLabel.innerText = date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    timeslotsGrid.innerHTML = '';

    const baseHours = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
    const saturdayHours = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
    const hours = date.getDay() === 6 ? saturdayHours : baseHours;
    const seed = date.getDate() + date.getMonth();

    hours.forEach((time, index) => {
        const btn = document.createElement('button');
        btn.className = 'timeslot-btn';
        btn.innerText = `${time} hs`;

        const isBooked = (seed * (index + 1) * 7) % 5 === 0;
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        const isHourPassed = isToday && parseInt(time.split(':')[0]) <= now.getHours();

        if (isBooked || isHourPassed) {
            btn.classList.add('disabled');
        } else {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.timeslot-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                activeBooking.time = time;
                setTimeout(() => goToStep(3), 250);
            });
        }

        timeslotsGrid.appendChild(btn);
    });
}

function renderBookingSummary() {
    if (!activeBooking.service || !activeBooking.barber || !activeBooking.date || !activeBooking.time) return;

    summaryService.innerText = activeBooking.service.title;
    summaryBarber.innerText = activeBooking.barber.name;
    summaryDate.innerText = activeBooking.date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    summaryTime.innerText = `${activeBooking.time} hs`;
    summaryCost.innerText = `$${activeBooking.service.price}`;
}

function handleBookingSubmit(e) {
    e.preventDefault();

    const clientName = document.getElementById('client-name').value;
    const clientPhone = document.getElementById('client-phone').value;
    const clientNotes = document.getElementById('client-notes').value;
    const bookingCode = `AVRZ-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBooking = {
        code: bookingCode,
        clientName,
        clientPhone,
        notes: clientNotes,
        service: activeBooking.service,
        barber: activeBooking.barber,
        date: activeBooking.date.toISOString(),
        time: activeBooking.time
    };

    bookings.push(newBooking);
    localStorage.setItem('avrz_bookings', JSON.stringify(bookings));

    ticketBookingCode.innerText = bookingCode;
    ticketService.innerText = activeBooking.service.title;
    ticketBarber.innerText = activeBooking.barber.name;
    ticketDate.innerText = activeBooking.date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    ticketTime.innerText = `${activeBooking.time} hs`;
    ticketClient.innerText = clientName;
    ticketPrice.innerText = `$${activeBooking.service.price}`;

    const readableDate = activeBooking.date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    const waMessage = `¡Hola, Luciano! Quiero coordinar mi próximo corte.

Nombre: ${clientName}
Día y Hora: ${readableDate} a las ${activeBooking.time} hs
Servicio: ${activeBooking.service.title}${clientNotes ? '\n\nAclaraciones: ' + clientNotes : ''}`;

    window.open(`https://wa.me/542915376912?text=${encodeURIComponent(waMessage)}`, '_blank');

    goToStep('success');
    renderBookingsList();
}

function renderBookingsList() {
    bookingsCountBadge.innerText = bookings.length;

    if (bookings.length === 0) {
        bookingsList.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-calendar-minus"></i>
                <p>No tenés ningún turno reservado todavía.</p>
                <button class="btn btn-primary btn-booking-trigger">Reservar un turno ahora</button>
            </div>
        `;

        bookingsList.querySelector('.btn-booking-trigger').addEventListener('click', openBookingWizard);
        return;
    }

    bookingsList.innerHTML = '';

    [...bookings].reverse().forEach(booking => {
        const itemDate = new Date(booking.date);
        const readableDate = itemDate.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });

        const card = document.createElement('div');
        card.className = 'booking-item-card';

        card.innerHTML = `
            <div class="booking-item-info">
                <h4>${booking.service.title}</h4>
                <p><i class="fa-solid fa-user-ninja"></i> ${booking.barber.name}</p>
                <p><i class="fa-regular fa-calendar"></i> ${readableDate} - ${booking.time} hs</p>
                <p class="text-muted"><i class="fa-solid fa-money-bill-wave"></i> $${booking.service.price}</p>
            </div>
            <div class="booking-item-actions">
                <span class="booking-code-badge">${booking.code}</span>
                <button class="btn-cancel-booking" onclick="cancelBooking('${booking.code}')">Cancelar Cita</button>
            </div>
        `;

        bookingsList.appendChild(card);
    });
}

function cancelBooking(code) {
    if (confirm('¿Estás seguro de que deseás cancelar este turno?')) {
        bookings = bookings.filter(b => b.code !== code);
        localStorage.setItem('avrz_bookings', JSON.stringify(bookings));
        renderBookingsList();
        alert('Cita cancelada con éxito.');
    }
}

function findProductById(id) {
    for (const prod of PRODUCTS) {
        if (prod.id === id) return prod;

        if (prod.variants) {
            const variant = prod.variants.find(v => v.id === id);

            if (variant) {
                return {
                    id: variant.id,
                    title: variant.title,
                    price: prod.price,
                    desc: variant.desc,
                    img: variant.img,
                    category: prod.category,
                    badge: variant.badge
                };
            }
        }
    }

    return null;
}

function addToCart(prodId, qty = 1) {
    const prod = findProductById(prodId);
    if (!prod) return;

    const existing = cart.find(item => item.product.id === prodId);

    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({ product: prod, quantity: qty });
    }

    saveAndRefreshCart();
    cartPanel.classList.add('open');
}

function updateCartQty(prodId, newQty) {
    if (newQty <= 0) {
        cart = cart.filter(item => item.product.id !== prodId);
    } else {
        const item = cart.find(item => item.product.id === prodId);
        if (item) item.quantity = newQty;
    }

    saveAndRefreshCart();
}

function removeCartItem(prodId) {
    cart = cart.filter(item => item.product.id !== prodId);
    saveAndRefreshCart();
}

function saveAndRefreshCart() {
    localStorage.setItem('avrz_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartBadge.innerText = totalItems;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-state">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Tu carrito está vacío.</p>
                <button class="btn btn-outline btn-sm" id="shop-now-btn">Explorar Tienda</button>
            </div>
        `;

        document.getElementById('shop-now-btn').addEventListener('click', () => {
            cartPanel.classList.remove('open');
        });

        cartSummaryFooter.style.display = 'none';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let totalValue = 0;

    cart.forEach(item => {
        const subtotal = item.product.price * item.quantity;
        totalValue += subtotal;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';

        itemEl.innerHTML = `
            <img src="${item.product.img}" alt="${item.product.title}" class="cart-item-img" onerror="this.src='https://placehold.co/100x100/191c26/FFF?text=${item.product.title}'">
            <div class="cart-item-details">
                <div>
                    <h4 class="cart-item-title">${item.product.title}</h4>
                    <span class="cart-item-price">$${item.product.price}</span>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateCartQty('${item.product.id}', ${item.quantity - 1})">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQty('${item.product.id}', ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="btn-remove-item" onclick="removeCartItem('${item.product.id}')" aria-label="Remover del carrito">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;

        cartItemsContainer.appendChild(itemEl);
    });

    cartTotalPrice.innerText = `$${totalValue}`;
    cartSummaryFooter.style.display = 'block';
}

function handleCartCheckout() {
    if (cart.length === 0) return;

    let messageText = `¡Hola AVRZ STUDIO! Quiero realizar un pedido desde la web:\n\n`;
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.product.price * item.quantity;
        total += subtotal;
        messageText += `*${item.product.title}* x ${item.quantity} - ($${item.product.price} c/u) subtotal: *$${subtotal}*\n`;
    });

    messageText += `\n*Total a pagar:* *$${total}*\n\nCoordinamos el retiro por el local en O'Higgins 179.`;

    window.open(`https://wa.me/542915376912?text=${encodeURIComponent(messageText)}`, '_blank');

    cart = [];
    saveAndRefreshCart();
    cartPanel.classList.remove('open');

    alert('¡Pedido enviado por WhatsApp! Nos contactaremos para coordinar la entrega.');
}

function openVariantSelector(prodId) {
    const prod = PRODUCTS.find(p => p.id === prodId);
    if (!prod || prod.type !== 'grouped') return;

    selectedVariantId = prod.variants[0].id;
    variantQty = 1;

    document.getElementById('variant-modal-title').innerText = prod.title.toUpperCase();
    document.getElementById('variant-modal-desc').innerText = `Seleccioná tu tipo favorito de ${prod.title.toLowerCase()}:`;
    document.getElementById('variant-qty-value').innerText = variantQty;

    const container = document.getElementById('variant-options-container');
    container.innerHTML = '';

    prod.variants.forEach((variant, idx) => {
        const optionCard = document.createElement('div');
        optionCard.className = `variant-option-card glass-card ${idx === 0 ? 'selected' : ''}`;
        optionCard.dataset.id = variant.id;

        optionCard.innerHTML = `
            <img src="${variant.img}" alt="${variant.title}" class="variant-option-img" onerror="this.src='https://placehold.co/100x100/191c26/FFF?text=${variant.title}'">
            <div class="variant-option-info">
                <div class="variant-option-header">
                    <h4>${variant.title}</h4>
                    <span class="badge-variant">${variant.badge}</span>
                </div>
                <p>${variant.desc}</p>
            </div>
        `;

        optionCard.addEventListener('click', () => {
            document.querySelectorAll('.variant-option-card').forEach(el => el.classList.remove('selected'));
            optionCard.classList.add('selected');
            selectedVariantId = variant.id;
        });

        container.appendChild(optionCard);
    });

    document.getElementById('variant-modal').classList.add('open');
}
