/* Generated from the exact production assets. No user data is cached. */
const VERSION = "b2864673ba9a179bf584";
const FILES = ["assets/index-BA_MUzpp.js","assets/index-pj3d2_yR.css","favicon.svg","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png","index.html","manifest.webmanifest"];
const SCOPE = new URL(self.registration.scope);
const PREFIX = 'zhuti-pwa-' + encodeURIComponent(SCOPE.pathname) + '-';
const CACHE = PREFIX + VERSION;
const INDEX = new URL('index.html', SCOPE).href;
const ASSETS = FILES.map(file => new URL(file, SCOPE).href);
const ASSET_SET = new Set(ASSETS);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload', credentials: 'same-origin' })))));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== SCOPE.origin || !url.pathname.startsWith(SCOPE.pathname)) return;
  const normalized = new URL(url.href); normalized.search = ''; normalized.hash = '';
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => response.ok ? response : caches.open(CACHE).then(cache => cache.match(INDEX)).then(cached => cached || response)).catch(() => caches.open(CACHE).then(cache => cache.match(INDEX)).then(cached => cached || Response.error())));
    return;
  }
  if (!ASSET_SET.has(normalized.href)) return;
  event.respondWith(caches.open(CACHE).then(cache => cache.match(normalized.href)).then(cached => cached || fetch(request)));
});
