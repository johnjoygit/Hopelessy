import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HOPELESSLY - The Art of Giving Up | TinkerHub Useless Projects',
  description: 'A satirical website celebrating the fine art of procrastination and giving up. Made by Team Duo CS for TinkerHub Useless Projects.',
  keywords: 'procrastination, demotivation, useless projects, tinkerhub, hackathon',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
