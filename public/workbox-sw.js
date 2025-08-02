// public/workbox-sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

workbox.routing.registerRoute(
  ({request}) => request.destination === 'document' || 
    request.destination === 'script' || 
    request.destination === 'style' ||
    request.destination === 'image',
  new workbox.strategies.StaleWhileRevalidate()
);

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-violations') {
    event.waitUntil(
      // Code to send offline data to backend server.
    );
  }
});
