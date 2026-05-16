// js/action.js
console.log("✅ action.js loaded");

const Action = {
    async addEntry() {
        console.log("💾 Attempting to save entry...");

        const entry = {
            date: document.getElementById('f_date')?.value,
            glucose: parseFloat(document.getElementById('f_glucose')?.value) || null,
            timestamp: new Date().toISOString()
        };

        if (!entry.date) {
            alert("❌ Date is required!");
            return;
        }

        try {
            await DB.addEntry(entry);
            console.log("✅ Entry saved to DB");

            alert("✅ Entry saved successfully!");

            // Close modal immediately
            UI.closeEntry();

            // Refresh table
            await UI.refreshTable();

        } catch (err) {
            console.error("Save error:", err);
            alert("❌ Failed to save");
        }
    },

    exportCSV() {
        DB.getAllEntries().then(entries => WorkerManager.exportCSV(entries));
    },

    exportPDF() {
        alert("PDF Export started");
    }
};

window.Action = Action;
