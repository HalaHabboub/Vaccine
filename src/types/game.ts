export interface Choice {
  id: string
  text: string
  effects: {
    mentalHealth?: number
    communityTrust?: number
  }
  feedback?: string
}

export interface StoryCard {
  id: string
  type: 'post' | 'comment' | 'reply' | 'feedback'
  author?: string
  content: string
  isUserPost?: boolean
  timestamp?: string
}

export interface StoryStep {
  id: string
  cards: StoryCard[]
  choices?: Choice[]
  requiresChoiceToProgress?: boolean
}

export interface Phase {
  id: string
  type: 'scenario' | 'lesson' | 'practice' | 'completion'
  narrative: string
  choices: Choice[]
  lessonText?: string
  steps?: StoryStep[] // New card-based progression
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  phases: Phase[]
}

export interface GameState {
  currentBadge: string
  currentPhase: number
  currentStep: number // New step tracking
  completedBadges: string[]
  meters: {
    mentalHealth: number
    communityTrust: number
  }
  history: Array<{
    phaseId: string
    choiceId: string
  }>
  visibleCards: StoryCard[] // Cards currently visible to user
}

export interface Meters {
  mentalHealth: number
  communityTrust: number
}