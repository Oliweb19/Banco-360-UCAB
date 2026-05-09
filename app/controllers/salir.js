const salida = document.getElementById('logoutBtn');

if (salida) {
    salida.addEventListener('click', () => {
        window.location.href = "logout.html";
    });
}