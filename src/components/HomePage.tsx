import { motion } from 'framer-motion'
import { useState } from 'react'
import { ModernButton } from './ModernButton'
import { FloatingCard } from './FloatingCard'
import SubtlePixelBlast from './SubtlePixelBlast'

interface HomePageProps {
  onPractice: () => void
  onGetHelp: () => void
}

export function HomePage({ onPractice, onGetHelp }: HomePageProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple-darker via-brand-purple to-brand-orange-dark overflow-hidden relative">
      {/* Pixel Blast Background */}
      <SubtlePixelBlast primaryColor="orange" className="z-0" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-10 left-4 md:top-20 md:left-20 w-32 h-32 md:w-96 md:h-96 bg-brand-orange/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-4 md:bottom-20 md:right-20 w-32 h-32 md:w-96 md:h-96 bg-brand-purple-light/20 rounded-full blur-3xl animate-float animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-gradient-radial from-brand-orange/10 to-transparent rounded-full animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-brand-white mb-4 tracking-tight drop-shadow-2xl">
            VACCINE
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-brand-white/80 font-light tracking-wide drop-shadow-lg px-4">
            Immunize Against Online Hate
          </p>
        </motion.div>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 px-4 w-full max-w-4xl">
          {/* Practice Button */}
          <FloatingCard delay={0.3} glowColor="orange" className="relative flex-1">
            <ModernButton
              onClick={onPractice}
              variant="primary"
              size="lg"
              icon="🎮"
              className="w-full h-full group min-h-[120px] sm:min-h-[140px]"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-xl sm:text-2xl font-bold uppercase tracking-wider">Practice</span>
                <span className="text-xs sm:text-sm opacity-90 mt-1">Train in Safe Scenarios</span>
              </div>
            </ModernButton>
            {hoveredButton === 'practice' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-brand-white/70 text-sm whitespace-nowrap bg-brand-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
              >
                Learn through interactive simulations
              </motion.div>
            )}
          </FloatingCard>

          {/* Get Help Button */}
          <FloatingCard delay={0.4} glowColor="purple" className="relative flex-1">
            <ModernButton
              onClick={onGetHelp}
              variant="secondary"
              size="lg"
              icon="🆘"
              className="w-full h-full group min-h-[120px] sm:min-h-[140px]"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-xl sm:text-2xl font-bold uppercase tracking-wider">Get Help</span>
                <span className="text-xs sm:text-sm opacity-90 mt-1">Real-Time Support</span>
              </div>
            </ModernButton>
            {hoveredButton === 'help' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-brand-white/70 text-sm whitespace-nowrap bg-brand-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
              >
                Get advice for real situations now
              </motion.div>
            )}
          </FloatingCard>
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 text-center"
        >
          <p className="text-brand-white/50 text-sm">
            Built for content creators facing online harassment
          </p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 md:top-10 md:right-10 text-brand-white/20">
        <svg width="40" height="40" viewBox="0 0 60 60" fill="currentColor" className="w-8 h-8 md:w-12 md:h-12">
          <circle cx="10" cy="10" r="3" className="animate-pulse" />
          <circle cx="30" cy="10" r="3" className="animate-pulse animation-delay-200" />
          <circle cx="50" cy="10" r="3" className="animate-pulse animation-delay-400" />
          <circle cx="10" cy="30" r="3" className="animate-pulse animation-delay-600" />
          <circle cx="30" cy="30" r="3" className="animate-pulse animation-delay-800" />
          <circle cx="50" cy="30" r="3" className="animate-pulse animation-delay-1000" />
          <circle cx="10" cy="50" r="3" className="animate-pulse animation-delay-1200" />
          <circle cx="30" cy="50" r="3" className="animate-pulse animation-delay-1400" />
          <circle cx="50" cy="50" r="3" className="animate-pulse animation-delay-1600" />
        </svg>
      </div>
      
      {/* Additional floating elements */}
      <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10">
        <motion.div 
          className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-brand-orange/20 to-brand-purple/20 rounded-2xl backdrop-blur-sm border border-brand-white/10"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  )
}