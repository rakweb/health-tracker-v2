// js/app.js
console.log("🚀 Health Tracker v" + CONFIG.VERSION + " initialized");

const UI = {
    init() {
        console.log("✅ UI.init() started - Binding all buttons");

        // Bind all major buttons
        this.bindAllButtons();

        // Initialize chart safely after DOM is ready
        setTimeout(() => {
            if (typeof ChartManager !== "undefined") {
                ChartManager.init();
            }
        }, 300);

        // Load initial data
        this.refreshTable();
    },

    bindAllButtons() {
        const buttons = [
            { id: 'btnAdd', action: () => this.showEntryModal() },
            { id: 'btnSaveEntry', action: () => Action.addEntry() },
            { id: 'btnSaveCSV', action: () => Action.exportCSV() },
            { id: 'btnSavePDF', action: () => Action.exportPDF() },
            { id: 'btnRefresh', action: () => this.refreshTable() },
            { id: 'btnFields', action: () => this.showFieldsModal() },
            { id: 'btnThresholds', action: () => this.showThresholdsModal() },
            { id: 'btnOptions', action: () => this.showOptionsModal() },
            { id: 'btnTheme', action: null } // already handled in index.html
        ];

        buttons.forEach(btn => {
            const element = document.getElementById(btn.id);
            if (element) {
                if (btn.action) {
                    element.addEventListener('click', btn.action);
                    console.log(`✅ Button bound: #${btn.id}`);
                }
            } else {
                console.warn(`⚠️ Button not found: #${btn.id}`);
            }
        });
    },

    showEntryModal() {
        document.getElementById('entryModal')?.classList.add('show');
    },

    closeEntry() {
        document.getElementById('entryModal')?.classList.remove('show');
    },

    showFieldsModal() {
        document.getElementById('fieldsModal')?.classList.add('show');
    },

    showThresholdsModal() {
        document.getElementById('thModal')?.classList.add('show');
    },

    showOptionsModal() {
        document.getElementById('optModal')?.classList.add('show');
    },

    async refreshTable() {
        try {
            const entries = await DB.getAllEntries();
            console.log(`📊 Loaded ${entries.length} entries`);
            // TODO: Render table here later
        } catch (e) {
            console.error("Failed to refresh table", e);
        }
    }
};

// Start the app when everything is ready
window.addEventListener('load', () => {
    UI.init();
});

window.UI = UI;
