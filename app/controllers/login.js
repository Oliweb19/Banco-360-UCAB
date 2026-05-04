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
            window.location.href = "app/views/dashboard.html";
        } else {
            // Ocultar spinner y mostrar modal de error (funciones de componentes)
            hideLoadingSpinner();
            showErrorModal();
        }
    }, 2000);
});
