// js/db.js
let dbInstance = null;

const DB = {
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(CONFIG.DB_NAME, CONFIG.DB_VERSION);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('entries')) {
                    db.createObjectStore('entries', { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = (e) => {
                dbInstance = e.target.result;
                console.log('✅ IndexedDB initialized');
                resolve(dbInstance);
            };

            request.onerror = (e) => reject(e.target.error);
        });
    },

    async addEntry(entry) {
        const db = await this.init();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('entries', 'readwrite');
            const store = tx.objectStore('entries');
            const req = store.add(entry);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    },

    async getAllEntries() {
        const db = await this.init();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('entries', 'readonly');
            const store = tx.objectStore('entries');
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    },

    async deleteEntry(id) {
        const db = await this.init();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('entries', 'readwrite');
            const store = tx.objectStore('entries');
            const req = store.delete(id);
            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
        });
    }
};

window.DB = DB;
