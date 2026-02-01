import React from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { SlotCard } from '@/components/SlotCard';

// Static slot data
const SLOTS_DATA = [
  { id: 1, status: 'filled' as const, playerName: 'PlayerOne' },
  { id: 2, status: 'filled' as const, playerName: 'GamerPro' },
  { id: 3, status: 'available' as const },
  { id: 4, status: 'filled' as const, playerName: 'NoobMaster' },
  { id: 5, status: 'available' as const },
  { id: 6, status: 'available' as const },
  { id: 7, status: 'filled' as const, playerName: 'EliteSniper' },
  { id: 8, status: 'available' as const },
];

export default function SlotsScreen() {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Tournament Slots</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            8 Player Battle Royale
          </Text>
        </View>

        {/* Slots Grid */}
        <View style={styles.grid}>
          {SLOTS_DATA.map((slot) => (
            <View key={slot.id} style={styles.gridItem}>
              <SlotCard
                slotNumber={slot.id}
                status={slot.status}
                playerName={slot.playerName}
              />
            </View>
          ))}
        </View>

        {/* Stats */}
        <View style={[styles.statsContainer, { backgroundColor: colors.card }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.success }]}>4</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Available
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.secondary }]}>4</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Filled
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  gridItem: {
    width: '47%',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    borderRadius: 16,
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 50,
  },
});
