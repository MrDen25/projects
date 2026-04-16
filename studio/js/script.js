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
const newsSlider = document.querySelector(".news__slider")
const aboutUsSlider = document.querySelector(".company__slider")

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
        const total = s.slides.filter(slide => !slide.classList.contains('swiper-slide-duplicate')).length;

        currentEl.textContent = current < 10 ? `0${current}` : current;
        totalEl.textContent = total < 10 ? `0${total}` : total;


        const progress = (current / total) * 100;
        fillEl.style.width = `${progress}%`;
    }
}

if (newsSlider) {
    const swiper = new Swiper(newsSlider, {
        loop: true,
        speed: 800,


        breakpoints: {
            0: {
                slidesPerView: 1.2,
                spaceBetween: 26
            },

            541: {
                slidesPerView: 1.7,
                spaceBetween: 20
            },

            769: {
                slidesPerView: 2.72,
                spaceBetween: 40
            },

            1025: {
                slidesPerView: 3.53,
                spaceBetween: 48
            }
        }

    });
}

if (aboutUsSlider) {
    const swiper = new Swiper(aboutUsSlider, {
        loop: true,
        speed: 800,
        slidesPerView: 1.21,
        spaceBetween: 12,

        // breakpoints: {
        //     0: {
        //         slidesPerView: 1.2,
        //         spaceBetween: 26
        //     },

        //     541: {
        //         slidesPerView: 1.7,
        //         spaceBetween: 20
        //     },

        //     769: {
        //         slidesPerView: 2.72,
        //         spaceBetween: 40
        //     },

        //     1025: {
        //         slidesPerView: 3.53,
        //         spaceBetween: 48
        //     }
        // }

    });
}
"use strict"



const isMobile = { Android: () => navigator.userAgent.match(/Android/i), BlackBerry: () => navigator.userAgent.match(/BlackBerry/i), iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i), Opera: () => navigator.userAgent.match(/Opera Mini/i), Windows: () => navigator.userAgent.match(/IEMobile/i), any: () => (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()) };

if (isMobile.any()) document.documentElement.setAttribute('data-fls-touch', '');

window.addEventListener('load', load);

function load() {
    const header = document.querySelector('.header');

    function scrollActions() {
        const scrollY = window.scrollY;




        if (header) {
            if (scrollY > 50) {
                header.classList.add('header-scroll');
            } else {
                header.classList.remove('header-scroll');
            }
        }
    }


    function documentActions(e) {
        const targetElement = e.target;
        if (isMobile.any()) {
            if (targetElement.closest(".header__burger_menu")) {
                document.documentElement.toggleAttribute('data-menu-open');
            }
        }
    }


    scrollActions();


    window.addEventListener("scroll", scrollActions);
    document.addEventListener('click', documentActions);
}


