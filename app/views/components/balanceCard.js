/**
 * Componente: BalanceCard
 * Renderiza la tarjeta de saldo con toggle de visibilidad.
 * 
 * @param {string} containerId - ID del elemento contenedor
 * @param {Object} options
 * @param {string} options.balance - Saldo a mostrar (ej: "1.450,00")
 * @param {string} options.currency - Moneda (ej: "Bs.")
 */
function renderBalanceCard(containerId, options = {}) {
    const { balance = '0,00', currency = 'Bs.' } = options;

    const container = document.getElementById(containerId);
    container.innerHTML = `
        <section class="card balance-card">
            <div class="card-info">
                <h3>Saldo Disponible</h3>
                <div class="amount-container">
                    <span class="currency">${currency}</span>
                    <span id="userBalance" class="balance-amount">${balance}</span>
                </div>
            </div>
            <button id="toggleVisible" class="btn-visibility">
                <i class="fas fa-eye" id="eyeIcon"></i>
            </button>
        </section>
    `;

    // Lógica de toggle de visibilidad
    const balanceEl = document.getElementById('userBalance');
    const toggleBtn = document.getElementById('toggleVisible');
    const eyeIcon = document.getElementById('eyeIcon');
    let isVisible = true;

    toggleBtn.addEventListener('click', () => {
        isVisible = !isVisible;
        if (isVisible) {
            balanceEl.textContent = balance;
            eyeIcon.className = 'fas fa-eye';
        } else {
            balanceEl.textContent = "********";
            eyeIcon.className = 'fas fa-eye-slash';
        }
    });
}
