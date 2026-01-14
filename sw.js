
// Service Worker für bessere Performance (optional)
const CACHE_NAME = 'archetypen-test-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/questions.js',  
  '/js/archetypen.js',
  'https://cdn.tailwindcss.com/3.3.3',
  'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
