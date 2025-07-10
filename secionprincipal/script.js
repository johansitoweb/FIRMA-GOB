document.addEventListener('DOMContentLoaded', () => {
    const carouselContent = document.querySelector('.carousel-content');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    let currentScrollPosition = 0; 
    let itemWidth = 0; 
    let itemsInView = 0; 

    const calculateItemProperties = () => {
        if (carouselItems.length > 0) {
            const firstItem = carouselItems[0];
            const itemStyle = getComputedStyle(firstItem);
            itemWidth = firstItem.offsetWidth + parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);

            const carouselWrapperWidth = carouselContent.parentElement.offsetWidth;
            itemsInView = Math.floor(carouselWrapperWidth / itemWidth);
            if (itemsInView < 1) itemsInView = 1; 
        }
    };

    const updateCarouselPosition = () => {
        
        const maxScrollPosition = Math.max(0, carouselItems.length - itemsInView);
        if (currentScrollPosition > maxScrollPosition) {
            currentScrollPosition = maxScrollPosition;
        } else if (currentScrollPosition < 0) {
            currentScrollPosition = 0;
        }

        carouselContent.style.transform = `translateX(-${currentScrollPosition * itemWidth}px)`;
    };

    const nextSlide = () => {
        const maxScrollPosition = Math.max(0, carouselItems.length - itemsInView);
        if (currentScrollPosition < maxScrollPosition) {
            currentScrollPosition += itemsInView; 
            if (currentScrollPosition > maxScrollPosition) {
                currentScrollPosition = maxScrollPosition; 
            }
        } else {
            currentScrollPosition = 0; 
        }
        updateCarouselPosition();
    };

    const prevSlide = () => {
        if (currentScrollPosition > 0) {
            currentScrollPosition -= itemsInView; 
            if (currentScrollPosition < 0) {
                currentScrollPosition = 0; 
            }
        } else {
            const maxScrollPosition = Math.max(0, carouselItems.length - itemsInView);
            currentScrollPosition = maxScrollPosition; 
        }
        updateCarouselPosition();
    };

   
    calculateItemProperties();
    updateCarouselPosition();

   
    rightArrow.addEventListener('click', nextSlide);
    leftArrow.addEventListener('click', prevSlide);

    
    window.addEventListener('resize', () => {
        calculateItemProperties();
        updateCarouselPosition();
    });
});