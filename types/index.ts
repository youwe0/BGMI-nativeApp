// ─── Shared TypeScript types for Too Too ─────────────────────────────────────

export type MatchType = 'Classic' | 'TDM' | 'WOW';
export type GameMode = 'Solo' | 'Duo' | 'Squad';
export type ChallengeStatus = 'open' | 'full' | 'ongoing' | 'completed';
export type TransactionType = 'credit' | 'debit' | 'winning' | 'refund';
export type NotificationType = 'challenge' | 'match' | 'win' | 'result' | 'system';
export type LeaderboardPeriod = 'weekly' | 'monthly' | 'alltime';
export type AchievementStatus = 'locked' | 'unlocked';
export type ChatType = 'match' | 'lobby' | 'dm';

// ─── Challenge / Match ────────────────────────────────────────────────────────

export interface Challenge {
  id: string;
  hostName: string;
  hostId: string;
  matchType: MatchType;
  mode: GameMode;
  map?: string;          // Classic only
  gunCategory?: string;  // TDM only
  gun?: string;          // TDM only
  wowCode?: string;      // WOW only
  entryFee: number;
  prizePool: number;
  totalSlots: number;
  filledSlots: number;
  matchTime: string;
  status: ChallengeStatus;
  rules?: string;
  roomId?: string;       // shown blurred until match starts
  roomPassword?: string; // shown blurred until match starts
}

// ─── Player ──────────────────────────────────────────────────────────────────

export interface Player {
  id: string;
  username: string;
  rank: string;
  tier: string;
  kdRatio: number;
  winRate: number;
  totalMatches: number;
  totalEarnings: number;
  favoriteMode: MatchType;
  skillTags: string[];
  region: string;
  team: string;
  recentMatches: MatchResult[];
  achievements: Achievement[];
}

export interface MatchResult {
  id: string;
  matchType: MatchType;
  mode: GameMode;
  result: 'win' | 'loss';
  kills: number;
  earnings: number;
  date: string;
}

// ─── Wallet ───────────────────────────────────────────────────────────────────

export interface WalletData {
  availableBalance: number;
  lockedBalance: number;
  totalEarnings: number;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  playerName: string;
  wins: number;
  points: number;
  earnings: number;
}

// ─── Notification ─────────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: string;
  read: boolean;
}

// ─── Achievement ─────────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  emoji: string;
  title: string;
  description: string;
  status: AchievementStatus;
}

// ─── Chat ────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}
