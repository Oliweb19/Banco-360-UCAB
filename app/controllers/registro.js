// Función para hashear la clave con SHA-256 (API nativa del navegador)
async function hashClave(clave) {
    const encoder = new TextEncoder();
    const data = encoder.encode(clave);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Cargar usuarios iniciales del JSON si localStorage está vacío
async function cargarUsuariosIniciales() {
    if (!localStorage.getItem('usuarios')) {
        try {
            const respuesta = await fetch('../models/personaNatural.json');
            const datosIniciales = await respuesta.json();
            // Si el JSON es un array lo usamos directo, si es un objeto lo envolvemos
            const usuarios = Array.isArray(datosIniciales) ? datosIniciales : [datosIniciales];
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        } catch (error) {
            // Si no se puede leer el JSON, iniciar con array vacío
            localStorage.setItem('usuarios', JSON.stringify([]));
        }
    }
}

// Cargar datos iniciales al abrir la página
cargarUsuariosIniciales();

const formulario = document.getElementById('registroForm');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hashear la contraseña
    const claveHasheada = await hashClave(document.getElementById('password').value);

    // Captura de datos del formulario
    const nuevoUsuario = {
        id: Date.now(),
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        cedula: document.getElementById('cedula').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value,
        fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
        genero: document.getElementById('genero').value,
        cuenta: "0110" + Math.floor(Math.random() * 10000000000000000).toString().padStart(16, '0'),
        saldo: 0,
        clave: claveHasheada
    };

    // Leer usuarios existentes de localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar que la cédula no esté ya registrada
    if (usuarios.some(u => u.cedula === nuevoUsuario.cedula)) {
        alert("Esta cédula ya está registrada.");
        return;
    }

    // Agregar el nuevo usuario y guardar
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("¡Registro exitoso!");
    window.location.href = "../../index.html";
});