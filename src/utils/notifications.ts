
import { LocalNotifications } from '@capacitor/local-notifications';

/**
 * Schedules a daily notification at the given hour and minute.
 */
export async function scheduleDailyNotification(hour: number, minute: number) {
  await LocalNotifications.requestPermissions();
  await LocalNotifications.schedule({
    notifications: [
      {
        title: 'Daily Journal Reminder',
        body: 'Take a moment to write your daily reflection!',
        id: 1,
        schedule: { on: { hour, minute }, repeats: true },
        sound: null,
        actionTypeId: "",
        smallIcon: "ic_stat_icon"
      },
    ],
  });
}

/**
 * Example usage (call only once, e.g. on first launch or in a settings page!):
 * scheduleDailyNotification(20, 0); // 8pm
 */
