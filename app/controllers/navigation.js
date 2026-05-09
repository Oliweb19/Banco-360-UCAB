const mainContent = document.getElementById('main-content');

// Función para cargar contenido HTML
async function loadModule(moduleName) {
    try {
        if (moduleName === 'transferencias') {
            mainContent.innerHTML = renderTransferencias();
        } else if (moduleName === 'historial') {
            mainContent.innerHTML = renderHistorial();
            initHistorialLogic(); // Lógica de filtros
        }
    } catch (error) {
        console.error("Error cargando el módulo", error);
    }
}

// Botones del sidebar del dashboard principal
document.querySelector('a[href="#transferencias"]').addEventListener('click', (e) => {
    e.preventDefault();
    loadModule('transferencias');
});

document.querySelector('a[href="#historial"]').addEventListener('click', (e) => {
    e.preventDefault();
    loadModule('historial');
});