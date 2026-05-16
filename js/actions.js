// js/action.js
const WorkerManager = {
    worker: null,

    init() {
        if (!this.worker) {
            this.worker = new Worker('./js/worker.js');
            this.worker.onmessage = this.handleMessage.bind(this);
        }
    },

    handleMessage(e) {
        const { type, content, filename, message } = e.data;

        if (type === 'CSV_READY') {
            const blob = new Blob([content], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }

        if (type === 'ERROR') {
            alert('Export Error: ' + message);
        }
    },

    exportCSV(entries, fields = null) {
        this.init();
        this.worker.postMessage({ type: 'EXPORT_CSV', data: { entries, fields } });
    },

    exportPDF() {
        this.init();
        // For now we trigger PDF in main thread with light mode, but worker can prepare data
        document.documentElement.setAttribute('data-pdf-export', '1');
        setTimeout(() => {
            document.documentElement.removeAttribute('data-pdf-export');
        }, 2000);

        alert("PDF generation started (light mode enabled)");
        // Extend with jsPDF logic later
    }
};

const Action = {
    async addEntry() {
        const entry = {
            date: document.getElementById('f_date').value,
            time: document.getElementById('f_time').value,
            glucose: parseFloat(document.getElementById('f_glucose')?.value) || null,
            sys: parseInt(document.getElementById('f_sys')?.value) || null,
            dia: parseInt(document.getElementById('f_dia')?.value) || null,
            weightLbs: parseFloat(document.getElementById('f_weightLbs')?.value) || null,
            // Add more fields as needed
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
        // Example: get all entries (you can filter by date range later)
        DB.getAllEntries().then(entries => {
            WorkerManager.exportCSV(entries);
        });
    },

    exportPDF() {
        WorkerManager.exportPDF();
    }
};

window.Action = Action;
window.WorkerManager = WorkerManager;
