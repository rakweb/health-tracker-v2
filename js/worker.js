// js/worker.js
self.onmessage = function(e) {
    const { type, data } = e.data;

    if (type === 'EXPORT_CSV') {
        try {
            const csv = convertToCSV(data.entries);
            self.postMessage({ 
                type: 'CSV_READY', 
                content: csv, 
                filename: 'health-tracker-export.csv' 
            });
        } catch (err) {
            self.postMessage({ type: 'ERROR', message: err.message });
        }
    }
};

function convertToCSV(entries) {
    if (!entries || entries.length === 0) return 'No data';

    const headers = Object.keys(entries[0]);
    let csv = headers.join(',') + '\n';

    entries.forEach(entry => {
        const row = headers.map(field => {
            let val = entry[field];
            if (val == null) return '';
            if (typeof val === 'string' && val.includes(',')) return `"${val}"`;
            return val;
        }).join(',');
        csv += row + '\n';
    });

    return csv;
}

console.log("✅ worker.js loaded");
