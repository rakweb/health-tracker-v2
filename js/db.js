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
                    console.log("📦 Created 'entries' object store");
                }
            };

            request.onsuccess = (e) => {
                dbInstance = e.target.result;
                console.log("✅ IndexedDB initialized successfully");
                resolve(dbInstance);
            };

            request.onerror = (e) => {
                console.error("❌ IndexedDB error:", e.target.error);
                reject(e.target.error);
            };
        });
    },

    async getAllEntries() {
        try {
            const db = await this.init();
            return new Promise((resolve, reject) => {
                const tx = db.transaction('entries', 'readonly');
                const store = tx.objectStore('entries');
                const req = store.getAll();

                req.onsuccess = () => {
                    const entries = req.result || [];
                    console.log(`📊 Loaded ${entries.length} entries from DB`, entries);
                    resolve(entries);
                };

                req.onerror = () => {
                    console.error("❌ getAllEntries failed", req.error);
                    reject(req.error);
                };
            });
        } catch (err) {
            console.error("❌ DB.getAllEntries error:", err);
            return [];
        }
    },

    async addEntry(entry) {
        try {
            const db = await this.init();
            return new Promise((resolve, reject) => {
                const tx = db.transaction('entries', 'readwrite');
                const store = tx.objectStore('entries');
                const req = store.add(entry);

                req.onsuccess = () => {
                    console.log("✅ Entry added with ID:", req.result);
                    resolve(req.result);
                };
                req.onerror = () => reject(req.error);
            });
        } catch (err) {
            console.error("❌ Failed to add entry:", err);
            throw err;
        }
    },

    async clearAllData() {
        const db = await this.init();
        const tx = db.transaction('entries', 'readwrite');
        const store = tx.objectStore('entries');
        store.clear();
        console.log("🗑️ All entries cleared");
    }
};

window.DB = DB;
