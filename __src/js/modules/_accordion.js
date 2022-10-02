/**=== Notes ==========================================
 * - к оболочке, заголовку и содержимому добавляется класс _open
 * это позволяет дополнительно стилизовать состояние открытого аккордиона
 * 
 * - пример запуска
    new Accordion({
        titleSelector: '.info__title',
        contentSelector: '.info__text',
        multiOpenMode: false
    });
 * ====================================================*/

export function Accordion(param) {
    let accordions;
    
    let settings = {
        parrentSelector: '.accordion',          // Родительский элемент / Оболочка
        titleSelector: '.accordion__title',     // Заголовок аккордиона при нажатии на который происходит откытие
        contentSelector: '.accordion__content', // Блок с содержимым, который открывается и закрывается
        multiOpenMode: true,                    // Позволяет оставаться открытым другим аккордионам
        outClick: true,                         // Если клик снаружи блока то скрыть контент
		openSpeed: 0.3, 	                    // Скорость открытия аккордеона в мс.
		animationType: 'ease',                  // тип анимации открытия аккордеона
        start: start
    };


    if (param) {
        Object.assign(settings, param);
    }


    settings.start();


    function start() {
        accordions = document.querySelectorAll(settings.parrentSelector);
        
        for (let i = 0; i < accordions.length; i++) {
            initAccordion(accordions[i]);
        };
    }


    function initAccordion(elem) {
        let titleBtn = elem.querySelector(settings.titleSelector);
            titleBtn.style.cssText = `
                -moz-user-select: none;
                -khtml-user-select: none;
                user-select: none; 
                cursor: pointer;
            `;

        let content = elem.querySelector(settings.contentSelector);
            content.style.cssText = `
                max-height: 0px;
                overflow: hidden;
                transition: max-height ${settings.openSpeed}s ${settings.animationType} 0s; 
            `;

        titleBtn.addEventListener('click', function () {
            if (!elem.classList.contains('_open')) {
                if (!settings.multiOpenMode) closeAllAccordions();
                openAccordion(elem);
            } else {
                closeAccordion(elem);
            }
        })
    };


    function openAccordion(elem) {
        elem.classList.add('_open');
        elem.querySelector(settings.titleSelector).classList.add('_open');
        elem.querySelector(settings.contentSelector).classList.add('_open');
        elem.querySelector(settings.contentSelector).style.maxHeight = elem.querySelector(settings.contentSelector).scrollHeight + 'px';
        
        if (settings.outClick) {
            document.addEventListener('click', outClick);
        };
    }


    function closeAccordion(elem) {
        elem.classList.remove('_open');
        elem.querySelector(settings.titleSelector).classList.remove('_open');
        elem.querySelector(settings.contentSelector).classList.remove('_open');
        elem.querySelector(settings.contentSelector).style.maxHeight = 0 + 'px';

        if (settings.outClick) {
            document.removeEventListener('click', outClick);
        };
    }


    function closeAllAccordions() {
        for (let i = 0; i < accordions.length; i++) {
            accordions[i].classList.remove('_open');
            accordions[i].querySelector(settings.titleSelector).classList.remove('_open');
            accordions[i].querySelector(settings.contentSelector).classList.remove('_open');
            accordions[i].querySelector(settings.contentSelector).style.maxHeight = 0 + 'px';
        };
    }


    function outClick(e) {
        let target = e.target;
        if (!target.closest(settings.parrentSelector))  {
            closeAllAccordions();
        }
    }
}