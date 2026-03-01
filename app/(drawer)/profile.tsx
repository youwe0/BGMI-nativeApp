import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { profileService } from '@/services/profileService';

const TIER_COLOR: Record<string, string> = {
  Crown: '#FFD700', Ace: '#00E5FF', Diamond: '#8E2DE2', Platinum: '#00FF9D',
};

export default function ProfileScreen() {
  const { colors } = useTheme();
  const player = profileService.getMyProfile();
  const tierColor = TIER_COLOR[player.tier] ?? colors.primary;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Avatar & Name ── */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatar, { backgroundColor: tierColor + '30', borderColor: tierColor + '60' }]}>
            <Text style={[styles.avatarText, { color: tierColor }]}>
              {player.username.charAt(0)}
            </Text>
          </View>
          <Text style={[styles.username, { color: colors.text }]}>{player.username}</Text>
          <Badge label={player.rank} color={tierColor} style={styles.rankBadge} />

          {/* Skill tags */}
          <View style={styles.tagsRow}>
            {player.skillTags.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: colors.border + '80' }]}>
                <Text style={[styles.tagText, { color: colors.textSecondary }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Stats Grid ── */}
        <GlassCard style={styles.section} glowColor={tierColor}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Stats</Text>
          <View style={styles.statsGrid}>
            {[
              ['K/D Ratio', player.kdRatio.toFixed(1), colors.primary],
              ['Win Rate', `${player.winRate}%`, colors.success],
              ['Matches', String(player.totalMatches), colors.text],
              ['Earnings', `₹${player.totalEarnings.toLocaleString()}`, '#FFD700'],
              ['Fav. Mode', player.favoriteMode, colors.secondary],
              ['Region', player.region, colors.textSecondary],
            ].map(([label, value, color]) => (
              <View key={label} style={[styles.statCard, { backgroundColor: colors.background + '80' }]}>
                <Text style={[styles.statValue, { color: color as string }]} numberOfLines={1}>
                  {value}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* ── Player Info ── */}
        <GlassCard style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Player Info</Text>
          {[
            ['ID', `#${player.id.toUpperCase()}`],
            ['Team', player.team],
            ['Region', player.region],
            ['Tier', player.tier],
          ].map(([key, val]) => (
            <View key={key} style={[styles.infoRow, { borderBottomColor: colors.border }]}>
              <Text style={[styles.infoKey, { color: colors.textSecondary }]}>{key}</Text>
              <Text style={[styles.infoVal, { color: colors.text }]}>{val}</Text>
            </View>
          ))}
        </GlassCard>

        {/* ── Recent Matches ── */}
        <GlassCard style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Matches</Text>
          {player.recentMatches.slice(0, 5).map((match) => (
            <View key={match.id} style={[styles.matchRow, { borderBottomColor: colors.border }]}>
              <View>
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

        {/* ── Achievements Preview ── */}
        <GlassCard style={styles.section} glowColor={colors.secondary}>
          <View style={styles.achHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Achievements</Text>
            <TouchableOpacity onPress={() => router.push('/achievements')}>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.achRow}>
            {player.achievements.filter((a) => a.status === 'unlocked').slice(0, 4).map((ach) => (
              <View key={ach.id} style={[styles.achTile, { backgroundColor: colors.background + '80' }]}>
                <Text style={styles.achEmoji}>{ach.emoji}</Text>
                <Text style={[styles.achTitle, { color: colors.text }]} numberOfLines={2}>
                  {ach.title}
                </Text>
              </View>
            ))}
          </View>
        </GlassCard>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16 },

  profileHeader: { alignItems: 'center', marginBottom: 20, paddingTop: 8 },
  avatar: {
    width: 96, height: 96, borderRadius: 48, justifyContent: 'center',
    alignItems: 'center', marginBottom: 12, borderWidth: 2,
  },
  avatarText: { fontSize: 38, fontWeight: '900' },
  username: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  rankBadge: { marginBottom: 12, alignSelf: 'center' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tagText: { fontSize: 11, fontWeight: '600' },

  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 14 },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { width: '47%', padding: 14, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '900', marginBottom: 4 },
  statLabel: { fontSize: 11, fontWeight: '600' },

  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1,
  },
  infoKey: { fontSize: 14 },
  infoVal: { fontSize: 14, fontWeight: '600' },

  matchRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1,
  },
  matchType: { fontSize: 13, fontWeight: '600' },
  matchDate: { fontSize: 11, marginTop: 2 },
  matchRight: { alignItems: 'flex-end', gap: 4 },
  matchKills: { fontSize: 11 },

  achHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  seeAll: { fontSize: 13, fontWeight: '700' },
  achRow: { flexDirection: 'row', gap: 10 },
  achTile: { flex: 1, alignItems: 'center', padding: 10, borderRadius: 12 },
  achEmoji: { fontSize: 28, marginBottom: 6 },
  achTitle: { fontSize: 10, fontWeight: '700', textAlign: 'center' },
});
