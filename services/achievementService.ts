import type { Achievement } from '@/types';

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', emoji: '🩸', title: 'First Blood', description: 'Win your first match', status: 'unlocked' },
  { id: 'a2', emoji: '🏆', title: '10 TDM Wins', description: 'Win 10 TDM matches', status: 'unlocked' },
  { id: 'a3', emoji: '🎯', title: 'Sniper Master', description: 'Get 50 sniper kills', status: 'unlocked' },
  { id: 'a4', emoji: '🔥', title: '5 Win Streak', description: 'Win 5 in a row', status: 'locked' },
  { id: 'a5', emoji: '👑', title: 'Undefeated', description: 'Win 10 without a loss', status: 'locked' },
  { id: 'a6', emoji: '💰', title: 'High Roller', description: 'Earn ₹5000 total', status: 'locked' },
  { id: 'a7', emoji: '⚡', title: 'WOW Master', description: 'Win 5 WOW Mode matches', status: 'locked' },
  { id: 'a8', emoji: '🗺️', title: 'Map Explorer', description: 'Win on all 3 Classic maps', status: 'unlocked' },
  { id: 'a9', emoji: '🔫', title: 'Gun Collector', description: 'Win with every gun category', status: 'locked' },
  { id: 'a10', emoji: '🛡️', title: 'Survivor', description: 'Finish top 3 in 20 matches', status: 'locked' },
  { id: 'a11', emoji: '🚀', title: 'Rising Star', description: 'Reach Ace rank', status: 'locked' },
  { id: 'a12', emoji: '🌟', title: 'Legend', description: 'Reach Crown rank', status: 'locked' },
];

export const achievementService = {
  getAchievements(): Achievement[] {
    return MOCK_ACHIEVEMENTS;
  },
};
