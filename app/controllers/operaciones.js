let isOperacionesInitialized = false;

function initOperaciones() {
    if (isOperacionesInitialized) return;

    const formTransferencia = document.getElementById('form-transferencia');
    const formPagoMovil = document.getElementById('form-pago-movil');
    const formDeposito = document.getElementById('form-deposito');
    const alertContainer = document.getElementById('alert-container');

    const showAlert = (message, type = 'success') => {
        alertContainer.innerHTML = `<div class="alert ${type}">${message}</div>`;
        const alertEl = alertContainer.querySelector('.alert');
        alertEl.style.display = 'block';
        setTimeout(() => {
            alertEl.style.display = 'none';
        }, 5000);
    };

    const addTransaction = (title, amountStr, amountType, icon, iconType, type) => {
        const transactions = AppState.userTransactions;
        const maxId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) : 0;
        
        const newTransaction = {
            id: maxId + 1,
            title: title,
            date: new Date().toLocaleString('es-ES', { 
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: true 
            }),
            amount: amountStr,
            amountType: amountType,
            icon: icon,
            iconType: iconType,
            type: type
        };

        transactions.unshift(newTransaction);
    };

    // --- Transferencia Bancaria ---
    if (formTransferencia) {
        formTransferencia.addEventListener('submit', (e) => {
            e.preventDefault();
            const cuenta = document.getElementById('t-cuenta').value;
            const monto = parseFloat(document.getElementById('t-monto').value);
            const concepto = document.getElementById('t-concepto').value || `Transferencia a ${cuenta.substring(0,4)}...`;

            if (monto <= 0) {
                showAlert('El monto debe ser mayor a 0.', 'error');
                return;
            }

            if (AppState.userBalance >= monto) {
                const modalDetails = [
                    { label: 'Operación', value: 'Transferencia Bancaria' },
                    { label: 'Cuenta Destino', value: cuenta },
                    { label: 'Monto', value: `Bs. ${formatearMonto(monto)}` }
                ];

                showConfirmModal(modalDetails, () => {
                    showLoadingSpinner();
                    setTimeout(() => {
                        AppState.userBalance -= monto;
                        addTransaction(concepto, `-${formatearMonto(monto)}`, 'negative', 'fas fa-exchange-alt', 'minus', 'salida');
                        
                        const refNumber = Math.floor(10000000 + Math.random() * 90000000);
                        const dateNow = new Date().toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });

                        AppState.lastReceipt = {
                            operacion: 'Transferencia Bancaria exitosa',
                            referencia: refNumber,
                            fecha: dateNow,
                            emisor: AppState.currentUser.nombre,
                            bancoEmisor: 'Banca 360',
                            destino: cuenta,
                            bancoReceptor: 'Banco Destino',
                            monto: `Bs. ${formatearMonto(monto)}`,
                            concepto: concepto
                        };
                        
                        hideLoadingSpinner();
                        formTransferencia.reset();
                        navigateTo('recibo');
                    }, 2000);
                });
            } else {
                showAlert('Fondos insuficientes para realizar esta transferencia.', 'error');
            }
        });
    }

    // --- Pago Móvil ---
    if (formPagoMovil) {
        formPagoMovil.addEventListener('submit', (e) => {
            e.preventDefault();
            const banco = document.getElementById('p-banco').value;
            const telefono = document.getElementById('p-telefono').value;
            const monto = parseFloat(document.getElementById('p-monto').value);
            const concepto = `Pago Móvil al ${telefono}`;

            if (monto <= 0) {
                showAlert('El monto debe ser mayor a 0.', 'error');
                return;
            }

            if (AppState.userBalance >= monto) {
                const modalDetails = [
                    { label: 'Operación', value: 'Pago Móvil' },
                    { label: 'Teléfono Destino', value: telefono },
                    { label: 'Monto', value: `Bs. ${formatearMonto(monto)}` }
                ];
                
                showConfirmModal(modalDetails, () => {
                    showLoadingSpinner();
                    setTimeout(() => {
                        AppState.userBalance -= monto;
                        addTransaction(concepto, `-${formatearMonto(monto)}`, 'negative', 'fas fa-mobile-alt', 'minus', 'salida');
                        
                        const refNumber = Math.floor(10000000 + Math.random() * 90000000);
                        const dateNow = new Date().toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
                        
                        const bancoSelect = document.getElementById('p-banco');
                        const bancoNombre = bancoSelect.options[bancoSelect.selectedIndex].text;

                        AppState.lastReceipt = {
                            operacion: 'Pago Móvil exitoso',
                            referencia: refNumber,
                            fecha: dateNow,
                            emisor: AppState.currentUser.nombre,
                            bancoEmisor: 'Banca 360',
                            destino: telefono,
                            bancoReceptor: bancoNombre,
                            monto: `Bs. ${formatearMonto(monto)}`,
                            concepto: concepto
                        };
                        
                        hideLoadingSpinner();
                        formPagoMovil.reset();
                        navigateTo('recibo');
                    }, 2000);
                });
            } else {
                showAlert('Fondos insuficientes para realizar el pago móvil.', 'error');
            }
        });
    }

    // --- Depósito (Simulador) ---
    if (formDeposito) {
        formDeposito.addEventListener('submit', (e) => {
            e.preventDefault();
            const origen = document.getElementById('d-origen').value;
            const monto = parseFloat(document.getElementById('d-monto').value);
            
            if (monto <= 0) {
                showAlert('El monto debe ser mayor a 0.', 'error');
                return;
            }

            AppState.userBalance += monto;
            
            let concepto = 'Depósito';
            if(origen === 'Taquilla') concepto = 'Depósito por Taquilla';
            else if(origen === 'Cajero') concepto = 'Depósito por Cajero Automático';
            else if(origen === 'Nomina') concepto = 'Abono de Nómina';

            addTransaction(concepto, `+${formatearMonto(monto)}`, 'positive', 'fas fa-arrow-down', 'plus', 'entrada');
            showAlert(`Depósito de Bs. ${formatearMonto(monto)} ingresado con éxito.`);
            formDeposito.reset();
        });
    }

    isOperacionesInitialized = true;
}