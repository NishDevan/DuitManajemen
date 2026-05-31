'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Container, Box, Paper, Typography, TextField, Button, Alert, Link as MuiLink 
} from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error === 'CredentialsSignin' ? 'Email atau password salah!' : result.error);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Typography component="h1" variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
            Selamat Datang Kembali
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
            Silakan masuk untuk mengakses catatan keuangan Anda
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Alamat Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
            >
              {loading ? 'Memverifikasi...' : 'Masuk ke Aplikasi'}
            </Button>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" textAlign="center">
                Belum punya akun?{' '}
                <MuiLink component={Link} href="/register" underline="hover" fontWeight="bold">
                  Daftar akun gratis
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}