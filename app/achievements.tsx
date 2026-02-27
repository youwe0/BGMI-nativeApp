import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { achievementService } from '@/services/achievementService';
import type { Achievement } from '@/types';

function AchievementTile({ achievement }: { achievement: Achievement }) {
  const { colors } = useTheme();
  const locked = achievement.status === 'locked';

  return (
    <View
      style={[
        styles.tile,
        {
          backgroundColor: locked ? colors.card + 'AA' : colors.card,
          borderColor: locked ? colors.border : colors.primary + '50',
        },
      ]}>
      <View style={styles.emojiWrap}>
        <Text style={[styles.emoji, locked && styles.emojiLocked]}>{achievement.emoji}</Text>
        {locked && (
          <View style={[styles.lockOverlay, { backgroundColor: colors.background + 'CC' }]}>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
        )}
      </View>
      <Text
        style={[
          styles.title,
          { color: locked ? colors.textSecondary : colors.text },
        ]}
        numberOfLines={2}>
        {achievement.title}
      </Text>
      <Text style={[styles.desc, { color: colors.textSecondary }]} numberOfLines={2}>
        {achievement.description}
      </Text>
    </View>
  );
}

export default function AchievementsScreen() {
  const { colors } = useTheme();
  const achievements = achievementService.getAchievements();
  const unlocked = achievements.filter((a) => a.status === 'unlocked').length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backText, { color: colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Achievements</Text>
        <Text style={[styles.count, { color: colors.textSecondary }]}>
          {unlocked}/{achievements.length}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressSection}>
        <View style={[styles.progressBg, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(unlocked / achievements.length) * 100}%` as any,
                backgroundColor: colors.primary,
              },
            ]}
          />
        </View>
        <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
          {unlocked} unlocked · {achievements.length - unlocked} remaining
        </Text>
      </View>

      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <AchievementTile achievement={item} />}
        ListFooterComponent={<View style={{ height: 32 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1,
  },
  backText: { fontSize: 15, fontWeight: '600' },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  count: { fontSize: 14 },
  progressSection: { paddingHorizontal: 20, paddingVertical: 14 },
  progressBg: { height: 6, borderRadius: 3, marginBottom: 8, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  progressLabel: { fontSize: 12 },
  grid: { padding: 12 },
  tile: {
    flex: 1,
    margin: 6,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
  },
  emojiWrap: { position: 'relative', marginBottom: 8 },
  emoji: { fontSize: 32 },
  emojiLocked: { opacity: 0.3 },
  lockOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center', alignItems: 'center', borderRadius: 4,
  },
  lockIcon: { fontSize: 16 },
  title: { fontSize: 11, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  desc: { fontSize: 9, textAlign: 'center', lineHeight: 13 },
});
