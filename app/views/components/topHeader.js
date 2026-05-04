/**
 * Componente: TopHeader
 * Renderiza el encabezado con saludo al usuario y fecha actual.
 * 
 * @param {string} containerId - ID del elemento contenedor
 * @param {Object} options
 * @param {string} options.userName - Nombre del usuario a mostrar
 */
function renderTopHeader(containerId, options = {}) {
    const { userName = 'Usuario' } = options;

    const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const currentDate = new Date().toLocaleDateString('es-ES', dateOptions);

    const container = document.getElementById(containerId);
    container.innerHTML = `
        <header class="top-header">
            <div class="user-welcome">
                <h1>Hola, <span id="userName">${userName}</span></h1>
                <p>Bienvenido de nuevo a tu banca digital.</p>
            </div>
            <div class="header-actions">
                <span class="date" id="currentDate">${currentDate}</span>
            </div>
        </header>
    `;
}
