// js/action.js
console.log("✅ action.js loaded");

const Action = {
    async addEntry() {
        console.log("💾 Saving entry...");

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
            console.log("✅ Entry saved successfully");

            alert("✅ Entry saved successfully!");
            
            // Close modal
            UI.closeEntry();
            
            // Refresh table
            await UI.refreshTable();

        } catch (err) {
            console.error("❌ Save failed:", err);
            alert("❌ Failed to save entry");
        }
    },

    exportCSV() {
        DB.getAllEntries().then(entries => {
            if (entries.length === 0) {
                alert("No entries to export");
                return;
            }
            WorkerManager.exportCSV(entries);
        });
    },

    exportPDF() {
        alert("📄 PDF Export started (Light mode enabled)");
        // Full implementation later
    }
};

window.Action = Action;
