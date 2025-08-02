// src/notifications.js
export function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}

export function scheduleLocalNotification(title, options, timeMillis) {
  // REMINDER: browsers don't allow true scheduled notifications unless the app is open
  setTimeout(() => {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }, timeMillis - Date.now());
}
