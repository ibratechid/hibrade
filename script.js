/**
 * HIBRADE - Digital Solutions
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Header.init();
    Navigation.init();
    Carousel.init();
    Forms.init();
    Footer.init();
    Utils.init();
});

/**
 * Header Module - Handles scroll effects and navigation visibility
 */
const Header = {
    init: function() {
        this.header = document.getElementById('header');
        this.threshold = 50;
        
        if (this.header) {
            window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
            this.handleScroll();
        }
    },
    
    handleScroll: function() {
        if (window.scrollY > this.threshold) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
};

/**
 * Navigation Module - Handles mobile menu, smooth scrolling, and active states
 */
const Navigation = {
    init: function() {
        this.navMenu = document.getElementById('nav-menu');
        this.navToggle = document.getElementById('nav-toggle');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', this.toggleMenu.bind(this));
        }
        
        // Smooth scrolling for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });
        
        // Update active nav on scroll
        window.addEventListener('scroll', this.updateActiveNav.bind(this), { passive: true });
    },
    
    toggleMenu: function() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
        }
    },
    
    handleNavClick: function(e) {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = this.header ? this.header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu
            if (this.navToggle && this.navMenu) {
                this.navToggle.classList.remove('active');
                this.navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    },
    
    updateActiveNav: function() {
        const scrollPosition = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

/**
 * Carousel Module - Handles project carousel with touch/swipe support
 */
const Carousel = {
    init: function() {
        this.carousel = document.getElementById('projects-carousel');
        this.track = null;
        this.dotsContainer = null;
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        
        if (this.carousel) {
            this.track = this.carousel.querySelector('.carousel-track');
            this.dotsContainer = document.getElementById('carousel-dots');
            
            if (this.track && this.dotsContainer) {
                this.cards = this.track.querySelectorAll('.project-card');
                this.currentIndex = 0;
                this.cardsPerView = this.getCardsPerView();
                this.totalCards = this.cards.length;
                this.autoRotateInterval = null;
                this.isAutoRotating = true;
                
                this.createDots();
                this.updateCarousel();
                this.bindEvents();
                this.startAutoRotate();
            }
        }
    },
    
    getCardsPerView: function() {
        const width = window.innerWidth;
        if (width >= 769) return 3;
        if (width >= 481) return 2;
        return 1;
    },
    
    createDots: function() {
        const totalDots = Math.ceil(this.totalCards / this.cardsPerView);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
        
        this.dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        this.updateDots();
    },
    
    bindEvents: function() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Touch events
        this.carousel.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        this.carousel.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        this.carousel.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        
        // Mouse events for drag
        let isMouseDown = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationId = null;
        
        this.carousel.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            startX = e.pageX;
            this.track.style.cursor = 'grabbing';
            this.pauseAutoRotate();
        });
        
        this.carousel.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            const currentPosition = e.pageX;
            const diff = currentPosition - startX;
            currentTranslate = prevTranslate + diff;
            this.setTransform(currentTranslate);
        });
        
        this.carousel.addEventListener('mouseup', () => {
            isMouseDown = false;
            this.track.style.cursor = 'grab';
            
            if (Math.abs(currentTranslate - prevTranslate) > 100) {
                if (currentTranslate < prevTranslate) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            this.setTransform(prevTranslate);
            this.resumeAutoRotate();
        });
        
        this.carousel.addEventListener('mouseleave', () => {
            if (isMouseDown) {
                isMouseDown = false;
                this.track.style.cursor = 'grab';
                this.resumeAutoRotate();
            }
        });
        
        // Pause auto-rotate on hover
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoRotate());
        this.carousel.addEventListener('mouseleave', () => this.resumeAutoRotate());
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.cardsPerView = this.getCardsPerView();
            this.dotsContainer.innerHTML = '';
            this.createDots();
            this.updateCarousel();
        });
    },
    
    handleTouchStart: function(e) {
        this.touchStartX = e.touches[0].clientX;
        this.pauseAutoRotate();
    },
    
    handleTouchMove: function(e) {
        if (this.touchStartX === null) return;
        
        const currentTouch = e.touches[0].clientX;
        const diff = this.touchStartX - currentTouch;
        
        if (diff > 50) {
            this.nextSlide();
            this.touchStartX = null;
        } else if (diff < -50) {
            this.prevSlide();
            this.touchStartX = null;
        }
    },
    
    handleTouchEnd: function() {
        this.touchStartX = null;
        this.resumeAutoRotate();
    },
    
    setTransform: function(value) {
        this.track.style.transform = `translateX(${value}px)`;
    },
    
    goToSlide: function(index) {
        const maxIndex = Math.ceil(this.totalCards / this.cardsPerView) - 1;
        if (index < 0) index = maxIndex;
        if (index > maxIndex) index = 0;
        
        this.currentIndex = index;
        this.updateCarousel();
        this.updateDots();
    },
    
    prevSlide: function() {
        this.goToSlide(this.currentIndex - 1);
    },
    
    nextSlide: function() {
        this.goToSlide(this.currentIndex + 1);
    },
    
    updateCarousel: function() {
        const cardWidth = this.cards[0] ? this.cards[0].offsetWidth : 0;
        const gap = 24;
        const offset = this.currentIndex * (cardWidth + gap);
        
        this.track.style.transform = `translateX(-${offset}px)`;
        this.updateDots();
    },
    
    updateDots: function() {
        if (!this.dots) return;
        
        const activeDot = Math.floor(this.currentIndex);
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDot);
        });
    },
    
    startAutoRotate: function() {
        this.autoRotateInterval = setInterval(() => {
            if (this.isAutoRotating) {
                this.nextSlide();
            }
        }, 6000); // 6 seconds interval
    },
    
    pauseAutoRotate: function() {
        this.isAutoRotating = false;
    },
    
    resumeAutoRotate: function() {
        this.isAutoRotating = true;
    }
};

/**
 * Forms Module - Handles form validation and submission
 */
const Forms = {
    init: function() {
        this.contactForm = document.getElementById('contact-form');
        
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', this.handleSubmit.bind(this));
            
            // Real-time validation
            const inputs = this.contactForm.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearError(input));
            });
        }
    },
    
    validateField: function(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        this.clearError(field);
        
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (field.id === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
        } else if (field.id === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
        }
        
        if (!isValid) {
            this.showError(field, errorMessage);
        } else if (value) {
            this.markValid(field);
        }
        
        return isValid;
    },
    
    showError: function(field, message) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            
            // Remove existing error message
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Add new error message
            const errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
    },
    
    clearError: function(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    },
    
    markValid: function(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('success');
        }
    },
    
    handleSubmit: function(e) {
        e.preventDefault();
        
        const form = e.target;
        const inputs = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#10B981';
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    
                    // Remove success classes
                    inputs.forEach(input => {
                        const formGroup = input.closest('.form-group');
                        if (formGroup) {
                            formGroup.classList.remove('success');
                        }
                    });
                }, 2000);
            }, 1500);
        }
    }
};

/**
 * Footer Module - Handles dynamic year and interactions
 */
const Footer = {
    init: function() {
        this.updateYear();
    },
    
    updateYear: function() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
};

/**
 * Utility Functions
 */
const Utils = {
    init: function() {
        this.initScrollReveal();
        this.initParallax();
    },
    
    initScrollReveal: function() {
        const revealElements = document.querySelectorAll('.service-card, .pricing-card, .team-card, .project-card');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            revealElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    },
    
    initParallax: function() {
        const heroBg = document.querySelector('.hero-bg');
        if (!heroBg) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (heroBg && scrolled < 700) {
                heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    },
    
    // Debounce utility
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle utility
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};
