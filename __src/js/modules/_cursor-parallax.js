export function cursorParallax() {
    let baner = document.querySelector('.baner');
    let cyrcles = document.querySelectorAll('.cyrcles__item');

    let zeroX ;
    let zeroY;

    let cyrclesHeight =[];


    for(let cyrcle of cyrcles) {
        cyrclesHeight.push(cyrcle.offsetHeight);
    }


    let x,y;

    baner.addEventListener('mousemove', startTrans)

    function startTrans(event) {
        event = event || window.event; // кроссбраузерность
        x = event.clientX - (window.innerWidth / 2),
        y = event.clientY - (window.innerHeight / 2)
    
        for(let cyrcle of cyrcles) {
            let h = cyrcle.offsetHeight / 4;
            cyrcle.style.transform = `translate(${x / h }px, ${(y / h)*3}px)`;
        }
    }


    /*function endTrans(event) {
        console.log('trns end')
        console.log(event.clientX)

        x = event.clientX - (window.innerWidth / 2),
        y = event.clientY - (window.innerHeight / 2)
        cyrcle.style.transform = `translate(${x / h }px, ${(y / h)*2}px)`;
    }*/
}