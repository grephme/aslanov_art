document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    const initPreloader = () => {
        const loader = document.createElement('div');
        loader.className = 'preloader';
        loader.innerHTML = `<img src="assets/pocherk.png" class="preloader-logo" alt="Abdulla Aslanov">`;
        document.body.appendChild(loader);

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('fade-out');
            }, 500); // Small buffer for smoothness
        });
    };
    initPreloader();

    // Menu Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const fullMenu = document.getElementById('full-menu');

    if (menuToggle && fullMenu) {
        menuToggle.addEventListener('click', () => {
            fullMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (menuClose && fullMenu) {
        menuClose.addEventListener('click', () => {
            fullMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Reveal Animation Logic (for index/about)
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Lightbox Logic
    const createLightbox = () => {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <img src="" alt="" class="lightbox-content">
        `;
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightbox.querySelector('.lightbox-content')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        return lightbox;
    };

    const lightbox = createLightbox();
    const lightboxImg = lightbox.querySelector('.lightbox-content');

    // Attach to all gallery/editorial images
    const zoomableImages = document.querySelectorAll('.section-image-container img, .gallery-image-wrapper img, .grid-image-wrapper img');
    
    zoomableImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.preventDefault();
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Horizontal Gallery Scroll Sync
    const galleryContainer = document.getElementById('gallery-container');
    if (galleryContainer) {
        // Vertical scroll to horizontal scroll
        window.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                galleryContainer.scrollLeft += e.deltaY;
                // We don't preventDefault here to allow potential other scrolls, 
                // but since body overflow is hidden on gallery-body, it works as focus change.
            }
        });

        // Focus transition logic
        const items = document.querySelectorAll('.gallery-snap-item');
        const updateFocus = () => {
            const containerCenter = galleryContainer.scrollLeft + (galleryContainer.offsetWidth / 2);
            
            items.forEach(item => {
                const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
                const distance = Math.abs(containerCenter - itemCenter);
                
                if (distance < item.offsetWidth / 2) {
                    item.classList.remove('out-of-focus');
                } else {
                    item.classList.add('out-of-focus');
                }
            });
        };

        galleryContainer.addEventListener('scroll', updateFocus);
        updateFocus(); // Initial check
    }
});
