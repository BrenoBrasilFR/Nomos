clearInterval(interval);
var releaseItems = document.querySelectorAll('.release-item');
var buttonsRelease = document.querySelectorAll('.release-button');
/* var loaderRelease = document.querySelector('.loaderRelease') */
var pageRelease = 0;
var onLoad = true;

var interval = setInterval(() => {releaseNext()}, 4000);

function toggleButtonColor() {

    if (releaseItems.length > 2) {
        if (releaseItems[2].classList.contains('release-selected') | releaseItems[1].classList.contains('release-selected')) {
            buttonsRelease.forEach((button) => { button.classList.add('release-button-2') }) 
        } else {
            buttonsRelease.forEach((button) => { button.classList.remove('release-button-2') })
        }; 
    }
}

function releaseNext() {
    pageRelease += 1;
    if (pageRelease === releaseItems.length + 1) { pageRelease = 1; }

    selectedRelease = document.querySelectorAll('.release-selected');

    selectedRelease.forEach(item => {
        item.style.animation='fadeOut 0.5s';
    });

    if (onLoad) {
        releaseItems.forEach(element => {
            element.classList.remove('release-selected');
            element.style.animation='';
        });

        /* loaderRelease.style.display = 'none'; */
        releaseItems[pageRelease - 1].classList.add('release-selected');

        toggleButtonColor();
        onLoad = false;
        return
    }

    setTimeout(function() {

        releaseItems.forEach(element => {
            element.classList.remove('release-selected');
            element.style.animation='';
        });

        /* loaderRelease.style.display = 'none'; */
        releaseItems[pageRelease - 1].classList.add('release-selected');

        toggleButtonColor();
     
    }, 400);
};

releaseNext();

function releasePrevious() {
    pageRelease -= 1;
    if (pageRelease === 0) { pageRelease = releaseItems.length }

    selectedRelease = document.querySelectorAll('.release-selected');

    selectedRelease.forEach(item => {
        item.style.animation='fadeOut 0.5s';
    });

    setTimeout(function() {

        releaseItems.forEach(element => {
            element.classList.remove('release-selected');
            element.style.animation='';
        });

        releaseItems[pageRelease - 1].classList.add('release-selected');

        toggleButtonColor();
        
    }, 400);
};

buttonsRelease.forEach(button => {
    button.addEventListener('click', () => {
        if(button.classList.contains('next')) {
            releaseNext();
            clearInterval(interval);
        };

        if(button.classList.contains('prev')) {
            releasePrevious();
            clearInterval(interval);
        };
    });
});
