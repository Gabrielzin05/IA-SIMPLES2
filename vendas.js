// DOM Elements
const loadingScreen = document.getElementById('loading');
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const ctaPrimary = document.getElementById('ctaPrimary');
const finalCta = document.getElementById('finalCta');

// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 1500);
});

// Header Scroll Effect
let lastScrollY = 0;
window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    // Add scrolled class for styling
    if (currentScrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Mobile Menu Toggle
if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Counter Animation for Trust Indicators
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 1000000) {
            element.textContent = Math.floor(current / 1000000) + 'M+';
        } else if (target >= 1000) {
            element.textContent = Math.floor(current / 1000) + 'K+';
        } else if (target < 100 && target % 1 !== 0) {
            element.textContent = current.toFixed(1) + '%';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add AOS animation class
            if (entry.target.hasAttribute('data-aos')) {
                entry.target.classList.add('aos-animate');
            }
            
            // Animate counters
            if (entry.target.classList.contains('trust-indicators')) {
                const counters = entry.target.querySelectorAll('.trust-number[data-target]');
                counters.forEach((counter, index) => {
                    if (!counter.dataset.animated) {
                        counter.dataset.animated = 'true';
                        const target = parseFloat(counter.dataset.target);
                        setTimeout(() => {
                            animateCounter(counter, target);
                        }, index * 200);
                    }
                });
            }
            
            // Animate feature cards
            if (entry.target.classList.contains('features-grid')) {
                const cards = entry.target.querySelectorAll('.feature-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
                    }, 100);
                });
            }
            
            // Animate benefit items
            if (entry.target.classList.contains('benefits-list')) {
                const items = entry.target.querySelectorAll('.benefit-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = `fadeInRight 0.6s ease ${index * 0.1}s forwards`;
                    }, 200);
                });
            }
            
            // Animate testimonial cards
            if (entry.target.classList.contains('testimonials-grid')) {
                const cards = entry.target.querySelectorAll('.testimonial-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.6s ease ${index * 0.15}s forwards`;
                    }, 300);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('[data-aos], .trust-indicators, .features-grid, .benefits-list, .testimonials-grid').forEach(el => {
    observer.observe(el);
});

// Button Click Effects
function addButtonEffect(button) {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(addButtonEffect);

// CTA Button Actions
if (ctaPrimary) {
    ctaPrimary.addEventListener('click', function() {
        // Add your CTA action here
        console.log('Primary CTA clicked');
        // Example: window.open('https://your-signup-url.com', '_blank');
    });
}

if (finalCta) {
    finalCta.addEventListener('click', function() {
        // Add your final CTA action here
        console.log('Final CTA clicked');
        // Example: window.open('https://your-checkout-url.com', '_blank');
    });
}

// Parallax Effect for Background Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-gradient-1, .bg-gradient-2, .bg-gradient-3');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 20px;
            border-top: 1px solid rgba(71, 85, 105, 0.3);
            gap: 16px;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-based animations can be added here
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Add loading states for better UX
function addLoadingState(button) {
    button.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Carregando...';
        this.disabled = true;
        
        // Simulate loading (replace with actual action)
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 2000);
    });
}

// Apply loading states to CTA buttons
document.querySelectorAll('.btn-primary').forEach(addLoadingState);

console.log('IA SIMPLES - Landing page loaded successfully! 🚀');