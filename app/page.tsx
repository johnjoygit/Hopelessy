'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ExternalLink, Github } from 'lucide-react'

export default function HomePage() {
  const [timeWasted, setTimeWasted] = useState('00:00')
  const [totalTime, setTotalTime] = useState('0 minutes')
  const [visitsCount, setVisitsCount] = useState(1)
  const [avgSession, setAvgSession] = useState('0 minutes')
  const [leaderboard, setLeaderboard] = useState([
    { name: 'Sarah the Sloth', excuse: 'My cat opened a startup and I had to support her', timeWasted: 192 },
    { name: 'Mike the Master', excuse: 'I was emotionally supporting my bed', timeWasted: 168 },
    { name: 'Emma the Expert', excuse: 'My plants needed emotional support', timeWasted: 114 }
  ])
  const [formData, setFormData] = useState({ name: '', excuse: '' })

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const minutes = Math.floor(elapsed / 60)
      const seconds = elapsed % 60
      setTimeWasted(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
      setTotalTime(`${minutes} minute${minutes !== 1 ? 's' : ''}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.excuse) return

    const newEntry = {
      name: formData.name,
      excuse: formData.excuse,
      timeWasted: Math.floor(Math.random() * 200) + 50
    }

    setLeaderboard(prev => [...prev, newEntry].sort((a, b) => b.timeWasted - a.timeWasted).slice(0, 10))
    setFormData({ name: '', excuse: '' })
  }

  const socialPlatforms = [
    { name: 'Facebook', icon: '📘', time: Math.floor(Math.random() * 120) + 10, url: 'https://facebook.com' },
    { name: 'Instagram', icon: '📷', time: Math.floor(Math.random() * 120) + 10, url: 'https://instagram.com' },
    { name: 'Twitter', icon: '🐦', time: Math.floor(Math.random() * 120) + 10, url: 'https://twitter.com' },
    { name: 'YouTube', icon: '📺', time: Math.floor(Math.random() * 120) + 10, url: 'https://youtube.com' }
  ]

  const totalSocialTime = socialPlatforms.reduce((sum, platform) => sum + platform.time, 0)

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-orange-900/20 to-orange-900/20"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            HOPELESSLY
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-4">
            the art of giving up
          </p>
          <div className="mb-8">
            <p className="text-sm text-slate-400 mb-2">
              A TinkerHub Useless Projects submission by Team Duo CS
            </p>
            <p className="text-lg md:text-xl text-orange-400 font-medium">
              "Remember: effort is just sweat leaving the body for no reason."
            </p>
          </div>
          <div className="mt-12 space-y-4">
            <Button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg font-semibold">
              Embrace Your Mediocrity
            </Button>
            <div className="flex justify-center space-x-4 text-sm">
              <a 
                href="https://www.tinkerhub.org/events/Q2Q1TQKX6Q/Useless%20Projects" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-slate-400 hover:text-orange-400 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>TinkerHub Useless Projects</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-orange-400">
            The Problem (that doesn't exist)
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Everyone is too motivated in recent times
          </p>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-orange-400 mt-16">
            The Solution (that nobody asked for)
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            By breaking down their self esteem and bringing down your motivation
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🎭</div>
                <h3 className="text-lg font-semibold text-orange-400 mb-2">AI Excuse Generator</h3>
                <p className="text-slate-400 text-sm">Generate perfect excuses for avoiding responsibilities</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold text-orange-400 mb-2">Demotivational Bot</h3>
                <p className="text-slate-400 text-sm">Chat with an AI that's as unmotivated as you</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🎮</div>
                <h3 className="text-lg font-semibold text-orange-400 mb-2">Time-Wasting Games</h3>
                <p className="text-slate-400 text-sm">Perfectly designed to waste your precious time</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-orange-400">
            Team Duo CS
          </h2>
          <p className="text-slate-400 mb-8">Sahrdaya College Of Advanced Studies</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">👑</div>
                <h3 className="font-semibold text-orange-400">Caine Benoy</h3>
                <p className="text-slate-400 text-sm">Team Lead</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">💻</div>
                <h3 className="font-semibold text-orange-400">Mohammed Sayhan Shaneeb</h3>
                <p className="text-slate-400 text-sm">Developer</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">🎨</div>
                <h3 className="font-semibold text-orange-400">John Joy</h3>
                <p className="text-slate-400 text-sm">Designer</p>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-slate-400 mt-8 italic">
            "Made with our sweat and blood" - Team Contributions
          </p>
        </div>
      </section>

      {/* Laziness Leaderboard */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-400">
            🐢 Laziness Leaderboard
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-orange-400">Top Procrastinators</h3>
                <div className="space-y-4">
                  {leaderboard.slice(0, 3).map((entry, index) => {
                    const medals = ['🥇', '🥈', '🥉']
                    const colors = ['text-yellow-400', 'text-gray-400', 'text-orange-600']
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{medals[index]}</div>
                          <div>
                            <div className="font-semibold">{entry.name}</div>
                            <div className="text-sm text-slate-400">"{entry.excuse}"</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${colors[index]}`}>{entry.timeWasted} min</div>
                          <div className="text-xs text-slate-500">wasted</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-orange-400">Join the Ranks</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-slate-700 border-slate-600 focus:border-orange-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Excuse</label>
                    <Textarea
                      value={formData.excuse}
                      onChange={(e) => setFormData(prev => ({ ...prev, excuse: e.target.value }))}
                      className="bg-slate-700 border-slate-600 focus:border-orange-500"
                      placeholder="What's your best excuse for procrastinating?"
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    Submit My Failure
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Website Timer Dashboard */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-400">
            ⏰ Website Timer Dashboard
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <div className="relative w-64 h-64 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#ff8c00" strokeWidth="8" 
                    strokeDasharray="283" strokeDashoffset="200" strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">{timeWasted}</div>
                    <div className="text-sm text-slate-400">on this site</div>
                  </div>
                </div>
              </div>
              <div className="text-lg text-slate-300 mb-4">
                You've been on this site for {timeWasted.split(':')[0]} minutes. Your time is being tracked.
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-400">Your Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Total time on site</span>
                      <span className="text-orange-400 font-semibold">{totalTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Visits today</span>
                      <span className="text-orange-400 font-semibold">{visitsCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Average session</span>
                      <span className="text-orange-400 font-semibold">{avgSession}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-400">Demotivational Quote</h3>
                  <p className="text-slate-300 italic">
                    "Time you enjoy wasting is not wasted time."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Distractions */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-400">
            📱 Social Media Distractions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialPlatforms.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors text-center cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{platform.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-orange-400">{platform.name}</h3>
                    <div className="text-3xl font-bold text-orange-400 mb-2">{platform.time}m</div>
                    <div className="text-sm text-slate-400">Time wasted today</div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-slate-400 mb-4">Total time wasted on social media today:</p>
            <div className="text-4xl font-bold text-orange-400">{totalSocialTime} minutes</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-800/50 border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400 mb-4">
            © 2024 Hopelessly - Because giving up is always an option
          </p>
          <div className="flex justify-center items-center space-x-6 mb-4">
            <Link href="#" className="text-slate-400 hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate-400 hover:text-orange-400 transition-colors">Terms of Surrender</Link>
            <Link href="#" className="text-slate-400 hover:text-orange-400 transition-colors">Contact (Don't)</Link>
          </div>
          <div className="flex justify-center items-center space-x-4 text-sm">
            <span className="text-slate-500">Made with ❤️ at TinkerHub Useless Projects</span>
            <a 
              href="https://www.tinkerhub.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-2 py-1 bg-black text-white rounded text-xs hover:bg-gray-800 transition-colors"
            >
              TinkerHub
            </a>
            <a 
              href="https://www.tinkerhub.org/events/Q2Q1TQKX6Q/Useless%20Projects" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-2 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700 transition-colors"
            >
              UselessProjects-25
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
