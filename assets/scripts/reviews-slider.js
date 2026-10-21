const arrowPrev = document.querySelector('.reviews-slider__arrow-prev');
const arrowNext = document.querySelector('.reviews-slider__arrow-next');
const sliderLine = document.querySelector('.reviews-slider__line');
let sliderItem = document.querySelectorAll('.reviews-slider__item');

let currentIndex = 0;
let cartItems = sliderItem.length - 3;

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
    if (currentIndex < cartItems) {
        currentIndex += 1;
        updateSlider()
    }
})


async function getReviews() {
   let response = await fetch('http://localhost:3001/reviews');
   let data = await response.json();

   renderReviews(data);
}

async function renderReviews(reviewsArray) {
    let html = ``;
    reviewsArray.forEach(review => {
        html += `
            <div class="reviews-slider__item">
                <img src="${review['bg-image']}" alt="" class="reviews-slider__item-bg">
                <img src="${review['bg-image']}" alt="" class="reviews-slider__item-shadow" aria-hidden="true">
                <div class="reviews-slider__content">
                    <div class="reviews-slider__avatar-wrapper">
                        <img src="${review.avatar}" alt="" class="reviews-slider__avatar-img">
                        <img src="${review.avatar}" alt="" class="reviews-slider__avatar-shadow" aria-hidden="true">
                    </div>
                    <h3 class="reviews-slider__name">${review.name}</h3>
                    <p class="reviews-slider__job">${review.job}</p>
                    <blockquote class="reviews-slider__text">“${review.text}“</blockquote>
                    <div class="reviews-slider__stars">
                       ${generateStarsHTML(review.stars)}
                    </div>
                </div>
            </div>
        `;
    });

    sliderLine.innerHTML = html;
    sliderItem = document.querySelectorAll('.reviews-slider__item');
    cartItems = sliderItem.length - 3;
}

function generateStarsHTML(starsCount) {
    let starsHTML = '';
    const  count = Number(starsCount);

    for (let i = 0; i < count; i++) {
        starsHTML += `<img src="./assets/icons/star.svg" class="reviews-slider__star" alt="">`;
    }
    for (let i = 0; i < (5 - count); i++) {
        starsHTML += `<img src="./assets/icons/star-not.svg" class="reviews-slider__star" alt="">`;
    }
    return starsHTML;
}

getReviews();
