document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
        const headerHome = document.querySelector('.header-home');

        if (headerHome !== null) {
            const header = document.querySelector("#header");
            header.classList.toggle('header-scrolled', window.scrollY > 0);
        }
    })
});

document.addEventListener('click', e => {
    const isDropdown = e.target.closest('[data-dropdown]')
    if (isDropdown) return
    const dropdown = document.querySelector('#dropdown');
    if(dropdown) dropdown.classList.remove('dropdown-show');
    
})
