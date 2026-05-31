'use client';

import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import {
    Container, Box, Paper, Typography, TextField, Button, Alert, Link as MuiLink
} from '@mui/material';
import Link from 'next/link';
import { registerUser } from '../actions/auth';

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const data = new FormData(event.currentTarget);
        const name = data.get('name');
        const email = data.get('email');
        const password = data.get('password');

        const result = await registerUser({ name, email, password });

        setLoading(false);

        if (!result.success) {
            setError(result.error);
        } else {
            setSuccess(result.message);

            setTimeout(() => {
                router.push('/login');
            }, 2000);
        }
    };

    return (
        <Container maxWidth="sm">
      <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Typography component="h1" variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
            Register
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
            Kelola keuangan pribadimu dengan lebih rapi
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nama Lengkap"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Alamat Email"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
            >
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </Button>
            <Box sx={{ textAlignment: 'center', mt: 2 }}>
              <Typography variant="body2" textAlign="center">
                Sudah punya akun?{' '}
                <MuiLink component={Link} href="/login" underline="hover" fontWeight="bold">
                  Login
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
    );
}