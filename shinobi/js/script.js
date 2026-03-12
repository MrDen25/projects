// Сучасний (Строгий) режим
"use strict"

window.addEventListener('load', load)

function load() {
	/* Перевірка мобільного браузера */
	const isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
	/* Додавання класу touch для HTML, якщо браузер мобільний */
	function addTouchAttr() {
		// Додавання data-fls-touch для HTML, якщо браузер мобільний
		if (isMobile.any()) document.documentElement.setAttribute('data-fls-touch', '')
	}
	const swiper = new Swiper('.slider__swiper', {
		// Основні налаштування
		centeredSlides: true,
		slidesPerView: 'auto',
		loop: true,
		spaceBetween: 0,
		loopedSlides: 3,
		slideToClickedSlide: true, // Відступ між слайдами (коригуй під макет)

		// Ефекти (можна додати плавності)
		speed: 800,

		// Якщо потрібна пагінація або стрілки, додай їх сюди:
		/*
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		*/

		// Адаптивність (якщо на мобілці треба інший відступ)
		breakpoints: {
			768: {
				spaceBetween: 40,
			}
		}
	});


	const menu = document.querySelector('.menu__list');
	const btn = document.querySelector('.header__button');
	const breakpoint = window.matchMedia('(max-width: 768px)');

	function handleTabletChange(e) {
		if (e.matches) {
			// Якщо екран менше 768px — переносимо кнопку в кінець списку меню
			menu.appendChild(btn);
		} else {
			// Якщо більше — повертаємо кнопку в її основний контейнер (header__container)
			document.querySelector('.header__container').insertBefore(btn, document.querySelector('.header__burger'));
		}
	}

	// Слухаємо зміну розміру екрана
	breakpoint.addEventListener('change', handleTabletChange);
	// Викликаємо функцію одразу при завантаженні
	handleTabletChange(breakpoint);
















	// function initSubMenu() {
	// 	const matchMedia = window.matchMedia(`(width <= 41.875em)`)
	// 	const subMenu = document.querySelector('.sub-menu')
	// 	matchMedia.addEventListener('change', function () {
	// 		setSubMenu(matchMedia.matches)
	// 	})
	// 	setSubMenu(matchMedia.matches)

	// 	function setSubMenu() {
	// 		if (matchMedia.matches) {
	// 			subMenu.style.cssText += `height: 0;`
	// 		} else {
	// 			subMenu.style.cssText = ``
	// 		}
	// 	}
	// }
	const header = document.querySelector(".header")
	window.addEventListener("scroll", windowScroll)

	function windowScroll(e) {
		if (scrollY > 50) {
			header.classList.add('header_scroll')
		} else {
			header.classList.remove('header_scroll')
		}
	}












	// function initFooterMenus() {
	// 	const footerMenus = document.querySelectorAll('.column__list')
	// 	if (footerMenus.length) {
	// 		const matchMedia = window.matchMedia(`(width <= 48.0625em)`)
	// 		matchMedia.addEventListener('change', function () {
	// 			setFooterMenus(matchMedia.matches)
	// 		})
	// 		function setFooterMenus() {
	// 			footerMenus.forEach(footerMenu => {
	// 				if (matchMedia.matches) {
	// 					footerMenu.style.cssText += `height: 0;`
	// 				} else {
	// 					footerMenu.style.cssText = ``
	// 				}
	// 			})
	// 		}
	// 		setFooterMenus()
	// 	}
	// }
	// initFooterMenus()
	addTouchAttr()
	// initSubMenu()

	document.addEventListener('click', documentActions)

	function documentActions(e) {
		const targetElement = e.target
		if (targetElement.closest(".numbers-steps__value")) {

			const currentItem = targetElement.parentElement;

			if (!currentItem.classList.contains("numbers-steps__item_active")) {

				const activeItems = document.querySelectorAll(".numbers-steps__item_active");
				activeItems.forEach(item => {
					item.classList.remove("numbers-steps__item_active");
				});

				// 4. Додаємо клас тільки поточному елементу
				currentItem.classList.add("numbers-steps__item_active");
			}
		}



		if (isMobile.any()) {
			// if (targetElement.closest('.menu__sub-link')) {
			// 	const subMenu = document.querySelector('.sub-menu')
			// 	document.documentElement.toggleAttribute('data-sub-menu-open')
			// 	if (window.innerWidth <= 670) {
			// 		if (document.documentElement.hasAttribute('data-sub-menu-open')) {
			// 			// open
			// 			subMenu.style.cssText = ``
			// 			const subMenuHeight = subMenu.offsetHeight
			// 			subMenu.style.cssText += `height: 0;`
			// 			subMenu.offsetHeight
			// 			subMenu.style.cssText = `height: ${subMenuHeight}px`
			// 		} else {
			// 			// close
			// 			subMenu.style.cssText += `height: 0;`
			// 		}
			// 	}
			// } else {
			// 	document.documentElement.removeAttribute('data-sub-menu-open')
			// }
			// if (targetElement.closest('.column__title')) {

			// 	const currentTitle = targetElement.closest('.column__title')
			// 	const currentList = currentTitle.nextElementSibling
			// 	if (window.innerWidth <= 768) {
			// 		const activeFooterMenu = document.querySelector('[data-footer-menu-open]')

			// 		if (activeFooterMenu && activeFooterMenu !== currentTitle) {
			// 			closeActiveFooterMenu(activeFooterMenu)
			// 		}

			// 		currentTitle.toggleAttribute('data-footer-menu-open')
			// 		if (currentTitle.hasAttribute('data-footer-menu-open')) {
			// 			currentList.style.cssText = ``
			// 			const currentListHeight = currentList.offsetHeight
			// 			currentList.style.cssText = `height: 0;`
			// 			currentList.offsetHeight

			// 			currentList.style.cssText = `height: ${currentListHeight}px`
			// 			currentList.style.paddingTop = "20px"


			// 		} else {
			// 			currentList.style.cssText = `height: 0;`

			// 		}

			// 		function closeActiveFooterMenu(item) {
			// 			item.removeAttribute('data-footer-menu-open')
			// 			const currentList = item.nextElementSibling
			// 			currentList.style.cssText = `height: 0;`
			// 			currentList.style.paddingTop = "0px"

			// 		}
			// 	}
			// }
			if (targetElement.closest('.burger-menu')) {
				document.documentElement.toggleAttribute('data-menu-open')
			}
			if (targetElement.closest(".sellers__title span")) {
				document.documentElement.toggleAttribute('data-topSellers-open')

			}

		}

	}
}

