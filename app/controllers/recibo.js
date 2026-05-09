document.addEventListener('DOMContentLoaded', () => {
    const receiptDataStr = localStorage.getItem('lastReceipt');
    
    // Si no hay recibo, redirigir al dashboard por seguridad
    if (!receiptDataStr) {
        window.location.href = '../views/dashboard.html';
        return;
    }

    const receiptData = JSON.parse(receiptDataStr);

    // Poblar los datos en la vista
    document.getElementById('r-operacion').textContent = receiptData.operacion || '¡Operación Exitosa!';
    document.getElementById('r-referencia').textContent = receiptData.referencia;
    document.getElementById('r-fecha').textContent = receiptData.fecha;
    document.getElementById('r-emisor').textContent = receiptData.emisor;
    document.getElementById('r-bancoEmisor').textContent = receiptData.bancoEmisor;
    document.getElementById('r-destino').textContent = receiptData.destino;
    document.getElementById('r-bancoReceptor').textContent = receiptData.bancoReceptor;
    document.getElementById('r-monto').textContent = receiptData.monto;
    document.getElementById('r-concepto').textContent = receiptData.concepto || 'Sin concepto';

    // Mostrar el contenedor (oculto por defecto para evitar flash si redirige)
    document.getElementById('receiptContainer').style.display = 'flex';

    // Acción del botón aceptar
    document.getElementById('btn-aceptar').addEventListener('click', () => {
        // Opcional: Limpiar el recibo para que no se pueda volver atrás a verlo, o mantenerlo
        localStorage.removeItem('lastReceipt');
        window.location.href = '../views/dashboard.html';
    });
});
