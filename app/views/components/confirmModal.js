/**
 * Componente: ConfirmModal
 * Renderiza y controla un modal de confirmación dinámica.
 * 
 * @param {string} containerId - ID del elemento contenedor
 */
function renderConfirmModal(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div id="confirmOverlay" class="confirm-overlay">
            <div class="confirm-modal">
                <h2>Confirme su Operación</h2>
                <div id="confirmDetailsContainer" class="confirm-details">
                    <!-- Dinámico -->
                </div>
                <div class="confirm-actions">
                    <button id="btnConfirmCancel" class="btn-cancel">Cancelar</button>
                    <button id="btnConfirmAccept" class="btn-confirm">Confirmar</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Muestra el modal con los datos específicos y ejecuta un callback si se aprueba.
 * 
 * @param {Array} details - Arreglo de objetos { label: 'Monto', value: '100,00 Bs' }
 * @param {Function} onConfirm - Función a ejecutar si se hace clic en confirmar
 */
function showConfirmModal(details, onConfirm) {
    const overlay = document.getElementById('confirmOverlay');
    const detailsContainer = document.getElementById('confirmDetailsContainer');
    const btnCancel = document.getElementById('btnConfirmCancel');
    const btnAccept = document.getElementById('btnConfirmAccept');

    // Renderizar detalles
    detailsContainer.innerHTML = details.map(d => `<p><span>${d.label}:</span> <span>${d.value}</span></p>`).join('');

    // Limpiar eventos previos clonando los botones (técnica simple para remover event listeners)
    const newBtnCancel = btnCancel.cloneNode(true);
    const newBtnAccept = btnAccept.cloneNode(true);
    btnCancel.parentNode.replaceChild(newBtnCancel, btnCancel);
    btnAccept.parentNode.replaceChild(newBtnAccept, btnAccept);

    newBtnCancel.addEventListener('click', () => {
        overlay.classList.remove('show');
    });

    newBtnAccept.addEventListener('click', () => {
        overlay.classList.remove('show');
        if(onConfirm) onConfirm();
    });

    // Mostrar
    overlay.classList.add('show');
}
