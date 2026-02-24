import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';

interface Tournament {
  id: string;
  name: string;
  mode: 'Solo' | 'Duo' | 'Squad';
  map: string;
  perspective: 'TPP' | 'FPP';
  maxTeams: number;
  entryFee: number;
  prizePool: number;
  registeredTeams: number;
  date: string;
  time: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  hostedBy: string;
}

const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: '1',
    name: 'Cyber Cup Season 1',
    mode: 'Squad',
    map: 'Erangel',
    perspective: 'TPP',
    maxTeams: 25,
    entryFee: 50,
    prizePool: 1000,
    registeredTeams: 18,
    date: '2026-03-01',
    time: '20:00',
    status: 'upcoming',
    hostedBy: 'YouWe Player',
  },
  {
    id: '2',
    name: 'Solo Showdown Classic',
    mode: 'Solo',
    map: 'Miramar',
    perspective: 'FPP',
    maxTeams: 100,
    entryFee: 20,
    prizePool: 1500,
    registeredTeams: 100,
    date: '2026-02-28',
    time: '18:00',
    status: 'ongoing',
    hostedBy: 'EliteSniper',
  },
  {
    id: '3',
    name: 'Duo Desert War',
    mode: 'Duo',
    map: 'Sanhok',
    perspective: 'TPP',
    maxTeams: 50,
    entryFee: 30,
    prizePool: 2000,
    registeredTeams: 50,
    date: '2026-02-20',
    time: '21:00',
    status: 'completed',
    hostedBy: 'GamerPro',
  },
  {
    id: '4',
    name: 'Vikendi Winter War',
    mode: 'Squad',
    map: 'Vikendi',
    perspective: 'FPP',
    maxTeams: 16,
    entryFee: 100,
    prizePool: 5000,
    registeredTeams: 6,
    date: '2026-03-10',
    time: '19:00',
    status: 'upcoming',
    hostedBy: 'NoobMaster',
  },
];

const STATUS_COLORS: Record<string, string> = {
  upcoming: '#00E5FF',
  ongoing: '#10B981',
  completed: '#9BA1A6',
};

type Filter = 'all' | 'upcoming' | 'ongoing' | 'completed';

export default function TournamentsScreen() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered =
    filter === 'all' ? MOCK_TOURNAMENTS : MOCK_TOURNAMENTS.filter((t) => t.status === filter);

  const renderCard = ({ item }: { item: Tournament }) => {
    const statusColor = STATUS_COLORS[item.status];
    const slotsPercent = Math.min(item.registeredTeams / item.maxTeams, 1);
    const isFull = item.registeredTeams >= item.maxTeams;

    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() =>
          router.push({ pathname: '/tournament-detail', params: { id: item.id } })
        }
        activeOpacity={0.85}>
        {/* Card header */}
        <View style={styles.cardHeader}>
          <Text style={[styles.tournamentName, { color: colors.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
          </View>
        </View>

        {/* Mode / Map / Perspective tags */}
        <View style={styles.tagRow}>
          {[item.mode, item.map, item.perspective].map((tag) => (
            <View
              key={tag}
              style={[styles.tag, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Text style={[styles.tagText, { color: colors.textSecondary }]}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>₹{item.entryFee}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Entry</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.secondary }]}>₹{item.prizePool}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Prize Pool</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: isFull ? colors.error : colors.text }]}>
              {item.registeredTeams}/{item.maxTeams}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Teams</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={[styles.progressBg, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${slotsPercent * 100}%` as any,
                backgroundColor: isFull ? colors.error : colors.primary,
              },
            ]}
          />
        </View>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <Text style={[styles.dateText, { color: colors.textSecondary }]}>
            📅 {item.date}  ·  {item.time}
          </Text>
          <View style={[styles.viewBtn, { backgroundColor: colors.primary + '22' }]}>
            <Text style={[styles.viewBtnText, { color: colors.primary }]}>View →</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const filters: Filter[] = ['all', 'upcoming', 'ongoing', 'completed'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Tournaments</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {filtered.length} tournament{filtered.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Create CTA */}
      <TouchableOpacity
        style={[styles.createBtn, { backgroundColor: colors.primary }]}
        onPress={() => router.push('/create-tournament')}
        activeOpacity={0.85}>
        <Text style={styles.createBtnText}>+ Create Tournament</Text>
      </TouchableOpacity>

      {/* Filter chips */}
      <View style={styles.filterRow}>
        {filters.map((f) => {
          const active = filter === f;
          return (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterChip,
                {
                  backgroundColor: active ? colors.primary + '22' : 'transparent',
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}
              onPress={() => setFilter(f)}>
              <Text
                style={[
                  styles.filterChipText,
                  { color: active ? colors.primary : colors.textSecondary },
                ]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tournament list */}
      <FlatList
        data={filtered}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 14, marginTop: 4 },
  createBtn: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createBtnText: { color: '#0B0F14', fontSize: 16, fontWeight: '700' },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginVertical: 12,
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: { fontSize: 13, fontWeight: '600' },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tournamentName: { fontSize: 16, fontWeight: '700', flex: 1, marginRight: 10 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  statusText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  tagRow: { flexDirection: 'row', gap: 6, marginBottom: 12, flexWrap: 'wrap' },
  tag: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: '500' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 15, fontWeight: '700' },
  statLabel: { fontSize: 11, marginTop: 2 },
  progressBg: { height: 4, borderRadius: 2, marginBottom: 12 },
  progressFill: { height: 4, borderRadius: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dateText: { fontSize: 12 },
  viewBtn: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  viewBtnText: { fontSize: 13, fontWeight: '600' },
});
