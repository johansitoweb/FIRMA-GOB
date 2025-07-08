document.addEventListener('DOMContentLoaded', () => {
    const carouselContent = document.querySelector('.carousel-content');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    let currentScrollPosition = 0; // Tracks the current scroll position
    let itemWidth = 0; // Will store the calculated width of a single item including margin
    let itemsInView = 0; // Number of items visible at once

    const calculateItemProperties = () => {
        if (carouselItems.length > 0) {
            const firstItem = carouselItems[0];
            const itemStyle = getComputedStyle(firstItem);
            itemWidth = firstItem.offsetWidth + parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);

            const carouselWrapperWidth = carouselContent.parentElement.offsetWidth;
            itemsInView = Math.floor(carouselWrapperWidth / itemWidth);
            if (itemsInView < 1) itemsInView = 1; // Ensure at least 1 item is always in view
        }
    };

    const updateCarouselPosition = () => {
        // Ensure currentScrollPosition doesn't exceed bounds
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
            currentScrollPosition += itemsInView; // Move by a full view
            if (currentScrollPosition > maxScrollPosition) {
                currentScrollPosition = maxScrollPosition; // Snap to end if overshot
            }
        } else {
            currentScrollPosition = 0; // Loop back to start
        }
        updateCarouselPosition();
    };

    const prevSlide = () => {
        if (currentScrollPosition > 0) {
            currentScrollPosition -= itemsInView; // Move back by a full view
            if (currentScrollPosition < 0) {
                currentScrollPosition = 0; // Snap to start if overshot
            }
        } else {
            const maxScrollPosition = Math.max(0, carouselItems.length - itemsInView);
            currentScrollPosition = maxScrollPosition; // Loop to end
        }
        updateCarouselPosition();
    };

    // Initial setup
    calculateItemProperties();
    updateCarouselPosition();

    // Event listeners for navigation arrows
    rightArrow.addEventListener('click', nextSlide);
    leftArrow.addEventListener('click', prevSlide);

    // Recalculate on window resize to adjust visible items and position
    window.addEventListener('resize', () => {
        calculateItemProperties();
        updateCarouselPosition();
    });
});