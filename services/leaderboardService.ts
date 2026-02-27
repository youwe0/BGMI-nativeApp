import type { LeaderboardEntry, LeaderboardPeriod } from '@/types';

const WEEKLY: LeaderboardEntry[] = [
  { rank: 1, playerId: 'p1', playerName: 'SnipeKing99', wins: 18, points: 2400, earnings: 3200 },
  { rank: 2, playerId: 'p2', playerName: 'BlazeFire', wins: 14, points: 1980, earnings: 2100 },
  { rank: 3, playerId: 'p3', playerName: 'ProGamer_X', wins: 11, points: 1560, earnings: 1500 },
  { rank: 4, playerId: 'p4', playerName: 'StealthNinja', wins: 9, points: 1340, earnings: 1100 },
  { rank: 5, playerId: 'p5', playerName: 'TurboAce', wins: 8, points: 1200, earnings: 900 },
  { rank: 6, playerId: 'me', playerName: 'Too Too Player', wins: 7, points: 1050, earnings: 800 },
  { rank: 7, playerId: 'p6', playerName: 'ShadowElite', wins: 6, points: 880, earnings: 600 },
  { rank: 8, playerId: 'p7', playerName: 'RushHour_99', wins: 5, points: 720, earnings: 400 },
  { rank: 9, playerId: 'p8', playerName: 'Phantom_V', wins: 4, points: 540, earnings: 250 },
  { rank: 10, playerId: 'p9', playerName: 'IronFist', wins: 3, points: 420, earnings: 150 },
];

const MONTHLY: LeaderboardEntry[] = WEEKLY.map((e, i) => ({
  ...e,
  wins: e.wins * 4 + i,
  points: e.points * 4 + i * 10,
  earnings: e.earnings * 4 + i * 50,
}));

const ALLTIME: LeaderboardEntry[] = WEEKLY.map((e, i) => ({
  ...e,
  wins: e.wins * 20 + i * 2,
  points: e.points * 20 + i * 50,
  earnings: e.earnings * 20 + i * 200,
}));

export const leaderboardService = {
  getLeaderboard(period: LeaderboardPeriod): LeaderboardEntry[] {
    if (period === 'monthly') return MONTHLY;
    if (period === 'alltime') return ALLTIME;
    return WEEKLY;
  },
};
