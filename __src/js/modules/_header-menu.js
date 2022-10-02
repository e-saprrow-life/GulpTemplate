/**
 * Мобильное меню бургер
 */

export function headerMenu() {
    let burger = document.querySelector('#burger');
    let menu = document.querySelector('.menu');
    let body = document.body;
    let links;

    if (!burger || !menu) {
        console.log("Недостаточно элементов для выполнения функции headerMenu")
        return false;
    }
    //if (window.innerWidth > 767) return false;

    links = menu.querySelectorAll('li');
    
    for (let i = 0; i < links.length; i++) {
        let subMunu = links[i].querySelector('ul');
        if (subMunu) {
            links[i].classList.add('submenu-parent');
        }
    }

    burger.addEventListener('click', toggleMenu);
    
    function toggleMenu() {
        if (!burger.classList.contains('_open')) {
            openMenu();
        } else {
            closeMenu();
        }
    }

    function openMenu() {
        burger.classList.add('_open');
        menu.classList.add('_open');
        body.classList.add('_lock');
        addEventsToMenuItems();
    }

    function closeMenu() {
        burger.classList.remove('_open');
        menu.classList.remove('_open');
        body.classList.remove('_lock');
        removeEventsOfMenuItems();
    }

    function addEventsToMenuItems() {
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener('click', closeMenu);
        };
    }

    function removeEventsOfMenuItems() {
        for (let i = 0; i < links.length; i++) {
            links[i].removeEventListener('click', closeMenu);
        };
    }
}