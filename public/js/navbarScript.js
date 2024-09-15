const navbar = document.querySelector('.navbar-collapse');
const body = document.querySelector('body');

navbar.addEventListener('show.bs.collapse', function() {
    body.style.paddingTop = "22rem";
    navbar.style.paddingTop = "2rem"
});

navbar.addEventListener('hidden.bs.collapse', function() {
    body.style.paddingTop = '5rem';
    navbar.style.paddingTop = 0;
});