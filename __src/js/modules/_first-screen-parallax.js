/**
 * Простой паралакс первого экрана
 * Используется только на первом экране
 * 
 * firstScreen - имя класса первого экрана
 * firstScreenLay - имя класса фона первого экрана
 */

export function firstScreenParallax(firstScreen, firstScreenLay) {
    let fs = document.querySelector(firstScreen);
    let fsl = document.querySelector(firstScreenLay);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset < fs.offsetHeight) {
            fsl.style.transform = `translateY(${window.pageYOffset / 2}px)`;
        }
    })
}