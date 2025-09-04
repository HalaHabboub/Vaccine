import { useState } from 'react'
import { HomePage } from './components/HomePage'
import { GameController } from './components/GameController'
import { CrisisMode } from './components/CrisisMode'

type Mode = 'home' | 'practice' | 'crisis'

function App() {
  const [mode, setMode] = useState<Mode>('home')

  const handlePractice = () => setMode('practice')
  const handleGetHelp = () => setMode('crisis')
  const handleBackHome = () => setMode('home')

  return (
    <>
      {mode === 'home' && (
        <HomePage 
          onPractice={handlePractice}
          onGetHelp={handleGetHelp}
        />
      )}
      
      {mode === 'practice' && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
          <button
            onClick={handleBackHome}
            className="fixed top-4 left-4 z-50 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors"
          >
            ← Back
          </button>
          <GameController />
        </div>
      )}
      
      {mode === 'crisis' && (
        <div className="min-h-screen bg-gradient-to-br from-primary-purple-darker to-primary-orange-dark">
          <button
            onClick={handleBackHome}
            className="fixed top-4 left-4 z-50 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors"
          >
            ← Back
          </button>
          <CrisisMode />
        </div>
      )}
    </>
  )
}

export default App