document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modalOverlay = document.getElementById('transaction-modal');
    const closeModal = document.getElementById('close-modal');

    // Cargar transacciones
    let transactions = JSON.parse(localStorage.getItem('userTransactions')) || [];

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
        const cardHeader = document.querySelector('.transactions-card .card-header');
        if (cardHeader) cardHeader.style.display = 'none';

        // Agregar listeners para el modal
        const items = document.querySelectorAll('.t-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.getAttribute('data-id'));
                const t = transactions.find(trans => trans.id === id);
                if (t) openModal(t);
            });
        });
    };

    // Inicializar sin filtro
    renderFilteredList('todos');

    // Manejar clics en filtros
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
        
        modalOverlay.classList.add('active');
    };

    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
});
