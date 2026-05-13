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

document.addEventListener('DOMContentLoaded', init);

function bindUI() {
  document.getElementById('btnAdd')?.addEventListener('click', () => UI.openEntry());
  document.getElementById('btnSaveCSV')?.addEventListener('click', Actions.exportCSV);
  document.getElementById('btnSavePDF')?.addEventListener('click', Actions.exportPDF);
  document.getElementById('btnRefresh')?.addEventListener('click', render);

  document.getElementById('chartMetrics')?.addEventListener('change', render);
}

async function init() {
  await DB.open();
  State.entries = await DB.getAll();

  bindUI();   // ✅ REQUIRED
  render();
}

import { Actions } from './actions.js';
import * as UI from './ui.js';

window.Actions = Actions;
window.UI = UI;
