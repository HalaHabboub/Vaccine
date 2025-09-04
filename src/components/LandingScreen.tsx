import { motion } from 'framer-motion'

interface LandingScreenProps {
  onStart: () => void
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎮 Resilience Simulator
          </h1>
          <h2 className="text-xl text-gray-600 mb-8">
            Interactive Training for Content Creators
          </h2>
          
          <div className="prose prose-gray mb-8">
            <p className="text-gray-700 leading-relaxed">
              Learn to handle online harassment, trolling, and negativity in a safe, 
              simulated environment. Build your psychological resilience through 
              interactive scenarios before facing these challenges in real life.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🧠</span>
              <div>
                <h3 className="font-semibold text-gray-900">Mental Health Tracking</h3>
                <p className="text-sm text-gray-600">Monitor your psychological well-being as you navigate challenges</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <h3 className="font-semibold text-gray-900">Community Trust Building</h3>
                <p className="text-sm text-gray-600">Learn strategies that strengthen your audience relationships</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <h3 className="font-semibold text-gray-900">Badge System</h3>
                <p className="text-sm text-gray-600">Master different types of online challenges and earn achievements</p>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="w-full py-4 px-8 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Start Training
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}