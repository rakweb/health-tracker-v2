// js/app.js
console.log("🚀 app.js loaded - Single Binding");

const UI = {
    init() {
        console.log("✅ UI.init() running");

        // Remove ALL previous listeners to prevent duplicates
        this.clearAllListeners();
        this.bindButtons();
        this.refreshTable();
    },

    clearAllListeners() {
        const saveBtn = document.getElementById('btnSaveEntry');
        if (saveBtn) {
            const newBtn = saveBtn.cloneNode(true);
            saveBtn.parentNode.replaceChild(newBtn, saveBtn);
        }
    },

    bindButtons() {
        document.getElementById('btnAdd')?.addEventListener('click', () => this.showEntryModal());
        document.getElementById('btnSaveEntry')?.addEventListener('click', () => Action.addEntry());
        document.getElementById('btnSaveCSV')?.addEventListener('click', () => Action.exportCSV());
        document.getElementById('btnSavePDF')?.addEventListener('click', () => Action.exportPDF());
        document.getElementById('btnRefresh')?.addEventListener('click', () => this.refreshTable());
    },

    showEntryModal() {
        document.getElementById('entryModal').style.display = 'flex';
    },

    closeEntry() {
        document.getElementById('entryModal').style.display = 'none';
    },

    async refreshTable() {
        const entries = await DB.getAllEntries();
        const tbody = document.getElementById('tableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        entries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.date || '—'}</td>
                <td>${entry.glucose !== null ? entry.glucose : '—'}</td>
                <td>${new Date(entry.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</td>
            `;
            tbody.appendChild(row);
        });
    }
};

window.UI = UI;

// Run only once
window.addEventListener('load', () => UI.init());
