import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FloatingCardProps {
  children: ReactNode
  className?: string
  delay?: number
  glowColor?: 'orange' | 'purple' | 'white'
}

export function FloatingCard({ 
  children, 
  className = '', 
  delay = 0,
  glowColor = 'orange'
}: FloatingCardProps) {
  const glowColors = {
    orange: 'shadow-brand-orange/20 hover:shadow-brand-orange/40',
    purple: 'shadow-brand-purple/20 hover:shadow-brand-purple/40',
    white: 'shadow-white/20 hover:shadow-white/40'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={{ 
        y: -5,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      className={`
        relative group cursor-pointer
        bg-gradient-to-br from-brand-white/10 to-brand-white/5
        backdrop-blur-lg border border-brand-white/20
        rounded-3xl p-8
        shadow-2xl ${glowColors[glowColor]}
        transition-all duration-300 ease-out
        hover:border-brand-white/40
        ${className}
      `}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-orange/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Inner glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-white/5 to-transparent rounded-3xl" />
      
      {/* Shimmer effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-orange/30 rounded-full animate-ping" />
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-brand-purple/30 rounded-full animate-ping animation-delay-1000" />
      </div>
    </motion.div>
  )
}