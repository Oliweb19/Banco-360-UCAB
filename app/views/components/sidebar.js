/**
 * Componente: Sidebar
 * Renderiza la barra lateral con logo, navegación, theme switch y logout.
 * 
 * @param {string} containerId - ID del elemento contenedor
 * @param {Object} options
 * @param {string} options.activePage - Página activa: 'resumen' | 'transferencias' | 'pagos' | 'perfil'
 * @param {string} options.logoSrc - Ruta a la imagen del logo
 */
function renderSidebar(containerId, options = {}) {
    const { activePage = 'resumen', logoSrc = '../../public/img/Logo.png' } = options;

    const navItems = [
        { id: 'resumen', icon: 'fas fa-chart-line', label: 'Resumen', href: '#' },
        { id: 'transferencias', icon: 'fas fa-exchange-alt', label: 'Transferencias', href: '#' },
        { id: 'pagos', icon: 'fas fa-wallet', label: 'Pagos Movil', href: '#' },
        { id: 'perfil', icon: 'fas fa-user', label: 'Mi Perfil', href: '#' },
    ];

    const navHTML = navItems.map(item => {
        const activeClass = item.id === activePage ? ' active' : '';
        return `<a href="${item.href}" class="nav-item${activeClass}"><i class="${item.icon}"></i> ${item.label}</a>`;
    }).join('\n                ');

    const container = document.getElementById(containerId);
    container.innerHTML = `
        <aside class="sidebar">
            <div class="sidebar-header">
                <img src="${logoSrc}" alt="Banca 360" class="logo">
            </div>
            <nav class="sidebar-nav">
                ${navHTML}
            </nav>
            <div class="sidebar-footer">
                <div class="theme-switch-wrapper">
                    <span class="theme-label">Modo Oscuro</span>
                    <label class="theme-switch" for="checkbox">
                        <input type="checkbox" id="checkbox" />
                        <div class="slider round">
                            <i class="fas fa-sun"></i>
                            <i class="fas fa-moon"></i>
                        </div>
                    </label>
                </div>
                <button class="btn-logout" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</button>
            </div>
        </aside>
    `;
}
