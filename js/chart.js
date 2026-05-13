export function buildChart(ctx, rows, metrics) {
  const labels = rows.map(r => r.date);

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: metrics.map((k, i) => ({
        label: k,
        data: rows.map(r => r[k]),
        borderColor: ['#60a5fa', '#34d399', '#f87171'][i],
        pointRadius: 0,
        tension: 0.3
      }))
    },
    options: {
      animation: false,
      parsing: false,
      normalized: true,
      plugins: {
        decimation: {
          enabled: true,
          algorithm: 'lttb',
          samples: 200
        }
      }
    }
  });
}
