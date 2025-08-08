'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    // In a real app, you'd implement theme switching logic here
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/excuse-generator', label: 'Excuses' },
    { href: '/chatbot', label: 'Chatbot' },
    { href: '/comparison', label: 'Compare' },
    { href: '/games', label: 'Games' }
  ]

  return (
    <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-orange-400 hover:text-orange-300 transition-colors">
              HOPELESSLY
            </Link>
            <span className="text-slate-400 text-sm">the art of giving up</span>
          </div>
          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-orange-400 bg-orange-400/10'
                    : 'text-slate-300 hover:text-orange-400 hover:bg-orange-400/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className="border-slate-600 hover:bg-slate-700"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
