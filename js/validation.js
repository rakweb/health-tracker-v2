import { SAFE_RANGES } from './config.js';

export function validateEntry(entry) {
  const errors = [];

  if (!entry.date) errors.push('Date required');

  for (const key in SAFE_RANGES) {
    const val = entry[key];
    if (val == null) continue;

    const { min, max } = SAFE_RANGES[key];

    if (typeof val !== 'number' || isNaN(val)) {
      errors.push(`${key} must be a valid number`);
      continue;
    }

    if (val < min || val > max) {
      errors.push(`${key} out of safe range (${min}-${max})`);
    }
  }

  return errors;
}
