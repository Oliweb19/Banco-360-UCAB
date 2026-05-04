const themeSwitch = document.querySelector('#checkbox');
const body = document.body;

// Cargar preferencia guardada
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', (e) => {
    if (e.target.checked) {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
});
