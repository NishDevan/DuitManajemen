'use client';

import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../context/ThemeContext';

export default function ThemeToggle() {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <IconButton onClick={colorMode.toggleColorMode} sx={{ color: 'text.primary' }}>
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}