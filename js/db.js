export const DB = {
  db: null,

  async open() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('health', 1);

      req.onupgradeneeded = e => {
        const db = e.target.result;

        if (!db.objectStoreNames.contains('entries')) {
          db.createObjectStore('entries', { keyPath: 'id', autoIncrement: true });
        }
      };

      req.onsuccess = () => {
        this.db = req.result;
        resolve();
      };

      req.onerror = () => reject(req.error);
    });
  },

  async getAll() {
    return new Promise(res => {
      const tx = this.db.transaction('entries', 'readonly');
      const req = tx.objectStore('entries').getAll();
      req.onsuccess = () => res(req.result || []);
    });
  },

  async save(entry) {
    return new Promise(res => {
      const tx = this.db.transaction('entries', 'readwrite');
      tx.objectStore('entries').put(entry);
      tx.oncomplete = () => res();
    });
  }
};
