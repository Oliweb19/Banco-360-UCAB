const formularioRegistro = document.getElementById('registroForm');

formularioRegistro.addEventListener('submit', async (e) => {
    e.preventDefault();

    // En la simulación SPA sin persistencia, solo mostramos el loading y redirigimos
    showLoadingSpinner(); // Asumiendo que loadingSpinner está disponible o lo simulamos
    
    setTimeout(() => {
        hideLoadingSpinner(); // Ocultamos spinner (si existe la función)
        alert("¡Registro exitoso! Por favor inicia sesión.");
        formularioRegistro.reset();
        navigateTo('login');
    }, 1500);
});