'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export default function GamesPage() {
  const [clickCount, setClickCount] = useState(0)
  const [colorBoxColor, setColorBoxColor] = useState('#ff8c00')
  const [typingTarget, setTypingTarget] = useState('The quick brown fox jumps over the lazy dog.')
  const [typingInput, setTypingInput] = useState('')
  const [typingWPM, setTypingWPM] = useState(0)
  const [memorySequence, setMemorySequence] = useState<number[]>([])
  const [memoryInput, setMemoryInput] = useState('')
  const [memoryScore, setMemoryScore] = useState(0)
  const [memoryGameActive, setMemoryGameActive] = useState(false)
  const [reactionBox, setReactionBox] = useState('#ef4444')
  const [reactionTime, setReactionTime] = useState('Click to start')
  const [reactionActive, setReactionActive] = useState(false)
  const [guessInput, setGuessInput] = useState('')
  const [guessResult, setGuessResult] = useState('Start guessing!')
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1)
  const [attempts, setAttempts] = useState(0)
  const [stats, setStats] = useState({
    totalClicks: 0,
    bestWPM: 0,
    memoryBest: 0,
    bestReaction: 0
  })

  const typingStartTime = useRef<number | null>(null)
  const reactionStartTime = useRef<number | null>(null)

  const colors = ['#ff8c00', '#ff6b00', '#ff4500', '#ff1493', '#ff69b4', '#ff6347', '#ff7f50', '#ffa500', '#ffd700']
  const sentences = [
    'The quick brown fox jumps over the lazy dog.',
    'Pack my box with five dozen liquor jugs.',
    'How vexingly quick daft zebras jump!',
    'The five boxing wizards jump quickly.',
    'Sphinx of black quartz, judge my vow.'
  ]

  useEffect(() => {
    const savedStats = localStorage.getItem('gameStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
      setClickCount(JSON.parse(savedStats).totalClicks || 0)
    }
  }, [])

  const saveStats = (newStats: typeof stats) => {
    setStats(newStats)
    localStorage.setItem('gameStats', JSON.stringify(newStats))
  }

  const handleClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)
    saveStats({ ...stats, totalClicks: newCount })
  }

  const changeColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setColorBoxColor(randomColor)
  }

  const handleTypingInput = (value: string) => {
    setTypingInput(value)
    
    if (!typingStartTime.current) {
      typingStartTime.current = Date.now()
    }

    if (value === typingTarget) {
      const endTime = Date.now()
      const timeElapsed = (endTime - typingStartTime.current!) / 1000 / 60
      const words = typingTarget.split(' ').length
      const wpm = Math.round(words / timeElapsed)
      
      setTypingWPM(wpm)
      
      if (wpm > stats.bestWPM) {
        saveStats({ ...stats, bestWPM: wpm })
      }

      setTimeout(() => {
        const randomSentence = sentences[Math.floor(Math.random() * sentences.length)]
        setTypingTarget(randomSentence)
        setTypingInput('')
        setTypingWPM(0)
        typingStartTime.current = null
      }, 2000)
    }
  }

  const startMemoryGame = () => {
    setMemoryGameActive(true)
    setMemorySequence([Math.floor(Math.random() * 9) + 1])
    setMemoryScore(0)
    setMemoryInput('')
  }

  const handleMemoryInput = (value: string) => {
    setMemoryInput(value)
    if (value && memoryGameActive) {
      const num = parseInt(value)
      if (num >= 1 && num <= 9) {
        // Check if correct
        if (num === memorySequence[0]) {
          const newScore = memoryScore + 1
          setMemoryScore(newScore)
          
          if (newScore > stats.memoryBest) {
            saveStats({ ...stats, memoryBest: newScore })
          }

          // Add new number to sequence
          setMemorySequence([...memorySequence, Math.floor(Math.random() * 9) + 1])
        } else {
          // Game over
          setMemoryGameActive(false)
        }
        setMemoryInput('')
      }
    }
  }

  const startReactionTest = () => {
    setReactionBox('#ef4444')
    setReactionTime('Wait for green...')
    setReactionActive(false)
    
    const delay = Math.random() * 3000 + 1000
    
    setTimeout(() => {
      setReactionBox('#22c55e')
      reactionStartTime.current = Date.now()
      setReactionActive(true)
    }, delay)
  }

  const handleReactionClick = () => {
    if (reactionActive && reactionStartTime.current) {
      const endTime = Date.now()
      const reaction = endTime - reactionStartTime.current
      setReactionTime(`${reaction}ms`)
      
      if (reaction < stats.bestReaction || stats.bestReaction === 0) {
        saveStats({ ...stats, bestReaction: reaction })
      }
      
      setReactionActive(false)
      setReactionBox('#ef4444')
    }
  }

  const handleGuess = () => {
    const guess = parseInt(guessInput)
    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    
    if (guess === targetNumber) {
      setGuessResult(`Correct! It took you ${newAttempts} attempts.`)
      setTimeout(() => {
        setTargetNumber(Math.floor(Math.random() * 100) + 1)
        setAttempts(0)
        setGuessInput('')
        setGuessResult('Start guessing!')
      }, 2000)
    } else if (guess < targetNumber) {
      setGuessResult('Too low! Try again.')
    } else {
      setGuessResult('Too high! Try again.')
    }
    
    setGuessInput('')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            Time-Wasting Games
          </h1>
          <p className="text-xl text-slate-400">Perfect for when you want to waste time productively</p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Click Counter */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🖱️</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Click Counter</h3>
              <p className="text-slate-400 mb-4">Click as fast as you can for no reason</p>
              <div className="text-3xl font-bold text-orange-400 mb-4">{clickCount}</div>
              <Button onClick={handleClick} className="bg-orange-600 hover:bg-orange-700">
                Click Me!
              </Button>
            </CardContent>
          </Card>

          {/* Color Changer */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Color Changer</h3>
              <p className="text-slate-400 mb-4">Change the color of this box randomly</p>
              <div 
                className="w-32 h-32 mx-auto mb-4 rounded-lg transition-colors"
                style={{ backgroundColor: colorBoxColor }}
              ></div>
              <Button onClick={changeColor} className="bg-orange-600 hover:bg-orange-700">
                Change Color
              </Button>
            </CardContent>
          </Card>

          {/* Typing Speed */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">⌨️</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Typing Speed</h3>
              <p className="text-slate-400 mb-4">Type the sentence as fast as you can</p>
              <div className="text-sm text-slate-300 mb-2">{typingTarget}</div>
              <Input
                value={typingInput}
                onChange={(e) => handleTypingInput(e.target.value)}
                className="mb-2 text-center bg-slate-700 border-slate-600"
                placeholder="Start typing..."
              />
              <div className="text-orange-400 font-semibold">WPM: {typingWPM}</div>
            </CardContent>
          </Card>

          {/* Memory Game */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Memory Game</h3>
              <p className="text-slate-400 mb-4">Remember the sequence of numbers</p>
              <div className="text-2xl font-bold text-orange-400 mb-4">
                {memoryGameActive ? memorySequence.join(' ') : '?'}
              </div>
              {memoryGameActive ? (
                <Input
                  type="number"
                  min="1"
                  max="9"
                  value={memoryInput}
                  onChange={(e) => handleMemoryInput(e.target.value)}
                  className="mb-2 text-center bg-slate-700 border-slate-600"
                  placeholder="Enter number (1-9)"
                />
              ) : (
                <Button onClick={startMemoryGame} className="bg-orange-600 hover:bg-orange-700">
                  Start Game
                </Button>
              )}
              <div className="text-sm text-slate-400 mt-2">Score: {memoryScore}</div>
            </CardContent>
          </Card>

          {/* Reaction Time */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Reaction Time</h3>
              <p className="text-slate-400 mb-4">Click when the box turns green</p>
              <div 
                className="w-32 h-32 mx-auto mb-4 rounded-lg cursor-pointer transition-colors"
                style={{ backgroundColor: reactionBox }}
                onClick={handleReactionClick}
              ></div>
              <Button onClick={startReactionTest} className="bg-orange-600 hover:bg-orange-700">
                Start
              </Button>
              <div className="text-sm text-orange-400 mt-2">{reactionTime}</div>
            </CardContent>
          </Card>

          {/* Number Guessing */}
          <Card className="bg-slate-800/50 border-slate-700 hover:border-orange-500/50 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-400">Number Guessing</h3>
              <p className="text-slate-400 mb-4">Guess the number between 1 and 100</p>
              <Input
                type="number"
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                className="mb-2 text-center bg-slate-700 border-slate-600"
                placeholder="Enter your guess"
              />
              <Button onClick={handleGuess} className="bg-orange-600 hover:bg-orange-700">
                Guess
              </Button>
              <div className="text-sm text-orange-400 mt-2">{guessResult}</div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">Your Gaming Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{stats.totalClicks}</div>
                <div className="text-sm text-slate-400">Total Clicks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{stats.bestWPM}</div>
                <div className="text-sm text-slate-400">Best WPM</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{stats.memoryBest}</div>
                <div className="text-sm text-slate-400">Memory Best</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{stats.bestReaction || 0}</div>
                <div className="text-sm text-slate-400">Best Reaction (ms)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
