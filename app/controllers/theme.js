const themeSwitches = document.querySelectorAll('.theme-checkbox');
const body = document.body;

// Variable para el tema por defecto
const defaultTheme = 'dark';

// Cargar preferencia guardada o usar la por defecto
const currentTheme = localStorage.getItem('theme') || defaultTheme;

if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeSwitches.forEach(sw => sw.checked = true);
} else {
    body.classList.remove('dark-theme');
    themeSwitches.forEach(sw => sw.checked = false);
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
