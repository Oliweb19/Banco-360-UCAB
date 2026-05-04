/**
 * Componente: TransactionList
 * Renderiza la lista de últimos movimientos.
 * 
 * @param {string} containerId - ID del elemento contenedor
 * @param {Object} options
 * @param {string} options.title - Título de la sección
 * @param {Array} options.transactions - Array de transacciones
 *   [{icon, iconType ('plus'|'minus'), title, date, amount, amountType ('positive'|'negative')}]
 */
function renderTransactionList(containerId, options = {}) {
    const { 
        title = 'Últimos Movimientos',
        transactions = [
            { icon: 'fas fa-arrow-down', iconType: 'plus', title: 'Transferencia Recibida', date: 'Hoy, 09:30 AM', amount: '+500,00', amountType: 'positive' },
            { icon: 'fas fa-shopping-cart', iconType: 'minus', title: 'NOSSO CAFE', date: 'Ayer, 10:18 AM', amount: '-10,00', amountType: 'negative' },
            { icon: 'fas fa-shopping-cart', iconType: 'minus', title: 'Adidas Outlet (Altamira)', date: 'Ayer, 06:30 PM', amount: '-150,00', amountType: 'negative' },
            { icon: 'fas fa-shopping-cart', iconType: 'minus', title: 'Cafeteria', date: 'hoy, 06:30 AM', amount: '-10,00', amountType: 'negative' }
        ]
    } = options;

    const transactionsHTML = transactions.map(t => `
                        <li class="t-item">
                            <div class="t-icon ${t.iconType}"><i class="${t.icon}"></i></div>
                            <div class="t-details">
                                <span class="t-title">${t.title}</span>
                                <span class="t-date">${t.date}</span>
                            </div>
                            <span class="t-amount ${t.amountType}">${t.amount}</span>
                        </li>`
    ).join('');

    const container = document.getElementById(containerId);
    container.innerHTML = `
        <section class="card transactions-card">
            <div class="card-header">
                <h2>${title}</h2>
                <a href="#" class="link-all">Ver todos</a>
            </div>
            <ul class="transaction-list">${transactionsHTML}
            </ul>
        </section>
    `;
}
