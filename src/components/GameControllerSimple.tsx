import { useState, useEffect } from 'react'
import { hateCommentsSimple } from '../data/badges/hateCommentsSimple'
import { SocialMediaCard } from './SocialMediaCard'
import { BadgeCompletionPopup } from './BadgeCompletionPopup'
import { EffectsDisplay } from './EffectsDisplay'
import type { GameState, Badge, StoryCard } from '../types/game'

interface GameControllerSimpleProps {
  onBadgeComplete: () => void
}

export function GameControllerSimple({ onBadgeComplete }: GameControllerSimpleProps) {
  const [gameState, setGameState] = useState<GameState>({
    currentBadge: 'hate-comments-simple',
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
  
  const [showBadgeCompletion, setShowBadgeCompletion] = useState(false)
  const [lastChoiceEffects, setLastChoiceEffects] = useState<{
    followersChange: number
    stressChange: number
    message: string
    followersNew: number
    stressNew: number
  } | null>(null)
  
  const currentBadgeData: Badge = hateCommentsSimple
  const currentPhaseData = currentBadgeData.phases[gameState.currentPhase]
  const currentStepData = currentPhaseData.steps?.[gameState.currentStep]

  // Initialize cards when phase/step changes
  useEffect(() => {
    if (!currentStepData) return
    
    // For outcome steps, populate cards based on previous choice
    if (currentPhaseData.id === 'step-4-first-choice-outcome') {
      const lastChoice = gameState.history[gameState.history.length - 1]?.choiceId
      let outcomeCard: StoryCard
      
      if (lastChoice === 'reply-angry-1') {
        outcomeCard = {
          id: 'angry-reply-card',
          type: 'reply',
          content: 'Why don\'t you get a life instead of trolling here?',
          isUserPost: true,
          author: 'You',
          timestamp: 'just now'
        }
      } else {
        outcomeCard = {
          id: 'ignore-feedback',
          type: 'feedback',
          content: 'You chose to ignore; stress builds silently.'
        }
      }
      
      setGameState(prev => ({
        ...prev,
        visibleCards: [outcomeCard]
      }))
    } else if (currentPhaseData.id === 'step-6-second-choice-outcome') {
      const lastChoice = gameState.history[gameState.history.length - 1]?.choiceId
      let outcomeCard: StoryCard
      
      if (lastChoice === 'reply-angry-2') {
        outcomeCard = {
          id: 'angry-reply-card-2',
          type: 'reply',
          content: 'Your angry reply escalates the conflict and attracts more trolls.',
          isUserPost: true,
          author: 'You',
          timestamp: 'just now'
        }
      } else {
        outcomeCard = {
          id: 'ignore-feedback-2',
          type: 'feedback',
          content: 'Ignoring builds internal stress without resolution.'
        }
      }
      
      setGameState(prev => ({
        ...prev,
        visibleCards: [outcomeCard]
      }))
    } else {
      // Normal case - show the step's cards
      setGameState(prev => ({
        ...prev,
        visibleCards: currentStepData.cards
      }))
    }
  }, [gameState.currentPhase, gameState.currentStep])

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
      // Clear effects when moving to a non-outcome phase
      if (!currentBadgeData.phases[nextPhase]?.id.includes('outcome')) {
        setLastChoiceEffects(null)
      }
    }
  }

  const handleChoice = (choiceId: string) => {
    if (!currentPhaseData.choices) return
    const choice = currentPhaseData.choices.find(c => c.id === choiceId)
    if (!choice) return

    // Handle freeform input
    if (choice.isFreeform) {
      handleFreeformSubmit()
      return
    }

    // For step 3 (first hate comment), check if we need to force the other choice
    if (currentPhaseData.id === 'step-3-first-hate-comment') {
      const oldFollowers = Math.floor((gameState.meters.communityTrust / 100) * 999990) + 10
      const oldStress = 100 - gameState.meters.mentalHealth
      
      const newMentalHealth = Math.max(0, Math.min(100, gameState.meters.mentalHealth + (choice.effects.mentalHealth || 0)))
      const newCommunityTrust = Math.max(0, Math.min(100, gameState.meters.communityTrust + (choice.effects.communityTrust || 0)))
      
      const newFollowers = Math.floor((newCommunityTrust / 100) * 999990) + 10
      const newStress = 100 - newMentalHealth
      
      // Store effects for display
      setLastChoiceEffects({
        followersChange: newFollowers - oldFollowers,
        stressChange: newStress - oldStress,
        message: choice.text,
        followersNew: newFollowers,
        stressNew: newStress
      })
      
      // Track the choice and update meters
      setGameState(prev => ({
        ...prev,
        meters: {
          mentalHealth: newMentalHealth,
          communityTrust: newCommunityTrust,
        },
        history: [...prev.history, { phaseId: currentPhaseData.id, choiceId }],
        triedChoices: [...prev.triedChoices, choiceId]
      }))
      
      // Always advance to show outcome
      advanceToNextPhase()
      return
    }

    // For step 5 (second hate comment), only allow the opposite choice from step 3
    if (currentPhaseData.id === 'step-5-second-hate-comment') {
      const triedAngryFirst = gameState.triedChoices.includes('reply-angry-1')
      const triedIgnoreFirst = gameState.triedChoices.includes('ignore-1')
      
      // Only allow the opposite choice
      if ((triedAngryFirst && choiceId !== 'ignore-2') || (triedIgnoreFirst && choiceId !== 'reply-angry-2')) {
        return // Don't allow this choice
      }
    }

    // Calculate effects for all other choices
    const oldFollowers = Math.floor((gameState.meters.communityTrust / 100) * 999990) + 10
    const oldStress = 100 - gameState.meters.mentalHealth
    
    const newMentalHealth = Math.max(0, Math.min(100, gameState.meters.mentalHealth + (choice.effects.mentalHealth || 0)))
    const newCommunityTrust = Math.max(0, Math.min(100, gameState.meters.communityTrust + (choice.effects.communityTrust || 0)))
    
    const newFollowers = Math.floor((newCommunityTrust / 100) * 999990) + 10
    const newStress = 100 - newMentalHealth
    
    // Store effects for display
    setLastChoiceEffects({
      followersChange: newFollowers - oldFollowers,
      stressChange: newStress - oldStress,
      message: choice.text,
      followersNew: newFollowers,
      stressNew: newStress
    })

    // Update meters and track choice
    setGameState(prev => ({
      ...prev,
      meters: {
        mentalHealth: newMentalHealth,
        communityTrust: newCommunityTrust,
      },
      history: [...prev.history, { phaseId: currentPhaseData.id, choiceId }],
      triedChoices: [...prev.triedChoices, choiceId]
    }))

    advanceToNextPhase()
  }

  const handleFreeformSubmit = () => {
    const input = gameState.freeformInput?.trim() || ''
    if (!input) return
    
    // Simple AI evaluation
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
      // Advance to completion
      setTimeout(() => advanceToNextPhase(), 1000)
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

  const handleNext = () => {
    advanceToNextPhase()
  }

  // Check if we should show choices
  const choices = currentPhaseData.choices || []
  const shouldShowChoices = currentStepData?.requiresChoiceToProgress && choices.length > 0

  // For step 5, filter choices to only show the opposite of what was tried in step 3
  let availableChoices = choices
  if (currentPhaseData.id === 'step-5-second-hate-comment') {
    const triedAngryFirst = gameState.triedChoices.includes('reply-angry-1')
    const triedIgnoreFirst = gameState.triedChoices.includes('ignore-1')
    
    if (triedAngryFirst) {
      availableChoices = choices.filter(c => c.id === 'ignore-2')
    } else if (triedIgnoreFirst) {
      availableChoices = choices.filter(c => c.id === 'reply-angry-2')
    }
  }

  // Calculate display values
  const followersCount = Math.floor((gameState.meters.communityTrust / 100) * 999990) + 10
  const stressLevel = 100 - gameState.meters.mentalHealth

  const getFollowersDisplay = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  const getStressColor = (value: number) => {
    if (value <= 30) return 'from-green-400 to-green-500'
    if (value <= 60) return 'from-yellow-400 to-orange-400'
    return 'from-red-400 to-red-500'
  }

  // Determine current phase for status bar
  const getCurrentPhase = () => {
    if (gameState.currentPhase <= 6) {
      return { phase: 1, name: 'Bad Reactions', description: 'Learning what doesn\'t work' }
    } else if (gameState.currentPhase <= 14) {
      return { phase: 2, name: 'Good Strategies', description: 'Learning healthy responses' }
    } else {
      return { phase: 3, name: 'Practice', description: 'Apply what you learned' }
    }
  }

  const currentPhaseInfo = getCurrentPhase()

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col lg:flex-row">
      {/* Left Sidebar - Mobile: Top bar, Desktop: Left sidebar */}
      <div className="w-full lg:w-80 bg-neutral-900 shadow-2xl flex flex-row lg:flex-col justify-around lg:justify-center px-4 py-4 lg:px-8 lg:py-12 space-x-8 lg:space-x-0 lg:space-y-16">
        {/* Followers Metric */}
        <div className="text-center">
          <div className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-2">FOLLOWERS</div>
          <div className="text-white text-3xl lg:text-5xl font-black">
            {getFollowersDisplay(followersCount)}
          </div>
        </div>

        {/* Stress Level Meter */}
        <div className="flex-1 lg:flex-initial">
          <div className="flex items-center justify-center mb-2 lg:mb-6">
            <span className="text-2xl lg:text-4xl mr-2 lg:mr-3">🧠</span>
            <div className="text-center">
              <div className="text-neutral-400 text-xs lg:text-sm font-medium uppercase tracking-wider">STRESS</div>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full bg-neutral-800 rounded-full h-4 lg:h-6 overflow-hidden border border-neutral-700">
              <div
                className={`h-full bg-gradient-to-r ${getStressColor(stressLevel)} shadow-lg transition-all duration-500`}
                style={{ width: `${stressLevel}%` }}
              />
            </div>
            <div className="text-center mt-2 lg:mt-3">
              <span className="text-white text-sm lg:text-lg font-semibold">{stressLevel}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Panel */}
      <div className="flex-1 px-4 py-4 lg:px-16 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Phase Status Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-brand-purple to-brand-orange text-white font-bold px-4 py-2 rounded-full">
                  Phase {currentPhaseInfo.phase}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-800 text-lg">{currentPhaseInfo.name}</h3>
                  <p className="text-neutral-600 text-sm">{currentPhaseInfo.description}</p>
                </div>
              </div>
              <div className="text-neutral-500 font-medium">
                Step {gameState.currentPhase + 1} of {currentBadgeData.phases.length}
              </div>
            </div>
            
            {/* Phase Progress Bar */}
            <div className="flex space-x-2">
              <div className={`flex-1 h-2 rounded-full ${currentPhaseInfo.phase >= 1 ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-neutral-200'}`}></div>
              <div className={`flex-1 h-2 rounded-full ${currentPhaseInfo.phase >= 2 ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-neutral-200'}`}></div>
              <div className={`flex-1 h-2 rounded-full ${currentPhaseInfo.phase >= 3 ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 'bg-neutral-200'}`}></div>
            </div>
            <div className="flex justify-between text-xs text-neutral-500 mt-2">
              <span>Bad Reactions</span>
              <span>Good Strategies</span>
              <span>Practice</span>
            </div>
          </div>

          {/* Phase Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-800 mb-2">{currentPhaseData.narrative}</h2>
          </div>

          {/* Social Media Cards */}
          <div className="space-y-6 mb-12">
            {gameState.visibleCards.map((card, index) => (
              <div key={`${card.id}-${index}`} className="flex justify-center">
                <SocialMediaCard
                  type={card.type}
                  author={card.author}
                  content={card.content}
                  isUserPost={card.isUserPost}
                  timestamp={card.timestamp}
                />
              </div>
            ))}
            
            {/* Show effects after choice outcomes */}
            {lastChoiceEffects && (currentPhaseData.id.includes('outcome') || currentPhaseData.id.includes('good-outcome')) && (
              <div className="max-w-2xl mx-auto">
                <EffectsDisplay
                  effects={[
                    {
                      type: 'followers',
                      change: lastChoiceEffects.followersChange,
                      newValue: lastChoiceEffects.followersNew
                    },
                    {
                      type: 'stress',
                      change: lastChoiceEffects.stressChange,
                      newValue: lastChoiceEffects.stressNew
                    }
                  ]}
                  message={lastChoiceEffects.message}
                />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center">
            {shouldShowChoices ? (
              <div className="flex flex-col items-center space-y-6 w-full max-w-2xl">
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">How do you respond?</h3>
                
                {/* Freeform input */}
                {availableChoices && availableChoices.some(c => c.isFreeform) ? (
                  <div className="w-full space-y-4">
                    <textarea
                      value={gameState.freeformInput || ''}
                      onChange={(e) => setGameState(prev => ({ ...prev, freeformInput: e.target.value }))}
                      placeholder="Type your response here..."
                      className="w-full p-4 border-2 border-neutral-300 rounded-lg text-lg font-medium resize-none h-32 focus:border-brand-purple focus:outline-none"
                    />
                    <button
                      onClick={() => handleChoice('freeform-response')}
                      disabled={!gameState.freeformInput?.trim()}
                      className="w-full bg-gradient-to-r from-brand-purple to-brand-orange text-white font-bold text-xl px-8 py-6 rounded-full hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Response
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 w-full">
                    {availableChoices && availableChoices.map((choice) => (
                      <button
                        key={choice.id}
                        onClick={() => handleChoice(choice.id)}
                        className="w-full bg-gradient-to-r from-brand-purple to-brand-orange text-white font-bold text-xl px-8 py-6 rounded-full hover:shadow-xl transition-all duration-200"
                      >
                        {choice.text}
                      </button>
                    ))}
                    {currentPhaseData.id === 'step-5-second-hate-comment' && (
                      <p className="text-center text-neutral-600 text-lg mt-4">
                        Now try the other response to complete your learning
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-brand-purple to-brand-orange text-white font-bold text-xl px-12 py-4 rounded-full hover:shadow-xl transition-all duration-200"
              >
                Next
              </button>
            )}
          </div>
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
            meters: { mentalHealth: 70, communityTrust: 10 },
            visibleCards: [],
            triedChoices: [],
            freeformInput: ''
          }))
          // Redirect to badges page after a short delay
          setTimeout(() => {
            onBadgeComplete()
          }, 500)
        }}
      />
    </div>
  )
}