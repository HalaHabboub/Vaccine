import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ModernButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  disabled?: boolean
  className?: string
}

export function ModernButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  className = ''
}: ModernButtonProps) {
  const baseClasses = 'relative overflow-hidden font-bold uppercase tracking-wider transition-all duration-300 ease-out rounded-2xl border-2 flex items-center justify-center gap-3'
  
  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-12 py-6 text-lg',
    lg: 'px-16 py-8 text-xl'
  }

  const variantClasses = {
    primary: `
      bg-gradient-to-br from-brand-orange to-brand-orange-dark 
      border-brand-orange-light/30 
      text-brand-white 
      shadow-2xl shadow-brand-orange/25
      hover:shadow-3xl hover:shadow-brand-orange/40
      hover:scale-105
      active:scale-95
    `,
    secondary: `
      bg-gradient-to-br from-brand-purple to-brand-purple-dark 
      border-brand-purple-light/30 
      text-brand-white 
      shadow-2xl shadow-brand-purple/25
      hover:shadow-3xl hover:shadow-brand-purple/40
      hover:scale-105
      active:scale-95
    `,
    ghost: `
      bg-transparent 
      border-brand-white/20 
      text-brand-white 
      backdrop-blur-sm
      hover:bg-brand-white/10
      hover:border-brand-white/40
      hover:scale-105
      active:scale-95
    `
  }

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none' : 'cursor-pointer'

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={`
        ${baseClasses} 
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${disabledClasses} 
        ${className}
      `}
      whileHover={disabled ? {} : { 
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={disabled ? {} : { 
        scale: 0.95,
        transition: { type: "spring", stiffness: 400, damping: 30 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-brand-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full" />
      
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-white/10 to-transparent rounded-2xl" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <span>{children}</span>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" 
           style={{
             background: variant === 'primary' ? '#FF6F00' : variant === 'secondary' ? '#4B0082' : 'transparent',
             filter: 'blur(20px)',
             zIndex: -1
           }} 
      />
    </motion.button>
  )
}