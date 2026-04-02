function testWebp(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

testWebp(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }
});
const heroSlider = document.querySelector('.hero__swiper');

if (heroSlider) {
    const currentEl = document.querySelector('.current-slide');
    const totalEl = document.querySelector('.total-slides');
    const fillEl = document.querySelector('.hero__progressbar-fill');

    const swiper = new Swiper(heroSlider, {
        loop: true,
        speed: 800,
        navigation: {
            nextEl: ".hero-button-next",
            prevEl: ".hero-button-prev",
        },
        breakpoints: {
            0: { slidesPerView: 1.193 },
            768: { slidesPerView: 1.173 },
            1024: { slidesPerView: 1.185 },
            1440: { slidesPerView: 1.1758 }
        },
        on: {
            init: function (s) {
                updateProgress(s);
            },
            slideChange: function (s) {
                updateProgress(s);
            }
        }
    });

    function updateProgress(s) {
        if (!currentEl || !totalEl || !fillEl) return;

        const current = s.realIndex + 1;
        // Надійний спосіб вирахувати кількість слайдів без дублікатів loop
        const total = s.slides.filter(slide => !slide.classList.contains('swiper-slide-duplicate')).length;

        // Оновлюємо текст (01, 02...)
        currentEl.textContent = current < 10 ? `0${current}` : current;
        totalEl.textContent = total < 10 ? `0${total}` : total;

        // Оновлюємо прогрес-бар
        const progress = (current / total) * 100;
        fillEl.style.width = `${progress}%`;
    }
}
"use strict"



window.addEventListener('load', load)
/* Перевірка мобільного браузера */
const isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Додавання класу touch для HTML, якщо браузер мобільний */
function addTouchAttr() {
    // Додавання data-fls-touch для HTML, якщо браузер мобільний
    if (isMobile.any()) document.documentElement.setAttribute('data-fls-touch', '')
}
addTouchAttr()

function load() {


    document.addEventListener('click', documentActions)




    function documentActions(e) {
        const targetElement = e.target
        if (isMobile.any()) {
            if (targetElement.closest(".header__burger_menu")) {
                document.documentElement.toggleAttribute('data-menu-open')

            }


        }
    }

}





