import type { WalletData, Transaction } from '@/types';

const MOCK_WALLET: WalletData = {
  availableBalance: 1250,
  lockedBalance: 150,
  totalEarnings: 4800,
};

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'winning', title: 'Won — Classic Squad (Erangel)', amount: 400, date: 'Today, 8:45 PM', status: 'completed' },
  { id: 't2', type: 'debit', title: 'Joined — TDM Duo (M416)', amount: 30, date: 'Today, 7:00 PM', status: 'completed' },
  { id: 't3', type: 'credit', title: 'Added Money', amount: 500, date: 'Yesterday, 3:00 PM', status: 'completed' },
  { id: 't4', type: 'debit', title: 'Joined — Classic Solo (Miramar)', amount: 100, date: 'Yesterday, 1:00 PM', status: 'completed' },
  { id: 't5', type: 'refund', title: 'Refund — Match Cancelled', amount: 50, date: '2 days ago', status: 'completed' },
  { id: 't6', type: 'winning', title: 'Won — WOW 1v1', amount: 120, date: '3 days ago', status: 'completed' },
  { id: 't7', type: 'debit', title: 'Withdrew to Bank', amount: 500, date: '5 days ago', status: 'completed' },
  { id: 't8', type: 'credit', title: 'Added Money', amount: 1000, date: '1 week ago', status: 'completed' },
];

export const walletService = {
  getWalletData(): WalletData {
    return MOCK_WALLET;
  },

  getTransactions(): Transaction[] {
    return MOCK_TRANSACTIONS;
  },
};
