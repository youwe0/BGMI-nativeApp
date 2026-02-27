import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

const FEATURES = [
  {
    id: 'arena',
    emoji: '⚡',
    title: 'Challenge Arena',
    desc: 'Find and join live player challenges. Classic, TDM and WOW modes with real prize pools.',
    cta: 'Enter →',
    route: '/(drawer)/challenge-arena' as const,
    accent: 'primary' as const,
  },
  {
    id: 'tournaments',
    emoji: '🏆',
    title: 'Browse Tournaments',
    desc: 'Discover live, upcoming and completed BGMI tournaments. Filter by status and join with one tap.',
    cta: 'Browse →',
    route: '/(drawer)/tournaments' as const,
    accent: 'secondary' as const,
  },
  {
    id: 'create',
    emoji: '➕',
    title: 'Host a Tournament',
    desc: 'Create Classic, TDM or WOW Mode tournaments. Set entry fees, prize pools and room codes.',
    cta: 'Create →',
    route: '/create-tournament' as const,
    accent: 'secondary' as const,
  },
  {
    id: 'profile',
    emoji: '👤',
    title: 'My Profile',
    desc: 'View your stats, rank, match history and performance across all game modes.',
    cta: 'View →',
    route: '/(drawer)/profile' as const,
    accent: 'primary' as const,
  },
  {
    id: 'modes',
    emoji: '🎮',
    title: 'Three Game Modes',
    desc: 'Classic Battle Royale · Team Deathmatch · WOW Custom Modes. Solo, Duo & Squad formats.',
    cta: null,
    route: null,
    accent: 'secondary' as const,
  },
];

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>WELCOME TO</Text>
          <Text style={[styles.title, { color: colors.text }]}>Too Too</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Your BGMI tournament platform
          </Text>
        </View>

        {/* ── Quick Stats ── */}
        <View
          style={[
            styles.statsBanner,
            { backgroundColor: colors.primary + '15', borderColor: colors.primary + '40' },
          ]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>24</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Tournaments</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.primary + '30' }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>580</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Players</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.primary + '30' }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>₹50K</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Prize Pool</Text>
          </View>
        </View>

        {/* ── Feature Cards ── */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>QUICK ACCESS</Text>

        <View style={styles.cards}>
          {FEATURES.map((feature) => {
            const accent = feature.accent === 'primary' ? colors.primary : colors.secondary;

            if (feature.route) {
              return (
                <TouchableOpacity
                  key={feature.id}
                  style={[
                    styles.card,
                    { backgroundColor: colors.card, borderColor: colors.border },
                  ]}
                  onPress={() => router.push(feature.route as any)}
                  activeOpacity={0.8}>
                  <View style={styles.cardBody}>
                    <View style={[styles.emojiBox, { backgroundColor: accent + '20' }]}>
                      <Text style={styles.cardEmoji}>{feature.emoji}</Text>
                    </View>
                    <View style={styles.cardText}>
                      <Text style={[styles.cardTitle, { color: colors.text }]}>
                        {feature.title}
                      </Text>
                      <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>
                        {feature.desc}
                      </Text>
                    </View>
                  </View>
                  {feature.cta && (
                    <View style={[styles.ctaChip, { backgroundColor: accent + '20' }]}>
                      <Text style={[styles.ctaChipText, { color: accent }]}>
                        {feature.cta}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }

            // Non-clickable info card
            return (
              <View
                key={feature.id}
                style={[
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border, opacity: 0.7 },
                ]}>
                <View style={styles.cardBody}>
                  <View style={[styles.emojiBox, { backgroundColor: accent + '20' }]}>
                    <Text style={styles.cardEmoji}>{feature.emoji}</Text>
                  </View>
                  <View style={styles.cardText}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>
                      {feature.title}
                    </Text>
                    <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>
                      {feature.desc}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },

  header: { paddingTop: 8, marginBottom: 20 },
  greeting: { fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  title: { fontSize: 34, fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
  subtitle: { fontSize: 14 },

  statsBanner: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 16,
    marginBottom: 26,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11, marginTop: 2, fontWeight: '500' },
  statDivider: { width: 1 },

  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 14 },

  cards: { gap: 12 },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardBody: { flexDirection: 'row', alignItems: 'flex-start', flex: 1, gap: 14 },
  emojiBox: {
    width: 46,
    height: 46,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  cardEmoji: { fontSize: 22 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  cardDesc: { fontSize: 12, lineHeight: 18 },
  ctaChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    flexShrink: 0,
    marginLeft: 8,
  },
  ctaChipText: { fontSize: 12, fontWeight: '700' },
});
