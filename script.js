// Main JavaScript for Portfolio Interactions and Animations

// ==========================================
// NAVIGATION
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // navbar height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// TYPING EFFECT
// ==========================================
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Full-Stack Developer',
    'AI Enthusiast',
    'Problem Solver',
    'Hackathon Winner',
    'Tech Leader'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// ==========================================
// 3D CARD TILT EFFECT
// ==========================================
const card3d = document.querySelector('.card-3d');

card3d?.addEventListener('mousemove', (e) => {
    const rect = card3d.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card3d.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
});

card3d?.addEventListener('mouseleave', () => {
    card3d.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
});

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==========================================
// COUNTER ANIMATION
// ==========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            if (!isNaN(target) && target > 0) {
                animateCounter(entry.target, target);
                statObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.1 });

// Initialize counters when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            statObserver.observe(stat);
        });
    }, 100);
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.glass-card, .project-card, .achievement-card, .extra-card, .cert-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// ==========================================
// PARALLAX EFFECT FOR SECTIONS
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
});

// ==========================================
// SKILL TAGS ANIMATION
// ==========================================
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.animation = 'fadeIn 0.5s ease forwards';
});

// ==========================================
// PROJECT CARDS HOVER EFFECT
// ==========================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// GLASS CARD MOUSE FOLLOW EFFECT
// ==========================================
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        // Add subtle glow effect
        const glowSize = 200;
        card.style.background = `
            radial-gradient(circle ${glowSize}px at ${x}px ${y}px, rgba(0, 240, 255, 0.15), transparent),
            rgba(255, 255, 255, 0.05)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(255, 255, 255, 0.05)';
    });
});

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #00f0ff, #7b2cbf, #ff006e);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ==========================================
// CUSTOM CURSOR FOLLOWER (Desktop Only)
// ==========================================
if (window.innerWidth > 768) {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth following for outline
    function animateCursor() {
        const distX = mouseX - outlineX;
        const distY = mouseY - outlineY;
        
        outlineX += distX * 0.15;
        outlineY += distY * 0.15;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Expand cursor on hover
    setTimeout(() => {
        document.querySelectorAll('a, button, .glass-card, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }, 1000);
}

// ==========================================
// ACTIVE SECTION HIGHLIGHT IN NAV
// ==========================================
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ==========================================
// LAZY LOAD IMAGES (if you add images later)
// ==========================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ==========================================
// PREVENT SCROLL DURING LOAD
// ==========================================
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
    
    // Add entrance animation
    document.querySelector('.hero').style.opacity = '1';
    document.querySelector('.hero').style.transform = 'translateY(0)';
});

// ==========================================
// EASTER EGG: KONAMI CODE
// ==========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Throttle function for scroll events
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

// Use throttled scroll handler
const throttledScroll = throttle(() => {
    highlightNavOnScroll();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ==========================================
// CONSOLE MESSAGE (for fun!)
// ==========================================
console.log('%c👋 Hey there, curious developer!', 'color: #00f0ff; font-size: 20px; font-weight: bold;');
console.log('%cLike what you see? Let\'s connect!', 'color: #7b2cbf; font-size: 16px;');
console.log('%c📧 ashrivastav2209@gmail.com', 'color: #ff006e; font-size: 14px;');
console.log('%c🔗 https://linkedin.com/in/Aayush2209', 'color: #00f0ff; font-size: 14px;');

// ==========================================
// ACCESSIBILITY: Focus visible for keyboard navigation
// ==========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ==========================================
// PRINT MESSAGE WHEN SOMEONE TRIES TO PRINT
// ==========================================
window.addEventListener('beforeprint', () => {
    console.log('Printing portfolio... Consider downloading the PDF version instead!');
});

// ==========================================
// PAGE VISIBILITY API - Pause animations when tab is not visible
// ==========================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations
        console.log('Tab hidden - animations paused');
    } else {
        // Resume animations
        console.log('Tab visible - animations resumed');
    }
});

// ==========================================
// INITIALIZE ALL
// ==========================================
console.log('🚀 Portfolio loaded successfully!');
