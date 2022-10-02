/**== ДОРАБОТАТЬ!!! ==
 * 
 * new Parallax({
    element: ".fs",
    layout: '.fs__bg',
    event: 'scroll',
    scale: 2
});
 */



function Parallax(param) {
    let settings = {
        element: '.prx', 
        layout: '.prx__lay',
        event: '', // scroll, mousemove, 
        scale: 1.2,
        start: start,
    };

    if (param) {
        Object.assign(settings, param);
    }

    settings.start();

    function start() {
        let elems = document.querySelectorAll(settings.element);
        for (let i = 0; i < elems.length; i++) {
            if (settings.event == 'scroll') {
                scrollParallax(elems[i]);
            } else if (settings.event == 'mousemove') {

            }
        };
    }


    // scroll parallax
    function scrollParallax(el) {
        let lay = el.querySelector(settings.layout);
        if (!lay) return false;//---------------
        lay.style.height = el.offsetHeight * settings.scale + 'px';
        lay.style.bottom = 0;

        let layHeight = lay.offsetHeight;
        
        let diff = layHeight - el.offsetHeight;
        let d1 = diff / 100;

        let windowHeight = window.innerHeight;

        let elemTop = el.offsetTop;
        let elemHeight = el.offsetHeight;
    
        let p = (elemHeight + windowHeight) / 100;
        setPosition();
        window.addEventListener('scroll', () => {
            setPosition();
        }, false);

        function setPosition() {
            if (window.pageYOffset + windowHeight > elemTop && window.pageYOffset < (elemTop + elemHeight)) {
                let pos = (window.pageYOffset + windowHeight - elemTop) / p;
                lay.style.transform = `translateY(${d1 * pos}px)`
            }
        }
    }
}