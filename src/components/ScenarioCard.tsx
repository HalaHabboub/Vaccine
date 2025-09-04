import { motion } from 'framer-motion'
import type { Phase } from '../types/game'

interface ScenarioCardProps {
  phase: Phase
  onChoice: (choiceId: string) => void
  badgeName: string
  progress: {
    current: number
    total: number
  }
}

export function ScenarioCard({ phase, onChoice, badgeName, progress }: ScenarioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl w-full"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* Progress Bar */}
        <div className="bg-gradient-to-r from-primary-purple/20 to-primary-orange/20 px-8 py-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-bold">{badgeName}</span>
            <span className="text-white/70">
              Step {progress.current} of {progress.total}
            </span>
          </div>
          <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-purple to-primary-orange shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${(progress.current / progress.total) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          {/* Narrator/Type Indicator */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl animate-float">
              {phase.type === 'scenario' ? '💬' : 
               phase.type === 'lesson' ? '📚' :
               phase.type === 'practice' ? '✍️' : '🏆'}
            </span>
            <span className="text-primary-orange font-bold uppercase tracking-wider text-sm">
              {phase.type}
            </span>
          </div>

          {/* Narrative */}
          <div className="mb-8">
            <p className="text-xl text-white leading-relaxed whitespace-pre-wrap">
              {phase.narrative}
            </p>
          </div>

          {/* Lesson Text (if present) */}
          {phase.lessonText && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-gradient-to-r from-primary-purple/20 to-primary-orange/20 rounded-xl border border-white/20"
            >
              <p className="text-white/90 leading-relaxed whitespace-pre-wrap">{phase.lessonText}</p>
            </motion.div>
          )}

          {/* Choices */}
          {phase.choices.length > 0 && (
            <div className="space-y-4">
              {phase.choices.map((choice, index) => (
                <motion.button
                  key={choice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onChoice(choice.id)}
                  className="w-full text-left p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 hover:border-primary-orange/50 group"
                >
                  <span className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-primary-orange group-hover:text-primary-orange-light transition-colors">
                      {index + 1}
                    </span>
                    <span className="text-lg font-medium text-white group-hover:text-white/90">
                      {choice.text}
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}