function initDashboard() {
    const balanceEl = document.getElementById('userBalance');
    const toggleBtn = document.getElementById('toggleVisible');
    const eyeIcon = document.getElementById('eyeIcon');
    
    // Si ya existe el evento, hay que tener cuidado con no agregarlo múltiples veces.
    // Una forma simple es reemplazar el botón con un clon para limpiar eventos previos.
    if(toggleBtn) {
        const newToggleBtn = toggleBtn.cloneNode(true);
        toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);
        
        let isVisible = true;
        const realBalance = formatearMonto(AppState.userBalance);

        newToggleBtn.addEventListener('click', () => {
            isVisible = !isVisible;
            if (isVisible) {
                balanceEl.textContent = realBalance;
                newToggleBtn.querySelector('i').className = 'fas fa-eye';
            } else {
                balanceEl.textContent = "********";
                newToggleBtn.querySelector('i').className = 'fas fa-eye-slash';
            }
        });

        // Inicializar balance al cargar la vista
        if (balanceEl) balanceEl.textContent = realBalance;
    }

    // Mostrar fecha actual
    const currentDateEl = document.getElementById('currentDate');
    if (currentDateEl) {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        currentDateEl.textContent = new Date().toLocaleDateString('es-ES', options);
    }

    // Renderizar transacciones dinámicas desde el estado global
    const recentTransactions = AppState.userTransactions.slice(0, 3);
    
    renderTransactionList('transactions-container', {
        title: 'Últimos Movimientos',
        transactions: recentTransactions
    });
}