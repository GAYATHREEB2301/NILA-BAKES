document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownLinks = document.querySelectorAll('.dropdown-item a');

    // Dynamic Active State
    const currentPath = window.location.pathname.split('/').pop().split('?')[0].split('#')[0] || 'index.html';

    function setActiveLink() {
        // Clear all active classes first to avoid conflicts with hardcoded ones
        document.querySelectorAll('.nav-item, .nav-link, .dropdown-item a').forEach(el => {
            el.classList.remove('active');
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
                link.parentElement.classList.add('active');
            }
        });

        dropdownLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
                // Also highlight the parent dropdown menu item's parent nav-item
                const parentNavItem = link.closest('.nav-item');
                if (parentNavItem) {
                    parentNavItem.classList.add('active');
                }
            }
        });
    }

    setActiveLink();

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
                if (window.innerWidth <= 1080) {
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

    // --- CART FUNCTIONALITY ---
    let cart = JSON.parse(localStorage.getItem('nila_cart')) || [];

    // Inject Cart Toggle into Header
    const headerActions = document.querySelector('.header-right-actions');
    if (headerActions) {
        const cartToggleHTML = `
            <button id="cart-toggle" class="cart-toggle" title="View Cart">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span class="cart-count">0</span>
            </button>
        `;
        headerActions.insertAdjacentHTML('afterbegin', cartToggleHTML);
    }

    // Inject Cart Sidebar into Body
    const sidebarHTML = `
        <div class="cart-sidebar">
            <div class="cart-header">
                <h3>Your Sweet Cart</h3>
                <span class="cart-close" id="cart-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </span>
            </div>
            <div class="cart-items" id="cart-items">
                <!-- Items will be injected here -->
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Subtotal</span>
                    <span id="cart-subtotal">₹0</span>
                </div>
                <div class="promo-section" style="margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="promo-code" placeholder="Coupon Code" class="form-control" style="padding: 10px; font-size: 0.8rem;">
                        <button class="btn" id="apply-promo" style="padding: 10px 15px; font-size: 0.8rem;">Apply</button>
                    </div>
                </div>
                <a href="checkout.html" class="btn checkout-btn">Proceed to Checkout</a>
            </div>
        </div>
        <div class="order-overlay" id="order-overlay">
            <div class="order-modal">
                <div style="color: #4CAF50; font-size: 4rem; margin-bottom: 20px;">✓</div>
                <h2 style="margin-bottom: 15px;">Order Placed!</h2>
                <p style="margin-bottom: 30px;">Your delicious treats are being prepared. You'll receive a confirmation email shortly.</p>
                <button class="btn" onclick="window.location.href='index.html'">Great!</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', sidebarHTML);

    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartClose = document.getElementById('cart-close');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartCountEl = document.querySelector('.cart-count');

    const toggleCart = () => cartSidebar.classList.toggle('active');

    if (cartToggle) cartToggle.addEventListener('click', toggleCart);
    if (cartClose) cartClose.addEventListener('click', toggleCart);

    const formatPrice = (price) => {
        return '₹' + price.toLocaleString('en-IN');
    };

    const updateCartUI = () => {
        if (!cartItemsContainer) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div style="text-align: center; margin-top: 50px; opacity: 0.5;">Your cart is empty</div>';
        } else {
            cartItemsContainer.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${formatPrice(item.price)}</div>
                        <div class="cart-item-controls">
                            <button class="qty-btn" onclick="window.updateQty(${index}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="window.updateQty(${index}, 1)">+</button>
                            <button class="qty-btn" style="border: none; color: #ff4d4d; margin-left: auto;" onclick="window.removeFromCart(${index})">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(total);

        if (cartCountEl) {
            const count = cart.reduce((sum, item) => sum + item.qty, 0);
            cartCountEl.textContent = count;
            cartCountEl.style.display = count > 0 ? 'flex' : 'none';
        }

        localStorage.setItem('nila_cart', JSON.stringify(cart));
    };

    // --- TOAST NOTIFICATION ---
    const showToast = (message) => {
        let toast = document.querySelector('.toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('active');
        setTimeout(() => toast.classList.remove('active'), 3000);
    };

    window.addToCart = (name, price, img, qty = 1, redirect = false) => {
        // Handle string prices with currency symbol and commas
        if (typeof price === 'string') {
            price = parseInt(price.replace(/[₹,]/g, '').trim());
        }

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.push({ name, price, img, qty: qty });
        }
        updateCartUI();

        if (redirect) {
            window.location.href = 'checkout.html';
        } else {
            showToast(`${qty} x ${name} added to cart!`);
            if (!cartSidebar.classList.contains('active')) toggleCart();
        }
    };

    window.updateQty = (index, change) => {
        cart[index].qty += change;
        if (cart[index].qty < 1) {
            cart.splice(index, 1);
        }
        updateCartUI();
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    // Global click listener for Add to Cart / Order Now buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn');
        const qtyMinus = e.target.closest('.qty-minus');
        const qtyPlus = e.target.closest('.qty-plus');

        if (qtyMinus || qtyPlus) {
            const selector = e.target.closest('.card-qty-selector');
            const input = selector.querySelector('.qty-input');
            let val = parseInt(input.value);
            if (qtyMinus && val > 1) input.value = val - 1;
            if (qtyPlus) input.value = val + 1;
            return;
        }

        if (!btn) return;

        const text = btn.textContent.trim().toLowerCase();
        if (text === 'add to cart' || text === 'order now') {
            const card = btn.closest('.card');
            if (card) {
                const nameEl = card.querySelector('.card-title');
                const priceEl = card.querySelector('.card-price');
                const imgEl = card.querySelector('.card-img img');
                const qtyInput = card.querySelector('.qty-input');

                if (nameEl && priceEl && imgEl) {
                    e.preventDefault();
                    const isOrderNow = text === 'order now';
                    const qty = qtyInput ? parseInt(qtyInput.value) : 1;
                    window.addToCart(nameEl.textContent.trim(), priceEl.textContent.trim(), imgEl.src, qty, isOrderNow);
                }
            }
        }
    });

    updateCartUI();

    // --- CHECKOUT PAGE LOGIC ---
    if (window.location.pathname.includes('checkout.html')) {
        const orderSummary = document.getElementById('order-summary-items');
        const checkoutTotal = document.getElementById('checkout-total');

        if (orderSummary) {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const delivery = subtotal > 0 ? 50 : 0;
            const total = subtotal + delivery;

            orderSummary.innerHTML = cart.map(item => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span>${item.name} x ${item.qty}</span>
                    <span>${formatPrice(item.price * item.qty)}</span>
                </div>
            `).join('') + `
                <div style="border-top: 1px solid var(--primary-light); margin-top: 15px; padding-top: 15px; display: flex; justify-content: space-between;">
                    <span>Delivery Fee</span>
                    <span>${formatPrice(delivery)}</span>
                </div>
            `;
            if (checkoutTotal) checkoutTotal.textContent = formatPrice(total);
        }

        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const overlay = document.getElementById('order-overlay');
                if (overlay) overlay.classList.add('active');
                cart = [];
                updateCartUI();
            });
        }

        // Payment Option Toggle
        const paymentOptions = document.querySelectorAll('.payment-option');
        paymentOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                paymentOptions.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
            });
        });
    }
    // --- PAGE TRANSITIONS ---
    const internalLinks = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');

    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Safety checks: skip if no href, if it's external, or if it's a script/modal trigger
            if (!href ||
                href.startsWith('http') ||
                href.startsWith('javascript:') ||
                link.id === 'login-trigger' ||
                link.classList.contains('btn') && (link.textContent.toLowerCase().includes('add to cart') || link.textContent.toLowerCase().includes('order now')) ||
                link.closest('.dropdown-menu') && window.innerWidth <= 1080 && link.parentElement.querySelector('.dropdown-menu') // Mobile dropdown parent
            ) {
                return;
            }

            e.preventDefault();
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.classList.add('page-exit');
            }

            setTimeout(() => {
                window.location.href = href;
            }, 50); // Matches the contentFadeOut CSS duration
        });
    });

    // Handle back button (on pageshow, remove page-exit if present)
    window.addEventListener('pageshow', (event) => {
        const mainContent = document.querySelector('main');
        if (event.persisted && mainContent) {
            mainContent.classList.remove('page-exit');
        }
    });
});
