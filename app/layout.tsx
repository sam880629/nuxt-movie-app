import type { Metadata } from 'next'
import './globals.css'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import QueryProvider from '@/providers/QueryProvider'

export const metadata: Metadata = {
  title: 'CinemaHub',
  description: 'Your Ultimate Movie Destination',
  icons: { icon: '/image/logo.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen flex flex-col">
        <QueryProvider>
          <AppHeader />
          <main className="flex-1 bg-[#211c1e]">{children}</main>
          <AppFooter />
        </QueryProvider>
      </body>
    </html>
  )
}
