const catalogArrowPrev = document.querySelector('.catalog-slider__arrow-prev');
const catalogArrowNext = document.querySelector('.catalog-slider__arrow-next');
const catalogSliderLine = document.querySelector('.catalog-slider__line');
const catalogSliderItem = document.querySelectorAll('.catalog-slider__item');

let catalogCurrentIndex = 0;
let catalogCartItems = catalogSliderItem.length - 4;

function catalogUpdateSlider() {

    let catalogCartWidth = catalogSliderItem[0].offsetWidth;
    let catalogGap = 40;
    let catalogStep = catalogCartWidth + catalogGap;
    let catalogTotalX = catalogCurrentIndex * catalogStep;

    catalogSliderLine.style.transform = `translateX(-${catalogTotalX}px)`;
}

catalogArrowPrev.addEventListener('click', function() {
    if (catalogCurrentIndex > 0) {
        catalogCurrentIndex -= 1;
        catalogUpdateSlider()
    }
})

catalogArrowNext.addEventListener('click', function() {
    if (catalogCurrentIndex < catalogCartItems) {
        catalogCurrentIndex += 1;
        catalogUpdateSlider()
    }
})

