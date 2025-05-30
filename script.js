document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu Tab Filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuItemsContainer = document.querySelector('.menu-items');
    
    // Menu Data
    const menuItems = [
        {
            id: 1,
            title: "Clásica Burger",
            price: "7.99€",
            category: "burgers",
            desc: "Carne 100% res, queso cheddar, lechuga, tomate y salsa especial.",
            rating: "★★★★★",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 2,
            title: "Doble Queso",
            price: "9.99€",
            category: "burgers",
            desc: "Doble carne, doble queso, cebolla caramelizada y salsa BBQ.",
            rating: "★★★★☆",
            image: "hambqueso.avif"
        },
        {
            id: 3,
            title: "Pollo Crispy",
            price: "8.49€",
            category: "burgers",
            desc: "Pechuga de pollo empanizada, lechuga, mayonesa de ajo y pepinillos.",
            rating: "★★★★★",
            image: "pollo.jpg"
        },
        {
            id: 4,
            title: "Veggie Delight",
            price: "8.99€",
            category: "burgers",
            desc: "Hamburguesa de garbanzos, aguacate, espinaca y salsa tahini.",
            rating: "★★★★☆",
            image: "hamblight.avif"
        },
        {
            id: 5,
            title: "Papas Fritas",
            price: "3.99€",
            category: "sides",
            desc: "Papas fritas crujientes con sal marina y perejil.",
            rating: "★★★★★",
            image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 6,
            title: "Aros de Cebolla",
            price: "4.49€",
            category: "sides",
            desc: "Crujientes aros de cebolla con salsa ranch.",
            rating: "★★★★☆",
            image: "aros.jpg"
        },
        {
            id: 7,
            title: "Refresco",
            price: "2.49€",
            category: "drinks",
            desc: "Refresco frío de 500ml en varios sabores.",
            rating: "★★★★★",
            image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 8,
            title: "Limonada",
            price: "3.99€",
            category: "drinks",
            desc: "Limonada natural con menta y jengibre.",
            rating: "★★★★★",
            image: "limonada.jpg"
        }
    ];
    
    // Load all menu items initially
    loadMenuItems(menuItems);
    
    // Tab filtering functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            if (category === 'all') {
                loadMenuItems(menuItems);
            } else {
                const filteredItems = menuItems.filter(item => item.category === category);
                loadMenuItems(filteredItems);
            }
        });
    });
    
    // Function to load menu items
    function loadMenuItems(items) {
        menuItemsContainer.innerHTML = '';
        
        if (items.length === 0) {
            menuItemsContainer.innerHTML = '<p class="no-items">No hay elementos en esta categoría</p>';
            return;
        }
        
        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item slide-in';
            menuItem.innerHTML = `
                <div class="menu-item-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-title">${item.title}</h3>
                        <span class="menu-item-price">${item.price}</span>
                    </div>
                    <p class="menu-item-desc">${item.desc}</p>
                    <div class="menu-item-footer">
                        <span class="menu-item-rating">${item.rating}</span>
                        <div class="menu-item-btn">
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>
                </div>
            `;
            
            menuItemsContainer.appendChild(menuItem);
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    // Show initial testimonial
    showTestimonial(currentTestimonial);
    
    // Next testimonial
    nextBtn.addEventListener('click', function() {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    });
    
    // Previous testimonial
    prevBtn.addEventListener('click', function() {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonials.length - 1;
        }
        showTestimonial(currentTestimonial);
    });
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name === '' || email === '' || message === '') {
                alert('Por favor completa todos los campos requeridos');
                return;
            }
            
            // Show loading spinner
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado';
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Enviar Mensaje';
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto pronto.';
                    successMsg.style.display = 'block';
                    
                    const existingSuccessMsg = contactForm.querySelector('.success-message');
                    if (existingSuccessMsg) {
                        existingSuccessMsg.remove();
                    }
                    
                    contactForm.appendChild(successMsg);
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                }, 2000);
            }, 1500);
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value.trim();
            
            if (email === '') {
                alert('Por favor ingresa tu correo electrónico');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            // Simulate subscription
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                this.reset();
                
                // Show thank you message
                const thankYou = document.createElement('p');
                thankYou.textContent = '¡Gracias por suscribirte!';
                thankYou.style.color = 'var(--success-color)';
                thankYou.style.marginTop = '1rem';
                thankYou.style.textAlign = 'center';
                
                const existingMsg = this.querySelector('p:last-child');
                if (existingMsg && existingMsg.textContent !== '¡Gracias por suscribirte!') {
                    this.insertBefore(thankYou, existingMsg.nextSibling);
                }
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                }, 2000);
            }, 1500);
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.slide-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add delay classes to menu items
    const menuItemsElements = document.querySelectorAll('.menu-item');
    menuItemsElements.forEach((item, index) => {
        item.classList.add(`delay-${index % 3}`);
    });
});