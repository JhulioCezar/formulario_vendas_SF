// ============================================
// SERVICE WORKER - SEM FRONTEIRAS
// ============================================

const CACHE_NAME = 'sem-fronteiras-v1.0.0';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './utils.js',
    './templates.js',
    './router.js',
    './manifest.json',
    './android-icon-192x192.png',
    './android-icon-512x512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    console.log('[ServiceWorker] Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[ServiceWorker] Cacheando arquivos...');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('[ServiceWorker] Instalação concluída!');
                return self.skipWaiting();
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Ativando...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[ServiceWorker] Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[ServiceWorker] Ativação concluída!');
            return self.clients.claim();
        })
    );
});

// Interceptação de requisições (estratégia: cache first, depois network)
self.addEventListener('fetch', event => {
    // Ignorar requisições para APIs externas (geolocalização, etc.)
    if (event.request.url.includes('nominatim.openstreetmap.org') ||
        event.request.url.includes('google.com/maps') ||
        event.request.url.includes('imgur.com')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - retorna resposta do cache
                if (response) {
                    return response;
                }
                
                // Clone da requisição
                const fetchRequest = event.request.clone();
                
                return fetch(fetchRequest)
                    .then(response => {
                        // Verificar se resposta é válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone da resposta
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(error => {
                        console.error('[ServiceWorker] Falha no fetch:', error);
                        // Pode retornar uma página de fallback se desejar
                    });
            })
    );
});

// Tratar mensagens do cliente (para atualização)
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// PWA Install Prompt - gerenciado pelo client (index.html)
// O evento beforeinstallprompt será capturado pelo index.html