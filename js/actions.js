import { DB } from './db.js';
import { validateEntry } from './validator.js';

export const Actions = {
  async save(entry) {
    const errors = validateEntry(entry);

    if (errors.length) {
      alert(errors.join('\n'));
      return false;
    }

    await DB.save(entry);
    return true;
  }
};
