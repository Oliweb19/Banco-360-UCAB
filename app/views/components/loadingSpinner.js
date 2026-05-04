/**
 * Componente: LoadingSpinner
 * Renderiza un overlay de carga con spinner animado.
 * 
 * @param {string} containerId - ID del elemento contenedor
 * @param {Object} options
 * @param {string} options.message - Mensaje a mostrar debajo del spinner
 */
function renderLoadingSpinner(containerId, options = {}) {
    const { message = 'Cargando...' } = options;

    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div id="loadingOverlay" class="loading-overlay" style="display: none;">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
}

/**
 * Muestra el spinner de carga
 */
function showLoadingSpinner() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = 'flex';
}

/**
 * Oculta el spinner de carga
 */
function hideLoadingSpinner() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = 'none';
}
