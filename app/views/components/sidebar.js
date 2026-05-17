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
        { id: 'resumen', icon: 'fas fa-chart-line', label: 'Resumen' },
        { id: 'transferencias', icon: 'fas fa-exchange-alt', label: 'Transferencias'},
        { id: 'pagos', icon: 'fas fa-mobile-alt', label: 'Pagos Móvil' },
        { id: 'movimientos', icon: 'fas fa-list-ul', label: 'Historial' },
        { id: 'perfil', icon: 'fas fa-user', label: 'Mi Perfil' },
    ];

    const navHTML = navItems.map(item => {
        const activeClass = item.id === activePage ? ' active' : '';
        return `<a href="#" data-section="${item.id}" class="nav-item${activeClass}">
                    <i class="${item.icon}"></i> ${item.label}
                </a>`;
    }).join('\n');   

    const mobilePillHTML = navItems.map(item => {
        const activeClass = item.id === activePage ? ' active' : '';
        return `<a href="#" data-section="${item.id}" class="pill-icon${activeClass}">
                    <i class="${item.icon}"></i>
                    <span class="pill-label">${item.label}</span>
                </a>`;
    }).join('\n');

    const container = document.getElementById(containerId);
    container.innerHTML = `
        <!-- Desktop Sidebar -->
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
                    <label class="theme-switch" for="checkbox-desktop">
                        <input type="checkbox" id="checkbox-desktop" class="theme-checkbox" />
                        <div class="slider round">
                            <i class="fas fa-sun"></i>
                            <i class="fas fa-moon"></i>
                        </div>
                    </label>
                </div>
                <button class="btn-logout" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</button>
            </div>
        </aside>

        <!-- Floating Mobile Menu -->
        <div class="mobile-pill-toggle" id="mobilePillToggle">
            <i class="fas fa-bars"></i>
        </div>
        <div class="mobile-pill-menu" id="mobilePillMenu">
            ${mobilePillHTML}
            <!-- Theme Toggle for Mobile -->
            <label class="theme-switch" for="checkbox-mobile" style="margin: 10px 0;">
                <input type="checkbox" id="checkbox-mobile" class="theme-checkbox" />
                <div class="slider round">
                    <i class="fas fa-sun"></i>
                    <i class="fas fa-moon"></i>
                </div>
            </label>
            <a href="#" id="mobileLogoutBtn" class="pill-icon" style="color: var(--danger-color);">
                <i class="fas fa-sign-out-alt"></i>
                <span class="pill-label">Salir</span>
            </a>
        </div>
    `;

    // Toggle menu
    const pillToggle = document.getElementById('mobilePillToggle');
    const pillMenu = document.getElementById('mobilePillMenu');
    if(pillToggle && pillMenu) {
        pillToggle.addEventListener('click', () => {
            pillMenu.classList.toggle('active');
            pillToggle.classList.toggle('active');
            const icon = pillToggle.querySelector('i');
            if(pillMenu.classList.contains('active')){
                icon.className = 'fas fa-times';
            }else{
                icon.className = 'fas fa-bars';
            }
        });
    }

    const links = container.querySelectorAll('.nav-item, .pill-icon[data-section]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            
            // Cerrar menú móvil si está abierto
            const pillMenu = document.getElementById('mobilePillMenu');
            const pillToggle = document.getElementById('mobilePillToggle');
            if(pillMenu && pillMenu.classList.contains('active')) {
                pillMenu.classList.remove('active');
                pillToggle.classList.remove('active');
                pillToggle.querySelector('i').className = 'fas fa-bars';
            }

            if (section === 'resumen') {
                navigateTo('dashboard');
            } else if (section === 'transferencias') {
                navigateTo('operaciones');
            } else if (section === 'pagos') {
                navigateTo('pagos');
            } else if (section === 'movimientos') {
                navigateTo('historial');
            } else {
                alert('Sección en construcción');
            }
        });
    });

    // Delegamos logouts si existen (como el móvil y desktop)
    const logouts = container.querySelectorAll('.btn-logout, #mobileLogoutBtn');
    logouts.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('login');
        });
    });
}

function handleNavigation(sectionId) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    if (sectionId === 'resumen') {
        // 1. Inyectamos los contenedores vacíos
        mainContent.innerHTML = renderResumenModulo();
        
        // 2. Ejecutamos las funciones de tus componentes para llenarlos
        // (Asumiendo que así se llaman según tu estructura de carpetas)
        if (typeof renderTopHeader === 'function') renderTopHeader('top-header-container');
        if (typeof renderBalanceCard === 'function') renderBalanceCard('balance-card-container');
        if (typeof renderTransactionList === 'function') {
             // El PDF pide solo las últimas 3 en el resumen [cite: 103, 128]
             renderTransactionList('recent-transactions-container', { limit: 3 });
        }
    } else if (sectionId === 'transferencias') {
        mainContent.innerHTML = '<h2>Sección de Transferencias</h2>'; 
        // Aquí luego inyectaremos tu formulario
    }
    // ... resto de secciones
}

function renderResumenModulo() {
    return `
        <div id="top-header-container"></div>
        <div id="balance-card-container"></div>
        <div class="quick-actions-container" id="quick-actions-container"></div>
        <div id="recent-transactions-container"></div>
    `;
}
