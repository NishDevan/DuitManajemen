import { CssBaseline } from '@mui/material';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from './components/Navbar';
import NextAuthProvider from './components/NextAuthProvider';
import AppThemeProvider from './context/ThemeContext';

export const metadata = {
  title: 'DuitManajemen',
  description: 'Aplikasi Manajemen Keuangan Pribadi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <ThemeRegistry>
            <AppThemeProvider>
              <CssBaseline /> 
              
              <Navbar />
              
              <main style={{ minHeight: '100vh' }}>
                {children}
              </main>
            </AppThemeProvider>
          </ThemeRegistry>
        </NextAuthProvider>
      </body>
    </html>
  )
}