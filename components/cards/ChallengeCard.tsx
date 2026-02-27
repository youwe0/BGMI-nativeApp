import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { Badge } from '@/components/ui/Badge';
import type { Challenge } from '@/types';

interface ChallengeCardProps {
  challenge: Challenge;
  onPress: () => void;
  onJoin: () => void;
}

const MODE_COLOR: Record<string, string> = {
  Classic: '#00E5FF',
  TDM: '#8E2DE2',
  WOW: '#FFD700',
};

export function ChallengeCard({ challenge, onPress, onJoin }: ChallengeCardProps) {
  const { colors } = useTheme();
  const modeColor = MODE_COLOR[challenge.matchType] ?? colors.primary;
  const slotsLeft = challenge.totalSlots - challenge.filledSlots;
  const isFull = slotsLeft === 0;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <GlassCard style={styles.card} glowColor={modeColor}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={styles.hostInfo}>
            <View style={[styles.avatar, { backgroundColor: modeColor + '30' }]}>
              <Text style={[styles.avatarText, { color: modeColor }]}>
                {challenge.hostName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={[styles.hostName, { color: colors.text }]}>
                {challenge.hostName}
              </Text>
              <Text style={[styles.matchTime, { color: colors.textSecondary }]}>
                {challenge.matchTime}
              </Text>
            </View>
          </View>
          <Badge label={challenge.matchType} color={modeColor} />
        </View>

        {/* Tags row */}
        <View style={styles.tagsRow}>
          <View style={[styles.tag, { backgroundColor: colors.border + '80' }]}>
            <Text style={[styles.tagText, { color: colors.textSecondary }]}>
              {challenge.mode}
            </Text>
          </View>
          {challenge.map && (
            <View style={[styles.tag, { backgroundColor: colors.border + '80' }]}>
              <Text style={[styles.tagText, { color: colors.textSecondary }]}>
                {challenge.map}
              </Text>
            </View>
          )}
        </View>

        {/* Stats row */}
        <View style={[styles.statsRow, { borderTopColor: colors.border }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Entry</Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              ₹{challenge.entryFee}
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Prize</Text>
            <Text style={[styles.statValue, { color: '#FFD700' }]}>
              ₹{challenge.prizePool}
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Slots</Text>
            <Text
              style={[
                styles.statValue,
                { color: isFull ? colors.danger : colors.success },
              ]}>
              {isFull ? 'Full' : `${slotsLeft} left`}
            </Text>
          </View>
          <GradientButton
            label={isFull ? 'Full' : 'Join'}
            onPress={onJoin}
            disabled={isFull}
            size="sm"
            style={styles.joinBtn}
          />
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  hostInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 15, fontWeight: '800' },
  hostName: { fontSize: 14, fontWeight: '700' },
  matchTime: { fontSize: 11, marginTop: 1 },
  tagsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tagText: { fontSize: 11, fontWeight: '600' },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 12,
    gap: 8,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 10, fontWeight: '600', marginBottom: 2 },
  statValue: { fontSize: 13, fontWeight: '800' },
  statDivider: { width: 1, height: 28 },
  joinBtn: { paddingHorizontal: 14 },
});
