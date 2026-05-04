document.addEventListener('DOMContentLoaded', () => {
    const balanceEl = document.getElementById('userBalance');
    const toggleBtn = document.getElementById('toggleVisible');
    const eyeIcon = document.getElementById('eyeIcon');
    
    let isVisible = true;
    const realBalance = "1.450,00";

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

    // Mostrar fecha actual
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('es-ES', options);
});