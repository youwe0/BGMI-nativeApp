import type { Notification } from '@/types';

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'challenge', message: 'SnipeKing99 challenged you to a Classic Duo match!', timestamp: '2 mins ago', read: false },
  { id: 'n2', type: 'match', message: 'Your match starts in 10 minutes. Get ready!', timestamp: '8 mins ago', read: false },
  { id: 'n3', type: 'win', message: 'You won ₹400 in the Erangel Squad match. 🏆', timestamp: '1 hour ago', read: false },
  { id: 'n4', type: 'result', message: 'BlazeFire submitted match results. Please verify.', timestamp: '3 hours ago', read: true },
  { id: 'n5', type: 'system', message: 'New WOW Mode tournaments are now available. Check Challenge Arena!', timestamp: 'Yesterday', read: true },
  { id: 'n6', type: 'challenge', message: 'ProGamer_X challenged you to a TDM Solo match!', timestamp: 'Yesterday', read: true },
  { id: 'n7', type: 'win', message: 'You won ₹120 in the WOW 1v1 match. 🎯', timestamp: '2 days ago', read: true },
  { id: 'n8', type: 'system', message: 'Weekly leaderboard has been reset. New season started!', timestamp: '3 days ago', read: true },
];

export const notificationService = {
  getNotifications(): Notification[] {
    return MOCK_NOTIFICATIONS;
  },

  getUnreadCount(): number {
    return MOCK_NOTIFICATIONS.filter((n) => !n.read).length;
  },
};
