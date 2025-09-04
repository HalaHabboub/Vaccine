import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Strategy {
  id: string
  title: string
  icon: string
  description: string
  mentalHealthImpact: number
  communityTrustImpact: number
  warning?: string
  recommended?: boolean
}

export function CrisisMode() {
  const [hatefulComment, setHatefulComment] = useState('')
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)

  const analyzeComment = () => {
    if (!hatefulComment.trim()) return

    setIsAnalyzing(true)
    
    // Simulate analysis delay
    setTimeout(() => {
      setStrategies([
        {
          id: 'rant',
          title: 'Rant Back',
          icon: '😤',
          description: 'Reply with anger and defend yourself aggressively',
          mentalHealthImpact: -30,
          communityTrustImpact: -40,
          warning: 'Feeds trolls, escalates situation, damages reputation'
        },
        {
          id: 'ignore',
          title: 'Ignore Forever',
          icon: '🙈',
          description: 'Don\'t respond and try to forget about it',
          mentalHealthImpact: -15,
          communityTrustImpact: 0,
          warning: 'Internal stress accumulates over time'
        },
        {
          id: 'block',
          title: 'Block & Report',
          icon: '🚫',
          description: 'Remove the user from your space and report to platform',
          mentalHealthImpact: 15,
          communityTrustImpact: 5,
          recommended: true
        },
        {
          id: 'positive',
          title: 'Rally Your Community',
          icon: '💪',
          description: 'Post appreciation for supportive fans without mentioning hate',
          mentalHealthImpact: 20,
          communityTrustImpact: 30,
          recommended: true
        }
      ])
      setIsAnalyzing(false)
    }, 1500)
  }

  const getImpactColor = (impact: number) => {
    if (impact >= 15) return 'text-green-400'
    if (impact >= 0) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getImpactText = (impact: number) => {
    if (impact > 0) return `+${impact}`
    return `${impact}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black text-white mb-4">
            Crisis Support
          </h1>
          <p className="text-xl text-white/80">
            Get real-time advice for handling harassment
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8"
        >
          <label className="block text-white mb-4">
            <span className="text-lg font-semibold mb-2 block">
              Paste the hateful comment you received:
            </span>
            <textarea
              value={hatefulComment}
              onChange={(e) => setHatefulComment(e.target.value)}
              placeholder="Example: 'You're a fraud, stop scamming everyone!'"
              className="w-full p-4 rounded-lg bg-black/30 text-white placeholder-white/40 border border-white/20 focus:border-primary-orange focus:outline-none resize-none"
              rows={4}
            />
          </label>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={analyzeComment}
            disabled={!hatefulComment.trim() || isAnalyzing}
            className="w-full bg-gradient-to-r from-primary-orange to-primary-purple text-white font-bold py-4 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              'Analyze & Get Strategies'
            )}
          </motion.button>
        </motion.div>

        {/* Strategies Display */}
        <AnimatePresence>
          {strategies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Your Options:
              </h2>
              
              <div className="grid gap-4">
                {strategies.map((strategy, index) => (
                  <motion.div
                    key={strategy.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedStrategy(strategy.id)}
                    className={`relative cursor-pointer transition-all ${
                      selectedStrategy === strategy.id ? 'ring-2 ring-white' : ''
                    }`}
                  >
                    {strategy.recommended && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold z-10">
                        RECOMMENDED
                      </div>
                    )}
                    
                    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border ${
                      strategy.recommended 
                        ? 'border-green-500/50' 
                        : strategy.warning 
                        ? 'border-red-500/30' 
                        : 'border-white/20'
                    }`}>
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">{strategy.icon}</span>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {strategy.title}
                          </h3>
                          <p className="text-white/70 mb-4">
                            {strategy.description}
                          </p>
                          
                          {/* Impact Meters */}
                          <div className="flex gap-6 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-white/50">Mental Health:</span>
                              <span className={`font-bold ${getImpactColor(strategy.mentalHealthImpact)}`}>
                                {getImpactText(strategy.mentalHealthImpact)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-white/50">Community Trust:</span>
                              <span className={`font-bold ${getImpactColor(strategy.communityTrustImpact)}`}>
                                {getImpactText(strategy.communityTrustImpact)}
                              </span>
                            </div>
                          </div>
                          
                          {strategy.warning && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                              <p className="text-red-300 text-sm flex items-start gap-2">
                                <span>⚠️</span>
                                <span>{strategy.warning}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <p className="text-white/80 text-center">
                  💡 <strong>Remember:</strong> Your mental health and community are your greatest assets. 
                  Choose strategies that protect both.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}