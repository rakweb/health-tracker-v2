// js/app.js
const UI = {
    init() {
        console.log('🚀 Health Tracker v' + CONFIG.VERSION + ' initialized');

        // Main Buttons
        document.getElementById('btnAdd')?.addEventListener('click', () => UI.showEntryModal());
        document.getElementById('btnSaveEntry')?.addEventListener('click', () => Action.addEntry());
        document.getElementById('btnSaveCSV')?.addEventListener('click', () => Action.exportCSV());
        document.getElementById('btnSavePDF')?.addEventListener('click', () => Action.exportPDF());
        document.getElementById('btnRefresh')?.addEventListener('click', () => UI.refreshTable());
        document.getElementById('btnFields')?.addEventListener('click', () => UI.showFieldsModal());
        document.getElementById('btnThresholds')?.addEventListener('click', () => UI.showThresholdsModal());
        document.getElementById('btnOptions')?.addEventListener('click', () => UI.showOptionsModal());

        // Initialize modules
        ChartManager.init();
        UI.refreshTable();
    },

    showEntryModal() {
        document.getElementById('entryModal').classList.add('show');
    },

    closeEntry() {
        document.getElementById('entryModal').classList.remove('show');
    },

    showFieldsModal() {
        document.getElementById('fieldsModal').classList.add('show');
    },

    showThresholdsModal() {
        document.getElementById('thModal').classList.add('show');
    },

    showOptionsModal() {
        document.getElementById('optModal').classList.add('show');
    },

    async refreshTable() {
        try {
            const entries = await DB.getAllEntries();
            // TODO: Render table using entries
            console.log(`Loaded ${entries.length} entries`);
        } catch (err) {
            console.error('Failed to load entries:', err);
        }
    }
};

// Auto start
window.addEventListener('load', UI.init);

window.UI = UI;
