import { withAuth } from "next-auth/middleware";

// 💡 PERBAIKAN: Bungkus di dalam fungsi eksplisit agar compiler Next.js mengenalnya sebagai fungsi middleware
export default withAuth(
  function middleware(req) {
    // Biarkan kosong, NextAuth otomatis menangani proteksi & redirect ke halaman login
  },
  {
    pages: {
      signIn: "/login", // Sesuaikan ke rute login custom kamu jika ada (misal: "/login")
    },
  }
);

export const config = {
  // matcher digunakan untuk menentukan halaman mana saja yang dijaga ketat oleh middleware
  matcher: [
    "/"
  ],
};