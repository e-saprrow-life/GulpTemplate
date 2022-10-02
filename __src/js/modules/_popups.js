/**
 * 1. Добавить ID для попапа, который нужно открыть
 * 2. Добавить функцию при клике [ onclick="showPopup("ID") ] 
 *    на элемент при нажатии на который нужно открывать попап 
 */


// Импорт модуля, для компенсации сдвига контента при открітии попапа
import { shiftLockedPage } from "./_sparrow-functions.js";


/**
 * Добаляю функцию в глобальный объект window, 
 * что бы можно было вызывать ее из html  */ 
window.showPopup = showPopup; 

export function showPopup(id) {
    let popup = document.querySelector('#' + id);

    if (!popup) return;

    //popup.querySelector('.popup__inner').style.paddingTop = document.querySelector('header').offsetHeight + 20 + 'px';

    let closeBtn = popup.querySelector('.popup__btn-close');

    openPopup();

    function openPopup() {
        document.body.classList.add('_lock');
        popup.classList.add('_open');
        closeBtn.addEventListener('click', closePopup);
        document.addEventListener('keydown', keyEvent);
        shiftLockedPage();
        popup.addEventListener('click', clickOut);
        setTimeout(function () {
            document.body.addEventListener('click', bodyClick);
        }, 100);
    }


    function clickOut(e) {
        if(!e.target.closest('.popup__body')) {
            closePopup();
            popup.removeEventListener('click', clickOut);
        }
    }


    function bodyClick(e) {
        if(!e.target.closest('.popup__body')) {
            closePopup();
            popup.removeEventListener('click', clickOut);
        }
    }


    function closePopup() {
        popup.classList.remove('_open');
        document.body.classList.remove('_lock');
        closeBtn.removeEventListener('click', closePopup);
        document.removeEventListener('keydown', keyEvent);
        popup.removeEventListener('click', clickOut);
        document.body.removeEventListener('click', bodyClick);
        shiftLockedPage();
    }


    function keyEvent(event) {
        if(event.code == 'Escape'){
            closePopup();
        };
    }
}