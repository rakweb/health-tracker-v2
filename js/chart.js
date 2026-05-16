// js/chart.js
let metricsChart = null;

const ChartManager = {
    init() {
        const canvas = document.getElementById('metricsChart');
        if (!canvas) {
            console.warn("❌ Canvas #metricsChart not found");
            return;
        }

        // Prevent infinite resize loop
        const container = canvas.parentElement;
        if (container) {
            container.style.height = "380px";
            container.style.position = "relative";
        }
        canvas.style.width = "100%";
        canvas.style.height = "100%";

        metricsChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: ["No Data"],
                datasets: [{
                    label: "No entries yet",
                    data: [0],
                    borderColor: "#4ba3ff",
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: true,
                        text: 'No data yet — Add some entries'
                    }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        console.log("✅ Chart initialized (stable)");
    },

    update(labels = [], datasets = []) {
        if (!metricsChart) return;
        metricsChart.data.labels = labels.length ? labels : ["No Data"];
        metricsChart.data.datasets = datasets.length ? datasets : [{
            label: "Sample", data: [0], borderColor: "#4ba3ff"
        }];
        metricsChart.update();
    }
};

window.ChartManager = ChartManager;
