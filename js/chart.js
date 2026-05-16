// js/chart.js
let metricsChart = null;

const ChartManager = {
    init() {
        const canvas = document.getElementById('metricsChart');
        if (!canvas) {
            console.warn("❌ Canvas not found");
            return;
        }

        // Destroy existing chart to prevent "Canvas is already in use" error
        if (metricsChart) {
            metricsChart.destroy();
            metricsChart = null;
        }

        const container = canvas.parentElement;
        if (container) {
            container.style.height = "380px";
            container.style.position = "relative";
        }

        metricsChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: ["No Data"],
                datasets: [{
                    label: "Health Metrics",
                    data: [0],
                    borderColor: "#4ba3ff",
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "No data yet — Add entries to see chart"
                    }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        console.log("✅ Chart initialized (stable)");
    }
};

window.ChartManager = ChartManager;
