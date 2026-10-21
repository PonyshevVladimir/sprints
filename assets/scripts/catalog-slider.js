const arrowPrev = document.querySelector('.catalog-slider__arrow-prev');
const arrowNext = document.querySelector('.catalog-slider__arrow-next');
const sliderLine = document.querySelector('.catalog-slider__line');
let sliderItem = document.querySelectorAll('.catalog-slider__item');

let currentIndex = 0;
let cartItems = sliderItem.length - 4;

function updateSlider() {

    let cartWidth = sliderItem[0].offsetWidth;
    let gap = 40;
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

async function getProducts() {
    let response = await fetch('http://localhost:3001/products');
    let data = await response.json();

    renderProducts(data);
}

async function renderProducts(productsArray) {
    let html = ``;
    productsArray.forEach(product => {
        html += `
            <div class="catalog-slider__item">
                <div class="catalog-slider__image-box">
                    <img src="${product.image}" alt="" class="catalog-slider__img">
                </div>
                <div class="catalog-slider__info-box">
                    <p class="catalog-slider__product-type">${product.type}</p>
                    <h3 class="catalog-slider__product-name">${product.name}</h3>
                    <div class="catalog-slider__stars">
                        ${generateStarsHTML(product.stars)}         
                    </div>
                    <div class="catalog-slider__bottom-box">
                        <p class="catalog-slider__product-price">
                        <span class="catalog-slider__product-currency">${product.currency}</span>${product.price}</p>
                        <button class="catalog-slider__product-add"></button>
                    </div>
                </div>
            </div>
        `;
    });

    sliderLine.innerHTML = html;
    sliderItem = document.querySelectorAll('.catalog-slider__item');
    cartItems = sliderItem.length - 4;
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

getProducts();