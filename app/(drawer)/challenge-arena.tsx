import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { GradientButton } from '@/components/ui/GradientButton';
import { ChallengeCard } from '@/components/cards/ChallengeCard';
import { challengeService } from '@/services/challengeService';
import type { MatchType } from '@/types';

const TABS = ['All', 'Classic', 'TDM', 'WOW'] as const;
type Tab = typeof TABS[number];

export default function ChallengeArenaScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>('All');

  const challenges = useMemo(
    () => challengeService.getChallengesByType(activeTab),
    [activeTab]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Filter tabs */}
      <View style={[styles.tabBar, { borderBottomColor: colors.border }]}>
        {TABS.map((tab) => {
          const active = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                active && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
              ]}
              onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  { color: active ? colors.primary : colors.textSecondary },
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Challenge list */}
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>⚡</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No challenges yet</Text>
            <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
              Be the first to create one!
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ChallengeCard
            challenge={item}
            onPress={() => router.push(`/challenge-detail?id=${item.id}`)}
            onJoin={() => router.push(`/challenge-detail?id=${item.id}`)}
          />
        )}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />

      {/* Create Challenge FAB */}
      <View style={styles.fab}>
        <GradientButton
          label="⚡  Create Challenge"
          onPress={() => router.push('/create-challenge')}
          size="lg"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  tabText: { fontSize: 14, fontWeight: '700' },
  list: { padding: 16 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  emptySub: { fontSize: 14 },
  fab: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
});
