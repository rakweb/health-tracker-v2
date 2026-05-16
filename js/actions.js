// js/action.js
console.log("✅ action.js loaded");

const Action = {
    async addEntry() {
        const entry = {
            date: document.getElementById('f_date')?.value,
            time: document.getElementById('f_time')?.value,
            glucose: parseFloat(document.getElementById('f_glucose')?.value) || null,
            sys: parseInt(document.getElementById('f_sys')?.value) || null,
            dia: parseInt(document.getElementById('f_dia')?.value) || null,
            weightLbs: parseFloat(document.getElementById('f_weightLbs')?.value) || null,
            steps: parseInt(document.getElementById('f_steps')?.value) || null,
            pain: parseFloat(document.getElementById('f_pain')?.value) || null,
            symptoms: parseFloat(document.getElementById('f_symptoms')?.value) || null,
            comments: document.getElementById('f_comments')?.value || '',
            timestamp: new Date().toISOString()
        };

        if (!entry.date) {
            alert("❌ Date is required!");
            return;
        }

        try {
            await DB.addEntry(entry);
            alert("✅ Entry saved successfully!");
            UI.closeEntry();
            UI.refreshTable();
        } catch (err) {
            console.error(err);
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
        }).catch(err => {
            console.error(err);
            alert("Failed to export CSV");
        });
    },

    exportPDF() {
        WorkerManager.exportPDF();
    }
};

window.Action = Action;
