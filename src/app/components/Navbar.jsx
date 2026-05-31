'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = React.useState(null);

    if (!session) return null;

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',

        zIndex: 1100
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <AccountBalanceWalletIcon sx={{ color: 'primary.main', mr: 1, fontSize: 30 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DuitManajemen
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ThemeToggle />

            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 500 }}>
              Halo, <strong>{session.user?.name}</strong>
            </Typography>
            
            <IconButton onClick={handleMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 35, height: 35, fontSize: 16 }}>
                {session.user?.name?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ mt: '45px' }}
            >
              <MenuItem onClick={() => signOut()}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}