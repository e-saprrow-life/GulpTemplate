//'use strict'
/** =================================
 * Developer: Yevhenii Vorobei
 * Web Site: e-sparrow-life.com
 * Email: e.sparrow.life@gmail.com 
 ====================================*/


/** (i)
 * imoport './fileName';                    - импортирует содержимое файла. Функции вне этого файла не вызываются
 * import * as someName from "./fileName";  - импорт всех функций как объект    someName.functionName();
 * 
 */

/*=======================================================================================================*/

/**
 * Импорт библиотек:
 */ 
//import './libs/inputmask.js';                  // InputMask




// import "./vars.js";

/** 
 * sparrowFunctions - объект функций по-умолчанию 
*/
// import * as sparrowFunctions from "./modules/_sparrow-functions.js";

// sparrowFunctions.isWebp();          // Добавляю класс webp если браузер поддерживает
// sparrowFunctions.addLoadedClass();  // Добавляю класс loaded когда документ прогружен
// sparrowFunctions.fullVHfix();       // Учет плавающей панели на моб устройствах при 100vh

//sparrowFunctions.setPhoneMask('tel', '+38 (099) 99 99 999'); // Добавление маски для инпута

// import "./modules/_popups.js"; // Добавляю модуль для работы с попапом






/**
 * Импорт UI модулей
 */

// import { showPopup } from "./modules/_popups.js";
/** Добавить функцию в глобальный объект window, что бы использовать функции из html */
// window.showPopup = showPopup;

// import { headerModeSwitcher } from "./modules/_header-mode-switcher.js";
// headerModeSwitcher('baner', 100, 'header_mod');s