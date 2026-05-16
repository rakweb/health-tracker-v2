// js/worker.js
self.onmessage = function(e) {
    const { type, data } = e.data;

    if (type === 'EXPORT_CSV') {
        try {
            const csvContent = convertToCSV(data.entries, data.fields);
            self.postMessage({ type: 'CSV_READY', content: csvContent, filename: 'health_export.csv' });
        } catch (err) {
            self.postMessage({ type: 'ERROR', message: err.message });
        }
    }

    if (type === 'EXPORT_PDF') {
        // Heavy PDF work can go here (using jsPDF in worker is limited, but we can prepare data)
        self.postMessage({ type: 'PDF_DATA_READY', data: data });
    }
};

function convertToCSV(entries, fields) {
    if (!entries || entries.length === 0) return '';

    const headers = fields || Object.keys(entries[0]);
    let csv = headers.join(',') + '\n';

    entries.forEach(entry => {
        const row = headers.map(field => {
            let val = entry[field];
            if (typeof val === 'string' && val.includes(',')) val = `"${val}"`;
            return val ?? '';
        }).join(',');
        csv += row + '\n';
    });

    return csv;
}
