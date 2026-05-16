// js/app.js
console.log("🚀 app.js loaded");

const UI = {
    init() {
        console.log("✅ UI initialized");
        this.bindButtons();
        this.refreshTable();
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
        const modal = document.getElementById('entryModal');
        if (modal) modal.style.display = 'none';
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

        console.log(`📋 Table refreshed with ${entries.length} entries`);
    }
};

window.UI = UI;
window.addEventListener('load', () => UI.init());
