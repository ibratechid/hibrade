// ===================================
// HIBRADE - Digital Solutions
// Landing Page JavaScript
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScroll();
    initMobileMenu();
    initFormValidation();
    initScrollAnimations();
    initHeaderScroll();
    
    // New Functionalities
    initProjects();
    initTestimonials();
    initBlog();
    initNewsletterForm();
});

// ===================================
// Projects & Portfolio Logic
// ===================================
const projectsData = [
    {
        id: 1,
        title: "E-Commerce Revolution",
        category: "Web Development",
        client: "Global Retail Inc.",
        description: "A complete overhaul of their online shopping experience with focus on mobile-first design and lightning-fast checkout.",
        result: "40% increase in mobile conversions",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><rect x="50" y="40" width="300" height="120" rx="10" fill="#0066CC" opacity="0.2"/></svg>`
    },
    {
        id: 2,
        title: "SEO Masterclass",
        category: "SEO",
        client: "Tech Startups Hub",
        description: "Comprehensive SEO strategy including technical audits, content optimization, and high-authority link building.",
        result: "250% growth in organic traffic",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><circle cx="200" cy="100" r="50" fill="#0066CC" opacity="0.2"/></svg>`
    },
    {
        id: 3,
        title: "Cloud Infrastructure Mgmt",
        category: "Web Management",
        client: "Finance Secure",
        description: "Ongoing management and security monitoring of their critical cloud infrastructure and web applications.",
        result: "99.99% uptime maintained",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><path d="M100 150L200 50L300 150" stroke="#0066CC" stroke-width="10" opacity="0.2"/></svg>`
    },
    {
        id: 4,
        title: "Corporate Identity Site",
        category: "Web Development",
        client: "Architecture Today",
        description: "Bespoke corporate website showcasing their award-winning portfolio with high-resolution imagery and smooth transitions.",
        result: "3x average session duration",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><rect x="100" y="60" width="200" height="80" fill="#0066CC" opacity="0.2"/></svg>`
    },
    {
        id: 5,
        title: "Local Search Dominance",
        category: "SEO",
        client: "Metro Dental Group",
        description: "Localized SEO campaign targeting specific regions and optimizing Google My Business profiles.",
        result: "80% more local inquiries",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><path d="M200 50 L220 150 L180 150 Z" fill="#0066CC" opacity="0.2"/></svg>`
    },
    {
        id: 6,
        title: "Security Hardening Project",
        category: "Web Management",
        client: "Eco Systems Ltd",
        description: "Complete security audit and implementation of advanced firewall and malware protection systems.",
        result: "Zero security breaches in 2 years",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><rect x="150" y="50" width="100" height="100" rx="10" fill="#0066CC" opacity="0.2"/></svg>`
    },
    {
        id: 7,
        title: "SaaS Platform Launch",
        category: "Web Development",
        client: "Streamline SaaS",
        description: "Full-stack development of a subscription-based task management platform with real-time collaboration.",
        result: "10k+ users in first 3 months",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><path d="M50 100 Q 200 0 350 100" stroke="#0066CC" stroke-width="10" opacity="0.2" fill="none"/></svg>`
    },
    {
        id: 8,
        title: "Content Marketing Engine",
        category: "SEO",
        client: "Wellness First",
        description: "Data-driven content strategy focusing on high-intent keywords and authority building in the wellness niche.",
        result: "500% increase in blog traffic",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><rect x="80" y="40" width="240" height="120" rx="5" fill="#0066CC" opacity="0.1"/></svg>`
    },
    {
        id: 9,
        title: "Legacy System Migration",
        category: "Web Management",
        client: "Heritage Bank",
        description: "Careful migration of legacy web systems to modern cloud infrastructure with zero downtime.",
        result: "60% reduction in hosting costs",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><circle cx="150" cy="100" r="40" fill="#0066CC" opacity="0.2"/><circle cx="250" cy="100" r="40" fill="#0066CC" opacity="0.1"/></svg>`
    },
    {
        id: 10,
        title: "Educational Portal",
        category: "Web Development",
        client: "EduGlobal",
        description: "Interactive learning management system with video streaming and automated progress tracking.",
        result: "95% student satisfaction rate",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><rect x="120" y="80" width="160" height="80" fill="#0066CC" opacity="0.2"/></svg>`
    }
];

function initProjects() {
    const grid = document.getElementById('projectsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close-modal');

    if (!grid) return;

    function renderProjects(filter = 'all') {
        grid.innerHTML = '';
        const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);
        
        filtered.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card animate';
            card.innerHTML = `
                <div class="project-image">${project.image}</div>
                <div class="project-content">
                    <span class="project-category">${project.category}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-client">${project.client}</span>
                    <p class="project-description">${project.description}</p>
                    <span class="project-result">${project.result}</span>
                    <button class="project-link btn-text" onclick="viewProject(${project.id})">View Case Study →</button>
                </div>
            `;
            card.addEventListener('click', () => openProjectModal(project));
            grid.appendChild(card);
        });
    }

    function openProjectModal(project) {
        modalBody.innerHTML = `
            <div class="modal-project-header">
                <h2>${project.title}</h2>
                <span class="project-category">${project.category}</span>
            </div>
            <div class="modal-project-image">${project.image}</div>
            <div class="modal-project-details">
                <div class="detail-item">
                    <h4>Client</h4>
                    <p>${project.client}</p>
                </div>
                <div class="detail-item">
                    <h4>Challenge</h4>
                    <p>${project.description}</p>
                </div>
                <div class="detail-item">
                    <h4>Results</h4>
                    <p class="project-result">${project.result}</p>
                </div>
                <div class="detail-item">
                    <h4>Services Provided</h4>
                    <ul>
                        <li>${project.category}</li>
                        <li>Digital Strategy</li>
                        <li>Analytics & Reporting</li>
                    </ul>
                </div>
            </div>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    window.viewProject = (id) => {
        const project = projectsData.find(p => p.id === id);
        if (project) openProjectModal(project);
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });

    closeBtn.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    renderProjects();
}

// ===================================
// Testimonials Slider Logic
// ===================================
const testimonialsData = [
    {
        name: "Sarah Johnson",
        company: "CEO, Retail Dynamics",
        rating: 5,
        quote: "HIBRADE transformed our online presence. Their team's attention to detail and strategic approach led to a significant increase in our ROI.",
        photo: `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="#E8F0FF"/><circle cx="40" cy="30" r="15" fill="#0066CC" opacity="0.3"/><path d="M15 65C15 50 25 45 40 45C55 45 65 50 65 65" fill="#0066CC" opacity="0.3"/></svg>`
    },
    {
        name: "Michael Chen",
        company: "Marketing Director, TechFlow",
        rating: 5,
        quote: "Professional, responsive, and highly skilled. They didn't just build a website; they built a growth engine for our business.",
        photo: `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="#E8F0FF"/><circle cx="40" cy="30" r="15" fill="#0066CC" opacity="0.3"/><path d="M15 65C15 50 25 45 40 45C55 45 65 50 65 65" fill="#0066CC" opacity="0.3"/></svg>`
    },
    {
        name: "Amanda Rivera",
        company: "Founder, GreenSpace",
        rating: 5,
        quote: "The SEO results were beyond our expectations. We're now ranking #1 for our most important keywords. Highly recommended!",
        photo: `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="#E8F0FF"/><circle cx="40" cy="30" r="15" fill="#0066CC" opacity="0.3"/><path d="M15 65C15 50 25 45 40 45C55 45 65 50 65 65" fill="#0066CC" opacity="0.3"/></svg>`
    },
    {
        name: "David Smith",
        company: "Operations Manager, Global Logistics",
        rating: 5,
        quote: "Their web management services give us peace of mind. Everything runs smoothly, and they're always there when we need them.",
        photo: `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="#E8F0FF"/><circle cx="40" cy="30" r="15" fill="#0066CC" opacity="0.3"/><path d="M15 65C15 50 25 45 40 45C55 45 65 50 65 65" fill="#0066CC" opacity="0.3"/></svg>`
    },
    {
        name: "Robert Wilson",
        company: "CTO, FinTech Solutions",
        rating: 5,
        quote: "Technical expertise at its best. They handled our complex migration with precision and professional care.",
        photo: `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="#E8F0FF"/><circle cx="40" cy="30" r="15" fill="#0066CC" opacity="0.3"/><path d="M15 65C15 50 25 45 40 45C55 45 65 50 65 65" fill="#0066CC" opacity="0.3"/></svg>`
    }
];

function initTestimonials() {
    const container = document.getElementById('testimonialContainer');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    if (!container) return;

    let currentIndex = 0;

    function renderTestimonials() {
        container.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        testimonialsData.forEach((t, index) => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="testimonial-photo">${t.photo}</div>
                <div class="testimonial-rating">${'★'.repeat(t.rating)}</div>
                <p class="testimonial-quote">"${t.quote}"</p>
                <div class="testimonial-author">
                    <h4>${t.name}</h4>
                    <p>${t.company}</p>
                </div>
            `;
            container.appendChild(card);
            
            const dot = document.createElement('div');
            dot.className = `dot ${index === currentIndex ? 'active' : ''}`;
            dot.onclick = () => goToSlide(index);
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        const offset = -currentIndex * 100;
        container.style.transform = `translateX(${offset}%)`;
        
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    prevBtn.onclick = () => {
        currentIndex = (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
        goToSlide(currentIndex);
    };

    nextBtn.onclick = () => {
        currentIndex = (currentIndex + 1) % testimonialsData.length;
        goToSlide(currentIndex);
    };

    // Auto-play
    let interval = setInterval(() => nextBtn.onclick(), 5000);
    
    container.parentElement.addEventListener('mouseenter', () => clearInterval(interval));
    container.parentElement.addEventListener('mouseleave', () => interval = setInterval(() => nextBtn.onclick(), 5000));

    renderTestimonials();
}

// ===================================
// Blog Logic
// ===================================
const blogData = [
    {
        id: 1,
        title: "The Future of Web Development in 2024",
        author: "Dimas Aji",
        date: "Oct 24, 2023",
        category: "Web Development",
        excerpt: "Explore the emerging trends in web development, from AI-integrated interfaces to the rise of edge computing. What every business needs to know to stay ahead.",
        content: "Full content of the blog post about future trends in web development... (Detailed 1000+ words article content would go here).",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><rect x="50" y="50" width="300" height="100" fill="#0066CC" opacity="0.1"/></svg>`
    },
    {
        id: 2,
        title: "SEO Strategies for High-Growth Companies",
        author: "Vetty N.",
        date: "Nov 12, 2023",
        category: "SEO",
        excerpt: "A deep dive into advanced SEO strategies that helped our clients achieve 300% growth. Focus on semantic search and user intent.",
        content: "Detailed SEO strategies content...",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><circle cx="200" cy="100" r="60" fill="#0066CC" opacity="0.1"/></svg>`
    },
    {
        id: 3,
        title: "Maximizing ROI with Digital Marketing",
        author: "Budi Santoso",
        date: "Dec 05, 2023",
        category: "Digital Marketing",
        excerpt: "Learn how to effectively allocate your marketing budget across different digital channels for maximum impact and measurable results.",
        content: "ROI optimization content...",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><path d="M50 150 L150 100 L250 120 L350 50" stroke="#0066CC" stroke-width="5" opacity="0.2" fill="none"/></svg>`
    },
    {
        id: 4,
        title: "Why Website Performance is a Business Metric",
        author: "Agustina",
        date: "Jan 15, 2024",
        category: "Business Growth",
        excerpt: "Website speed isn't just a technical metric; it's a critical factor in user retention and conversion rates. Here's why every second counts.",
        content: "Performance as a business metric content...",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><rect x="180" y="40" width="40" height="120" fill="#0066CC" opacity="0.2"/></svg>`
    },
    {
        id: 5,
        title: "Scaling Your Business Online",
        author: "Dimas Aji",
        date: "Feb 02, 2024",
        category: "Business Growth",
        excerpt: "Key considerations for scaling your digital infrastructure as your customer base grows. Avoiding common pitfalls in rapid expansion.",
        content: "Scaling online business content...",
        image: `<svg width="100%" height="200" viewBox="0 0 400 200" fill="none"><rect width="400" height="200" fill="#E8F0FF"/><path d="M50 150 L350 50" stroke="#0066CC" stroke-width="10" opacity="0.2"/></svg>`
    }
];

function initBlog() {
    const grid = document.getElementById('blogGrid');
    const detailContainer = document.getElementById('blogDetailContainer');

    if (!grid) return;

    function renderBlogList() {
        grid.innerHTML = '';
        blogData.forEach(post => {
            const card = document.createElement('div');
            card.className = 'blog-card animate';
            card.innerHTML = `
                <div class="blog-image">${post.image}</div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-category">${post.category}</span>
                        <span class="blog-date">${post.date}</span>
                    </div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <button class="blog-link btn-text" onclick="viewBlogPost(${post.id})">Read More →</button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    window.viewBlogPost = (id) => {
        const post = blogData.find(p => p.id === id);
        if (post) {
            detailContainer.innerHTML = `
                <button class="btn btn-secondary" onclick="closeBlogDetail()" style="margin-bottom: 24px;">← Back to Blog</button>
                <div class="blog-detail-content">
                    <span class="blog-category">${post.category}</span>
                    <h1 class="section-title">${post.title}</h1>
                    <div class="blog-meta" style="margin-bottom: 32px;">
                        <span>By <strong>${post.author}</strong></span> | <span>${post.date}</span>
                    </div>
                    <div class="blog-detail-image" style="margin-bottom: 40px;">${post.image.replace('height="200"', 'height="400"')}</div>
                    <div class="blog-body" style="font-size: 1.1rem; line-height: 1.8;">
                        <p>${post.excerpt}</p>
                        <p>${post.content}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                </div>
            `;
            grid.style.display = 'none';
            detailContainer.classList.add('active');
            detailContainer.scrollIntoView({ behavior: 'smooth' });
        }
    };

    window.closeBlogDetail = () => {
        detailContainer.classList.remove('active');
        grid.style.display = 'grid';
        document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
    };

    renderBlogList();
}

// ===================================
// Newsletter Form Logic
// ===================================
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const successMsg = document.getElementById('newsletterSuccess');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = form.querySelector('input');
        
        if (input.value) {
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Subscribing...';
            btn.disabled = true;

            setTimeout(() => {
                form.reset();
                successMsg.classList.add('show');
                btn.textContent = originalText;
                btn.disabled = false;
                
                setTimeout(() => successMsg.classList.remove('show'), 5000);
            }, 1000);
        }
    });
}

// ===================================
// Navigation & Active States
// ===================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Update active nav link on scroll
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY + 150;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll event listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    updateActiveLink();
}

// ===================================
// Smooth Scroll
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                const hamburger = document.getElementById('hamburger');
                
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// ===================================
// Mobile Menu Toggle
// ===================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-link, .nav-cta');
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===================================
// Form Validation & Submission
// ===================================
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    
    if (!form) return;
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error state when user starts typing
            this.classList.remove('error');
            const errorMessage = this.parentElement.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all inputs
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(function() {
                // Reset form
                form.reset();
                
                // Show success message
                successMessage.classList.add('show');
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.classList.remove('show');
                }, 5000);
                
            }, 1500);
        }
    });
}

// Validate individual input
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    input.classList.remove('error');
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Required validation
    if (input.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = `${getLabel(input)} is required`;
    }
    
    // Email validation
    if (input.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Show error if invalid
    if (!isValid) {
        input.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.color = '#EF4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '4px';
        errorElement.style.display = 'block';
        errorElement.textContent = errorMessage;
        input.parentElement.appendChild(errorElement);
    }
    
    return isValid;
}

// Get label text for input
function getLabel(input) {
    const label = input.parentElement.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : 'This field';
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll(
        '.section-header, .service-card, .team-member, .project-card, .about-content, .cta-content, .pricing-card, .testimonial-card, .blog-card'
    );
    
    animateElements.forEach(el => observer.observe(el));
}

// ===================================
// Header Scroll Effect
// ===================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        // Add scrolled class when scrolled down
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add error styles dynamically
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #EF4444 !important;
    }
    
    .form-group input.error:focus,
    .form-group select.error:focus,
    .form-group textarea.error:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(style);

// ===================================
// Performance Optimization
// ===================================

// Lazy load images (for future use with actual images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    
    const animatedElements = document.querySelectorAll('.animate');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
        el.style.opacity = '1';
    });
}

// Log page load for analytics (placeholder)
window.addEventListener('load', function() {
    console.log('HIBRADE - Landing Page loaded successfully');
    
    // You can add analytics tracking here
    // Example: gtag('event', 'page_view', { 'page_title': 'HIBRADE - Home' });
});