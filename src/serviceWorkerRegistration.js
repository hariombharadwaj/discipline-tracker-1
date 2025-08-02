// src/serviceWorkerRegistration.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/workbox-sw.js').then(reg => {
      // Register Background Sync
      if ('sync' in reg) {
        reg.sync.register('sync-violations');
      }
    });
  });
}
