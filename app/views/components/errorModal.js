/**
 * Componente: ErrorModal
 * Renderiza un modal de error reutilizable.
 * 
 * @param {string} containerId - ID del elemento contenedor
 * @param {Object} options
 * @param {string} options.title - Título del modal
 * @param {string} options.message - Mensaje del modal
 * @param {string} options.buttonText - Texto del botón de cerrar
 */
function renderErrorModal(containerId, options = {}) {
    const { 
        title = 'Error de Acceso', 
        message = 'Usuario o contraseña incorrectos. Por favor, intente de nuevo.',
        buttonText = 'Entendido'
    } = options;

    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div id="errorModal" class="modal-overlay" style="display: none;">
            <div class="modal-content">
                <div class="modal-icon">
                    <i class="fas fa-times-circle"></i>
                </div>
                <h3>${title}</h3>
                <p>${message}</p>
                <button id="closeModal" class="modal-btn-close">${buttonText}</button>
            </div>
        </div>
    `;

    // Cerrar al hacer clic en el botón
    document.getElementById('closeModal').addEventListener('click', () => {
        hideErrorModal();
    });

    // Cerrar al hacer clic fuera del contenido
    document.getElementById('errorModal').addEventListener('click', (e) => {
        if (e.target.id === 'errorModal') {
            hideErrorModal();
        }
    });
}

/**
 * Muestra el modal de error
 */
function showErrorModal() {
    const modal = document.getElementById('errorModal');
    if (modal) modal.style.display = 'flex';
}

/**
 * Oculta el modal de error
 */
function hideErrorModal() {
    const modal = document.getElementById('errorModal');
    if (modal) modal.style.display = 'none';
}
