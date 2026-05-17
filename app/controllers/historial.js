let isHistorialInitialized = false;

function initHistorial() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modalOverlay = document.getElementById('transaction-modal');
    const closeModal = document.getElementById('close-modal');

    // Cargar transacciones globales
    let transactions = AppState.userTransactions;

    // Función para renderizar lista con filtro
    const renderFilteredList = (filterType) => {
        let filtered = transactions;
        if (filterType !== 'todos') {
            filtered = transactions.filter(t => t.type === filterType);
        }

        renderTransactionList('historial-list-container', {
            title: '',
            hideLinkAll: true,
            transactions: filtered
        });

        // Ocultar título redundante del card-header ya que tenemos h2 arriba
        const cardHeader = document.querySelector('#view-historial .transactions-card .card-header');
        if (cardHeader) cardHeader.style.display = 'none';

        // Agregar listeners para el modal
        const items = document.querySelectorAll('#historial-list-container .t-item');
        items.forEach(item => {
            // Remover event listeners anteriores clonando
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
            
            newItem.addEventListener('click', () => {
                const id = parseInt(newItem.getAttribute('data-id'));
                const t = transactions.find(trans => trans.id === id);
                if (t) openModal(t);
            });
        });
    };

    // Inicializar sin filtro
    renderFilteredList('todos');

    // Manejar clics en filtros (asegurarnos de añadir eventos solo una vez)
    if (!isHistorialInitialized) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const filter = e.target.getAttribute('data-filter');
                renderFilteredList(filter);
            });
        });

        // Lógica del modal
        const openModal = (transaction) => {
            document.getElementById('modal-icon').className = `modal-icon ${transaction.icon}`;
            
            const amountEl = document.getElementById('modal-amount');
            amountEl.textContent = transaction.amount;
            amountEl.className = `modal-amount ${transaction.amountType}`;
            
            document.getElementById('modal-title').textContent = transaction.title;
            document.getElementById('modal-date').textContent = transaction.date;
            document.getElementById('modal-type').textContent = transaction.type === 'entrada' ? 'Abono' : 'Cargo';
            document.getElementById('modal-ref').textContent = Math.floor(Math.random() * 1000000000); // Ref simulada
            
            modalOverlay.style.display = 'flex';
            setTimeout(() => modalOverlay.classList.add('active'), 10);
        };

        // Guardamos openModal globalmente si es necesario, o lo metemos en el listener
        window.openModal = openModal;

        closeModal.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            setTimeout(() => modalOverlay.style.display = 'none', 300);
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                setTimeout(() => modalOverlay.style.display = 'none', 300);
            }
        });
        
        isHistorialInitialized = true;
    } else {
        // Si ya está inicializado, los botones conservarán sus listeners
        // Pero debemos asegurarnos de que la lista activa corresponde al filtro activo
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        if(activeFilterBtn) {
            renderFilteredList(activeFilterBtn.getAttribute('data-filter'));
        }
    }
}
