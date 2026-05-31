'use client';
import React, { useState } from 'react';
import { 
  Button, Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, MenuItem, Stack, Typography, IconButton, Box, Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { createTransaction } from '../actions/transactions';
import { useRouter } from 'next/navigation';

export default function AddTransactionModal({ userId }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const amountValue = parseFloat(formData.get('amount'));
    const typeValue = formData.get('type');
    const categoryValue = formData.get('category');
    const descriptionValue = formData.get('description');
    const dateValue = formData.get('date');

    if (!amountValue || !categoryValue) {
      alert("Harap isi jumlah nominal dan kategori terlebih dahulu!");
      return;
    }

    const data = {
      amount: amountValue,
      type: typeValue || "EXPENSE",
      category: categoryValue,
      description: descriptionValue,
      date: dateValue ? new Date(dateValue) : new Date(),
      userId: userId
    };

    try {
      const result = await createTransaction(data);
      if (result?.success) {
        handleClose();
        router.refresh();
      } else {
        alert("Gagal menyimpan: " + (result?.error || "Terjadi kesalahan internal server."));
      }
    } catch (error) {
      console.error("Error submit:", error);
      alert("Terjadi masalah jaringan atau database sedang down.");
    }
  };

  return (
    <>
      <Button 
        variant="contained" 
        startIcon={<AddIcon />} 
        onClick={handleOpen}
        sx={{ px: 3, py: 1, borderRadius: 2, boxShadow: '0 4px 14px 0 rgba(0,45,98,0.39)' }}
      >
        Tambah Transaksi
      </Button>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pr: 2 }}>
          <DialogTitle sx={{ fontWeight: 700, fontSize: '1.25rem', fontFamily: 'Urbanist' }}>
            Transaksi Baru
          </DialogTitle>
        </Box>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={3}>
              <TextField
                select
                fullWidth
                label="Jenis Transaksi"
                name="type"
                defaultValue="EXPENSE"
                variant="outlined"
              >
                <MenuItem value="INCOME">Pemasukan (+)</MenuItem>
                <MenuItem value="EXPENSE">Pengeluaran (-)</MenuItem>
              </TextField>

              <TextField
                fullWidth
                label="Jumlah (Rupiah)"
                name="amount"
                type="number"
                required
                InputProps={{ startAdornment: <Typography sx={{ mr: 1, fontWeight: 700 }}>Rp</Typography> }}
              />

              <TextField
                fullWidth
                label="Kategori"
                name="category"
                placeholder="Misal: Makan, Gaji, Transport"
                required
              />

              <TextField
                fullWidth
                label="Catatan / Keterangan"
                name="description"
                multiline
                rows={2}
              />

              <TextField
                fullWidth
                label="Tanggal"
                name="date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
          </DialogContent>
          
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Batal</Button>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ px: 4, borderRadius: 2, fontWeight: 700 }}
            >
              Simpan Transaksi
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}