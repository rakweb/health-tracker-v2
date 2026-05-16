// js/app.js
const UI = {
    init() {
        console.log('🚀 Health Tracker initializing...');

        // Button listeners
        document.getElementById('btnAdd')?.addEventListener('click', () => UI.showEntryModal());
        document.getElementById('btnSaveEntry')?.addEventListener('click', () => Action.addEntry());
        document.getElementById('btnSaveCSV')?.addEventListener('click', () => Action.exportCSV());
        document.getElementById('btnSavePDF')?.addEventListener('click', () => Action.exportPDF());
        document.getElementById('btnRefresh')?.addEventListener('click', () => this.refreshTable());

        ChartManager.init();
        this.refreshTable();
    },

    showEntryModal() {
        document.getElementById('entryModal').classList.add('show');
    },

    closeEntry() {
        document.getElementById('entryModal').classList.remove('show');
    },

    async refreshTable() {
        const entries = await DB.getAllEntries();
        console.log('Loaded entries:', entries.length);
        // Render table logic here
    }
};

// Auto-init when everything is loaded
window.addEventListener('load', () => {
    UI.init();
});

window.UI = UI;
