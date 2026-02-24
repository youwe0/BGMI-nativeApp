import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLocalSearchParams, router } from 'expo-router';

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
  description: string;
  roomType: string;
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
    description:
      'Join the biggest squad tournament of the season! Top 3 teams win cash prizes. Fair play enforced.',
    roomType: 'Public',
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
    description:
      'Classic solo survival on Miramar. FPP only. May the best player win!',
    roomType: 'Public',
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
    description: 'A duo tournament on the jungle map. Winners receive trophy + cash prizes.',
    roomType: 'Public',
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
    description:
      'Premium squad tournament on the snow map. High entry, massive prize. Only 16 squads allowed!',
    roomType: 'Private',
  },
];

const TEAM_NAMES = [
  'Team Alpha', 'Shadow Squad', 'Death Reapers', 'Pro Fraggers',
  'Night Wolves', 'Steel Storm', 'Ghost Protocol', 'Final Zone',
  'Apex Predators', 'Rush B Boys', 'Zone Crushers', 'Silent Killers',
  'Bullet Force', 'Kraken Squad', 'Iron Fist', 'Blue Helmets',
  'Dark Horsemen', 'Peak Hunters',
];

const STATUS_COLORS: Record<string, string> = {
  upcoming: '#00E5FF',
  ongoing: '#10B981',
  completed: '#9BA1A6',
};

const RANK_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const RANK_LABELS = ['1st', '2nd', '3rd'];

export default function TournamentDetailScreen() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [registered, setRegistered] = useState(false);

  const tournament = MOCK_TOURNAMENTS.find((t) => t.id === id) ?? MOCK_TOURNAMENTS[0];
  const statusColor = STATUS_COLORS[tournament.status];
  const slotsPercent = Math.min(tournament.registeredTeams / tournament.maxTeams, 1);
  const isFull = tournament.registeredTeams >= tournament.maxTeams;
  const canRegister = tournament.status === 'upcoming' && !isFull;
  const emptySlots = tournament.maxTeams - tournament.registeredTeams;

  const registeredTeamList = TEAM_NAMES.slice(0, tournament.registeredTeams);

  // Prize breakdown: 50% / 30% / 20%
  const prizes = [
    Math.floor(tournament.prizePool * 0.5),
    Math.floor(tournament.prizePool * 0.3),
    Math.floor(tournament.prizePool * 0.2),
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header bar */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backBtn, { color: colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {tournament.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={[styles.tournamentName, { color: colors.text }]}>{tournament.name}</Text>
          <Text style={[styles.hostedBy, { color: colors.textSecondary }]}>
            Hosted by  {tournament.hostedBy}
          </Text>
          {tournament.description ? (
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {tournament.description}
            </Text>
          ) : null}
        </View>

        {/* Tags */}
        <View style={styles.tagRow}>
          {[tournament.mode, tournament.map, tournament.perspective].map((tag) => (
            <View
              key={tag}
              style={[styles.tag, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.tagText, { color: colors.textSecondary }]}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Key stats card */}
        <View
          style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>🏆</Text>
              <Text style={[styles.statValue, { color: colors.secondary }]}>
                ₹{tournament.prizePool}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Prize Pool</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>🎫</Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                ₹{tournament.entryFee}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Entry Fee</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>👥</Text>
              <Text
                style={[
                  styles.statValue,
                  { color: isFull ? colors.error : colors.text },
                ]}>
                {tournament.registeredTeams}/{tournament.maxTeams}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Teams</Text>
            </View>
          </View>
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
          <Text style={[styles.slotsText, { color: colors.textSecondary }]}>
            {isFull
              ? 'All slots filled'
              : `${emptySlots} slot${emptySlots !== 1 ? 's' : ''} remaining`}
          </Text>
        </View>

        {/* Schedule */}
        <View
          style={[
            styles.sectionCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Schedule</Text>
          <View style={styles.scheduleRow}>
            <Text style={styles.scheduleEmoji}>📅</Text>
            <View>
              <Text style={[styles.scheduleValue, { color: colors.text }]}>{tournament.date}</Text>
              <Text style={[styles.scheduleLabel, { color: colors.textSecondary }]}>
                Tournament Date
              </Text>
            </View>
          </View>
          <View style={styles.scheduleRow}>
            <Text style={styles.scheduleEmoji}>⏰</Text>
            <View>
              <Text style={[styles.scheduleValue, { color: colors.text }]}>
                {tournament.time} IST
              </Text>
              <Text style={[styles.scheduleLabel, { color: colors.textSecondary }]}>
                Start Time
              </Text>
            </View>
          </View>
        </View>

        {/* Prize Distribution */}
        <View
          style={[
            styles.sectionCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Prize Distribution</Text>
          {prizes.map((amount, i) => (
            <View key={RANK_LABELS[i]} style={styles.prizeRow}>
              <View
                style={[
                  styles.rankBadge,
                  { backgroundColor: RANK_COLORS[i] + '22' },
                ]}>
                <Text style={[styles.rankText, { color: RANK_COLORS[i] }]}>
                  {RANK_LABELS[i]}
                </Text>
              </View>
              <Text style={[styles.prizeAmount, { color: colors.text }]}>₹{amount}</Text>
              <View style={[styles.prizeBar, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.prizeFill,
                    {
                      width: `${(amount / tournament.prizePool) * 100}%` as any,
                      backgroundColor: RANK_COLORS[i],
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Room Details */}
        <View
          style={[
            styles.sectionCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Room Details</Text>
          {[
            ['Room Type', tournament.roomType],
            [
              'Room ID',
              tournament.status === 'upcoming'
                ? 'Shared before match'
                : `BGMI${tournament.id}2026`,
            ],
            [
              'Password',
              tournament.status === 'upcoming' ? 'Shared before match' : '••••••',
            ],
          ].map(([key, val]) => (
            <View key={key} style={styles.roomRow}>
              <Text style={[styles.roomKey, { color: colors.textSecondary }]}>{key}</Text>
              <Text style={[styles.roomValue, { color: colors.text }]}>{val}</Text>
            </View>
          ))}
        </View>

        {/* Registered Teams grid */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 12 }]}>
          Registered Teams ({tournament.registeredTeams})
        </Text>
        <View style={styles.teamsGrid}>
          {registeredTeamList.map((team, i) => (
            <View
              key={team}
              style={[
                styles.teamSlot,
                { backgroundColor: colors.card, borderColor: colors.secondary + '55' },
              ]}>
              <View style={[styles.teamAvatar, { backgroundColor: colors.secondary + '22' }]}>
                <Text style={{ fontSize: 18 }}>⚔️</Text>
              </View>
              <Text style={[styles.teamSlotNum, { color: colors.textSecondary }]}>
                #{i + 1}
              </Text>
              <Text style={[styles.teamName, { color: colors.text }]} numberOfLines={2}>
                {team}
              </Text>
            </View>
          ))}
          {Array.from({ length: Math.min(emptySlots, 4) }).map((_, i) => (
            <View
              key={`empty-${i}`}
              style={[
                styles.teamSlot,
                styles.emptySlot,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}>
              <Text style={[{ fontSize: 22, color: colors.border }]}>+</Text>
              <Text style={[styles.teamName, { color: colors.border }]}>Open</Text>
            </View>
          ))}
        </View>
        {emptySlots > 4 && (
          <Text style={[styles.moreSlots, { color: colors.textSecondary }]}>
            +{emptySlots - 4} more open slots
          </Text>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* CTA footer */}
      <View
        style={[
          styles.footer,
          { backgroundColor: colors.background, borderTopColor: colors.border },
        ]}>
        {canRegister ? (
          registered ? (
            <View
              style={[
                styles.registeredBanner,
                { backgroundColor: colors.success + '22', borderColor: colors.success },
              ]}>
              <Text style={[styles.registeredText, { color: colors.success }]}>
                ✓  Registered! Room details will be shared before the match.
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.joinBtn, { backgroundColor: colors.primary }]}
              onPress={() => setRegistered(true)}
              activeOpacity={0.85}>
              <Text style={styles.joinBtnText}>
                Register Now  ·  ₹{tournament.entryFee} Entry
              </Text>
            </TouchableOpacity>
          )
        ) : (
          <View style={[styles.joinBtn, { backgroundColor: colors.border }]}>
            <Text style={[styles.joinBtnText, { color: colors.textSecondary }]}>
              {tournament.status === 'completed'
                ? 'Tournament Completed'
                : 'Registration Full'}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backBtn: { fontSize: 15, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 },
  statusText: { fontSize: 12, fontWeight: '700' },
  content: { paddingHorizontal: 20 },
  hero: { paddingTop: 20, paddingBottom: 14 },
  tournamentName: { fontSize: 26, fontWeight: '800', marginBottom: 6 },
  hostedBy: { fontSize: 14, marginBottom: 10 },
  description: { fontSize: 14, lineHeight: 21 },
  tagRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 16 },
  tag: { borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1 },
  tagText: { fontSize: 13, fontWeight: '600' },
  statsCard: { borderRadius: 14, padding: 16, borderWidth: 1, marginBottom: 14 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 14 },
  statItem: { alignItems: 'center', flex: 1 },
  statEmoji: { fontSize: 20, marginBottom: 6 },
  statValue: { fontSize: 16, fontWeight: '800' },
  statLabel: { fontSize: 11, marginTop: 3 },
  statDivider: { width: 1, alignSelf: 'stretch' },
  progressBg: { height: 6, borderRadius: 3, marginBottom: 8 },
  progressFill: { height: 6, borderRadius: 3 },
  slotsText: { fontSize: 12, textAlign: 'center' },
  sectionCard: { borderRadius: 14, padding: 16, borderWidth: 1, marginBottom: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  scheduleEmoji: { fontSize: 20, width: 28 },
  scheduleValue: { fontSize: 15, fontWeight: '600' },
  scheduleLabel: { fontSize: 12, marginTop: 3 },
  prizeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  rankBadge: { width: 40, paddingVertical: 5, borderRadius: 8, alignItems: 'center' },
  rankText: { fontSize: 12, fontWeight: '700' },
  prizeAmount: { fontSize: 14, fontWeight: '700', width: 72 },
  prizeBar: { flex: 1, height: 6, borderRadius: 3 },
  prizeFill: { height: 6, borderRadius: 3 },
  roomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
  },
  roomKey: { fontSize: 14 },
  roomValue: { fontSize: 14, fontWeight: '600' },
  teamsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 10 },
  teamSlot: {
    width: '47%',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  emptySlot: { opacity: 0.45, justifyContent: 'center' },
  teamAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamSlotNum: { fontSize: 10, fontWeight: '600', marginBottom: 4 },
  teamName: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
  moreSlots: { fontSize: 13, textAlign: 'center', marginBottom: 6 },
  footer: { padding: 20, paddingBottom: 24, borderTopWidth: 1 },
  joinBtn: { borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  joinBtnText: { color: '#0B0F14', fontSize: 16, fontWeight: '700' },
  registeredBanner: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  registeredText: { fontSize: 14, fontWeight: '600', textAlign: 'center', lineHeight: 20 },
});
