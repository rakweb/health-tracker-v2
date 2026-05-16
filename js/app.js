// js/app.js
console.log("🚀 app.js loaded");

const UI = {
    init() {
        console.log("✅ UI initialized - Binding buttons");

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
        const modal = document.getElementById('entryModal');
        if (modal) modal.style.display = 'flex';
    },

    closeEntry() {
        const modal = document.getElementById('entryModal');
        if (modal) modal.style.display = 'none';
    },

    async refreshTable() {
        try {
            const entries = await DB.getAllEntries();
            console.log(`📋 Refreshing table with ${entries.length} entries`);

            const tbody = document.getElementById('tableBody');
            if (tbody) {
                tbody.innerHTML = '';
                entries.forEach(entry => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${entry.date || ''}</td>
                        <td>${entry.glucose || '-'}</td>
                        <td>${new Date(entry.timestamp).toLocaleTimeString()}</td>
                    `;
                    tbody.appendChild(row);
                });
            }
        } catch (err) {
            console.error("Failed to refresh table", err);
        }
    }
};

window.UI = UI;
window.addEventListener('load', () => UI.init());
