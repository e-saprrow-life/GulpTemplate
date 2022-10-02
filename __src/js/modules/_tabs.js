/**
 * 
 */

function Tabs (param) {
    let settings = {
        id: 'id',
        start: start
	};
	
    if (param) {
        Object.assign(settings, param);
    }

    settings.start();

    function start() {
        let tabs = document.querySelector('#' + settings.id);
        let navItems = tabs.querySelectorAll('.tabs__nav-item');
        let navBlocks = tabs.querySelectorAll('.tabs__block');

        navItems[0].classList.add('_selected');
        navBlocks[0].classList.add('_selected');

        for (let i = 0; i < navItems.length; i++) {
            navItems[i].addEventListener('click', () => {
                removeClassSelected(navItems, navBlocks);
                navItems[i].classList.add('_selected');
                navBlocks[i].classList.add('_selected');
            })
        };
    }

    function removeClassSelected(buttons, blocks) {
        if (buttons.length != blocks.length) {
            console.log(`Колличество кнопок и блоков в табе с ID "${settings.id}" не совпадает`);
            return
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('_selected');
            blocks[i].classList.remove('_selected');
        };
    }
}