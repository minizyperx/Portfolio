document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const toast = document.getElementById('toast');

    // Current page state
    let currentPage = 'home';

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Page navigation function
    function showPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            currentPage = pageId;

            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('active');
                }
            });

            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Navigation links event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                showPage(pageId);
            }
        });
    });

    // Hero buttons event listeners
    document.querySelectorAll('[data-page]').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                showPage(pageId);
            }
        });
    });

    // Typing animation for hero section
    const typingText = document.getElementById('typing-text');
    const fullText = "Sumit Raj";
    let currentIndex = 0;

    function typeText() {
        if (currentIndex < fullText.length) {
            typingText.textContent += fullText[currentIndex];
            currentIndex++;
            setTimeout(typeText, 100);
        }
    }

    // Start typing animation after a short delay
    setTimeout(typeText, 1000);

    // Contact form handling
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Simulate form submission
            console.log('Form submitted:', data);

            // Show success toast
            showToast('Message encrypted and sent successfully!');

            // Reset form
            this.reset();
        });
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Matrix rain effect
    function createMatrixRain() {
        const matrixContainer = document.querySelector('.matrix-bg');
        if (!matrixContainer) return;

        const characters = '01';

        for (let i = 0; i < 50; i++) {
            const column = document.createElement('div');
            column.style.position = 'absolute';
            column.style.top = '0';
            column.style.left = Math.random() * 100 + '%';
            column.style.fontSize = '12px';
            column.style.color = 'rgba(0, 255, 65, 0.3)';
            column.style.fontFamily = 'JetBrains Mono, monospace';
            column.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
            column.style.animationDelay = Math.random() * 2 + 's';

            let text = '';
            for (let j = 0; j < 20; j++) {
                text += characters[Math.floor(Math.random() * characters.length)];
            }
            column.textContent = text;

            matrixContainer.appendChild(column);
        }
    }

    // Add CSS for falling animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(-100vh);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize matrix rain
    createMatrixRain();

    // Add glitch effect to terminal text occasionally
    function addGlitchEffect() {
        const terminalElements = document.querySelectorAll('.terminal-title, .terminal-prompt');

        setInterval(() => {
            if (Math.random() > 0.95) {
                const randomElement = terminalElements[Math.floor(Math.random() * terminalElements.length)];
                if (randomElement) {
                    randomElement.style.textShadow = '2px 0 #ff0000, -2px 0 #00ffff';

                    setTimeout(() => {
                        randomElement.style.textShadow = '';
                    }, 100);
                }
            }
        }, 1000);
    }

    addGlitchEffect();

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function (e) {
        const page = e.state?.page || 'home';
        showPage(page);
    });

    // Initialize with home page
    showPage('home');

    // Update history state
    history.replaceState({ page: 'home' }, '', '#home');

    // Initialize Background Animation (Canvas Injection)
    initCyberBackground();
});

// Cyber Background Animation Manager
function initCyberBackground() {
    // 1. Inject Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'cyber-bg-canvas';
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-1', // Behind content, above grid
        pointerEvents: 'none',
        opacity: '0.6'
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    // 2. Resize Handler
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    window.addEventListener('resize', resize);
    resize();

    // 3. Particle System
    function initParticles() {
        particles = [];
        const particleCount = Math.floor(window.innerWidth / 15); // Density

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        ctx.fillStyle = '#00ff41'; // Cyber green

        particles.forEach(p => {
            // Move
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around screen
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Draw
            ctx.globalAlpha = p.opacity;
            ctx.fillRect(p.x, p.y, p.size, p.size); // Square "bits"
        });

        ctx.globalAlpha = 1.0;
        animationFrameId = requestAnimationFrame(animate);
    }

    animate();
}

// Console easter egg
console.log(`
    ██████╗ ██╗   ██╗██████╗ ███████╗██████╗     ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ 
    ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
    ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝    ███████║███████║██║     █████╔╝ █████╗  ██████╔╝
    ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗    ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
    ╚██████╗   ██║   ██████╔╝███████╗██║  ██║    ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
     ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
    
    Welcome to the Matrix... 
    You've found the console. Good job, fellow hacker! 👨‍💻
    
    Want to see something cool? Try typing: hackTheSystem()
`);

// Console function for fun
function hackTheSystem() {
    console.log('🔓 Access Granted...');
    console.log('📡 Connecting to secure servers...');
    console.log('🛡️ Bypassing security protocols...');
    console.log('💻 System compromised successfully!');
    console.log('🎯 Mission accomplished, agent.');
    console.log('Just kidding! This is all ethical hacking for educational purposes only! 😄');
}

// Make the function globally available
window.hackTheSystem = hackTheSystem;
