// ============================================
// Modern Architecture Studio Website Script
// ============================================

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.project-card, .feature-item, .news-card, .team-member, .portfolio-item, .position-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300);
                    }
                }
            });
        });
    });
}

// Project Detail Modal
const projectModal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');
const projectLinks = document.querySelectorAll('.portfolio-link, .project-link');

if (projectModal && modalClose) {
    // Open modal
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const projectId = href.replace('#', '');
                const projectDetail = document.getElementById(`project-detail-${projectId}`);
                
                if (projectDetail) {
                    modalBody.innerHTML = projectDetail.innerHTML;
                    projectModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    // Close modal
    const closeModal = () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    
    if (projectModal.querySelector('.modal-overlay')) {
        projectModal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// News Article Navigation
const newsItemLinks = document.querySelectorAll('.news-item-link');
const articleFulls = document.querySelectorAll('.article-full');

newsItemLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const articleId = href.replace('#article-', 'article-full-');
            const targetArticle = document.getElementById(articleId);
            const newsList = document.querySelector('.news-list-section');
            
            if (targetArticle && newsList) {
                // Hide all articles and news list
                articleFulls.forEach(article => {
                    article.style.display = 'none';
                });
                newsList.style.display = 'none';
                
                // Show target article
                targetArticle.style.display = 'block';
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });
});

// Job Detail Modal
const jobModal = document.getElementById('job-modal');
const jobModalClose = document.getElementById('job-modal-close');
const jobModalBody = document.getElementById('job-modal-body');
const positionButtons = document.querySelectorAll('.position-btn');

if (jobModal && jobModalClose) {
    positionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const positionId = button.getAttribute('data-position');
            const jobDetail = document.getElementById(`job-detail-${positionId}`);
            
            if (jobDetail) {
                jobModalBody.innerHTML = jobDetail.innerHTML;
                jobModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Add event listener to apply button
                const applyBtn = jobModalBody.querySelector('#apply-btn-' + positionId);
                if (applyBtn) {
                    applyBtn.addEventListener('click', () => {
                        jobModal.classList.remove('active');
                        const applyModal = document.getElementById('apply-modal');
                        const applyPositionInput = document.getElementById('apply-position');
                        if (applyModal && applyPositionInput) {
                            applyPositionInput.value = positionId;
                            applyModal.classList.add('active');
                        }
                    });
                }
            }
        });
    });

    // Close job modal
    const closeJobModal = () => {
        jobModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    jobModalClose.addEventListener('click', closeJobModal);
    
    if (jobModal.querySelector('.modal-overlay')) {
        jobModal.querySelector('.modal-overlay').addEventListener('click', closeJobModal);
    }
}

// Apply Form Modal
const applyModal = document.getElementById('apply-modal');
const applyModalClose = document.getElementById('apply-modal-close');
const applyForm = document.getElementById('apply-form');

if (applyModal && applyModalClose) {
    const closeApplyModal = () => {
        applyModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    applyModalClose.addEventListener('click', closeApplyModal);
    
    if (applyModal.querySelector('.modal-overlay')) {
        applyModal.querySelector('.modal-overlay').addEventListener('click', closeApplyModal);
    }

    if (applyForm) {
        applyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your application! We will review it and get back to you soon.');
            applyForm.reset();
            closeApplyModal();
        });
    }
}

// Contact Form
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Parallax Effect for Hero Section (Optional)
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero-content');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Active Navigation Highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Lazy Loading Images (if supported)
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

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('InfinityX website loaded');
    
    // Dynamically adjust gold sweep animation start position based on X location
    const logoX = document.querySelector('.logo-x');
    const header = document.querySelector('.header');
    if (logoX && header) {
        const updateSweepPosition = () => {
            const logoXRect = logoX.getBoundingClientRect();
            const headerRect = header.getBoundingClientRect();
            const xPosition = logoXRect.left - headerRect.left + (logoXRect.width / 2);
            
            // Update animation keyframes dynamically
            const style = document.createElement('style');
            style.id = 'gold-sweep-dynamic';
            if (document.getElementById('gold-sweep-dynamic')) {
                document.getElementById('gold-sweep-dynamic').remove();
            }
            style.textContent = `
                @keyframes goldSweepFromX {
                    0% { left: ${xPosition}px; opacity: 0.6; }
                    3% { opacity: 1; }
                    5% { left: ${xPosition}px; opacity: 1; }
                    8% { left: ${xPosition}px; opacity: 1; }
                    40% { left: calc(100% - 30px); opacity: 1; }
                    43% { left: calc(100% - 30px); opacity: 0.7; }
                    45% { left: calc(100% - 30px); opacity: 0; }
                    46% { left: calc(100% - 30px); opacity: 0; }
                    48% { left: calc(100% - 30px); opacity: 0; }
                    50% { opacity: 0.5; }
                    85% { left: ${xPosition}px; opacity: 1; }
                    100% { left: ${xPosition}px; opacity: 0.7; }
                }
                @keyframes goldPulseAtX {
                    0%, 100% {
                        opacity: 0.6;
                        transform: skewX(-6deg) scale(1);
                    }
                    50% {
                        opacity: 0.85;
                        transform: skewX(-6deg) scale(1.05);
                    }
                }
                .header::before {
                    left: ${xPosition}px;
                }
            `;
            document.head.appendChild(style);
        };
        
        // Update on load and resize
        setTimeout(updateSweepPosition, 100); // Small delay to ensure layout is ready
        window.addEventListener('resize', updateSweepPosition);
    }
});

