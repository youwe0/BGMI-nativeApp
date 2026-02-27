import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LeaderboardRow } from '@/components/cards/LeaderboardRow';
import { leaderboardService } from '@/services/leaderboardService';
import type { LeaderboardPeriod } from '@/types';

const TABS: { label: string; value: LeaderboardPeriod }[] = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'All-Time', value: 'alltime' },
];

export default function LeaderboardScreen() {
  const { colors } = useTheme();
  const [period, setPeriod] = useState<LeaderboardPeriod>('weekly');

  const entries = useMemo(() => leaderboardService.getLeaderboard(period), [period]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Tabs */}
      <View style={[styles.tabBar, { borderBottomColor: colors.border }]}>
        {TABS.map(({ label, value }) => {
          const active = value === period;
          return (
            <TouchableOpacity
              key={value}
              style={[
                styles.tab,
                active && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
              ]}
              onPress={() => setPeriod(value)}>
              <Text
                style={[
                  styles.tabText,
                  { color: active ? colors.primary : colors.textSecondary },
                ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Top 3 podium banner */}
      <View style={[styles.podium, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        {entries.slice(0, 3).map((e, i) => {
          const colors_ = ['#FFD700', '#C0C0C0', '#CD7F32'];
          const emojis = ['🥇', '🥈', '🥉'];
          const sizes = [22, 18, 18];
          return (
            <View key={e.playerId} style={[styles.podiumItem, i === 0 && styles.podiumCenter]}>
              <Text style={{ fontSize: i === 0 ? 32 : 26 }}>{emojis[i]}</Text>
              <Text
                style={[styles.podiumName, { color: colors_[i], fontSize: sizes[i] }]}
                numberOfLines={1}>
                {e.playerName.split('_')[0]}
              </Text>
              <Text style={[styles.podiumPts, { color: colors.textSecondary }]}>
                {e.points} pts
              </Text>
            </View>
          );
        })}
      </View>

      {/* Full list */}
      <FlatList
        data={entries}
        keyExtractor={(item) => item.playerId}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <LeaderboardRow entry={item} />}
        ListFooterComponent={<View style={{ height: 32 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, paddingHorizontal: 16 },
  tab: { paddingHorizontal: 14, paddingVertical: 14 },
  tabText: { fontSize: 14, fontWeight: '700' },
  podium: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  podiumItem: { alignItems: 'center', flex: 1 },
  podiumCenter: { marginBottom: -8 },
  podiumName: { fontWeight: '800', marginTop: 6, textAlign: 'center' },
  podiumPts: { fontSize: 11, marginTop: 2 },
  list: { padding: 16 },
});
