import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

type SlotStatus = 'available' | 'filled';

type SlotCardProps = {
  slotNumber: number;
  status: SlotStatus;
  playerName?: string;
};

export function SlotCard({ slotNumber, status, playerName }: SlotCardProps) {
  const { colors, isDark } = useTheme();

  const statusColor = status === 'available' ? colors.success : colors.secondary;
  const statusText = status === 'available' ? 'Available' : 'Filled';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: isDark ? colors.border : 'transparent',
          shadowColor: isDark ? 'transparent' : '#000',
        },
      ]}>
      {/* Slot Number */}
      <Text style={[styles.slotNumber, { color: colors.text }]}>
        Slot {slotNumber}
      </Text>

      {/* Status Badge */}
      <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
      </View>

      {/* Player Name */}
      {status === 'filled' && playerName && (
        <View style={styles.playerInfo}>
          <Text style={[styles.playerLabel, { color: colors.textSecondary }]}>
            Player:
          </Text>
          <Text style={[styles.playerName, { color: colors.text }]}>{playerName}</Text>
        </View>
      )}

      {status === 'available' && (
        <Text style={[styles.emptySlot, { color: colors.textSecondary }]}>
          Waiting for player...
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  slotNumber: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
    marginVertical: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  playerInfo: {
    marginTop: 4,
  },
  playerLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  playerName: {
    fontSize: 15,
    fontWeight: '600',
  },
  emptySlot: {
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 4,
  },
});
