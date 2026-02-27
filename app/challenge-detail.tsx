import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { Badge } from '@/components/ui/Badge';
import { challengeService } from '@/services/challengeService';

const MODE_COLOR: Record<string, string> = {
  Classic: '#00E5FF', TDM: '#8E2DE2', WOW: '#FFD700',
};

export default function ChallengeDetailScreen() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const challenge = challengeService.getChallengeById(id ?? '');

  if (!challenge) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backText, { color: colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.notFound}>
          <Text style={{ fontSize: 40 }}>⚠️</Text>
          <Text style={[{ color: colors.text, fontSize: 18, fontWeight: '700', marginTop: 12 }]}>
            Challenge not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const modeColor = MODE_COLOR[challenge.matchType] ?? colors.primary;
  const slotsLeft = challenge.totalSlots - challenge.filledSlots;
  const fillPct = (challenge.filledSlots / challenge.totalSlots) * 100;
  const isOpen = challenge.status === 'open';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backText, { color: colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Challenge Detail</Text>
        <Badge label={challenge.status.toUpperCase()} color={isOpen ? colors.success : colors.danger} size="sm" />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Host & Type */}
        <GlassCard style={styles.section} glowColor={modeColor}>
          <View style={styles.hostRow}>
            <View style={[styles.avatar, { backgroundColor: modeColor + '30' }]}>
              <Text style={[styles.avatarText, { color: modeColor }]}>
                {challenge.hostName.charAt(0)}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.hostName, { color: colors.text }]}>{challenge.hostName}</Text>
              <Text style={[styles.matchTime, { color: colors.textSecondary }]}>{challenge.matchTime}</Text>
            </View>
            <Badge label={challenge.matchType} color={modeColor} />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {[
            ['Match Type', challenge.matchType],
            ['Mode', challenge.mode],
            challenge.map ? ['Map', challenge.map] : null,
            challenge.gun ? ['Gun', `${challenge.gunCategory} — ${challenge.gun}`] : null,
            challenge.wowCode ? ['WOW Code', challenge.wowCode] : null,
          ]
            .filter(Boolean)
            .map(([k, v]) => (
              <View key={k} style={styles.infoRow}>
                <Text style={[styles.infoKey, { color: colors.textSecondary }]}>{k}</Text>
                <Text style={[styles.infoVal, { color: colors.text }]}>{v}</Text>
              </View>
            ))}
        </GlassCard>

        {/* Prize & Entry */}
        <View style={styles.statsRow}>
          <GlassCard style={[styles.statCard]} glowColor="#FFD700">
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Entry Fee</Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>₹{challenge.entryFee}</Text>
          </GlassCard>
          <GlassCard style={[styles.statCard]} glowColor="#FFD700">
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Prize Pool</Text>
            <Text style={[styles.statValue, { color: '#FFD700' }]}>₹{challenge.prizePool}</Text>
          </GlassCard>
        </View>

        {/* Slots */}
        <GlassCard style={styles.section}>
          <View style={styles.slotsHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Slots</Text>
            <Text style={[styles.slotsCount, { color: slotsLeft > 0 ? colors.success : colors.danger }]}>
              {challenge.filledSlots}/{challenge.totalSlots} filled
            </Text>
          </View>
          <View style={[styles.progressBg, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${fillPct}%` as any,
                  backgroundColor: fillPct >= 100 ? colors.danger : colors.primary,
                },
              ]}
            />
          </View>
          <Text style={[styles.slotsLeft, { color: colors.textSecondary }]}>
            {slotsLeft > 0 ? `${slotsLeft} slot${slotsLeft > 1 ? 's' : ''} remaining` : 'Match is full'}
          </Text>
        </GlassCard>

        {/* Rules */}
        {challenge.rules && (
          <GlassCard style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Rules</Text>
            <Text style={[styles.rulesText, { color: colors.textSecondary }]}>{challenge.rules}</Text>
          </GlassCard>
        )}

        {/* Room Details (blurred until match starts) */}
        <GlassCard style={styles.section} glowColor={colors.secondary}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Room Details</Text>
          <Text style={[styles.roomHint, { color: colors.textSecondary }]}>
            Room ID and password will be revealed when match starts.
          </Text>
          <View style={styles.roomRow}>
            <Text style={[styles.roomLabel, { color: colors.textSecondary }]}>Room ID</Text>
            <Text style={[styles.roomBlurred, { color: colors.textSecondary, backgroundColor: colors.border }]}>
              ••••••••
            </Text>
          </View>
          <View style={styles.roomRow}>
            <Text style={[styles.roomLabel, { color: colors.textSecondary }]}>Password</Text>
            <Text style={[styles.roomBlurred, { color: colors.textSecondary, backgroundColor: colors.border }]}>
              ••••••
            </Text>
          </View>
        </GlassCard>

        {/* Match timer */}
        <GlassCard style={[styles.section, styles.timerCard]} glowColor={colors.primary}>
          <Text style={[styles.timerLabel, { color: colors.textSecondary }]}>MATCH STARTS IN</Text>
          <Text style={[styles.timerValue, { color: colors.primary }]}>02:45:30</Text>
        </GlassCard>

        {/* Action buttons */}
        <View style={styles.actions}>
          <GradientButton
            label={isOpen ? '⚡  Join Challenge' : '🔒  Match Full'}
            onPress={() => {}}
            disabled={!isOpen}
            size="lg"
            style={{ flex: 1 }}
          />
        </View>
        <View style={styles.secondaryActions}>
          <TouchableOpacity
            style={[styles.secondaryBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.8}>
            <Text style={[styles.secondaryBtnText, { color: colors.text }]}>📊 Report Result</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.secondaryBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.8}>
            <Text style={[styles.secondaryBtnText, { color: colors.text }]}>📷 Upload Screenshot</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backBtn: { padding: 20 },
  backText: { fontSize: 15, fontWeight: '600' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  scroll: { padding: 16 },
  section: { marginBottom: 12 },
  hostRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, fontWeight: '800' },
  hostName: { fontSize: 16, fontWeight: '700' },
  matchTime: { fontSize: 12, marginTop: 2 },
  divider: { height: 1, marginBottom: 14 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7 },
  infoKey: { fontSize: 14 },
  infoVal: { fontSize: 14, fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  statCard: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 11, fontWeight: '600', marginBottom: 6, letterSpacing: 0.5 },
  statValue: { fontSize: 24, fontWeight: '900' },
  slotsHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  slotsCount: { fontSize: 13, fontWeight: '700' },
  progressBg: { height: 6, borderRadius: 3, marginBottom: 8, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  slotsLeft: { fontSize: 12 },
  rulesText: { fontSize: 14, lineHeight: 22, marginTop: 8 },
  roomHint: { fontSize: 12, marginBottom: 12, marginTop: 4 },
  roomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  roomLabel: { fontSize: 14 },
  roomBlurred: { fontSize: 18, letterSpacing: 4, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  timerCard: { alignItems: 'center' },
  timerLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 8 },
  timerValue: { fontSize: 36, fontWeight: '900', letterSpacing: 2 },
  actions: { flexDirection: 'row', marginBottom: 12, marginTop: 4 },
  secondaryActions: { flexDirection: 'row', gap: 12 },
  secondaryBtn: { flex: 1, borderRadius: 12, borderWidth: 1, paddingVertical: 13, alignItems: 'center' },
  secondaryBtnText: { fontSize: 13, fontWeight: '600' },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
