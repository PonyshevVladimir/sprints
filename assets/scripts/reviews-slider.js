const arrowPrev = document.querySelector('.reviews-slider__arrow-prev');
const arrowNext = document.querySelector('.reviews-slider__arrow-next');
const sliderLine = document.querySelector('.reviews-slider__line');
const sliderItem = document.querySelectorAll('.reviews-slider__item');

let currentIndex = 0;
let CartItems = sliderItem.length - 3;

function updateSlider() {

    let cartWidth = sliderItem[0].offsetWidth;
    let gap = 30;
    let step = cartWidth + gap;
    let totalX = currentIndex * step;

    sliderLine.style.transform = `translateX(-${totalX}px)`;
}

arrowPrev.addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex -= 1;
        updateSlider()
    }
})

arrowNext.addEventListener('click', function() {
    if (currentIndex < CartItems) {
        currentIndex += 1;
        updateSlider()
    }
})

