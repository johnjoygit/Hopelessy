'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Copy, Share, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ComparisonPage() {
  const [age, setAge] = useState('')
  const [comparison, setComparison] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<Array<{comparison: string, age: string, timestamp: string}>>([])

  const quickComparisons = [
    { text: "At your age, Elon Musk was running two companies. You just ran out of snacks.", age: "25" },
    { text: "Taylor Swift wrote 3 albums. You wrote one tweet this week.", age: "22" },
    { text: "Mark Zuckerberg was a billionaire. You're still figuring out your password.", age: "23" },
    { text: "Michael Jordan won 6 championships. You won 6 levels of Candy Crush.", age: "30" },
    { text: "Einstein published his theory of relativity. You published your theory of why Mondays suck.", age: "26" }
  ]

  const generateComparison = async () => {
    if (!age) {
      alert('Please enter your age')
      return
    }

    setIsLoading(true)
    
    // Simulate API call with age-based comparisons
    const comparisons = [
      `At ${age}, Mozart had composed 30 symphonies. You've composed 30 excuses for not doing laundry.`,
      `When Alexander the Great was ${age}, he had conquered most of the known world. You conquered the couch.`,
      `At ${age}, Steve Jobs was revolutionizing technology. You're still trying to figure out your TV remote.`,
      `By ${age}, Shakespeare had written Romeo and Juliet. You've written "k" in response to paragraphs.`,
      `At ${age}, Marie Curie was discovering radium. You discovered that pizza for breakfast is acceptable.`,
      `When Bill Gates was ${age}, he was building Microsoft. You're still building the motivation to get out of bed.`
    ]
    
    setTimeout(() => {
      const randomComparison = comparisons[Math.floor(Math.random() * comparisons.length)]
      setComparison(randomComparison)
      
      const newEntry = {
        comparison: randomComparison,
        age,
        timestamp: new Date().toISOString()
      }
      
      setHistory(prev => [newEntry, ...prev.slice(0, 9)])
      setIsLoading(false)
    }, 2000)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(comparison)
  }

  const shareComparison = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'My AI-Generated Comparison',
        text: comparison,
        url: window.location.href
      })
    } else {
      copyToClipboard()
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            Compare Yourself
          </h1>
          <p className="text-xl text-slate-400">See how you stack up against successful people your age</p>
        </div>

        {/* Age Input */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <label htmlFor="age" className="block text-lg font-medium mb-2 text-orange-400">Your Age:</label>
            <Input
              id="age"
              type="number"
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-32 text-center text-lg bg-slate-700 border-slate-600 focus:border-orange-500"
              placeholder="25"
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-8">
          <Button 
            onClick={generateComparison}
            disabled={isLoading}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Comparing...
              </>
            ) : (
              'Compare Me'
            )}
          </Button>
        </div>

        {/* Output */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardContent className="p-8 text-center">
            {isLoading ? (
              <div className="text-slate-400">
                <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin" />
                <p>AI is crafting your demotivation...</p>
              </div>
            ) : comparison ? (
              <div>
                <div className="text-4xl mb-4">📊</div>
                <p className="text-lg text-slate-200 mb-4 font-medium">"{comparison}"</p>
                <div className="text-sm text-slate-400">
                  Generated by AI • {new Date().toLocaleTimeString()}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-4">📊</div>
                <p className="text-slate-400">Enter your age and click the button to see how you compare</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {comparison && (
          <div className="flex justify-center space-x-4 mb-8">
            <Button onClick={copyToClipboard} variant="outline" className="border-slate-600 hover:bg-slate-700">
              <Copy className="mr-2 h-4 w-4" />
              Copy Comparison
            </Button>
            <Button onClick={shareComparison} variant="outline" className="border-slate-600 hover:bg-slate-700">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        )}

        {/* Quick Comparisons Carousel */}
        <Card className="bg-slate-800/30 border-slate-700 mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">Quick Comparisons</h3>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex space-x-4 overflow-x-auto flex-1">
                {quickComparisons.map((comp, index) => (
                  <div key={index} className="flex-shrink-0 w-80 bg-slate-700/50 rounded-lg p-6 border border-slate-600 hover:border-orange-500/50 transition-colors">
                    <div className="text-center">
                      <div className="text-2xl mb-3">📊</div>
                      <p className="text-slate-200 mb-3">"{comp.text}"</p>
                      <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded">Age: {comp.age}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* History */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">Recent Comparisons</h3>
            <div className="space-y-4">
              {history.length === 0 ? (
                <div className="text-center text-slate-400 py-8">
                  <div className="text-2xl mb-2">📊</div>
                  <p>No comparisons generated yet. Start comparing!</p>
                </div>
              ) : (
                history.map((entry, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-orange-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded">Age: {entry.age}</span>
                      <span className="text-xs text-slate-500">{new Date(entry.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-200 mb-2">"{entry.comparison}"</p>
                    <Button 
                      onClick={() => navigator.clipboard.writeText(entry.comparison)}
                      variant="ghost" 
                      size="sm"
                      className="text-orange-400 hover:text-orange-300 p-0 h-auto"
                    >
                      Copy
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
