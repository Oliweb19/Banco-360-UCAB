// Estado global de la aplicación (SPA en memoria)
const AppState = {
    currentUser: { nombre: "Oliver" },
    userBalance: 1450.00,
    userTransactions: [
        { id: 1, title: 'Transferencia Recibida', date: new Date().toLocaleDateString('es-ES') + ', 09:30 AM', amount: '+500,00', amountType: 'positive', icon: 'fas fa-arrow-down', iconType: 'plus', type: 'entrada' },
        { id: 2, title: 'NOSSO CAFE', date: 'Ayer, 10:18 AM', amount: '-10,00', amountType: 'negative', icon: 'fas fa-shopping-cart', iconType: 'minus', type: 'salida' },
        { id: 3, title: 'Adidas Outlet', date: 'Ayer, 06:30 PM', amount: '-150,00', amountType: 'negative', icon: 'fas fa-shopping-cart', iconType: 'minus', type: 'salida' }
    ],
    lastReceipt: null // Datos temporales para la pantalla de recibo
};

// Router básico
function navigateTo(viewId) {
    const mainViews = ['login', 'signup'];
    const appViews = ['dashboard', 'operaciones', 'pagos', 'historial', 'recibo'];

    if (mainViews.includes(viewId)) {
        // Mostrar vista principal, ocultar app
        document.getElementById('view-app').style.display = 'none';
        document.querySelectorAll('.main-view').forEach(v => {
            v.style.display = 'none';
            v.classList.remove('active');
        });
        
        const targetView = document.getElementById(`view-${viewId}`);
        if (targetView) {
            targetView.style.display = 'block';
            setTimeout(() => targetView.classList.add('active'), 10);
        }
    } else if (appViews.includes(viewId)) {
        // Ocultar vistas principales (login/signup)
        document.querySelectorAll('.main-view').forEach(v => {
            v.style.display = 'none';
            v.classList.remove('active');
        });
        
        // Mostrar contenedor de la app (sidebar + header)
        document.getElementById('view-app').style.display = 'block';

        // Cambiar la sub-vista
        document.querySelectorAll('.sub-view').forEach(v => {
            v.style.display = 'none';
        });
        const targetSubView = document.getElementById(`view-${viewId}`);
        if (targetSubView) {
            if (targetSubView.classList.contains('dashboard-grid') || targetSubView.classList.contains('operations-grid')) {
                targetSubView.style.display = 'grid';
            } else {
                targetSubView.style.display = 'block';
            }
        }

        // Actualizar el estado "activo" en el sidebar
        const viewToSection = {
            'dashboard': 'resumen',
            'operaciones': 'transferencias',
            'pagos': 'pagos',
            'historial': 'movimientos',
            'recibo': 'transferencias'
        };
        const sectionId = viewToSection[viewId] || viewId;

        document.querySelectorAll('.nav-item, .pill-icon').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
    }

    // Ejecutar inicializaciones específicas si la vista lo requiere
    if (viewId === 'dashboard' && typeof initDashboard === 'function') {
        initDashboard();
    } else if (viewId === 'historial' && typeof initHistorial === 'function') {
        initHistorial();
    } else if (viewId === 'recibo' && typeof initRecibo === 'function') {
        initRecibo();
    } else if ((viewId === 'operaciones' || viewId === 'pagos') && typeof initOperaciones === 'function') {
        initOperaciones();
    }
}

// Función auxiliar para formatear montos
function formatearMonto(monto) {
    return parseFloat(monto).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Inicialización de la SPA cuando carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('login');
});
