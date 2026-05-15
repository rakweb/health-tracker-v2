const CACHE_NAME = 'health-tracker-v2.0.0';
const OFFLINE_URL = './index.html';

// Assets to cache immediately (static assets)
const STATIC_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './app.js',
    './range-slider.js',
    './range-slider.css',
    './icons/icon-192.png',
    './icons/icon-512.png' // add if you have it
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('✅ Service Worker installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker activated');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - Network First with Cache Fallback + Offline support
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Skip non-GET requests and chrome-extension requests
    if (event.request.method !== 'GET' || url.protocol === 'chrome-extension:') {
        return;
    }

    event.respondWith(
        (async () => {
            // Try network first
            try {
                const networkResponse = await fetch(event.request);
                
                // Cache successful responses (except for data endpoints if you prefer)
                if (networkResponse && networkResponse.status === 200) {
                    const cache = await caches.open(CACHE_NAME);
                    cache.put(event.request, networkResponse.clone());
                }
                
                return networkResponse;
            } catch (error) {
                // Network failed → try cache
                console.log('🌐 Offline - serving from cache:', event.request.url);
                const cachedResponse = await caches.match(event.request);
                
                if (cachedResponse) {
                    return cachedResponse;
                }

                // If HTML page is requested and not in cache, serve offline page
                if (event.request.destination === 'document') {
                    return caches.match(OFFLINE_URL);
                }

                // For other resources, return 404-like response
                return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
            }
        })()
    );
});

// Optional: Background Sync (if you want to sync data later)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-entries') {
        console.log('🔄 Background sync triggered');
        // You can handle offline data sync here in the future
    }
});

console.log('🛠️ Health Tracker Service Worker loaded');
