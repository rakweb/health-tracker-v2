// js/chart.js
let metricsChart = null;

const ChartManager = {
    init() {
        const canvas = document.getElementById('metricsChart');
        if (!canvas) {
            console.warn("❌ metricsChart canvas not found");
            return;
        }

        // Force proper sizing
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.parentElement.style.height = "380px";

        metricsChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: true,
                        text: 'No data yet - Add some entries'
                    }
                },
                scales: {
                    x: { display: true },
                    y: { 
                        beginAtZero: false,
                        display: true 
                    }
                }
            }
        });

        console.log("✅ Chart initialized successfully");
    },

    update(labels = [], datasets = []) {
        if (!metricsChart) return;
        
        metricsChart.data.labels = labels;
        metricsChart.data.datasets = datasets;
        metricsChart.options.plugins.title.text = datasets.length ? "Health Metrics" : "No data yet";
        metricsChart.update();
    }
};

window.ChartManager = ChartManager;
