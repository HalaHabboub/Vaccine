import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { hateCommentsStepByStepBadge } from '../data/badges/hateCommentsStepByStep'
import { SocialMediaCard } from './SocialMediaCard'
import { BadgeCompletionPopup } from './BadgeCompletionPopup'
import type { GameState, Badge, StoryCard } from '../types/game'

export function GameController() {
  const [gameState, setGameState] = useState<GameState>({
    currentBadge: 'hate-comments-steps',
    currentPhase: 0,
    currentStep: 0,
    completedBadges: [],
    meters: {
      mentalHealth: 100,
      communityTrust: 100,
    },
    history: [],
    visibleCards: []
  })
  
  const [isAnimating, setIsAnimating] = useState(false)
  const [showChoices, setShowChoices] = useState(false)

  const currentBadgeData: Badge = hateCommentsStepByStepBadge
  const currentPhaseData = currentBadgeData.phases[gameState.currentPhase]
  const currentStepData = currentPhaseData.steps?.[gameState.currentStep]

  const [showBadgeCompletion, setShowBadgeCompletion] = useState(false)
  
  // Auto-progress through cards in current step
  useEffect(() => {
    if (!currentStepData || isAnimating) return
    
    const cardsToShow = currentStepData.cards
    const currentVisibleCount = gameState.visibleCards.length
    
    if (currentVisibleCount < cardsToShow.length) {
      const timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          visibleCards: [...prev.visibleCards, cardsToShow[currentVisibleCount]]
        }))
      }, currentVisibleCount === 0 ? 500 : 2000) // First card faster, subsequent slower
      
      return () => clearTimeout(timer)
    } else if (currentStepData.requiresChoiceToProgress) {
      // Show choices when all cards are visible and choices are required
      setTimeout(() => setShowChoices(true), 1000)
    } else {
      // Auto-advance to next step if no choices required
      setTimeout(() => advanceToNextStep(), 2000)
    }
  }, [gameState.visibleCards.length, gameState.currentStep, isAnimating])
  
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
    const choice = currentPhaseData.choices.find(c => c.id === choiceId)
    if (!choice) return
    
    setIsAnimating(true)
    setShowChoices(false)
    
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
      setTimeout(() => {
        const feedbackCard: StoryCard = {
          id: `feedback-${Date.now()}`,
          type: 'feedback',
          content: choice.feedback || 'Action completed.'
        }
        
        setGameState(prev => ({
          ...prev,
          visibleCards: [...prev.visibleCards, feedbackCard]
        }))
        
        setTimeout(() => {
          setIsAnimating(false)
          advanceToNextStep()
        }, 2500)
      }, 1000)
    } else {
      setTimeout(() => {
        setIsAnimating(false)
        advanceToNextStep()
      }, 1500)
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

  // Convert community trust (0-100) to followers (1K-1M scale)
  const followersCount = Math.floor((gameState.meters.communityTrust / 100) * 999000) + 1000
  const stressLevel = 100 - gameState.meters.mentalHealth

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

          {/* Choice Buttons */}
          <AnimatePresence>
            {showChoices && currentPhaseData.choices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center space-y-6"
              >
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">How do you respond?</h3>
                <div className="space-y-4 w-full max-w-2xl">
                  {currentPhaseData.choices.map((choice, index) => (
                    <motion.button
                      key={choice.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChoice(choice.id)}
                      disabled={isAnimating}
                      className="w-full bg-gradient-to-r from-brand-purple to-brand-orange text-white font-bold text-xl px-8 py-6 rounded-full hover:shadow-2xl transition-all duration-200 hover:from-brand-purple-light hover:to-brand-orange-light disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {choice.text}
                    </motion.button>
                  ))}
                </div>
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