import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { NotificationItem } from '@/components/cards/NotificationItem';
import { notificationService } from '@/services/notificationService';
import type { Notification } from '@/types';

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>(
    notificationService.getNotifications()
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header row */}
      <View style={[styles.headerRow, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Notifications
          {unreadCount > 0 && (
            <Text style={{ color: colors.primary }}> ({unreadCount})</Text>
          )}
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={[styles.markAll, { color: colors.primary }]}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔔</Text>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>All caught up!</Text>
            <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
              No new notifications
            </Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 32 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  markAll: { fontSize: 13, fontWeight: '600' },
  list: { padding: 16 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  emptySub: { fontSize: 14 },
});
