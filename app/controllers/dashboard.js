document.addEventListener('DOMContentLoaded', () => {
    const balanceEl = document.getElementById('userBalance');
    const toggleBtn = document.getElementById('toggleVisible');
    const eyeIcon = document.getElementById('eyeIcon');
    
    let isVisible = true;
    
    // Obtener saldo de localStorage
    const savedBalance = localStorage.getItem('userBalance') || "0.00";
    // Formatear saldo a formato local (ej: 1.450,00)
    const realBalance = parseFloat(savedBalance).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    toggleBtn.addEventListener('click', () => {
        isVisible = !isVisible;
        if (isVisible) {
            balanceEl.textContent = realBalance;
            eyeIcon.className = 'fas fa-eye';
        } else {
            balanceEl.textContent = "********";
            eyeIcon.className = 'fas fa-eye-slash';
        }
    });

    // Inicializar balance al cargar (asumiendo que el componente arranca con 0,00)
    balanceEl.textContent = realBalance;

    // Mostrar fecha actual
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('es-ES', options);

    // Renderizar transacciones dinámicas
    const savedTransactions = JSON.parse(localStorage.getItem('userTransactions')) || [];
    // Tomar solo las 3 más recientes
    const recentTransactions = savedTransactions.slice(0, 3);
    
    renderTransactionList('transactions-container', {
        title: 'Últimos Movimientos',
        transactions: recentTransactions
    });
});