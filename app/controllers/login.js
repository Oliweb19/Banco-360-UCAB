async function hashClave(clave) {
    const encoder = new TextEncoder();
    const data = encoder.encode(clave);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const formulario = document.getElementById('inicioSesionForm');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Captura de datos del formulario
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('password').value;

    // Mostrar spinner de carga (función del componente)
    showLoadingSpinner();

    const claveHasheada = await hashClave(clave);
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Simular validación de 2 segundos
    setTimeout(() => {
        const validUser = usuarios.find(u => 
            u.cedula === usuario && 
            u.clave === claveHasheada
        );

        if (validUser) {
            const usuarioData = { nombre: validUser.nombre, cuenta: validUser.cuenta };
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioData));

            // Guardar el saldo del usuario en sesión (siempre sobreescribir)
            localStorage.setItem('userBalance', validUser.saldo.toFixed(2));

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

// Lógica para mostrar/ocultar contraseña
document.querySelectorAll('.toggle-password').forEach(item => {
    item.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
});
