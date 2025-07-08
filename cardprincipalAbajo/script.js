document.addEventListener('DOMContentLoaded', () => {
    const carouselContent = document.querySelector('.carousel-content');
    const slides = document.querySelectorAll('.carousel-slide');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentSlideIndex = 0; // Índice de la tarjeta actual que se muestra

    // Función para actualizar la posición del carrusel
    function updateCarouselPosition() {
        // Cada slide ocupa el 100% del ancho del carousel-content (que a su vez es 100% del wrapper)
        // Por lo tanto, el desplazamiento es un múltiplo del ancho del wrapper.
        const wrapperWidth = carouselContent.parentElement.offsetWidth;
        carouselContent.style.transform = `translateX(-${currentSlideIndex * wrapperWidth}px)`;
    }

    // Navegar a la siguiente tarjeta
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateCarouselPosition();
    }

    // Navegar a la tarjeta anterior
    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateCarouselPosition();
    }

    // Inicializar la posición del carrusel
    updateCarouselPosition();

    // AñadirEventListeners a las flechas
    rightArrow.addEventListener('click', nextSlide);
    leftArrow.addEventListener('click', prevSlide);

    // Ajustar la posición si la ventana se redimensiona
    window.addEventListener('resize', updateCarouselPosition);
});