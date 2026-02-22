document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');

    // Mobile Menu Toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Handle Mobile Dropdowns
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');

        if (dropdown) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });

    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateToggleIcon('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateToggleIcon('light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateToggleIcon('dark');
            }
        });
    }

    function updateToggleIcon(theme) {
        if (!themeToggle) return;
        if (theme === 'dark') {
            themeToggle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon-sun">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
                <circle cx="12" cy="12" r="6" opacity="0.3"></circle>
            </svg>`;
        } else {
            themeToggle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon-moon">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                <path d="M19 3v3" opacity="0.5" stroke-width="1.5"></path>
                <path d="M17.5 4.5h3" opacity="0.5" stroke-width="1.5"></path>
                <path d="M15 8v2" opacity="0.3" stroke-width="1"></path>
                <path d="M14 9h2" opacity="0.3" stroke-width="1"></path>
            </svg>`;
        }
    }

    // Login Modal Elements
    const loginTrigger = document.getElementById('login-trigger');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');

    if (loginModal) {
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                loginModal.classList.remove('active');
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });
    }

    // Modal Trigger from Header
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginTrigger && loginModal) {
        loginTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginForm && signupForm) {
                loginForm.style.display = 'block';
                signupForm.style.display = 'none';
            }
            loginModal.classList.add('active');
        });
    }

    // Login/Signup Toggle within Modal
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');

    if (showSignup && showLogin) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginForm && signupForm) {
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
            }
        });

        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginForm && signupForm) {
                signupForm.style.display = 'none';
                loginForm.style.display = 'block';
            }
        });
    }
});
