import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import type { LeaderboardEntry } from '@/types';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
}

const RANK_COLORS: Record<number, string> = {
  1: '#FFD700',
  2: '#C0C0C0',
  3: '#CD7F32',
};

export function LeaderboardRow({ entry }: LeaderboardRowProps) {
  const { colors, isDark } = useTheme();
  const rankColor = RANK_COLORS[entry.rank];
  const isTopThree = entry.rank <= 3;

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: isTopThree
            ? (rankColor ?? colors.primary) + (isDark ? '15' : '10')
            : colors.card,
          borderColor: isTopThree ? (rankColor ?? colors.primary) + '40' : colors.border,
        },
      ]}>
      {/* Rank */}
      <View style={[styles.rankBox, isTopThree && { backgroundColor: rankColor + '25' }]}>
        <Text
          style={[
            styles.rank,
            { color: isTopThree ? rankColor : colors.textSecondary },
          ]}>
          {isTopThree ? ['🥇', '🥈', '🥉'][entry.rank - 1] : `#${entry.rank}`}
        </Text>
      </View>

      {/* Player */}
      <View style={styles.playerBox}>
        <View style={[styles.avatar, { backgroundColor: (rankColor ?? colors.primary) + '25' }]}>
          <Text style={[styles.avatarText, { color: rankColor ?? colors.primary }]}>
            {entry.playerName.charAt(0)}
          </Text>
        </View>
        <Text style={[styles.playerName, { color: colors.text }]} numberOfLines={1}>
          {entry.playerName}
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.stat}>
        <Text style={[styles.statValue, { color: colors.text }]}>{entry.wins}</Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Wins</Text>
      </View>
      <View style={styles.stat}>
        <Text style={[styles.statValue, { color: colors.primary }]}>{entry.points}</Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pts</Text>
      </View>
      <View style={styles.stat}>
        <Text style={[styles.statValue, { color: '#FFD700' }]}>₹{entry.earnings}</Text>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Earned</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
    gap: 10,
  },
  rankBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rank: { fontSize: 14, fontWeight: '800' },
  playerBox: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 13, fontWeight: '800' },
  playerName: { fontSize: 13, fontWeight: '700', flex: 1 },
  stat: { alignItems: 'center', minWidth: 44 },
  statValue: { fontSize: 13, fontWeight: '800' },
  statLabel: { fontSize: 9, marginTop: 1, fontWeight: '600' },
});
