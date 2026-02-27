import type { Player } from '@/types';

const MY_PROFILE: Player = {
  id: 'me',
  username: 'Too Too Player',
  rank: 'Diamond III',
  tier: 'Diamond',
  kdRatio: 3.8,
  winRate: 67,
  totalMatches: 84,
  totalEarnings: 4800,
  favoriteMode: 'Classic',
  region: 'Asia',
  team: 'Team TooToo',
  skillTags: ['Sniper', 'Squad Leader', 'Clutch King'],
  recentMatches: [
    { id: 'm1', matchType: 'Classic', mode: 'Squad', result: 'win', kills: 8, earnings: 400, date: 'Today' },
    { id: 'm2', matchType: 'TDM', mode: 'Duo', result: 'loss', kills: 4, earnings: 0, date: 'Today' },
    { id: 'm3', matchType: 'Classic', mode: 'Solo', result: 'win', kills: 5, earnings: 200, date: 'Yesterday' },
    { id: 'm4', matchType: 'WOW', mode: 'Solo', result: 'win', kills: 3, earnings: 120, date: 'Yesterday' },
    { id: 'm5', matchType: 'Classic', mode: 'Squad', result: 'loss', kills: 2, earnings: 0, date: '2 days ago' },
  ],
  achievements: [
    { id: 'a1', emoji: '🩸', title: 'First Blood', description: 'Win your first match', status: 'unlocked' },
    { id: 'a2', emoji: '🏆', title: '10 TDM Wins', description: 'Win 10 TDM matches', status: 'unlocked' },
    { id: 'a3', emoji: '🎯', title: 'Sniper Master', description: 'Get 50 sniper kills', status: 'unlocked' },
    { id: 'a4', emoji: '🔥', title: '5 Win Streak', description: 'Win 5 matches in a row', status: 'locked' },
    { id: 'a5', emoji: '👑', title: 'Undefeated', description: 'Win 10 matches without a loss', status: 'locked' },
    { id: 'a6', emoji: '💰', title: 'High Roller', description: 'Earn ₹5000 total', status: 'locked' },
  ],
};

const PUBLIC_PROFILES: Record<string, Player> = {
  p1: { ...MY_PROFILE, id: 'p1', username: 'SnipeKing99', kdRatio: 5.1, winRate: 72, totalMatches: 120, totalEarnings: 8200, rank: 'Crown', tier: 'Crown', region: 'Asia', team: 'Solo Wolf', skillTags: ['AWM Pro', 'Long Range', 'Solo Carrier'] },
  p2: { ...MY_PROFILE, id: 'p2', username: 'BlazeFire', kdRatio: 4.2, winRate: 61, totalMatches: 95, totalEarnings: 5600, rank: 'Ace', tier: 'Ace', region: 'South Asia', team: 'Blaze Squad', skillTags: ['Rusher', 'CQC Expert'] },
  p3: { ...MY_PROFILE, id: 'p3', username: 'ProGamer_X', kdRatio: 3.5, winRate: 58, totalMatches: 60, totalEarnings: 3200, rank: 'Platinum III', tier: 'Platinum', region: 'India', team: 'Pro Squad X', skillTags: ['WOW Specialist'] },
};

export const profileService = {
  getMyProfile(): Player {
    return MY_PROFILE;
  },

  getPublicProfile(playerId: string): Player | undefined {
    return PUBLIC_PROFILES[playerId];
  },
};
