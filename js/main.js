/* ============================================
   Yhana's Cakes and Pastries — main script
   ============================================ */

/* Expose globally so inline onclick="toggleMobileMenu()" keeps working */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    const isOpen = menu.style.display === 'flex';
    menu.style.display = isOpen ? 'none' : 'flex';
    document.querySelectorAll('.hamburger-btn').forEach(btn => {
        btn.setAttribute('aria-expanded', String(!isOpen));
        btn.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    });
}
window.toggleMobileMenu = toggleMobileMenu;

/* ============================================
   Scroll-driven UI (reveal, nav highlight, sticky nav)
   ============================================ */
(() => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
    const sections = document.querySelectorAll('section[id], div[id="home"]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarFixed = document.getElementById('navbar-fixed');
    const homeSection = document.getElementById('home');

    let scrollTicking = false;

    const onScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        revealElements.forEach(el => {
            if (el.getBoundingClientRect().top < windowHeight - 80) {
                el.classList.add('active');
            }
        });

        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.style.opacity = '1';
                link.style.fontWeight = '700';
            } else {
                link.style.opacity = '';
                link.style.fontWeight = '';
            }
        });

        if (homeSection && navbarFixed) {
            const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
            navbarFixed.style.display = scrollY >= homeBottom ? 'flex' : 'none';
        }
    };

    const scheduleScroll = () => {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(() => {
                onScroll();
                scrollTicking = false;
            });
        }
    };

    window.addEventListener('scroll', scheduleScroll, { passive: true });
    window.addEventListener('load', onScroll);

    /* Mobile menu click wiring */
    document.getElementById('mobile-menu-close')?.addEventListener('click', toggleMobileMenu);
    document.getElementById('hamburger-btn')?.addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
})();

/* ============================================
   Lightbox
   ============================================ */
(() => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;

    document.querySelectorAll('#menu img, #customized img, .hero-image img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', e => {
            e.stopPropagation();
            const imgUrl = new URL(img.src, window.location.href);
            if (imgUrl.origin === window.location.origin) {
                lightboxImg.src = imgUrl.href;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lightbox.addEventListener('click', closeLightbox);
    document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });
})();

/* ============================================
   Analytics event tracking (gtag)
   ============================================ */
(() => {
    if (typeof gtag !== 'function') return;

    /* CTA clicks */
    document.querySelectorAll('a[href*="facebook.com/messages"], a[href*="m.me"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const location = btn.id === 'floating-order-btn' ? 'floating_button'
                : btn.closest('#home') ? 'hero'
                    : btn.closest('nav') ? 'navbar'
                        : btn.closest('#mobile-menu') ? 'mobile_menu'
                            : btn.closest('#menu') ? 'menu_section'
                                : btn.closest('#customized') ? 'customized_section'
                                    : 'unknown';
            gtag('event', 'order_cta_clicked', {
                button_location: location,
                button_text: btn.textContent.trim().slice(0, 50)
            });
        });
    });

    /* Facebook page clicks */
    document.querySelectorAll('a[href*="facebook.com/YhanasCakes"]').forEach(link => {
        link.addEventListener('click', () => {
            gtag('event', 'social_link_clicked', { platform: 'facebook' });
        });
    });

    /* Section scroll depth */
    const trackedSections = new Set();
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id') || entry.target.closest('[id]')?.getAttribute('id');
            if (entry.isIntersecting && id && !trackedSections.has(id)) {
                trackedSections.add(id);
                gtag('event', 'section_viewed', { section_name: id });
            }
        });
    }, { threshold: 0.3 });

    ['menu', 'customized', 'reminders', 'about'].forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    const reviewsSection = document.querySelector('section:not([id])');
    if (reviewsSection) observer.observe(reviewsSection);

    /* Gallery image views */
    document.querySelectorAll('#menu img, #customized img').forEach(img => {
        img.addEventListener('click', () => {
            gtag('event', 'gallery_image_viewed', {
                image_alt: img.alt || 'unknown',
                image_src: img.src.split('/').pop()
            });
        });
    });
})();

/* ============================================
   Page load — loader, year, contact number
   ============================================ */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.pointerEvents = 'none';
        loader.style.transition = 'opacity 0.6s ease';
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 600);
    }

    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const contactEl = document.getElementById('contact-number');
    if (contactEl) {
        const n = ['09', '55', ' 14', '0 04', '02', ' / ', '09', '06', ' 23', '2 79', '69'];
        contactEl.textContent = n.join('');
    }
});
