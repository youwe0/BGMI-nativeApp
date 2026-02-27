import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { Badge } from '@/components/ui/Badge';
import { profileService } from '@/services/profileService';

const TIER_COLOR: Record<string, string> = {
  Crown: '#FFD700', Ace: '#00E5FF', Diamond: '#8E2DE2', Platinum: '#00FF9D',
};

export default function PublicProfileScreen() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const player = profileService.getPublicProfile(id ?? '');

  if (!player) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backText, { color: colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.notFound}>
          <Text style={{ fontSize: 40 }}>👤</Text>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700', marginTop: 12 }}>
            Player not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const tierColor = TIER_COLOR[player.tier] ?? colors.primary;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backText, { color: colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Player Profile</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Avatar & Name */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatar, { backgroundColor: tierColor + '30', borderColor: tierColor + '60' }]}>
            <Text style={[styles.avatarText, { color: tierColor }]}>
              {player.username.charAt(0)}
            </Text>
          </View>
          <Text style={[styles.username, { color: colors.text }]}>{player.username}</Text>
          <Badge label={player.rank} color={tierColor} style={styles.rankBadge} />
          <View style={styles.tagsRow}>
            {player.skillTags.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: colors.border + '80' }]}>
                <Text style={[styles.tagText, { color: colors.textSecondary }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats */}
        <GlassCard style={styles.section} glowColor={tierColor}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Stats</Text>
          <View style={styles.statsGrid}>
            {[
              ['K/D Ratio', player.kdRatio.toFixed(1), colors.primary],
              ['Win Rate', `${player.winRate}%`, colors.success],
              ['Matches', player.totalMatches, colors.text],
              ['Earnings', `₹${player.totalEarnings.toLocaleString()}`, '#FFD700'],
            ].map(([label, value, color]) => (
              <View key={label as string} style={[styles.statCard, { backgroundColor: colors.background + '80' }]}>
                <Text style={[styles.statValue, { color: color as string }]}>{value}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Recent Matches */}
        <GlassCard style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Matches</Text>
          {player.recentMatches.slice(0, 5).map((match) => (
            <View
              key={match.id}
              style={[styles.matchRow, { borderBottomColor: colors.border }]}>
              <View style={styles.matchLeft}>
                <Text style={[styles.matchType, { color: colors.text }]}>
                  {match.matchType} — {match.mode}
                </Text>
                <Text style={[styles.matchDate, { color: colors.textSecondary }]}>{match.date}</Text>
              </View>
              <View style={styles.matchRight}>
                <Badge
                  label={match.result === 'win' ? 'WIN' : 'LOSS'}
                  color={match.result === 'win' ? colors.success : colors.danger}
                  size="sm"
                />
                <Text style={[styles.matchKills, { color: colors.textSecondary }]}>
                  {match.kills} kills
                </Text>
              </View>
            </View>
          ))}
        </GlassCard>

        {/* Challenge CTA */}
        <GradientButton
          label="⚡  Challenge This Player"
          onPress={() => router.push('/create-challenge')}
          size="lg"
          style={styles.challengeBtn}
        />

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
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 88, height: 88, borderRadius: 44, justifyContent: 'center',
    alignItems: 'center', marginBottom: 12, borderWidth: 2,
  },
  avatarText: { fontSize: 36, fontWeight: '900' },
  username: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  rankBadge: { marginBottom: 12 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tagText: { fontSize: 11, fontWeight: '600' },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 14 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { width: '47%', padding: 14, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '900', marginBottom: 4 },
  statLabel: { fontSize: 11, fontWeight: '600' },
  matchRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1,
  },
  matchLeft: {},
  matchType: { fontSize: 13, fontWeight: '600' },
  matchDate: { fontSize: 11, marginTop: 2 },
  matchRight: { alignItems: 'flex-end', gap: 4 },
  matchKills: { fontSize: 11 },
  challengeBtn: { marginTop: 8 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
