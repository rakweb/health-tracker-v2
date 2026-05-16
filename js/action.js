// js/action.js
console.log("✅ action.js loaded");

const WorkerManager = {
    worker: null,

    init() {
        if (this.worker) return;
        this.worker = new Worker('./js/worker.js');
        this.worker.onmessage = this.handleMessage;
    },

    handleMessage(e) {
        const { type, content, filename, message } = e.data;

        if (type === 'CSV_READY') {
            const blob = new Blob([content], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
        } else if (type === 'ERROR') {
            alert("Export Error: " + message);
        }
    },

    exportCSV(entries) {
        this.init();
        this.worker.postMessage({ type: 'EXPORT_CSV', data: { entries } });
    }
};

const Action = {
    async addEntry() {
        const entry = {
            date: document.getElementById('f_date')?.value,
            time: document.getElementById('f_time')?.value,
            glucose: parseFloat(document.getElementById('f_glucose')?.value) || null,
            sys: parseInt(document.getElementById('f_sys')?.value) || null,
            dia: parseInt(document.getElementById('f_dia')?.value) || null,
            weightLbs: parseFloat(document.getElementById('f_weightLbs')?.value) || null,
            pain: parseFloat(document.getElementById('f_pain')?.value) || null,
            symptoms: parseFloat(document.getElementById('f_symptoms')?.value) || null,
            comments: document.getElementById('f_comments')?.value || '',
            timestamp: new Date().toISOString()
        };

        const validation = Validator.entry(entry);
        if (!validation.valid) {
            alert(validation.errors.join('\n'));
            return;
        }

        try {
            await DB.addEntry(entry);
            alert("✅ Entry saved!");
            UI.closeEntry();
            UI.refreshTable();
        } catch (err) {
            console.error(err);
            alert("❌ Failed to save entry");
        }
    },

    exportCSV() {
        DB.getAllEntries().then(entries => WorkerManager.exportCSV(entries));
    },

    exportPDF() {
        alert("PDF Export started (Light mode enabled)");
        // Add full jsPDF logic later if needed
    }
};

window.Action = Action;
window.WorkerManager = WorkerManager;
