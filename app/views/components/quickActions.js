/**
 * Componente: QuickActions
 * Renderiza botones de acción rápida.
 * 
 * @param {string} containerId - ID del elemento contenedor
 * @param {Object} options
 * @param {Array} options.actions - Array de acciones [{icon, label}]
 */
function renderQuickActions(containerId, options = {}) {
    const { actions = [
        { icon: 'fas fa-plus', label: 'Recargar' },
        { icon: 'fas fa-paper-plane', label: 'Enviar' }
    ]} = options;

    const buttonsHTML = actions.map(action => 
        `<button class="action-btn"><i class="${action.icon}"></i> ${action.label}</button>`
    ).join('\n            ');

    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="quick-actions">
            ${buttonsHTML}
        </div>
    `;
}
