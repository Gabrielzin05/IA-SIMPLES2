// DOM Elements
const successAnimation = document.getElementById('successAnimation');
const supportBtn = document.getElementById('supportBtn');
const resendEmailBtn = document.getElementById('resendEmail');
const scheduleCallBtn = document.getElementById('scheduleCall');
const downloadGuideBtn = document.getElementById('downloadGuide');
const helpFab = document.getElementById('helpFab');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCounters();
    initializeFAQ();
    initializeButtons();
    updateStatusCards();
});

// Success Animation
function initializeAnimations() {
    // Hide success animation after 3 seconds
    setTimeout(() => {
        if (successAnimation) {
            successAnimation.style.display = 'none';
        }
    }, 3000);

    // Initialize AOS-like animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animations
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // Observe resource cards
    document.querySelectorAll('.resource-card').forEach(el => {
        observer.observe(el);
    });

    // Observe step items
    document.querySelectorAll('.step-item').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initializeCounters() {
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
            
            if (target >= 10000) {
                element.textContent = Math.floor(current / 1000) + 'K+';
            } else if (target >= 1000) {
                element.textContent = Math.floor(current / 1000) + 'K+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number[data-target]');
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
        });
    }, { threshold: 0.5 });

    const statsRow = document.querySelector('.stats-row');
    if (statsRow) {
        statsObserver.observe(statsRow);
    }
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Button Interactions
function initializeButtons() {
    // Add ripple effect to buttons
    function addRippleEffect(button) {
        button.addEventListener('click', function(e) {
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

    // Apply ripple effect to all buttons
    document.querySelectorAll('.btn').forEach(addRippleEffect);

    // Support button
    if (supportBtn) {
        supportBtn.addEventListener('click', function() {
            showNotification('Redirecionando para o suporte...', 'info');
            // Add your support action here
            console.log('Support button clicked');
        });
    }

    // Resend email button
    if (resendEmailBtn) {
        resendEmailBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = 'Enviando...';
            this.disabled = true;
            
            // Simulate email sending
            setTimeout(() => {
                this.innerHTML = 'Email Reenviado!';
                showNotification('Email de confirmação reenviado com sucesso!', 'success');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Schedule call button
    if (scheduleCallBtn) {
        scheduleCallBtn.addEventListener('click', function() {
            showNotification('Redirecionando para agendamento...', 'info');
            // Add your scheduling action here
            console.log('Schedule call button clicked');
            // Example: window.open('https://calendly.com/your-link', '_blank');
        });
    }

    // Download guide button
    if (downloadGuideBtn) {
        downloadGuideBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = 'Preparando Download...';
            this.disabled = true;
            
            // Simulate download preparation
            setTimeout(() => {
                this.innerHTML = 'Download Iniciado!';
                showNotification('Download do guia iniciado!', 'success');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }, 1000);
        });
    }

    // Help FAB
    if (helpFab) {
        helpFab.addEventListener('click', function() {
            showNotification('Abrindo chat de suporte...', 'info');
            // Add your help action here
            console.log('Help FAB clicked');
        });
    }

    // Resource buttons
    document.querySelectorAll('.resource-card .btn').forEach(button => {
        button.addEventListener('click', function() {
            const cardTitle = this.closest('.resource-card').querySelector('h3').textContent;
            showNotification(`Acessando: ${cardTitle}`, 'info');
        });
    });
}

// Status Cards Update
function updateStatusCards() {
    const statusCards = document.querySelectorAll('.status-card');
    
    // Simulate status progression
    setTimeout(() => {
        const processingCard = document.querySelector('.status-card.processing');
        if (processingCard) {
            processingCard.classList.remove('processing');
            processingCard.classList.add('completed');
            
            const icon = processingCard.querySelector('.status-icon svg');
            if (icon) {
                icon.innerHTML = '<path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>';
            }
            
            const content = processingCard.querySelector('.status-content');
            if (content) {
                content.querySelector('h3').textContent = 'Conta Configurada';
                content.querySelector('p').textContent = 'Seu ambiente está pronto para uso';
            }
        }
    }, 5000);

    setTimeout(() => {
        const pendingCard = document.querySelector('.status-card.pending');
        if (pendingCard) {
            pendingCard.classList.remove('pending');
            pendingCard.classList.add('completed');
            
            const icon = pendingCard.querySelector('.status-icon svg');
            if (icon) {
                icon.innerHTML = '<path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>';
            }
            
            const content = pendingCard.querySelector('.status-content');
            if (content) {
                content.querySelector('h3').textContent = 'Email Enviado';
                content.querySelector('p').textContent = 'Verifique sua caixa de entrada';
            }
        }
    }, 8000);
}
