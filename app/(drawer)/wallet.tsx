import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { TransactionItem } from '@/components/cards/TransactionItem';
import { walletService } from '@/services/walletService';

export default function WalletScreen() {
  const { colors } = useTheme();
  const wallet = walletService.getWalletData();
  const transactions = walletService.getTransactions();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        ListHeaderComponent={
          <>
            {/* Balance Card */}
            <GlassCard style={styles.balanceCard}>
              <Text style={[styles.balanceLabel, { color: colors.textSecondary }]}>
                AVAILABLE BALANCE
              </Text>
              <Text style={[styles.balanceAmount, { color: colors.primary }]}>
                ₹{wallet.availableBalance.toLocaleString()}
              </Text>

              <View style={[styles.balanceDivider, { backgroundColor: colors.border }]} />

              <View style={styles.miniStats}>
                <View style={styles.miniStat}>
                  <Text style={[styles.miniLabel, { color: colors.textSecondary }]}>
                    Locked
                  </Text>
                  <Text style={[styles.miniValue, { color: colors.danger }]}>
                    ₹{wallet.lockedBalance}
                  </Text>
                </View>
                <View style={[styles.miniDivider, { backgroundColor: colors.border }]} />
                <View style={styles.miniStat}>
                  <Text style={[styles.miniLabel, { color: colors.textSecondary }]}>
                    Total Earned
                  </Text>
                  <Text style={[styles.miniValue, { color: '#FFD700' }]}>
                    ₹{wallet.totalEarnings.toLocaleString()}
                  </Text>
                </View>
              </View>
            </GlassCard>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <GradientButton
                label="＋  Add Money"
                onPress={() => {}}
                style={styles.actionBtn}
                size="md"
              />
              <TouchableOpacity
                style={[styles.withdrawBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
                activeOpacity={0.8}>
                <Text style={[styles.withdrawText, { color: colors.text }]}>
                  ↑  Withdraw
                </Text>
              </TouchableOpacity>
            </View>

            {/* Section label */}
            <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
              TRANSACTION HISTORY
            </Text>
          </>
        }
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>💰</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No transactions yet
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
  scroll: { padding: 20 },
  balanceCard: { marginBottom: 16 },
  balanceLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 8 },
  balanceAmount: { fontSize: 42, fontWeight: '900', letterSpacing: 1 },
  balanceDivider: { height: 1, marginVertical: 16 },
  miniStats: { flexDirection: 'row', alignItems: 'center' },
  miniStat: { flex: 1, alignItems: 'center' },
  miniLabel: { fontSize: 11, fontWeight: '600', marginBottom: 4 },
  miniValue: { fontSize: 18, fontWeight: '800' },
  miniDivider: { width: 1, height: 32 },
  actions: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  actionBtn: { flex: 1 },
  withdrawBtn: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  withdrawText: { fontSize: 15, fontWeight: '700' },
  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 12 },
  empty: { alignItems: 'center', paddingTop: 40 },
  emptyEmoji: { fontSize: 40, marginBottom: 10 },
  emptyText: { fontSize: 14 },
});
