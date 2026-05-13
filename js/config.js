export const METRICS = [
  { key: 'sys', type: 'number' },
  { key: 'dia', type: 'number' },
  { key: 'spo2', type: 'number' },
  { key: 'hr', type: 'number' },
  { key: 'glucose', type: 'number' },
  { key: 'weightLbs', type: 'number' },
  { key: 'tempF', type: 'number' },
  { key: 'resp', type: 'number' },
  { key: 'sleep', type: 'number' },
  { key: 'pain', type: 'number' },
  { key: 'symptoms', type: 'number' }
];

export const SAFE_RANGES = {
  sys: { min: 70, max: 250 },
  dia: { min: 40, max: 150 },
  spo2: { min: 70, max: 100 },
  hr: { min: 30, max: 220 },
  tempF: { min: 90, max: 110 },
  resp: { min: 5, max: 40 },
  glucose: { min: 40, max: 600 },
  weightLbs: { min: 50, max: 700 },
  sleep: { min: 0, max: 24 },
  pain: { min: 0, max: 10 },
  symptoms: { min: 0, max: 10 }
};
