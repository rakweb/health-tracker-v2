import { DB } from './db.js';
import { Actions } from './actions.js';
import { buildChart } from './chart.js';

const State = {
  entries: [],
  chart: null
};

async function init() {
  await DB.open();

  State.entries = await DB.getAll();

  render();
}

function render() {
  renderChart();
  renderTable();
}

function renderChart() {
  const canvas = document.getElementById('metricsChart');
  if (!canvas) return;

  if (State.chart) State.chart.destroy();

  State.chart = buildChart(
    canvas.getContext('2d'),
    State.entries,
    ['sys', 'dia', 'hr']
  );
}

function renderTable() {
  const body = document.getElementById('tableBody');
  if (!body) return;

  body.innerHTML = '';

  for (const e of State.entries) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${e.date}</td>
      <td>${e.sys ?? ''}</td>
      <td>${e.dia ?? ''}</td>
      <td>${e.hr ?? ''}</td>
    `;

    body.appendChild(tr);
  }
}

window.addEventListener('load', init);
