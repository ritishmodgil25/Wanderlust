const navbar = document.querySelector('.navbar-collapse');
const body = document.querySelector('body');

navbar.addEventListener('show.bs.collapse', function() {
    navbar.style.paddingTop = "1rem";
    navbar.style.marginTop = "1.65rem";
    navbar.style.boxShadow = " inset 0 4px 5px -4px rgba(0, 0, 0, 0.1)";
});

navbar.addEventListener('hidden.bs.collapse', function() {
    body.style.paddingTop = '5rem';
    navbar.style.paddingTop = 0;
    navbar.style.marginTop = 0;
    navbar.style.boxShadow = "";
});