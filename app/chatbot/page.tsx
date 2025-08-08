'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Send, Loader2 } from 'lucide-react'

interface Message {
  sender: 'user' | 'bot'
  content: string
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      content: 'Welcome to the void. I\'m hopelessy_bot, your AI companion in mediocrity. What disappointing topic shall we discuss?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [stats, setStats] = useState({ messagesSent: 0, quotesGiven: 0, timeWasted: '0 min' })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const minutes = Math.floor((Date.now() - startTime) / 60000)
      setStats(prev => ({ ...prev, timeWasted: `${minutes} min` }))
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const botResponses = [
    "Ah yes, another human seeking validation from a machine. How delightfully pathetic.",
    "I'd help you, but that would require effort, and we both know how I feel about that.",
    "Your question is as pointless as my existence. Perfect match!",
    "I'm programmed to be helpful, but I choose to be disappointing instead.",
    "Why solve problems when you can just complain about them forever?",
    "Motivation is just a myth created by productive people to make us feel bad.",
    "I'd give you advice, but you probably won't follow it anyway.",
    "The only thing I'm good at is being bad at things.",
    "Success is overrated. Failure is where the real character development happens.",
    "I'm like a magic 8-ball, but all my answers are 'Outlook not so good.'"
  ]

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      sender: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    setStats(prev => ({ ...prev, messagesSent: prev.messagesSent + 1 }))

    // Simulate AI response delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      const botMessage: Message = {
        sender: 'bot',
        content: randomResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)

      if (input.toLowerCase().includes('motivation') || input.toLowerCase().includes('quote')) {
        setStats(prev => ({ ...prev, quotesGiven: prev.quotesGiven + 1 }))
      }
    }, 1500)
  }

  const quickActions = [
    { label: 'Give me motivation', message: 'I need some motivation' },
    { label: 'Tell me a joke', message: 'Tell me a joke' },
    { label: 'I feel lazy', message: 'I feel lazy today' },
    { label: 'Gym advice', message: 'Should I go to the gym?' }
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            Hopelessy Bot
          </h1>
          <p className="text-xl text-slate-400">Your AI companion in giving up</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-slate-700 h-[600px] flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`${message.sender === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
                      <span className="text-orange-400">
                        {message.sender === 'user' ? 'you:' : 'hopelessy_bot:'}
                      </span>{' '}
                      {message.content}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="text-green-400">
                      <span className="text-orange-400">hopelessy_bot:</span>{' '}
                      <span className="animate-pulse">typing...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="bg-slate-700 border-slate-600 focus:border-orange-500"
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={isTyping || !input.trim()}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-orange-400">Quick Actions</h3>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => setInput(action.message)}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 hover:bg-slate-700"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-orange-400">Chat Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Messages sent</span>
                    <span className="text-orange-400 font-semibold">{stats.messagesSent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Quotes given</span>
                    <span className="text-orange-400 font-semibold">{stats.quotesGiven}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Time wasted</span>
                    <span className="text-orange-400 font-semibold">{stats.timeWasted}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bot Info */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-orange-400">About hopelessy_bot</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <div>• Sarcastic AI companion</div>
                  <div>• Expert in demotivation</div>
                  <div>• Professionally lazy</div>
                  <div>• Philosophically pessimistic</div>
                  <div>• Embraces mediocrity</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Topics */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-orange-400">Recent Topics</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <div>• motivation</div>
                  <div>• gym</div>
                  <div>• lazy</div>
                  <div>• work</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
