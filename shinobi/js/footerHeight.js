
window.addEventListener('load', load)

function load() {
    /* Перевірка мобільного браузера */
    const isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
    /* Додавання класу touch для HTML, якщо браузер мобільний */
    function addTouchAttr() {
        // Додавання data-fls-touch для HTML, якщо браузер мобільний
        if (isMobile.any()) document.documentElement.setAttribute('data-fls-touch', '')
    }
    function initFooterMenus() {
        const footerMenus = document.querySelectorAll('.menu-footer__list')
        if (footerMenus.length) {
            const matchMedia = window.matchMedia(`(width <= 48.0625em)`)
            matchMedia.addEventListener('change', function () {
                setFooterMenus(matchMedia.matches)
            })
            function setFooterMenus() {
                footerMenus.forEach(footerMenu => {
                    if (matchMedia.matches) {
                        footerMenu.style.cssText += `height: 0;`
                    } else {
                        footerMenu.style.cssText = ``
                    }
                })
            }
            setFooterMenus()
        }
    }
    initFooterMenus()
    addTouchAttr()


    document.addEventListener("click", documentActions)
    function documentActions(e) {
        const targetElement = e.target
        if (targetElement.closest('.menu-footer__title')) {

            const currentTitle = targetElement.closest('.menu-footer__title')
            const currentList = currentTitle.nextElementSibling
            if (window.innerWidth <= 768) {
                const activeFooterMenu = document.querySelector('[data-footer-menu-open]')

                if (activeFooterMenu && activeFooterMenu !== currentTitle) {
                    closeActiveFooterMenu(activeFooterMenu)
                }

                currentTitle.toggleAttribute('data-footer-menu-open')
                if (currentTitle.hasAttribute('data-footer-menu-open')) {
                    currentList.style.cssText = ``
                    const currentListHeight = currentList.offsetHeight
                    currentList.style.cssText = `height: 0;`
                    currentList.offsetHeight

                    currentList.style.cssText = `height: ${currentListHeight}px`


                } else {
                    currentList.style.cssText = `height: 0;`

                }

                function closeActiveFooterMenu(item) {
                    item.removeAttribute('data-footer-menu-open')
                    const currentList = item.nextElementSibling
                    currentList.style.cssText = `height: 0;`

                }
            }
        }
    }


}


