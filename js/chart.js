export function buildChart(ctx, rows, metrics, thresholds) {
  if (!window.Chart) return null;

  const labels = rows.map(r => r.date);

  const datasets = metrics.map((key, i) => ({
    label: key,
    data: rows.map(r => r[key] ?? null),
    borderColor: palette[i % palette.length],
    spanGaps: true,
    pointRadius: 0   // ✅ HUGE performance gain
  }));

  return new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      parsing: false,
      animation: false,         // ✅ speed
      normalized: true,
      plugins: {
        decimation: {
          enabled: true,        // ✅ key optimization
          algorithm: 'lttb',
          samples: 200
        }
      },
      scales: {
        x: {
          ticks: {
            callback: v => labels[v]
          }
        }
      }
    }
  });
}
