import { DB } from './db.js';
import { buildChart } from './chart.js';
import { validateEntry } from './validator.js';

const State = {
  entries: [],
  chart: null
};

/* ==================== TOAST SYSTEM ==================== */

function showToast(msg, type = 'error') {
  let container = document.getElementById('toastContainer');

  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.right = '20px';
    document.body.appendChild(container);
  }

  const t = document.createElement('div');
  t.textContent = msg;
  t.style.padding = '10px 14px';
  t.style.marginTop = '8px';
  t.style.borderRadius = '8px';
  t.style.color = '#fff';
  t.style.fontSize = '14px';
  t.style.background = (type === 'error') ? '#dc2626' : '#16a34a';
  t.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';

  container.appendChild(t);

  setTimeout(() => t.remove(), 3000);
}

/* ==================== UI ==================== */

const UI = {

  renderTable() {
    const body = document.getElementById('tableBody');
    if (!body) return;

    body.innerHTML = '';

    State.entries.forEach(entry => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${entry.date}</td>
        <td>${entry.sys ?? ''}</td>
        <td>${entry.dia ?? ''}</td>
        <td>${entry.hr ?? ''}</td>
      `;

      body.appendChild(tr);
    });
  },

  renderChart() {
    const canvas = document.getElementById('metricsChart');
    if (!canvas) return;

    if (State.chart) {
      State.chart.destroy();
      State.chart = null;
    }

    State.chart = buildChart(
      canvas.getContext('2d'),
      State.entries,
      ['sys', 'dia', 'hr']
    );
  }
};

/* ==================== ACTIONS ==================== */

const Actions = {

  async load() {
    await DB.open();
    State.entries = await DB.getAll();
    UI.renderTable();
    UI.renderChart();
  },

  async addEntryFromForm() {
    const entry = {
      date: document.getElementById('f_date')?.value,
      sys: Number(document.getElementById('f_sys')?.value) || null,
      dia: Number(document.getElementById('f_dia')?.value) || null,
      hr: Number(document.getElementById('f_hr')?.value) || null
    };

    const errors = validateEntry(entry);

    if (errors.length) {
      errors.forEach(e => showToast(e, 'error'));
      return;
    }

    await DB.save(entry);
    State.entries.push(entry);

    UI.renderTable();
    UI.renderChart();

    showToast('Entry saved ✅', 'success');
  }

};

/* ==================== EVENT SYSTEM ==================== */

function bindEvents() {
  document.getElementById('btnAdd')?.addEventListener('click', Actions.addEntryFromForm);

  // live update input watcher (realtime chart preview)
  ['f_sys', 'f_dia', 'f_hr'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
      previewChart();
    });
  });
}

/* ==================== REALTIME PREVIEW ==================== */

function previewChart() {
  const temp = [...State.entries];

  const preview = {
    date: document.getElementById('f_date')?.value,
    sys: Number(document.getElementById('f_sys')?.value) || null,
    dia: Number(document.getElementById('f_dia')?.value) || null,
    hr: Number(document.getElementById('f_hr')?.value) || null
  };

  temp.push(preview);

  const canvas = document.getElementById('metricsChart');
  if (!canvas) return;

  if (State.chart) State.chart.destroy();

  State.chart = buildChart(canvas.getContext('2d'), temp, ['sys', 'dia', 'hr']);
}

/* ==================== INIT ==================== */

document.addEventListener('DOMContentLoaded', async () => {
  await Actions.load();
  bindEvents();
});

import { Actions } from './actions.js';
import * as UI from './ui.js';

window.Actions = Actions;
window.UI = UI;

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
