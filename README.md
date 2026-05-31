<p align="left">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white" alt="MUI" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

# DuitManajemen
**Aplikasi Manajemen Keuangan Pribadi**

DuitManajemen adalah aplikasi web modern yang dirancang untuk membantu pengguna mencatat, memantau, dan mengelola arus kas pribadi secara presisi. Dengan antarmuka yang bersih, intuitif, serta mendukung mode terang/gelap (Light/Dark Mode), aplikasi ini memudahkan Anda untuk melacak saldo total, pemasukan, pengeluaran, serta melihat distribusi pos pengeluaran dalam bentuk grafik visual yang interaktif.

---

## Fitur Utama

- **Autentikasi Pengguna Aman**: Sistem pendaftaran akun baru dan masuk (Login/Register) yang aman menggunakan **NextAuth.js**.
- **Ringkasan Finansial Dinamis (Dashboard)**: 
  - Tampilan **Total Saldo Saat Ini** secara riil.
  - Akumulasi total **Pemasukan** dan **Pengeluaran**.
- **Pencatatan Transaksi Komprehensif**:
  - Menambah transaksi baru dengan mudah (+ Tambah Transaksi).
  - Riwayat transaksi terperinci yang mencakup Deskripsi, Kategori (misal: *Allowance*, *Makan*, dll), Tanggal, dan Nominal.
  - Manajemen transaksi penuh berupa fitur **Ubah (Edit)** dan **Hapus (Delete)**.
- **Visualisasi Distribusi Pengeluaran**: Grafik lingkaran (*Pie Chart*) interaktif berbasis **Recharts** untuk melihat persentase pengeluaran berdasarkan kategori secara adaptif.
- **Mode Tampilan Adaptif**: Fitur peralihan tema otomatis/manual (Light Mode & Dark Mode) yang diintegrasikan menggunakan **Material UI (MUI) Theme Provider**.

---

## Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan ekosistem JavaScript modern dengan performa tinggi:

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Versi 15/16 dengan dukungan Turbopack/Webpack)
- **Library Interface (UI)**: [Material UI (MUI)](https://mui.com/) & `@mui/material` dengan penyelarasan `CssBaseline`.
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Data Visualization**: [Recharts](https://recharts.org/) (Responsive Pie Chart)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) dengan Database **PostgreSQL** (Hosted via Neon.tech / Supabase)
- **Deployment Platform**: [Vercel](https://vercel.com/)
