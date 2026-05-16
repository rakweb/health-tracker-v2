// js/action.js
const Action = {
    async addEntry() {
        const entry = {
            date: document.getElementById('f_date').value,
            time: document.getElementById('f_time').value,
            glucose: parseFloat(document.getElementById('f_glucose').value) || null,
            sys: parseInt(document.getElementById('f_sys').value) || null,
            dia: parseInt(document.getElementById('f_dia').value) || null,
            // ... add other fields as needed
            timestamp: new Date().toISOString()
        };

        const validation = Validator.entry(entry);
        if (!validation.valid) {
            alert(validation.errors.join('\n'));
            return;
        }

        await DB.addEntry(entry);
        UI.refreshTable();
        UI.closeEntry();
    },

    exportCSV() {
        alert("CSV Export - Implement logic here");
        // Full implementation can be expanded
    },

    exportPDF() {
        if (typeof jspdf === 'undefined') {
            alert("jsPDF not loaded");
            return;
        }
        alert("PDF Export started (light mode forced)");
        // Full jsPDF logic goes here
    }
};

window.Action = Action;
