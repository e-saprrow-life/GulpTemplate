/**
 * Проверка мобильного браузера
 */
export let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };



/** 
 * Проверка поддержки браузером webp изображений 
 */
export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? '_webp' : '_no-webp';
		document.documentElement.classList.add(className);
	});
}



/**
 * Добавление loaded для HTML после полной загрузки страницы
 */
export function addLoadedClass() {
	window.addEventListener("load", function () {
		setTimeout(function () {
			document.documentElement.classList.add('loaded');
		}, 0);
	});
}



/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Учет плавающей панели на мобильных устройствах при 100vh
 */
export function fullVHfix() {
	const fullScreens = document.querySelectorAll('[data-fullscreen]');
	if (fullScreens.length && isMobile.any()) {
		window.addEventListener('resize', fixHeight);
		function fixHeight() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
		fixHeight();
	}
}



/**
 * Компенсация ширины контента, когда body имеет класс _lock
 */
export function shiftLockedPage() {
    if (document.body.classList.contains('_lock')) {
        shiftContent();
    } else if (!document.body.classList.contains('_lock')) {
        unShiftContent();
    }


    function shiftContent() {
        if (document.querySelector('.wrapper').offsetWidth < document.body.offsetWidth) {
            bodyShift();
        } else if (document.querySelector('.wrapper').offsetWidth >= document.body.offsetWidth) {
            shiftContainer();
        }
    }


    function unShiftContent() {
        if (document.querySelector('.wrapper').offsetWidth < document.body.offsetWidth) {
            bodyUnShift();
        } else if(document.querySelector('.wrapper').offsetWidth >= document.body.offsetWidth){
            unShiftContainer();
        }
    }


    function shiftContainer() {
        for (let i = 0; i < document.querySelectorAll('.container').length; i++) {
            document.querySelectorAll('.container')[i].style.transform = `translateX(-${window.scrollWidth / 2}px)`;
        };
    };

    
    function unShiftContainer() {
        for (let i = 0; i < document.querySelectorAll('.container').length; i++) {
            document.querySelectorAll('.container')[i].style.transform = `none`;
        };
    };


    function bodyShift() {
        document.body.style.paddingRight = window.scrollWidth + 'px';
        document.querySelector('.popup._open').style.paddingRight = window.scrollWidth + 'px';
    }


    function bodyUnShift() {
        document.body.style.paddingRight = 0 + 'px';
        document.querySelector('.popup._open').style.paddingRight = 0 + 'px';
    }
}



/**
 * Устанавливает Input Mask для ввода номера телефона
 */
export function setPhoneMask(id, maskType ) {
    /**
     *  9 - значит что вместо этой цифры пользователь введет свою 
     */
    new Inputmask(maskType).mask(document.querySelector(`#${id}`));
}



/* 
if (document.querySelector('html').getAttribute('lang') == 'en_US') {
        let phoneMask = new Inputmask('+99 (999) 99 99 999');
        phoneMask.mask(phone);
    } else {
        let phoneMask = new Inputmask('+38 (099) 99 99 999');
        phoneMask.mask(phone);
    }
*/