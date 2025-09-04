import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hateCommentsCorrect } from '../data/badges/hateCommentsCorrect'
import { SocialMediaCard } from './SocialMediaCard'
import { BadgeCompletionPopup } from './BadgeCompletionPopup'
import type { GameState, Badge, StoryCard } from '../types/game'

export function GameController() {
  const [gameState, setGameState] = useState<GameState>({
    currentBadge: 'hate-comments-correct',
    currentPhase: 0,
    currentStep: 0,
    completedBadges: [],
    meters: {
      mentalHealth: 70, // Start at 70 (30% stress)
      communityTrust: 10 // Start with 10 followers
    },
    history: [],
    visibleCards: [],
    triedChoices: [],
    freeformInput: ''
  })
  
  const [isAnimating, setIsAnimating] = useState(false)
  const [showChoices, setShowChoices] = useState(false)

  const currentBadgeData: Badge = hateCommentsCorrect
  const currentPhaseData = currentBadgeData.phases[gameState.currentPhase]
  const currentStepData = currentPhaseData.steps?.[gameState.currentStep]

  const [showBadgeCompletion, setShowBadgeCompletion] = useState(false)
  
  // Initialize cards and choices on step change - no auto-progression
  useEffect(() => {
    if (!currentStepData) return
    
    // Show all cards immediately for current step
    setGameState(prev => ({
      ...prev,
      visibleCards: currentStepData.cards
    }))
    
    // Show choices if required for this step
    if (currentStepData.requiresChoiceToProgress) {
      setShowChoices(true)
    } else {
      setShowChoices(false)
    }
  }, [gameState.currentStep, gameState.currentPhase])
  
  const advanceToNextStep = () => {
    const nextStep = gameState.currentStep + 1
    const hasMoreSteps = currentPhaseData.steps && nextStep < currentPhaseData.steps.length
    
    if (hasMoreSteps) {
      setGameState(prev => ({
        ...prev,
        currentStep: nextStep,
        visibleCards: []
      }))
      setShowChoices(false)
    } else {
      // Move to next phase
      advanceToNextPhase()
    }
  }
  
  const advanceToNextPhase = () => {
    const nextPhase = gameState.currentPhase + 1
    
    if (nextPhase >= currentBadgeData.phases.length) {
      setShowBadgeCompletion(true)
    } else {
      setGameState(prev => ({
        ...prev,
        currentPhase: nextPhase,
        currentStep: 0,
        visibleCards: []
      }))
      setShowChoices(false)
    }
  }

  const handleChoice = (choiceId: string) => {
    if (!currentPhaseData.choices) return
    const choice = currentPhaseData.choices.find(c => c.id === choiceId)
    if (!choice) return
    
    // Check if this is a freeform choice
    if (choice.isFreeform) {
      handleFreeformSubmit()
      return
    }
    
    setIsAnimating(true)
    setShowChoices(false)
    
    // Track tried choices
    setGameState(prev => ({
      ...prev,
      triedChoices: [...prev.triedChoices, choiceId]
    }))
    
    // Update meters with smooth animation
    setGameState(prev => ({
      ...prev,
      meters: {
        mentalHealth: Math.max(0, Math.min(100, prev.meters.mentalHealth + (choice.effects.mentalHealth || 0))),
        communityTrust: Math.max(0, Math.min(100, prev.meters.communityTrust + (choice.effects.communityTrust || 0))),
      },
      history: [...prev.history, { phaseId: currentPhaseData.id, choiceId }]
    }))
    
    // Add feedback card based on choice
    if (choice.feedback) {
      const feedbackCard: StoryCard = {
        id: `feedback-${Date.now()}`,
        type: 'feedback',
        content: choice.feedback || 'Action completed.'
      }
      
      setGameState(prev => ({
        ...prev,
        visibleCards: [...prev.visibleCards, feedbackCard]
      }))
    }
    
    setIsAnimating(false)
    
    // Check if we need to force trying other bad choices
    if (shouldForceOtherChoices()) {
      // Stay in current phase/step to force other choice
      setShowChoices(true)
    } else {
      advanceToNextStep()
    }
  }

  const getStressColor = (value: number) => {
    if (value <= 30) return 'from-green-400 to-green-500'
    if (value <= 60) return 'from-yellow-400 to-orange-400'
    return 'from-red-400 to-red-500'
  }

  const getFollowersDisplay = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  // Convert community trust (0-100) to followers (10-1M scale)
  const followersCount = Math.floor((gameState.meters.communityTrust / 100) * 999990) + 10
  const stressLevel = 100 - gameState.meters.mentalHealth
  
  const shouldForceOtherChoices = () => {
    const choices = currentPhaseData.choices
    if (!choices) return false
    // Force trying both bad choices in Phase 1 (comment 1)
    if (currentPhaseData.id === 'bad-strategies-comment1') {
      const phaseChoiceIds = choices.map(c => c.id)
      const triedInThisPhase = gameState.triedChoices.filter(id => phaseChoiceIds.includes(id))
      return triedInThisPhase.length < choices.length
    }
    
    // For comment 2, check if user tried the OPPOSITE choice from comment 1
    if (currentPhaseData.id === 'bad-strategies-comment2') {
      // If they tried "reply-angry-1" in phase 1, only show "ignore-2" option
      // If they tried "ignore-1" in phase 1, only show "reply-angry-2" option
      const triedAngryInPhase1 = gameState.triedChoices.includes('reply-angry-1')
      const triedIgnoreInPhase1 = gameState.triedChoices.includes('ignore-1')
      
      if (triedAngryInPhase1 && !gameState.triedChoices.includes('ignore-2')) {
        return true // Force ignore choice
      }
      if (triedIgnoreInPhase1 && !gameState.triedChoices.includes('reply-angry-2')) {
        return true // Force angry choice
      }
    }
    
    return false
  }
  
  const handleFreeformSubmit = () => {
    const input = gameState.freeformInput?.trim() || ''
    if (!input) return
    
    // Simple AI evaluation logic
    const isAngry = /\b(stupid|idiot|shut up|go away|hate|dumb)\b/i.test(input)
    const isIgnoring = /\b(ignore|nothing|silent|don't respond)\b/i.test(input)
    const isHealthy = /\b(block|report|positive|thank|grateful|community|support)\b/i.test(input)
    
    let feedback: string
    if (isAngry) {
      feedback = "That's understandable but risky. Anger fuels trolls. Try a different approach."
    } else if (isIgnoring) {
      feedback = "Ignoring leads to more stress over time. Consider healthier strategies."
    } else if (isHealthy) {
      feedback = "Excellent! You protect your mental health and build trust with your audience."
      advanceToNextStep()
      return
    } else {
      feedback = "Consider how this response might affect your stress and community trust. Try again."
    }
    
    // Add feedback card
    const feedbackCard: StoryCard = {
      id: `freeform-feedback-${Date.now()}`,
      type: 'feedback',
      content: feedback
    }
    
    setGameState(prev => ({
      ...prev,
      visibleCards: [...prev.visibleCards, feedbackCard],
      freeformInput: ''
    }))
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-neutral-900 shadow-2xl flex flex-col justify-center px-8 py-12 space-y-16">
        {/* Followers Metric */}
        <div className="text-center">
          <div className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-2">FOLLOWERS</div>
          <motion.div 
            className="text-white text-5xl font-black"
            key={followersCount}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
          >
            {getFollowersDisplay(followersCount)}
          </motion.div>
        </div>

        {/* Stress Level Meter */}
        <div>
          <div className="flex items-center justify-center mb-6">
            <span className="text-4xl mr-3">🧠</span>
            <div className="text-center">
              <div className="text-neutral-400 text-sm font-medium uppercase tracking-wider">STRESS</div>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full bg-neutral-800 rounded-full h-6 overflow-hidden border border-neutral-700">
              <motion.div
                className={`h-full bg-gradient-to-r ${getStressColor(stressLevel)} shadow-lg`}
                animate={{ width: `${stressLevel}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <div className="text-center mt-3">
              <span className="text-white text-lg font-semibold">{stressLevel}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Panel */}
      <div className="flex-1 px-16 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Badge Progress Indicator */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-neutral-800 text-lg">{currentBadgeData.name}</span>
              <span className="text-neutral-500 font-medium">
                Phase {gameState.currentPhase + 1} of {currentBadgeData.phases.length}
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-purple to-brand-orange shadow-sm"
                animate={{ width: `${((gameState.currentPhase + 1) / currentBadgeData.phases.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Phase Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-800 mb-2">{currentPhaseData.narrative}</h2>
            <p className="text-neutral-600 text-lg">
              Step {gameState.currentStep + 1} of {currentPhaseData.steps?.length || 1}
            </p>
          </div>

          {/* Social Media Cards Container */}
          <div className="space-y-6 mb-12">
            <AnimatePresence>
              {gameState.visibleCards.map((card, index) => (
                <motion.div
                  key={`${card.id}-${index}`}
                  className="flex justify-center"
                  layout
                >
                  <SocialMediaCard
                    type={card.type}
                    author={card.author}
                    content={card.content}
                    isUserPost={card.isUserPost}
                    timestamp={card.timestamp}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Next Button, Choice Buttons, or Freeform Input */}
          <AnimatePresence>
            {showChoices && currentPhaseData.choices && currentPhaseData.choices.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center space-y-6"
              >
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">How do you respond?</h3>
                
                {/* Check if this is freeform input */}
                {currentPhaseData.choices.some(c => c.isFreeform) ? (
                  <div className="w-full max-w-2xl space-y-4">
                    <textarea
                      value={gameState.freeformInput || ''}
                      onChange={(e) => setGameState(prev => ({ ...prev, freeformInput: e.target.value }))}
                      placeholder="Type your response here..."
                      className="w-full p-4 border-2 border-neutral-300 rounded-lg text-lg font-medium resize-none h-32 focus:border-brand-purple focus:outline-none"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChoice('freeform-response')}
                      disabled={!gameState.freeformInput?.trim() || isAnimating}
                      className="w-full bg-gradient-to-r from-brand-purple to-brand-orange text-white font-bold text-xl px-8 py-6 rounded-full hover:shadow-2xl transition-all duration-200 hover:from-brand-purple-light hover:to-brand-orange-light disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Response
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-4 w-full max-w-2xl">
                    {currentPhaseData.choices.map((choice, index) => {
                      // For bad-strategies-comment2, only show the opposite choice from comment1
                      if (currentPhaseData.id === 'bad-strategies-comment2') {
                        const triedAngryInPhase1 = gameState.triedChoices.includes('reply-angry-1')
                        const triedIgnoreInPhase1 = gameState.triedChoices.includes('ignore-1')
                        
                        // If they tried angry in phase 1, only show ignore option
                        if (triedAngryInPhase1 && choice.id === 'reply-angry-2') return null
                        // If they tried ignore in phase 1, only show angry option  
                        if (triedIgnoreInPhase1 && choice.id === 'ignore-2') return null
                      }
                      
                      // Disable choices that have been tried if we're forcing other choices
                      const isDisabled = shouldForceOtherChoices() && gameState.triedChoices.includes(choice.id)
                      
                      return (
                        <motion.button
                          key={choice.id}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: isDisabled ? 1 : 1.02, y: isDisabled ? 0 : -2 }}
                          whileTap={{ scale: isDisabled ? 1 : 0.98 }}
                          onClick={() => handleChoice(choice.id)}
                          disabled={isAnimating || isDisabled}
                          className={`w-full font-bold text-xl px-8 py-6 rounded-full transition-all duration-200 ${
                            isDisabled 
                              ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                              : 'bg-gradient-to-r from-brand-purple to-brand-orange text-white hover:shadow-2xl hover:from-brand-purple-light hover:to-brand-orange-light'
                          } disabled:opacity-50`}
                        >
                          {choice.text}
                          {isDisabled && <span className="ml-2 text-sm">✓ Already tried</span>}
                        </motion.button>
                      )
                    })}
                    {shouldForceOtherChoices() && currentPhaseData.id === 'bad-strategies-comment1' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-neutral-600 text-lg mt-4"
                      >
                        Try the other response to see how it compares
                      </motion.p>
                    )}
                    {currentPhaseData.id === 'bad-strategies-comment2' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-neutral-600 text-lg mt-4"
                      >
                        Now try the other response to complete your learning
                      </motion.p>
                    )}
                  </div>
                )}
              </motion.div>
            ) : !showChoices && !currentStepData?.requiresChoiceToProgress && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={advanceToNextStep}
                  disabled={isAnimating}
                  className="bg-gradient-to-r from-brand-purple to-brand-orange text-white font-bold text-xl px-12 py-4 rounded-full hover:shadow-2xl transition-all duration-200 hover:from-brand-purple-light hover:to-brand-orange-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Badge Completion Popup */}
      <BadgeCompletionPopup
        isVisible={showBadgeCompletion}
        badgeName={currentBadgeData.name}
        onClose={() => {
          setShowBadgeCompletion(false)
          setGameState(prev => ({
            ...prev,
            currentPhase: 0,
            currentStep: 0,
            completedBadges: [...prev.completedBadges, prev.currentBadge],
            meters: { mentalHealth: 100, communityTrust: 100 },
            visibleCards: []
          }))
        }}
      />
    </div>
  )
}