const themeSwitches = document.querySelectorAll('.theme-checkbox');
const body = document.body;

// Ya no usamos localStorage. El tema por defecto es claro al cargar la SPA.
// Como la SPA no recarga, el tema elegido se mantendrá durante toda la visita.

themeSwitches.forEach(themeSwitch => {
    themeSwitch.addEventListener('change', (e) => {
        const isDark = e.target.checked;
        if (isDark) {
            body.classList.add('dark-theme');
            themeSwitches.forEach(sw => sw.checked = true);
        } else {
            body.classList.remove('dark-theme');
            themeSwitches.forEach(sw => sw.checked = false);
        }
    });
});
