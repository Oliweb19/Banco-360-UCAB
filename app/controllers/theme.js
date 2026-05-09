const themeSwitches = document.querySelectorAll('.theme-checkbox');
const body = document.body;

// Cargar preferencia guardada
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeSwitches.forEach(sw => sw.checked = true);
}

themeSwitches.forEach(themeSwitch => {
    themeSwitch.addEventListener('change', (e) => {
        const isDark = e.target.checked;
        if (isDark) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            themeSwitches.forEach(sw => sw.checked = true);
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            themeSwitches.forEach(sw => sw.checked = false);
        }
    });
});
