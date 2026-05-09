const formulario = document.getElementById('inicioSesionForm');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura de datos del formulario
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('password').value;

    // Mostrar spinner de carga (función del componente)
    showLoadingSpinner();

    // Simular validación de 2 segundos
    setTimeout(() => {
        if (usuario === "oliver" && clave === "123456") {
            const usuarioData = { nombre: "Oliver", cuenta: "01105112121212121212" };
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioData));

            // Inicializar saldo si no existe
            if (!localStorage.getItem('userBalance')) {
                localStorage.setItem('userBalance', '1450.00');
            }

            // Inicializar transacciones si no existen
            if (!localStorage.getItem('userTransactions')) {
                const defaultTrans = [
                    { id: 1, title: 'Transferencia Recibida', date: new Date().toLocaleDateString('es-ES') + ', 09:30 AM', amount: '+500,00', amountType: 'positive', icon: 'fas fa-arrow-down', iconType: 'plus', type: 'entrada' },
                    { id: 2, title: 'NOSSO CAFE', date: 'Ayer, 10:18 AM', amount: '-10,00', amountType: 'negative', icon: 'fas fa-shopping-cart', iconType: 'minus', type: 'salida' },
                    { id: 3, title: 'Adidas Outlet', date: 'Ayer, 06:30 PM', amount: '-150,00', amountType: 'negative', icon: 'fas fa-shopping-cart', iconType: 'minus', type: 'salida' }
                ];
                localStorage.setItem('userTransactions', JSON.stringify(defaultTrans));
            }

            window.location.href = "app/views/dashboard.html";
        } else {
            // Ocultar spinner y mostrar modal de error (funciones de componentes)
            hideLoadingSpinner();
            showErrorModal();
        }
    }, 2000);
});
