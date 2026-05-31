'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Box, Typography, useTheme } from '@mui/material'; 

const COLORS = ['#002D62', '#004b9e', '#0284c7', '#38bdf8', '#818cf8', '#a78bfa'];

export default function ExpenseChart({ expensesByCategory }) {
  const theme = useTheme();

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({
    name: name.toUpperCase(),
    value: value,
  }));

  if (data.length === 0) {
    return (
      <Box sx={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Belum ada data pengeluaran.
        </Typography>
      </Box>
    );
  }

  const formatTooltip = (value) => {
    return [`Rp ${value.toLocaleString('id-ID')}`, 'Total'];
  };

  // 💡 PERBAIKAN: Fungsi khusus untuk me-render teks legenda
  const renderLegendText = (value, entry) => {
    return (
      <span style={{ color: theme.palette.text.primary }}>
        {value}
      </span>
    );
  };

  return (
    <Box sx={{ width: '100%', height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
          <Tooltip 
            formatter={formatTooltip}
            contentStyle={{ 
              backgroundColor: theme.palette.background.paper, 
              border: 'none',
              borderRadius: '8px',
              color: theme.palette.text.primary 
            }} 
            itemStyle={{ color: theme.palette.text.primary }}
          />
          
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={renderLegendText}
            wrapperStyle={{ 
              fontSize: '12px', 
              fontWeight: 600, 
              paddingTop: '15px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}