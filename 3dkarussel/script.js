document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentIndex = 0;
    const totalItems = items.length;

    /**
     * Wendet die 3D-Transformationen basierend auf dem aktuellen Index an.
     */
    function updateCarousel() {
        items.forEach((item, index) => {
            // Berechnet die relative Position zur Mitte (currentIndex)
            const relativeIndex = index - currentIndex;
            let transform = '';
            let opacity = 0.8;

            if (relativeIndex === 0) {
                // Zentrales Element (vorne)
                transform = 'translateZ(300px)'; // 300px nach vorne
                opacity = 1;
            } else if (relativeIndex === 1) {
                // Rechtes Element (leicht nach hinten, rechts gedreht)
                transform = 'translateX(850px) rotateY(-45deg) translateZ(-150px)';
            } else if (relativeIndex === -1) {
                // Linkes Element (leicht nach hinten, links gedreht)
                transform = 'translateX(-850px) rotateY(45deg) translateZ(-150px)';
            } else if (relativeIndex > 1) {
                // Elemente rechts außen (versteckt/weit hinten)
                transform = 'translateX(1200px) rotateY(-60deg) translateZ(-500px)';
                opacity = 0;
            } else if (relativeIndex < -1) {
                // Elemente links außen (versteckt/weit hinten)
                transform = 'translateX(-1200px) rotateY(60deg) translateZ(-500px)';
                opacity = 0;
            }

            // Passt die Daten-Attribute an, um sie im CSS zu verwenden
            item.setAttribute('data-index', relativeIndex);
            item.style.transform = transform;
            item.style.opacity = opacity;
        });
    }

    /**
     * Wechselt zum nächsten Bild
     */
    function nextItem() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    /**
     * Wechselt zum vorherigen Bild
     */
    function prevItem() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    // Event-Listener für die Pfeile
    nextButton.addEventListener('click', nextItem);
    prevButton.addEventListener('click', prevItem);

    // Initialisierung des Karussells
    updateCarousel();

    /* ---- Optional: Swipe-Funktionalität hinzufügen ---- */
    let startX = 0;
    let endX = 0;
    const swipeThreshold = 50;

    carousel.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseup', (e) => {
        endX = e.clientX;
        carousel.style.cursor = 'grab';

        const diff = startX - endX;

        if (diff > swipeThreshold) {
            // Swipe nach links (nächstes Bild)
            nextItem();
        } else if (diff < -swipeThreshold) {
            // Swipe nach rechts (vorheriges Bild)
            prevItem();
        }
        startX = 0;
        endX = 0;
    });
    
    // Für Touch-Geräte
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (diff > swipeThreshold) {
            nextItem();
        } else if (diff < -swipeThreshold) {
            prevItem();
        }
    });

});
