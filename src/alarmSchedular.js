// src/alarmScheduler.js
import { scheduleLocalNotification } from './notifications';

export function setDailyAlarm(hour, minute, message) {
  const now = new Date();
  const nextTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
  if (nextTime < now) nextTime.setDate(nextTime.getDate() + 1);

  scheduleLocalNotification("Discipline Reminder", { body: message }, nextTime.getTime());
  // To repeat, re-call this function after showing notification
}
