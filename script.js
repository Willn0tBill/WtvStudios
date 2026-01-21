// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Filter games
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter cards
            gameCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
        });
    });
    
    // Add scroll effect to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
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
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.game-card:not(.placeholder)');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const inner = this.querySelector('.card-inner');
            if (inner && !inner.parentElement.classList.contains('flipped')) {
                inner.style.transform = 'translateZ(20px) rotateX(2deg) rotateY(2deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const inner = this.querySelector('.card-inner');
            if (inner && !inner.parentElement.classList.contains('flipped')) {
                inner.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
            }
        });
    });
    
    // Subscribe form placeholder
    const subscribeForm = document.querySelector('.placeholder-subscribe');
    if (subscribeForm) {
        const input = subscribeForm.querySelector('input');
        const button = subscribeForm.querySelector('button');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (input.value && input.value.includes('@')) {
                button.textContent = 'Subscribed!';
                button.style.background = 'rgba(0, 255, 170, 0.2)';
                button.style.borderColor = '#00ffaa';
                button.style.color = '#00ffaa';
                input.value = '';
                
                setTimeout(() => {
                    button.textContent = 'Notify Me';
                    button.style.background = '';
                    button.style.borderColor = '';
                    button.style.color = '';
                }, 3000);
            } else {
                input.style.borderColor = '#ff3366';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 1000);
            }
        });
    }
    
    // Add particles effect to hero
    createParticles();
});

// Toggle card flip
function toggleCard(button) {
    const card = button.closest('.game-card');
    card.classList.toggle('flipped');
    
    const icon = button.querySelector('i');
    if (card.classList.contains('flipped')) {
        button.innerHTML = '<i class="fas fa-undo"></i> Back';
    } else {
        button.innerHTML = '<i class="fas fa-info-circle"></i> Details';
    }
}

// Create background particles
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(0, 212, 255, ${Math.random() * 0.3});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 10}s infinite linear;
        `;
        hero.appendChild(particle);
    }
    
    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Update current year in footer
const yearElement = document.querySelector('footer .footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.feature, .preview-card, .game-card').forEach(el => {
        observer.observe(el);
    });
});
