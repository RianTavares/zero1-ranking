import type { Metadata } from 'next'
import { Providers } from './providers';
import { Inter } from 'next/font/google';
import '@/styles/globals.scss';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZERO1 BEACH TENNIS TOUR RANKING',
  description: 'Ranking oficial do circuito Zero1 Beach Tennis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
