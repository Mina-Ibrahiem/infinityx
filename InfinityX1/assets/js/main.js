/* ============================================
   InfinityX Engineering Consultancy - Main JS
   Interactions, Animations & Functionality
   ============================================ */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initFAQ();
    initContactForm();
    initHeaderScroll();
});

// ============================================
// Navigation
// ============================================
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Set active nav link based on current page
    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
    const header = document.getElementById('header');
    const logoContainer = document.querySelector('.logo-container');
    const logoImage = document.querySelector('.logo-image');
    let lastScroll = 0;
    let isScrollingDown = false;
    
    if (header && logoContainer && logoImage) {
        const scrollHandler = throttle(function() {
            const currentScroll = window.pageYOffset;
            isScrollingDown = currentScroll > lastScroll;
            
            if (currentScroll > 50) {
                if (!header.classList.contains('scrolled')) {
                    header.classList.add('scrolled');
                }
                
                // Smooth logo shrink on scroll down
                if (isScrollingDown && currentScroll > 100) {
                    const scrollProgress = Math.min((currentScroll - 100) / 200, 1);
                    const scale = 1 - (scrollProgress * 0.15); // Shrink to 85%
                    const opacity = 1 - (scrollProgress * 0.2); // Reduce to 80%
                    
                    logoContainer.style.transform = `scale(${scale})`;
                    logoContainer.style.opacity = opacity;
                } else {
                    // Return to normal when scrolling up
                    logoContainer.style.transform = 'scale(1)';
                    logoContainer.style.opacity = '1';
                }
            } else {
                header.classList.remove('scrolled');
                logoContainer.style.transform = 'scale(1)';
                logoContainer.style.opacity = '1';
            }
            
            lastScroll = currentScroll;
        }, 10);
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
    }
}

// ============================================
// Smooth Scrolling
// ============================================
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const delay = entry.target.classList.contains('delay-1') ? 150 :
                             entry.target.classList.contains('delay-2') ? 300 :
                             entry.target.classList.contains('delay-3') ? 450 :
                             entry.target.classList.contains('delay-4') ? 600 : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in, .slide-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Staggered animation for grid items with better timing
    const servicesGrid = document.querySelectorAll('.services-grid .service-card');
    servicesGrid.forEach((item, index) => {
        const delay = (index % 3) * 150;
        item.style.transitionDelay = `${delay}ms`;
    });
    
    const projectsGrid = document.querySelectorAll('.projects-grid .project-card, .projects-grid .project-card-large');
    projectsGrid.forEach((item, index) => {
        const delay = (index % 3) * 200;
        item.style.transitionDelay = `${delay}ms`;
    });
    
    const whyGrid = document.querySelectorAll('.why-grid .why-card');
    whyGrid.forEach((item, index) => {
        const delay = (index % 2) * 200;
        item.style.transitionDelay = `${delay}ms`;
    });
    
    const valuesGrid = document.querySelectorAll('.values-grid .value-card');
    valuesGrid.forEach((item, index) => {
        const delay = (index % 2) * 150;
        item.style.transitionDelay = `${delay}ms`;
    });
}

// ============================================
// FAQ Accordion
// ============================================
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.nextElementSibling;
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.setAttribute('aria-expanded', 'false');
                    q.nextElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                answer.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                answer.classList.add('active');
            }
        });
    });
}

// ============================================
// Contact Form Validation & Submission
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const projectTypeInput = document.getElementById('project-type');
            const messageInput = document.getElementById('message');
            
            // Reset errors
            clearFormErrors();
            
            // Validate form
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                showError('name-error', 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                showError('email-error', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError('email-error', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate project type
            if (!projectTypeInput.value) {
                showError('project-type-error', 'Please select a project type');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                showError('message-error', 'Message is required');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                const formSuccess = document.getElementById('form-success');
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    contactForm.reset();
                    
                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                }
            } else {
                // Scroll to first error
                const firstError = contactForm.querySelector('.form-error.active');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error on input
                const errorId = this.id + '-error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.classList.remove('active');
                }
            });
        });
    }
}

function validateField(field) {
    const errorId = field.id + '-error';
    const errorElement = document.getElementById(errorId);
    
    if (!errorElement) return;
    
    // Clear previous error
    errorElement.classList.remove('active');
    
    // Validate based on field type
    if (field.hasAttribute('required') && !field.value.trim()) {
        showError(errorId, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && field.value.trim() && !isValidEmail(field.value)) {
        showError(errorId, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(error => {
        error.classList.remove('active');
        error.textContent = '';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance optimization
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
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// Performance Optimizations
// ============================================

// Lazy load images (if added in future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Parallax Effect for Hero Section
// ============================================
function initParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            const heroOverlay = hero.querySelector('.hero-overlay');
            
            if (heroContent && scrolled < window.innerHeight) {
                // Subtle parallax for content
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = Math.max(0, 1 - (scrolled / window.innerHeight) * 0.4);
                
                // Parallax for overlay
                if (heroOverlay) {
                    heroOverlay.style.opacity = Math.min(1, 0.95 + (scrolled / window.innerHeight) * 0.05);
                }
            }
        }, 10), { passive: true });
    }
}

// Initialize parallax on page load
document.addEventListener('DOMContentLoaded', function() {
    initParallax();
});

// ============================================
// Smooth Number Counter Animation for Stats
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    entry.target.textContent = '0' + (text.includes('+') ? '+' : '') + (text.includes('%') ? '%' : '');
                    animateCounter(entry.target, number, 2000);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', function() {
    initCounterAnimation();
});

console.log('InfinityX Engineering Consultancy website loaded successfully.');

