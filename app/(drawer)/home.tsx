import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { profileService } from '@/services/profileService';

export default function HomeScreen() {
  const { colors, isDark } = useTheme();
  const player = profileService.getMyProfile();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Header / Greeting ── */}
        <LinearGradient
          colors={isDark
            ? [colors.primary + '18', 'transparent']
            : [colors.primary + '12', 'transparent']}
          style={styles.headerGrad}>
          <View style={styles.headerRow}>
            <View>
              <Text style={[styles.greeting, { color: colors.textSecondary }]}>WELCOME BACK</Text>
              <Text style={[styles.playerName, { color: colors.text }]} numberOfLines={1}>
                {player.username}
              </Text>
            </View>
            <View style={[styles.tierBadge, { backgroundColor: colors.primary + '20', borderColor: colors.primary + '50' }]}>
              <Text style={[styles.tierText, { color: colors.primary }]}>{player.tier}</Text>
            </View>
          </View>

          {/* ── Quick Stats ── */}
          <View style={[styles.statsBar, { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', borderColor: colors.border }]}>
            {[
              { label: 'K/D', value: player.kdRatio.toFixed(1), color: colors.primary },
              { label: 'Wins', value: String(player.recentMatches.filter(m => m.result === 'win').length), color: colors.success },
              { label: 'Earnings', value: `₹${player.totalEarnings.toLocaleString()}`, color: '#FFD700' },
              { label: 'Matches', value: String(player.totalMatches), color: colors.text },
            ].map((stat, i, arr) => (
              <React.Fragment key={stat.label}>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
                </View>
                {i < arr.length - 1 && <View style={[styles.statDiv, { backgroundColor: colors.border }]} />}
              </React.Fragment>
            ))}
          </View>
        </LinearGradient>

        {/* ── Section label ── */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>QUICK ACCESS</Text>

        {/* ── Challenge Arena — Hero Card ── */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => router.push('/(drawer)/challenge-arena' as any)}
          style={styles.heroCardWrap}>
          <LinearGradient
            colors={isDark
              ? [colors.primary + '30', colors.secondary + '25']
              : [colors.primary + '20', colors.secondary + '15']}
            style={[styles.heroCard, { borderColor: colors.primary + '40' }]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            {/* Live badge */}
            <View style={[styles.liveBadge, { backgroundColor: colors.success + '20', borderColor: colors.success + '50' }]}>
              <View style={[styles.liveDot, { backgroundColor: colors.success }]} />
              <Text style={[styles.liveText, { color: colors.success }]}>LIVE</Text>
            </View>

            <View style={styles.heroCardBody}>
              <View style={[styles.heroIconBox, { backgroundColor: colors.primary + '25' }]}>
                <Text style={styles.heroEmoji}>⚡</Text>
              </View>
              <View style={styles.heroTextBlock}>
                <Text style={[styles.heroCardTitle, { color: colors.text }]}>Challenge Arena</Text>
                <Text style={[styles.heroCardDesc, { color: colors.textSecondary }]}>
                  Find and join live 1v1 player challenges — Classic, TDM & WOW with real prize pools.
                </Text>
              </View>
            </View>

            <View style={styles.heroFooter}>
              <Text style={[styles.heroStat, { color: colors.textSecondary }]}>
                6 challenges open
              </Text>
              <View style={[styles.heroCta, { backgroundColor: colors.primary }]}>
                <Text style={styles.heroCtaText}>Enter →</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* ── Other feature cards ── */}
        <View style={styles.grid}>
          <FeatureCard
            emoji="➕"
            title="Host"
            desc="Create your own tournament"
            cta="Create"
            accent={colors.primary}
            colors={colors}
            isDark={isDark}
            onPress={() => router.push('/create-tournament' as any)}
          />
          <FeatureCard
            emoji="📊"
            title="Leaderboard"
            desc="See who's on top this week"
            cta="View"
            accent="#FFD700"
            colors={colors}
            isDark={isDark}
            onPress={() => router.push('/(drawer)/leaderboard' as any)}
          />
          <FeatureCard
            emoji="💰"
            title="Wallet"
            desc="Balance & transactions"
            cta="Open"
            accent={colors.success}
            colors={colors}
            isDark={isDark}
            onPress={() => router.push('/(drawer)/wallet' as any)}
          />
        </View>

        {/* ── Modes Banner ── */}
        <View style={[styles.modesBanner, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.modesTitle, { color: colors.text }]}>Game Modes</Text>
          <View style={styles.modesRow}>
            {[
              { emoji: '🪂', name: 'Classic', sub: 'Battle Royale' },
              { emoji: '💥', name: 'TDM', sub: 'Team Deathmatch' },
              { emoji: '🌀', name: 'WOW', sub: 'Custom Arenas' },
            ].map((mode) => (
              <View key={mode.name} style={[styles.modeItem, { backgroundColor: colors.background }]}>
                <Text style={styles.modeEmoji}>{mode.emoji}</Text>
                <Text style={[styles.modeName, { color: colors.text }]}>{mode.name}</Text>
                <Text style={[styles.modeSub, { color: colors.textSecondary }]}>{mode.sub}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

/* Small 2-column grid card */
function FeatureCard({ emoji, title, desc, cta, accent, colors, isDark, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.gridCard, { backgroundColor: colors.card, borderColor: accent + '35' }]}
      activeOpacity={0.85}
      onPress={onPress}>
      {/* colored top strip */}
      <LinearGradient
        colors={[accent + '35', accent + '08']}
        style={styles.cardStrip}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      />
      <View style={[styles.gridIconBox, { backgroundColor: accent + '18' }]}>
        <Text style={styles.gridEmoji}>{emoji}</Text>
      </View>
      <Text style={[styles.gridTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.gridDesc, { color: colors.textSecondary }]} numberOfLines={2}>{desc}</Text>
      <Text style={[styles.gridCta, { color: accent }]}>{cta} →</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: 20 },

  headerGrad: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20, marginBottom: 8 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  greeting: { fontSize: 10, fontWeight: '700', letterSpacing: 2, marginBottom: 3 },
  playerName: { fontSize: 22, fontWeight: '800' },
  tierBadge: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  tierText: { fontSize: 12, fontWeight: '700' },

  statsBar: {
    flexDirection: 'row', borderRadius: 14, borderWidth: 1,
    paddingVertical: 14,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 17, fontWeight: '800', marginBottom: 2 },
  statLabel: { fontSize: 10, fontWeight: '600' },
  statDiv: { width: 1, marginVertical: 4 },

  sectionLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2, marginBottom: 12, paddingHorizontal: 20 },

  heroCardWrap: { marginHorizontal: 16, marginBottom: 12 },
  heroCard: { borderRadius: 18, borderWidth: 1, padding: 16 },
  liveBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, borderWidth: 1, marginBottom: 12,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3 },
  liveText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },

  heroCardBody: { flexDirection: 'row', gap: 14, marginBottom: 14 },
  heroIconBox: { width: 52, height: 52, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  heroEmoji: { fontSize: 26 },
  heroTextBlock: { flex: 1 },
  heroCardTitle: { fontSize: 18, fontWeight: '800', marginBottom: 5 },
  heroCardDesc: { fontSize: 13, lineHeight: 19 },

  heroFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroStat: { fontSize: 12, fontWeight: '500' },
  heroCta: { paddingHorizontal: 18, paddingVertical: 9, borderRadius: 10 },
  heroCtaText: { fontSize: 13, fontWeight: '800', color: '#000' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 16, marginBottom: 12 },
  gridCard: {
    width: '47.5%', borderRadius: 16, borderWidth: 1,
    overflow: 'hidden', paddingBottom: 14,
  },
  cardStrip: { height: 4, marginBottom: 14 },
  gridIconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginHorizontal: 14, marginBottom: 10 },
  gridEmoji: { fontSize: 22 },
  gridTitle: { fontSize: 15, fontWeight: '800', marginHorizontal: 14, marginBottom: 4 },
  gridDesc: { fontSize: 11, lineHeight: 16, marginHorizontal: 14, marginBottom: 10 },
  gridCta: { fontSize: 12, fontWeight: '700', marginHorizontal: 14 },

  modesBanner: { marginHorizontal: 16, borderRadius: 18, borderWidth: 1, padding: 16 },
  modesTitle: { fontSize: 15, fontWeight: '700', marginBottom: 14 },
  modesRow: { flexDirection: 'row', gap: 10 },
  modeItem: { flex: 1, borderRadius: 14, padding: 12, alignItems: 'center' },
  modeEmoji: { fontSize: 24, marginBottom: 6 },
  modeName: { fontSize: 13, fontWeight: '800', marginBottom: 2 },
  modeSub: { fontSize: 10, fontWeight: '500', textAlign: 'center' },
});
