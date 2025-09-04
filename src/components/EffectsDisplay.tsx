interface Effect {
  type: 'followers' | 'stress'
  change: number
  newValue: number
}

interface EffectsDisplayProps {
  effects: Effect[]
  message: string
}

export function EffectsDisplay({ effects, message }: EffectsDisplayProps) {
  return (
    <div className="bg-neutral-50 border-l-4 border-brand-purple p-6 my-6 rounded-r-lg">
      {/* Action Description */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-neutral-800 mb-2">What happened:</h4>
        <p className="text-neutral-700 italic">"{message}"</p>
      </div>

      {/* Effects */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-neutral-800">Impact:</h4>
        {effects.map((effect, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">
                {effect.type === 'followers' ? '👥' : '🧠'}
              </span>
              <span className="font-medium text-neutral-800">
                {effect.type === 'followers' ? 'Followers' : 'Stress Level'}
              </span>
            </div>
            
            <div className="text-right">
              <div className={`font-bold text-lg ${
                effect.change > 0 
                  ? effect.type === 'followers' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                  : effect.type === 'followers'
                    ? 'text-red-600'
                    : 'text-green-600'
              }`}>
                {effect.change > 0 ? '+' : ''}{effect.change}
                {effect.type === 'stress' ? '%' : ''}
              </div>
              <div className="text-sm text-neutral-500">
                Now: {effect.newValue}{effect.type === 'stress' ? '%' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Insight */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <span className="text-blue-500 text-lg">💡</span>
          <div>
            <h5 className="font-semibold text-blue-800 mb-1">Learning Point:</h5>
            <p className="text-blue-700 text-sm">
              {getLearningInsight(effects, message)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function getLearningInsight(effects: Effect[], message: string): string {
  const hasStressIncrease = effects.some(e => e.type === 'stress' && e.change > 0)
  const hasFollowerLoss = effects.some(e => e.type === 'followers' && e.change < 0)
  const hasFollowerGain = effects.some(e => e.type === 'followers' && e.change > 0)
  const hasStressDecrease = effects.some(e => e.type === 'stress' && e.change < 0)

  if (message.toLowerCase().includes('angry')) {
    if (hasStressIncrease) {
      return "Angry responses often increase stress and can escalate conflicts. While you might gain some followers who agree, it's not sustainable for mental health."
    }
  }

  if (message.toLowerCase().includes('ignore')) {
    if (hasStressIncrease) {
      return "Ignoring hate comments might seem easier, but unexpressed stress builds up internally. It doesn't solve the problem long-term."
    }
  }

  if (message.toLowerCase().includes('block') || message.toLowerCase().includes('report')) {
    if (hasStressDecrease) {
      return "Blocking and reporting removes toxic content from your space, reducing stress without escalating conflict. It's a healthy boundary."
    }
  }

  if (message.toLowerCase().includes('positive') || message.toLowerCase().includes('gratitude')) {
    if (hasFollowerGain && hasStressDecrease) {
      return "Positive responses attract supportive community members while reducing stress. This builds long-term resilience and growth."
    }
  }

  if (message.toLowerCase().includes('calm')) {
    if (hasFollowerGain) {
      return "Calm, thoughtful responses show maturity and often earn respect from your audience, even from neutral observers."
    }
  }

  // Default insight
  if (hasStressIncrease || hasFollowerLoss) {
    return "This strategy has negative consequences for either your mental health or community growth. Consider healthier alternatives."
  } else if (hasStressDecrease && hasFollowerGain) {
    return "This is a healthy strategy that protects your mental health while building a positive community."
  } else {
    return "Every response has consequences. The goal is to protect your well-being while maintaining authentic connections."
  }
}