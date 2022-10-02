/** Добавляет класс к хедеру при скролле вниз на определенную высоту первого экрана
 * 
 * Вызов: headerModeSwitcher(firstScreenClassName, scale, headerModificator)
 * firstScreenClassName - имя класса первого экрана
 * scale - порог срабатывания в процентах
 * headerModificator - имя класса модификатора для смены внешнего вида хедера
 * 
 * Пример запуска: 
 * headerModeSwitcher('baner', 100, 'header_mod');
 */


export function headerModeSwitcher(firstScreenClassName, scale, headerModificator) {
    let header = document.querySelector('header.header');
    let headerLightClassName = headerModificator;
    let firstScreen = document.querySelector('.' + firstScreenClassName);
    let a = 100 - scale; 

    

    if (firstScreen && header) {
        changeHeaderMode();
        window.addEventListener('scroll', function () {
            changeHeaderMode();
        }, false);
    } else {
        console.log('headerModeSwitcher: Нехватает каких-то элементов для запуска плагина');
    }



    function changeHeaderMode() {
        console.log(`Scroll Y - ${Math.floor(window.pageYOffset)}/ Procent (${scale}) - ${firstScreen.offsetHeight / 100 * scale}/ Offset Height - ${firstScreen.offsetHeight}`)
        if (window.pageYOffset > (firstScreen.offsetHeight - (firstScreen.offsetHeight / 100 * a))) {
            addMode();
        } else if (window.pageYOffset < (firstScreen.offsetHeight - (firstScreen.offsetHeight / 100 * a))) {
            removeMode();
        }
    };



    function addMode() {
        if (header.classList.contains(headerLightClassName)) {
            return;
        };
        header.classList.add(headerLightClassName);
    }



    function removeMode() {
        if (!header.classList.contains(headerLightClassName)) {
            return;
        };
        header.classList.remove(headerLightClassName);
    }
}