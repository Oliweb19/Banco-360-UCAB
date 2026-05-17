function initRecibo() {
    const receiptData = AppState.lastReceipt;
    
    // Si no hay recibo, volver al dashboard
    if (!receiptData) {
        navigateTo('dashboard');
        return;
    }

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

    // Mostrar el contenedor
    document.getElementById('view-recibo').style.display = 'block';

    // Nota: El botón de aceptar ahora tiene onclick="navigateTo('dashboard')" en el HTML
}
