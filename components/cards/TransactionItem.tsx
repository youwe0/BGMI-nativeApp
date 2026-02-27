import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import type { Transaction } from '@/types';

interface TransactionItemProps {
  transaction: Transaction;
}

const TYPE_EMOJI: Record<string, string> = {
  credit: '⬆️',
  debit: '⬇️',
  winning: '🏆',
  refund: '↩️',
};

export function TransactionItem({ transaction }: TransactionItemProps) {
  const { colors } = useTheme();
  const isCredit = transaction.type === 'credit' || transaction.type === 'winning' || transaction.type === 'refund';
  const amountColor = isCredit ? colors.success : colors.danger;

  return (
    <View
      style={[
        styles.item,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}>
      <View style={[styles.iconBox, { backgroundColor: amountColor + '20' }]}>
        <Text style={styles.emoji}>{TYPE_EMOJI[transaction.type] ?? '💰'}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]}>{transaction.title}</Text>
        <Text style={[styles.date, { color: colors.textSecondary }]}>{transaction.date}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {isCredit ? '+' : '-'}₹{transaction.amount}
        </Text>
        <Text style={[styles.status, { color: colors.textSecondary }]}>
          {transaction.status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: { fontSize: 18 },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600' },
  date: { fontSize: 11, marginTop: 2 },
  right: { alignItems: 'flex-end' },
  amount: { fontSize: 15, fontWeight: '800' },
  status: { fontSize: 10, marginTop: 2, textTransform: 'capitalize' },
});
