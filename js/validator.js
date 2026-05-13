export function validateEntry(e) {
  const errors = [];

  if (!e.date) errors.push('Date is required');

  if (e.sys && (e.sys < 70 || e.sys > 250))
    errors.push('Systolic out of safe range');

  if (e.dia && (e.dia < 40 || e.dia > 150))
    errors.push('Diastolic out of safe range');

  if (e.hr && (e.hr < 30 || e.hr > 220))
    errors.push('Heart rate out of safe range');

  return errors;
}
