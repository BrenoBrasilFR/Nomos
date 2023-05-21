var items = document.querySelectorAll('.carousel-item');
var selected = document.querySelectorAll('.is-selected');
var buttons = document.querySelectorAll('.carousel-button');
var loaderProducts = document.querySelector('.loaderProducts');
var itemDisplayNumbers = 0;
var page = 1;
var end = false;
var x;
function setCount(value) { page = value };

function appendDots(num) {
    const dots = document.querySelectorAll('.button-dot');

    if (dots.length !== Math.ceil(items.length / num)) {

        for (let i = 0; i < dots.length; i++) {
            dots[i].remove();
        };

        for (let i = 0; i < items.length / num; i++) {

            const dotButton = document.createElement('button');
            const dotDiv = document.createElement('div');
            dotButton.classList.add('button-dot');
            dotDiv.classList.add('dot');
            const element = document.querySelector('.carousel-dots');
            element.appendChild(dotButton);
            const dotButtonAppend = document.querySelectorAll('.button-dot')[i];
            dotButtonAppend.appendChild(dotDiv);

        };
    };
};

function functionalityDots(page) {
    const dots = document.querySelectorAll('.button-dot');
    page -= 1;

    if (dots.length !== 0) {
        dots.forEach(dot => {
            dot.firstChild.classList.remove('current-dot');
        });

        dots[page].firstChild.classList.add('current-dot');

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                let dotsArray = Array.from(dots);
                page = dotsArray.indexOf(dot) + 1;
                selected = document.querySelectorAll('.is-selected');

                selected.forEach(item => {
                    item.style.animation = 'fadeOut 0.2s';
                });

                dots.forEach(dot => {
                    dot.firstChild.classList.remove('current-dot');
                });

                dots[page - 1].firstChild.classList.add('current-dot');

                setTimeout(function () {

                    selected.forEach(element => {
                        element.classList.remove('is-selected');
                        element.style.animation = '';
                    });

                    for (let i = (page - 1) * itemDisplayNumbers; i < page * itemDisplayNumbers & i < items.length; i++) {
                        items[i].classList.add('is-selected');
                    };

                    if (page * itemDisplayNumbers >= items.length) { page = 0 };

                    setCount(page);

                }, 100);
            });
        });
    };
};

function toggleSelectedClass() {
    loaderProducts.style.display = 'none';

    if (items.length !== 0) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('is-selected');
        };

        for (let i = 0; i < itemDisplayNumbers; i++) {
            items[i].classList.add('is-selected');
            page = 1;
        };
    };
};


function mediaQuery() {
    var carousel = document.querySelector('.carousel');
    x = window.innerWidth;

    if (carousel) {
        if (x > 1410) {
            itemDisplayNumbers = 5;
            toggleSelectedClass();
            appendDots(5);
            functionalityDots(1);
        } else if (x <= 1410 & x > 910) {
            itemDisplayNumbers = 3;
            toggleSelectedClass();
            appendDots(3);
            functionalityDots(1);
        } else if (x <= 910 & x > 650) {
            itemDisplayNumbers = 2;
            toggleSelectedClass();
            appendDots(2);
            functionalityDots(1);
        } else if (x <= 650) {
            itemDisplayNumbers = 1;
            toggleSelectedClass();
            appendDots(1);
            functionalityDots(1);
        };
    };
};

window.addEventListener("resize", mediaQuery);
mediaQuery();

buttons.forEach(button => {
    if (!button.hasAttribute("listener")) {
        button.setAttribute("listener", true)
        button.addEventListener('click', () => {
            selected = document.querySelectorAll('.is-selected');

            selected.forEach(item => {
                item.style.animation = 'fadeOut 0.2s';
            });

            if (button.classList.contains('next')) {
                page += 1;
                if (end === true) { page = 1; end = false; };

                setTimeout(function () {
                    selected.forEach(element => {
                        element.classList.remove('is-selected');
                        element.style.animation = '';
                    });

                    for (let i = (page - 1) * itemDisplayNumbers; i < page * itemDisplayNumbers & i < items.length; i++) {
                        items[i].classList.add('is-selected');
                    };

                    if (page === Math.ceil(items.length / itemDisplayNumbers)) { end = true };
                    functionalityDots(page);

                }, 100);
            };

            if (button.classList.contains('prev')) {
                if (page >= 1) { page -= 1 };
                if (page <= 0) { page = Math.ceil(items.length / itemDisplayNumbers) };
                if (page !== Math.ceil(items.length / itemDisplayNumbers)) { end = false };

                setTimeout(function () {
                    functionalityDots(page);

                    selected.forEach(element => {
                        element.classList.remove('is-selected');
                        element.style.animation = '';
                    });

                    for (let i = (page - 1) * itemDisplayNumbers; i < page * itemDisplayNumbers & i < items.length; i++) {
                        items[i].classList.add('is-selected');
                    };

                    if (page === Math.ceil(items.length / itemDisplayNumbers)) { end = true };

                }, 100);
            };

            button.disabled = true;
            setTimeout(() => { button.disabled = false }, 100);
        });
    }
});
