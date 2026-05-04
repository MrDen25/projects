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

    if (currentEl) {
        currentEl.addEventListener('click', () => swiper.slidePrev());
    }

    if (totalEl) {
        totalEl.addEventListener('click', () => swiper.slideNext());
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
    const currentEl = document.querySelector('.current-slide');
    const totalEl = document.querySelector('.total-slides');
    const fillEl = document.querySelector('.hero__progressbar-fill');
    const swiper = new Swiper(aboutUsSlider, {
        loop: true,
        speed: 800,
        slidesPerView: 1.21,
        spaceBetween: 12,
        navigation: {
            nextEl: ".hero-button-next",
            prevEl: ".hero-button-prev",
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

    function resizeActions() {
        if (header) {
            header.classList.remove('header-scroll');
        }
        if (!isMobile.any() || window.innerWidth > 768) {
            document.documentElement.removeAttribute('data-menu-open');
        }
    }

    scrollActions();

    window.addEventListener("scroll", scrollActions);
    window.addEventListener("resize", resizeActions);
    document.addEventListener('click', documentActions);
}
"use strict";

window.clearForm = function (formElement) {
    if (!formElement) return;

    formElement.reset();

    // Очищаємо візуальні стани помилок та кастомні класи
    const inputs = formElement.querySelectorAll("[data-val='true']");
    inputs.forEach(el => {
        el.classList.remove("valid", "invalid");
        const errorLabel = document.querySelector("#" + el.dataset.errorLabel);
        if (errorLabel) {
            errorLabel.style.display = "none";
            errorLabel.innerHTML = "";
        }
    });

    // Скидаємо стрілочки селектів, якщо вони були повернуті
    const selectGroups = formElement.querySelectorAll('.form__group.arrow-right');
    selectGroups.forEach(group => group.classList.remove('arrow-right-deg'));

    // Очищення тексту файлу (якщо є такий елемент)
    const fileNameDisplay = document.querySelector(".file-name");
    if (fileNameDisplay) {
        fileNameDisplay.textContent = "Attach your file";
        fileNameDisplay.style.color = "";
    }
};

const form = document.getElementById('form');

if (form) {
    let validationElements = form.querySelectorAll("[data-val='true']");

    validationElements.forEach(element => {
        element.addEventListener("change", (e) => validateElement(e.target));
        element.addEventListener("input", (e) => validateElement(e.target));
    });

    form.addEventListener("submit", function (e) {
        let isFormValid = true;

        validationElements.forEach(element => {
            if (!validateElement(element)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            e.preventDefault();
        } else {
            e.preventDefault();

            const modal = document.querySelector(".modal");
            const modalSubmit = document.querySelector(".modal-submit");

            if (modal) modal.classList.remove("open");
            if (modalSubmit) modalSubmit.classList.add("show");

            window.clearForm(form);
        }
    });
}

function validateElement(element) {
    if (!element.dataset.val) return true;

    for (const key in validators) {
        if (Object.hasOwnProperty.call(validators, key) && typeof validators[key] == "object") {
            if (element.dataset[key] !== undefined) {
                const validator = validators[key];
                if (!validator.isValid(element)) return false;
            }
        }
    }
    return true;
}

let validators = {
    validate: function (element, message, predicate) {
        let errorLabel = document.querySelector("#" + element.dataset.errorLabel);

        if (errorLabel) {
            errorLabel.innerHTML = message;
            errorLabel.style.display = "none";
        }
        element.classList.remove("valid", "invalid");

        if (typeof predicate == "function" && predicate()) {
            element.classList.add("valid");
            return true;
        } else {
            element.classList.add("invalid");
            if (errorLabel) {
                errorLabel.style.display = "block";
                errorLabel.style.opacity = "1";
                errorLabel.style.visibility = "visible";
            }
            return false;
        }
    },
    required: {
        isValid: function (element) {
            let message = element.dataset.required;
            return validators.validate(element, message, () => element.value && element.value.trim().length > 0);
        }
    },
    pattern: {
        isValid: function (element) {
            let message = "Wrong format";
            let regex = new RegExp(element.dataset.pattern);
            return validators.validate(element, message, () => regex.test(element.value));
        }
    }
};
"use strict";

const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');

let modal = document.querySelector(".modal");
let modalSubmit = document.querySelector(".modal-submit");
let modalSubmitClose = document.querySelector(".modal-submit__close");
let modalSubmitButton = document.querySelector(".modal-submit__button");

let mask = document.querySelector(".mask");
let loader = document.querySelector(".loader");

document.addEventListener("click", (e) => {
    const targetElement = e.target;
    const formElement = document.getElementById('form');

    // 1. Відкрити основну модалку
    if (targetElement.classList.contains("send-request")) {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--sw', `${scrollBarWidth}px`);

        modal.classList.add("open");
        document.documentElement.setAttribute('data-modal-open', "");
    }

    // 2. Закрити основну модалку (Клік по хрестику АБО по фону поза контентом)
    if (targetElement.classList.contains("modal__close") || targetElement === modal) {
        modal.classList.remove("open");
        document.documentElement.removeAttribute('data-modal-open');
        if (window.clearForm) window.clearForm(formElement);
    }

    // 3. Закрити модалку успіху (Клік по фону поза контентом)
    if (targetElement === modalSubmit) {
        modalSubmit.classList.remove("show");
        document.documentElement.removeAttribute('data-modal-open');
    }
});

// Закриття вікна успіху через хрестик
if (modalSubmitClose) {
    modalSubmitClose.addEventListener("click", () => {
        document.documentElement.removeAttribute('data-modal-open');
        modalSubmit.classList.remove("show");
    });
}

// Кнопка "Назад до форми" у вікні успіху
if (modalSubmitButton) {
    modalSubmitButton.addEventListener("click", () => {
        const formElement = document.getElementById('form');
        if (window.clearForm) window.clearForm(formElement);

        modal.classList.add("open");
        modalSubmit.classList.remove("show");
    });
}

// Логіка прелоадера
const changeText = (newText, delay) => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (loader) loader.textContent = newText;
            resolve();
        }, delay);
    });
};

window.addEventListener("load", async () => {
    await changeText("HI 100%", 80);
    await changeText("HILIGHT", 200);
    setTimeout(() => {
        if (mask) mask.classList.add("hide");
    }, 150);
});

// Логіка стрілочок селектів
document.addEventListener('click', (e) => {
    const target = e.target.closest('.form__group.arrow-right');
    const allArrows = document.querySelectorAll('.form__group.arrow-right');

    if (target) {
        target.classList.toggle('arrow-right-deg');
        allArrows.forEach(el => {
            if (el !== target) el.classList.remove('arrow-right-deg');
        });
    } else {
        allArrows.forEach(el => el.classList.remove('arrow-right-deg'));
    }
});
"use strict";

document.addEventListener("change", (e) => {
    if (e.target.id === "fileInput") {
        const fileNameDisplay = document.querySelector(".file-name");
        const file = e.target.files[0];
        const maxSize = 10 * 1024 * 1024; // 10 МБ у байтах

        if (file) {
            if (file.size > maxSize) {
                // Якщо файл завеликий
                fileNameDisplay.textContent = "Помилка: файл більше 10 МБ";
                fileNameDisplay.style.color = "red";
                e.target.value = ""; // Очищаємо інпут
            } else {
                // Якщо все добре
                fileNameDisplay.textContent = "Файл додано: " + file.name;
                fileNameDisplay.style.color = "green";
            }
        }
    }
});

document.addEventListener("click", (e) => {
    if (e.target.closest(".modal__close") || e.target.closest(".modal-submit__close")) {
        const fileInput = document.getElementById("fileInput");
        const fileNameDisplay = document.querySelector(".file-name");

        if (fileInput) fileInput.value = "";
        if (fileNameDisplay) {
            // Повертаємо початковий текст
            fileNameDisplay.textContent = "Attach your file";
            fileNameDisplay.style.color = "";
        }
    }
});


