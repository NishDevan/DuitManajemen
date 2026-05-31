export { default } from "next-auth/middleware";

export const config = {
  // matcher digunakan untuk menentukan halaman mana saja yang dijaga ketat oleh middleware
  matcher: [
    /*
     * Match semua request ke path (halaman) di bawah ini:
     * - / (halaman utama dashboard)
     * * Halaman /login dan /register tidak perlu dimasukkan ke sini
     * karena memang harus bisa diakses oleh orang yang belum login.
     */
    "/"
  ],
};