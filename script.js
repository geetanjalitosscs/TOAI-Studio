// TOAI Studio Website JavaScript
// Interactive features, animations, and dynamic content

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initScrollAnimations();
    initPricingToggle();
    initIndustryShowcase();
    initSmoothScrolling();
    initParallaxEffects();
    initCounterAnimations();
    initTestimonialSlider();
    initMobileMenu();
    initLoadingAnimations();
    initButtonInteractions();
    initFormHandling();
    initTooltips();
    initProgressBars();
    initTypingEffect();
    initDarkMode();
    initActiveNavbar();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .solution-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced Pricing Toggle with Animation
function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.amount');
    const periodTexts = document.querySelectorAll('.period');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    if (toggle) {
        toggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            
            monthlyPrices.forEach(price => {
                const currentPrice = parseInt(price.textContent);
                if (price.textContent !== 'Custom') {
                    // Add animation class
                    price.style.transition = 'all 0.3s ease';
                    
                    if (isAnnual) {
                        const annualPrice = Math.round(currentPrice * 0.8);
                        price.textContent = annualPrice;
                    } else {
                        const originalPrice = Math.round(currentPrice / 0.8);
                        price.textContent = originalPrice;
                    }
                }
            });
            
            // Update period text
            periodTexts.forEach(period => {
                if (isAnnual) {
                    period.textContent = '/year';
                } else {
                    period.textContent = '/month';
                }
            });
        });
    }
    
    // Enhanced pricing card interactions
    pricingCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            pricingCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            card.classList.add('active');
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('active')) {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('active')) {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Industry showcase functionality
function initIndustryShowcase() {
    const industryCards = document.querySelectorAll('.industry-card');
    const solutionItems = document.querySelectorAll('.solution-item');
    
    if (industryCards.length > 0) {
        // Auto-rotate industry cards
        let currentIndex = 0;
        
        setInterval(() => {
            industryCards.forEach(card => card.classList.remove('active'));
            currentIndex = (currentIndex + 1) % industryCards.length;
            industryCards[currentIndex].classList.add('active');
        }, 4000);
        
        // Click to switch industry
        solutionItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                industryCards.forEach(card => card.classList.remove('active'));
                if (industryCards[index]) {
                    industryCards[index].classList.add('active');
                }
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effects for hero background
function initParallaxEffects() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.3;
            orb.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const isMillion = target.includes('M');
    
    // Extract numeric value preserving decimals
    let numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
    let current = 0;
    const increment = numericValue / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        let displayValue;
        if (isPercentage && target.includes('99.9')) {
            // Keep decimal for 99.9% Uptime Guarantee
            displayValue = current.toFixed(1);
        } else {
            // Remove decimal for all other numbers
            displayValue = Math.round(current).toString();
        }
        
        if (isMillion) displayValue += 'M';
        if (isPlus) displayValue += '+';
        if (isPercentage) displayValue += '%';
        
        element.textContent = displayValue;
    }, stepTime);
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    if (testimonialCards.length > 0) {
        // Auto-rotate testimonials
        setInterval(() => {
            testimonialCards.forEach(card => {
                card.style.transform = 'translateX(-100%)';
                card.style.opacity = '0';
            });
            
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            
            setTimeout(() => {
                testimonialCards.forEach(card => {
                    card.style.transform = 'translateX(0)';
                    card.style.opacity = '1';
                });
            }, 300);
        }, 5000);
    }
}

// Enhanced Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Close mobile menu immediately
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Handle navigation
                const href = link.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    // Handle hash links on current page
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 60;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                } else if (href && href.includes('index.html#')) {
                    // Handle links like index.html#home - navigate to index.html first
                    const hashIndex = href.indexOf('#');
                    const hash = hashIndex > -1 ? href.substring(hashIndex) : '';
                    window.location.href = 'index.html' + hash;
                } else if (href) {
                    // Handle regular page links
                    window.location.href = href;
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// Loading animations
function initLoadingAnimations() {
    // Add loading class to elements
    const loadingElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
    
    loadingElements.forEach((element, index) => {
        element.classList.add('loading');
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Trigger loading animation
    setTimeout(() => {
        loadingElements.forEach(element => {
            element.classList.add('loaded');
        });
    }, 100);
}

// Button click animations
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary, .btn-secondary, .btn-outline')) {
        // Create ripple effect
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn-primary, .btn-secondary, .btn-outline {
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
`;
document.head.appendChild(rippleStyle);

// Form validation and interaction
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                form.reset();
            }
        });
    });
}


// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll-based operations here
        }, 10);
    });
    
    // Throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            // Resize-based operations here
        }, 250);
    });
}

// Initialize performance optimizations
optimizePerformance();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #6366f1 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(focusStyle);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics and tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, properties);
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary, .btn-secondary, .btn-outline')) {
        trackEvent('button_click', {
            button_text: e.target.textContent,
            button_class: e.target.className,
            page: window.location.pathname
        });
    }
});

// Track form submissions
document.addEventListener('submit', function(e) {
    if (e.target.matches('form')) {
        trackEvent('form_submit', {
            form_id: e.target.id || 'unnamed_form',
            page: window.location.pathname
        });
    }
});

// Professional Button Interactions
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    
    buttons.forEach(button => {
        // Add loading state
        button.addEventListener('click', function(e) {
            if (this.classList.contains('btn-primary')) {
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                
                // Add loading spinner
                const spinner = document.createElement('div');
                spinner.className = 'button-spinner';
                spinner.innerHTML = '<div class="spinner"></div>';
                this.appendChild(spinner);
                
                // Simulate loading
                setTimeout(() => {
                    spinner.remove();
                }, 2000);
            }
        });
        
        // Add hover sound effect (visual feedback)
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Professional Form Handling
function initFormHandling() {
    // Create contact form if it doesn't exist
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection && !document.querySelector('.contact-form')) {
        const formHTML = `
            <div class="contact-form-modal" id="contact-modal" style="display: none;">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>Get in Touch</h3>
                    <form id="contact-form">
                        <div class="form-group">
                            <input type="text" id="name" name="name" required>
                            <label for="name">Full Name</label>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" name="email" required>
                            <label for="email">Email Address</label>
                        </div>
                        <div class="form-group">
                            <input type="text" id="company" name="company">
                            <label for="company">Company (Optional)</label>
                        </div>
                        <div class="form-group">
                            <textarea id="message" name="message" required></textarea>
                            <label for="message">Message</label>
                        </div>
                        <button type="submit" class="btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', formHTML);
    }
    
    // Handle form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            this.reset();
            
            // Close modal if it's open
            const modal = document.getElementById('contact-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Professional Tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => tooltip.classList.add('show'), 10);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Professional Modal System
function initModalSystem() {
    // Add modal triggers to buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-outline');
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Demo') || button.textContent.includes('Contact')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const modal = document.getElementById('contact-modal');
                if (modal) {
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });
    
    // Close modal functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('close-modal') || e.target.classList.contains('contact-form-modal')) {
            const modal = document.getElementById('contact-modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('contact-modal');
            if (modal && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// Professional Progress Bars
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage');
                
                setTimeout(() => {
                    progressBar.style.width = percentage + '%';
                }, 500);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Professional Typing Effect
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
        const text = element.getAttribute('data-typing');
        const speed = parseInt(element.getAttribute('data-speed')) || 100;
        
        element.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        };
        
        // Start typing when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}



// Dark Mode Toggle
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Add smooth transition
            body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Active Navbar functionality
function initActiveNavbar() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname;
    
    // Remove active class from all nav links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class based on current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (currentPage.includes('index.html') || currentPage === '/' || currentPage === '') {
            if (href === 'index.html#home' || href === '#home') {
                link.classList.add('active');
            }
        } else if (currentPage.includes('login.html')) {
            if (href === 'login.html') {
                link.classList.add('active');
            }
        } else if (currentPage.includes('signup.html')) {
            if (href === 'signup.html') {
                link.classList.add('active');
            }
        } else if (currentPage.includes('contact.html')) {
            if (href === 'contact.html') {
                link.classList.add('active');
            }
        } else {
            // For other pages, check if href matches current page
            if (href && currentPage.includes(href.replace('#', ''))) {
                link.classList.add('active');
            }
        }
    });
    
    // Handle click events for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // If it's a hash link (like #home, #about), handle smooth scrolling
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 60;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            } else if (href && href.includes('index.html#')) {
                // Handle links like index.html#home - navigate to index.html first
                e.preventDefault();
                const hashIndex = href.indexOf('#');
                const hash = hashIndex > -1 ? href.substring(hashIndex) : '';
                
                // Navigate to index.html with hash
                window.location.href = 'index.html' + hash;
            }
            // If it's a regular page link (like contact.html), let it navigate normally
            // The active state will be set when the new page loads
        });
    });
}

// Professional Auth Modals
function initAuthModals() {
    const signupBtn = document.getElementById('signup-btn');
    const loginBtn = document.getElementById('login-btn');
    const signupModal = document.getElementById('signup-modal');
    const loginModal = document.getElementById('login-modal');
    const switchToLogin = document.getElementById('switch-to-login');
    const switchToSignup = document.getElementById('switch-to-signup');
    
    // Open signup modal
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(signupModal);
        });
    }
    
    // Open login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(loginModal);
        });
    }
    
    // Switch from signup to login
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(signupModal);
            setTimeout(() => openModal(loginModal), 150);
        });
    }
    
    // Switch from login to signup
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(loginModal);
            setTimeout(() => openModal(signupModal), 150);
        });
    }
    
    // Close modals
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.auth-modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('auth-modal')) {
            closeModal(e.target);
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.auth-modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
    
    // Handle form submissions
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup(this);
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin(this);
        });
    }
}

function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Trigger animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('show');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function handleSignup(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate passwords match
    if (data.password !== data['confirm-password']) {
        return;
    }
    
    // Simulate signup process
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Close modal
        const modal = form.closest('.auth-modal');
        closeModal(modal);
    }, 2000);
}

function handleLogin(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate login process
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Signing In...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Close modal
        const modal = form.closest('.auth-modal');
        closeModal(modal);
    }, 2000);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initScrollAnimations,
        initPricingToggle,
        initIndustryShowcase,
        animateCounter,
        initButtonInteractions,
        initFormHandling,
        initTooltips,
        initModalSystem,
        initDarkMode,
        initActiveNavbar
    };
}
