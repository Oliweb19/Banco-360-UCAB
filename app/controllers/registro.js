// Función para hashear la clave con SHA-256 (API nativa del navegador)
async function hashClave(clave) {
    const encoder = new TextEncoder();
    const data = encoder.encode(clave);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Cargar usuarios iniciales si localStorage está vacío
async function cargarUsuariosIniciales() {
    if (!localStorage.getItem('usuarios')) {
        const claveHasheada = await hashClave("123456");
        const defaultUser = {
            id: Date.now(),
            nombre: "Oliver",
            apellido: "Guillen",
            cedula: "31047247",
            telefono: "0412-7385522",
            direccion: "Caracas",
            fecha_nacimiento: "2005-10-19",
            genero: "M",
            cuenta: "01105112121212121212",
            saldo: 10000.00,
            clave: claveHasheada,
            preguntaSeguridad: "¿Cuál es tu color favorito?",
            respuestaSeguridad: "Azul"
        };
        localStorage.setItem('usuarios', JSON.stringify([defaultUser]));
    }
}

// Cargar datos iniciales al abrir la página
cargarUsuariosIniciales();

const formulario = document.getElementById('registroForm');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const cedula = document.getElementById('cedula').value;
    const telefono = document.getElementById('telefono').value;

    const cedulaRegex = /^\d{7,8}$/;
    const telefonoRegex = /^04(12|14|24|16|26)-\d{7}$/;

    if (!cedulaRegex.test(cedula)) {
        showErrorModal("Formato de cédula inválido. Debe ser solo números (7 u 8 dígitos).", "Error de Validación");
        return;
    }

    if (!telefonoRegex.test(telefono)) {
        showErrorModal("Formato de teléfono inválido. Debe ser 0412-0000000.", "Error de Validación");
        return;
    }

    if (password.length < 6) {
        showErrorModal("La contraseña debe tener al menos 6 caracteres.", "Error de Validación");
        return;
    }

    const fechaNacimiento = new Date(document.getElementById('fecha_nacimiento').value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    if (edad < 18) {
        showErrorModal("Debes ser mayor de 18 años para poder crear una cuenta.", "Error de Validación");
        return;
    }

    if (password !== confirmPassword) {
        showErrorModal("Las contraseñas no coinciden.", "Error de Validación");
        return;
    }

    // Hashear la contraseña
    const claveHasheada = await hashClave(password);

    // Captura de datos del formulario
    const nuevoUsuario = {
        id: Date.now(),
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        cedula: cedula,
        telefono: telefono,
        direccion: document.getElementById('direccion').value,
        fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
        genero: document.getElementById('genero').value,
        cuenta: "0110" + Math.floor(Math.random() * 10000000000000000).toString().padStart(16, '0'),
        saldo: 10000.00,
        clave: claveHasheada,
        preguntaSeguridad: document.getElementById('pregunta').value,
        respuestaSeguridad: document.getElementById('respuesta').value
    };

    // Leer usuarios existentes de localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar que la cédula no esté ya registrada
    if (usuarios.some(u => u.cedula === nuevoUsuario.cedula)) {
        showErrorModal("Esta cédula ya está registrada.", "Error de Registro");
        return;
    }

    // Agregar el nuevo usuario y guardar
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    showErrorModal("¡Registro exitoso!", "Éxito", true);

    // Esperar un poco antes de redirigir para que vean el modal
    setTimeout(() => {
        window.location.href = "../../index.html";
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