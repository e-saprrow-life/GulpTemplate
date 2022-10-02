/**
 * Выводит текущий год в указанном селекторе
 */
export function printCurrentYear(elemSelector) {
    
    if (!document.querySelector(elemSelector)) {
        console.log('Элемент ' + elemSelector + ' не найден.');
        return;
    };

    const date = new Date();
    document.querySelector(elemSelector).innerText = date.getFullYear();
}