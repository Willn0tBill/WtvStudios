// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Whatever Studios Website Loaded Successfully!');
    
    // Initialize all features
    initMobileMenu();
    initGameCards();
    initScrollEffects();
    initActiveNav();
    updateCurrentYear();
    initParticles();
    
    // Remove loading overlay after 1 second
    setTimeout(() => {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.remove(), 500);
        }
        document.body.classList.remove('loading');
    }, 1000);
});

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Game card flip functionality
function initGameCards() {
    const flipButtons = document.querySelectorAll('.flip-btn');
    
    flipButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.game-card');
            const isFlipped = card.classList.contains('flipped');
            
            // Flip back any other flipped cards
            document.querySelectorAll('.game-card.flipped').forEach(flippedCard => {
                if (flippedCard !== card) {
                    flippedCard.classList.remove('flipped');
                    const otherButton = flippedCard.querySelector('.flip-btn');
                    if (otherButton) {
                        otherButton.innerHTML = '<i class="fas fa-info-circle"></i> Details';
                    }
                }
            });
            
            // Toggle current card
            card.classList.toggle('flipped');
            
            // Update button text
            if (card.classList.contains('flipped')) {
                this.innerHTML = '<i class="fas fa-undo"></i> Back';
            } else {
                this.innerHTML = '<i class="fas fa-info-circle"></i> Details';
            }
        });
    });
    
    // Add hover effects to game cards
    const gameCards = document.querySelectorAll('.game-card:not(.placeholder)');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// Scroll effects for navbar
function initScrollEffects() {
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add shadow when scrolled
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.boxShadow = 'none';
            }
            
            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.feature, .preview-card, .game-card, .philosophy-card, .project-card').forEach(el => {
        observer.observe(el);
    });
}

// Set active navigation link
function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href');
        const linkPage = linkHref.split('/').pop();
        
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'WtvStudios/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Update current year in footer
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Create background particles
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Remove existing particles
    document.querySelectorAll('.particle').forEach(p => p.remove());
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(0, 212, 255, ${Math.random() * 0.3});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: 1;
                animation: floatParticle ${duration}s infinite linear;
                animation-delay: ${delay}s;
            `;
            
            // Add animation keyframes if not exists
            if (!document.querySelector('#particle-animation')) {
                const style = document.createElement('style');
                style.id = 'particle-animation';
                style.textContent = `
                    @keyframes floatParticle {
                        0% {
                            transform: translateY(0) translateX(0);
                            opacity: 0;
                        }
                        10% {
                            opacity: 0.7;
                        }
                        90% {
                            opacity: 0.7;
                        }
                        100% {
                            transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            hero.appendChild(particle);
            
            // Remove particle after animation completes
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, (duration + delay) * 1000);
        }, i * 300);
    }
    
    // Keep creating particles
    setInterval(initParticles, 15000);
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        initActiveNav();
    }, 250);
});

// Add loading overlay if not exists
if (!document.querySelector('.loading-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(overlay);
    document.body.classList.add('loading');
}

// Add CSS for animations if not exists
if (!document.querySelector('#animations')) {
    const style = document.createElement('style');
    style.id = 'animations';
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .feature,
        .preview-card,
        .game-card,
        .philosophy-card,
        .project-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}
