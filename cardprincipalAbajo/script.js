document.addEventListener('DOMContentLoaded', () => {
    const carouselContent = document.querySelector('.carousel-content');
    const slides = document.querySelectorAll('.carousel-slide');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentSlideIndex = 0; 

    
    function updateCarouselPosition() {
        const wrapperWidth = carouselContent.parentElement.offsetWidth;
        carouselContent.style.transform = `translateX(-${currentSlideIndex * wrapperWidth}px)`;
    }

   
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateCarouselPosition();
    }

    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateCarouselPosition();
    }

    updateCarouselPosition();

    
    rightArrow.addEventListener('click', nextSlide);
    leftArrow.addEventListener('click', prevSlide);

 
    window.addEventListener('resize', updateCarouselPosition);
});