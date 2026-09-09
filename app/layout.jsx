import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { CartProvider } from '@/contexts/CartContext'
import './globals.css'

export const metadata = {
  title: 'Marketplace - Premium E-Commerce',
  description: 'Browse and shop premium consumer goods',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export const viewport = {
  colorScheme: 'light',
  themeColor: '#F68B1E',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white">
      <body className="antialiased bg-white text-text-primary">
        <CartProvider>
          {children}
        </CartProvider>
        <Toaster position="bottom-right" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
