'use client';

import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, Box,
  IconButton, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, FormControl, InputLabel, Select, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteTransaction, updateTransaction } from '../actions/transactions'; 

export default function TransactionTable({ transactions }) {
  const [loadingId, setLoadingId] = useState(null); 
  const [openEdit, setOpenEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '',
    type: 'EXPENSE',
    amount: '',
    category: '',
    description: '',
    date: ''
  });

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      setLoadingId(id);
      const result = await deleteTransaction(id);
      
      if (!result.success) {
        alert('Gagal menghapus: ' + result.error);
      }
      setLoadingId(null);
    }
  };

  const handleEditClick = (transaction) => {
    const formattedDate = transaction.date 
      ? new Date(transaction.date).toISOString().split('T')[0] 
      : '';

    setFormData({
      id: transaction.id,
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description || '',
      date: formattedDate
    });
    setOpenEdit(true); 
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    const updatedData = {
      amount: Number(formData.amount), 
      type: formData.type,
      category: formData.category,
      description: formData.description,
      date: new Date(formData.date).toISOString() 
    };

    const result = await updateTransaction(formData.id, updatedData);

    if (result.success) {
      setOpenEdit(false); 
    } else {
      alert('Gagal mengubah transaksi: ' + result.error);
    }
    setEditLoading(false);
  };

  if (!transactions || transactions.length === 0) {
    return (
      <Paper sx={{ p: 8, textAlign: 'center', bgcolor: 'transparent', border: '2px dashed', borderColor: 'divider', boxShadow: 'none' }}>
        <Typography color="text.secondary">Belum ada transaksi terdeteksi.</Typography>
      </Paper>
    );
  }

  return (
    <>
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'action.hover' }}>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>DESKRIPSI</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>KATEGORI</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>TANGGAL</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>NOMINAL</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary' }}>AKSI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ fontWeight: 600 }}>{row.description || 'Tanpa keterangan'}</TableCell>
                <TableCell>
                  <Box component="span" sx={{ 
                    px: 1.5, 
                    py: 0.5, 
                    bgcolor: 'divider',
                    color: 'text.primary',
                    borderRadius: 1, 
                    fontSize: '0.75rem', 
                    fontWeight: 700 
                  }}>
                    {row.category.toUpperCase()}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>
                  {new Date(row.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </TableCell>
                <TableCell align="right" sx={{ 
                  fontWeight: 700, 
                  color: row.type === 'INCOME' ? '#10B981' : '#EF4444' // Merah & Hijau tetap dipertahankan
                }}>
                  {row.type === 'INCOME' ? '+' : '-'} Rp {row.amount.toLocaleString('id-ID')}
                </TableCell>
                <TableCell align="center">
                  {loadingId === row.id ? (
                    <CircularProgress size={24} />
                  ) : (
                    <>
                      <IconButton size="small" onClick={() => handleEditClick(row)} color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(row.id)} color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* POP-UP MODAL UNTUK EDIT TRANSAKSI */}
      <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <form onSubmit={handleSaveEdit}>
          <DialogTitle sx={{ fontWeight: 700, fontFamily: 'Urbanist' }}>Ubah Transaksi</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="edit-type-label">Jenis Transaksi</InputLabel>
                <Select
                  labelId="edit-type-label"
                  name="type"
                  value={formData.type}
                  label="Jenis Transaksi"
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="INCOME">Pemasukan (+)</MenuItem>
                  <MenuItem value="EXPENSE">Pengeluaran (-)</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Jumlah (Rupiah)"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                fullWidth
                required
              />

              <TextField
                label="Kategori"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                fullWidth
                required
              />

              <TextField
                label="Catatan / Keterangan"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
              />

              <TextField
                label="Tanggal"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={handleCloseEdit} color="inherit" disabled={editLoading}>
              Batal
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              color="primary" 
              disabled={editLoading}
            >
              {editLoading ? <CircularProgress size={24} color="inherit" /> : 'Simpan Perubahan'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}