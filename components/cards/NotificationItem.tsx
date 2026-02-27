import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import type { Notification } from '@/types';

interface NotificationItemProps {
  notification: Notification;
}

const TYPE_EMOJI: Record<string, string> = {
  challenge: '⚡',
  match: '🎮',
  win: '🏆',
  result: '📊',
  system: '🔔',
};

export function NotificationItem({ notification }: NotificationItemProps) {
  const { colors } = useTheme();
  const emoji = TYPE_EMOJI[notification.type] ?? '🔔';

  return (
    <View
      style={[
        styles.item,
        {
          backgroundColor: colors.card,
          borderColor: notification.read ? colors.border : colors.primary + '40',
          borderLeftColor: notification.read ? colors.border : colors.primary,
        },
      ]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <View style={styles.content}>
        <Text style={[styles.message, { color: colors.text }]}>{notification.message}</Text>
        <Text style={[styles.time, { color: colors.textSecondary }]}>{notification.timestamp}</Text>
      </View>
      {!notification.read && (
        <View style={[styles.dot, { backgroundColor: colors.primary }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 3,
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  emoji: { fontSize: 22 },
  content: { flex: 1 },
  message: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  time: { fontSize: 11, marginTop: 3 },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
