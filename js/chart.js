// js/chart.js
let metricsChart = null;

const ChartManager = {
    init() {
        const ctx = document.getElementById('metricsChart');
        if (!ctx) return;

        metricsChart = new Chart(ctx, {
            type: 'line',
            data: { labels: [], datasets: [] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: false } }
            }
        });
    },

    update(data) {
        if (!metricsChart) return;
        metricsChart.data.labels = data.labels;
        metricsChart.data.datasets = data.datasets;
        metricsChart.update();
    }
};

window.ChartManager = ChartManager;
