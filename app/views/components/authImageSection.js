/**
 * Componente: AuthImageSection
 * Renderiza la sección de imagen de fondo para páginas de autenticación.
 * 
 * @param {string} containerId - ID del elemento contenedor
 * @param {Object} options
 * @param {string} options.imageSrc - Ruta de la imagen de fondo
 * @param {string} options.altText - Texto alternativo de la imagen
 */
function renderAuthImageSection(containerId, options = {}) {
    const { 
        imageSrc = 'public/img/login.png',
        altText = 'Login Background'
    } = options;

    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="login-image-section">
            <img src="${imageSrc}" alt="${altText}" class="bg-img">
            <div class="overlay"></div>
        </div>
    `;
}
