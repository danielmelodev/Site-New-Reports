const CACHE = "pwabuilder-page";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        './index.html',
        './visao-valores.html',
        './relatos.html',
        './contato.html',
        './relatos-abertos.html',

        './assets/css/bootstrap.min.css',
        './assets/css/menu.css',
        './assets/css/main.css',
        './assets/css/paginas.css',
        './assets/css/relatos.css',

        './assets/js/bootstrap.min.js',

        './assets/js/jquery.min.js',
      
        './assets/js/main.js',
        './assets/js/script.js',
        './assets/js/util.js',
        './assets/js/menu.js',


        'images/icons/128.png',
        'images/icons/144.png',
        'images/icons/152.png',
        'images/icons/167.png',
        'images/icons/180.png',
        'images/icons/196.png',
        'images/icons/256.png',
        'images/icons/512.png',
        'images/limpeza.jpg',
        'images/manutenção.jpg',
        'images/meio-ambiente.jpg',
        'images/segurança-trabalho.jpg',
        
      ]))
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);