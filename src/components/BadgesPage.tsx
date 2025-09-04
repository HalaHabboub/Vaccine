import { motion } from 'framer-motion'

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  isEarned: boolean
}

interface BadgesPageProps {
  onBackToHome: () => void
  completedBadges: string[]
}

export function BadgesPage({ onBackToHome, completedBadges }: BadgesPageProps) {
  const badges: Badge[] = [
    {
      id: 'hate-comments',
      name: 'Hate Comments',
      description: 'Direct trolling, insults, and attacks on personality or content.',
      icon: '💬',
      isEarned: completedBadges.includes('hate-comments-simple')
    },
    {
      id: 'cancel-culture',
      name: 'Cancel Culture / Mass Criticism',
      description: 'Responding to viral criticism after a mistake or rumor.',
      icon: '🌪️',
      isEarned: false
    },
    {
      id: 'false-accusations',
      name: 'False Accusations',
      description: 'Dealing with deliberate misinformation or lies spread against you.',
      icon: '⚖️',
      isEarned: false
    },
    {
      id: 'pressure-to-respond',
      name: 'Pressure to Respond',
      description: 'Navigating demands to comment on political/controversial events.',
      icon: '📢',
      isEarned: false
    },
    {
      id: 'comparison-jealousy',
      name: 'Comparison & Jealousy',
      description: 'Handling accusations of copying or toxic rivalries.',
      icon: '👥',
      isEarned: false
    },
    {
      id: 'platform-harassment',
      name: 'Platform Harassment',
      description: 'Coordinated brigading, mass reports, or algorithm suppression.',
      icon: '🛡️',
      isEarned: false
    }
  ]

  const earnedCount = badges.filter(badge => badge.isEarned).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple to-brand-orange">
      <div className="container mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={onBackToHome}
            className="absolute top-8 left-8 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg backdrop-blur-sm transition-colors font-medium"
          >
            ← Back to Home
          </button>
          
          <h1 className="text-6xl font-black text-white mb-4">
            RESILIENCE BADGES
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Build your immunity against online challenges
          </p>
          
          {/* Progress Stats */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 inline-block">
            <div className="text-4xl font-black text-white mb-2">
              {earnedCount} / {badges.length}
            </div>
            <div className="text-white/80 font-medium">
              Badges Earned
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={badge.id}
              className={`relative overflow-hidden rounded-xl p-8 ${
                badge.isEarned
                  ? 'bg-white shadow-2xl border-4 border-yellow-400'
                  : 'bg-white/10 backdrop-blur-sm border-2 border-white/20'
              }`}
            >
              {/* Badge Icon */}
              <div className="text-center mb-6">
                <div className={`inline-block text-6xl mb-4 ${
                  badge.isEarned ? '' : 'opacity-50'
                }`}>
                  {badge.icon}
                </div>
                
                {/* Earned Badge Indicator */}
                {badge.isEarned && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-yellow-400 text-yellow-900 font-bold text-sm px-3 py-1 rounded-full">
                      ✓ EARNED
                    </div>
                  </div>
                )}
                
                {/* Coming Soon Indicator */}
                {!badge.isEarned && badge.id !== 'hate-comments' && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 text-white font-bold text-sm px-3 py-1 rounded-full">
                      COMING SOON
                    </div>
                  </div>
                )}
              </div>

              {/* Badge Content */}
              <h3 className={`text-2xl font-bold mb-4 text-center ${
                badge.isEarned ? 'text-neutral-800' : 'text-white'
              }`}>
                {badge.name}
              </h3>
              
              <p className={`text-center leading-relaxed ${
                badge.isEarned ? 'text-neutral-600' : 'text-white/80'
              }`}>
                {badge.description}
              </p>

              {/* Action Button */}
              <div className="mt-8 text-center">
                {badge.isEarned ? (
                  <div className="bg-green-500 text-white font-bold py-3 px-6 rounded-full">
                    ✓ Completed
                  </div>
                ) : badge.id === 'hate-comments' ? (
                  <button className="bg-gradient-to-r from-brand-purple to-brand-orange text-white font-bold py-3 px-6 rounded-full hover:shadow-xl transition-all duration-200">
                    Start Training
                  </button>
                ) : (
                  <div className="bg-white/20 text-white/60 font-bold py-3 px-6 rounded-full cursor-not-allowed">
                    Locked
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              🎯 Your Resilience Journey
            </h3>
            <p className="text-white/90 leading-relaxed">
              Each badge teaches you specific strategies to handle different types of online challenges. 
              Start with Hate Comments to build your foundation, then unlock more advanced scenarios as you progress.
            </p>
            {earnedCount > 0 && (
              <div className="mt-6 text-yellow-300 font-medium">
                Great job earning your first badge! Keep going to build complete immunity against online toxicity.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}