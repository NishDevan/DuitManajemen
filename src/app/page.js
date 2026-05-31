import React from 'react';
import { Container, Grid, Paper, Typography, Box, Stack, Avatar } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getFinancialSummary, getRecentTransactions } from './actions/transactions';
import AddTransactionModal from './components/AddTransactionModal';
import TransactionTable from './components/TransactionTable';
import ExpenseChart from './components/ExpenseChart';
import ThemeToggle from './components/ThemeToggle';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const summaryResult = await getFinancialSummary(userId);
  const summary = summaryResult?.success ? summaryResult.data : { balance: 0, totalIncome: 0, totalExpense: 0 };

  const historyResult = await getRecentTransactions(userId);
  const transactions = historyResult?.success ? historyResult.data : [];

  const expensesByCategory = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', bgcolor: 'background.default', pt: 4, pb: 8 }}>
      <Container 
        maxWidth="md" 
        sx={{ 
          m: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}
      >
        {/* Stack Utama */}
        <Stack spacing={4} alignItems="center" sx={{ width: '100%' }}>
          {/* HEADER SECTION */}
          <Box 
            sx={{ 
              width: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              position: 'relative',
              gap: 2 
            }}
          >
            <Box>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700, fontFamily: 'Urbanist' }}>
                Dashboard
              </Typography>
            </Box>
            <AddTransactionModal userId={userId} />
          </Box>
          
          {/* KARTU SALDO UTAMA */}
          <Paper sx={{ 
            p: 4, 
            width: '100%',
            background: 'linear-gradient(135deg, #002D62 0%, #004b9e 100%)', 
            color: 'white', position: 'relative', overflow: 'hidden',
            borderRadius: 3,
            textAlign: 'center'
          }}>
            <Stack spacing={1} alignItems="center">
              <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>Total Saldo Saat Ini</Typography>
              <Typography variant="h2" sx={{ fontWeight: 800, fontFamily: 'Urbanist' }}>
                Rp {summary.balance.toLocaleString('id-ID')}
              </Typography>
            </Stack>
            <AccountBalanceWalletIcon sx={{ 
              position: 'absolute', right: -20, bottom: -20, 
              fontSize: 200, opacity: 0.1, color: 'white' 
            }} />
          </Paper>

          {/* KARTU PEMASUKAN & PENGELUARAN */}
          <Grid container spacing={3} sx={{ width: '100%' }}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, borderRadius: 3 }}>
                <Avatar sx={{ bgcolor: '#dcfce7', color: '#166534' }}><TrendingUpIcon /></Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">Pemasukan</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Rp {summary.totalIncome.toLocaleString('id-ID')}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, borderRadius: 3 }}>
                <Avatar sx={{ bgcolor: '#fee2e2', color: '#991b1b' }}><TrendingDownIcon /></Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">Pengeluaran</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Rp {summary.totalExpense.toLocaleString('id-ID')}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* RIWAYAT TRANSAKSI TERAKHIR */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" color="primary"sx={{ mb: 2, fontWeight: 700, fontFamily: 'Urbanist', textAlign: 'center' }}>
              Riwayat Transaksi Terakhir
            </Typography>
            <TransactionTable transactions={transactions} />
          </Box>

          {/* GRAFIK DISTRIBUSI PENGELUARAN */}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 700, fontFamily: 'Urbanist', textAlign: 'center' }}>
              Distribusi Pengeluaran
            </Typography>
            <Paper sx={{ p: 4, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 3 }}>
              <Box sx={{ width: '100%', maxWidth: 450 }}>
                <ExpenseChart expensesByCategory={expensesByCategory} />
              </Box>
            </Paper>
          </Box>

        </Stack>
      </Container>
    </Box>
  );
}