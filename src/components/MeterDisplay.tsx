import { motion } from 'framer-motion'
import type { Meters } from '../types/game'

interface MeterDisplayProps {
  meters: Meters
}

export function MeterDisplay({ meters }: MeterDisplayProps) {
  const getMeterColor = (value: number, type: 'mental' | 'trust') => {
    if (value >= 70) return type === 'mental' 
      ? 'from-green-400 to-green-500' 
      : 'from-blue-400 to-blue-500'
    if (value >= 40) return type === 'mental' 
      ? 'from-yellow-400 to-orange-400' 
      : 'from-yellow-400 to-orange-400'
    return type === 'mental' 
      ? 'from-red-400 to-red-500' 
      : 'from-red-400 to-red-500'
  }

  const getGlowColor = (value: number) => {
    if (value >= 70) return 'shadow-green-500/30'
    if (value >= 40) return 'shadow-orange-500/30'
    return 'shadow-red-500/30'
  }

  return (
    <div className="bg-black/20 backdrop-blur-md border-b border-white/10 p-4 lg:p-6">
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4 lg:gap-8">
        <div className="space-y-2 lg:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold flex items-center gap-1 lg:gap-2">
              <span className="text-lg lg:text-2xl">🧠</span>
              <span className="text-sm lg:text-base">Mental Health</span>
            </span>
            <span className="text-white font-bold text-lg lg:text-xl">{meters.mentalHealth}%</span>
          </div>
          <div className="relative">
            <div className="w-full bg-black/40 rounded-full h-3 lg:h-4 overflow-hidden border border-white/20">
              <motion.div
                className={`h-full bg-gradient-to-r ${getMeterColor(meters.mentalHealth, 'mental')} ${getGlowColor(meters.mentalHealth)} shadow-lg`}
                initial={{ width: '100%' }}
                animate={{ width: `${meters.mentalHealth}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-white/5" />
          </div>
        </div>

        <div className="space-y-2 lg:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold flex items-center gap-1 lg:gap-2">
              <span className="text-lg lg:text-2xl">✅</span>
              <span className="text-sm lg:text-base">Community Trust</span>
            </span>
            <span className="text-white font-bold text-lg lg:text-xl">{meters.communityTrust}%</span>
          </div>
          <div className="relative">
            <div className="w-full bg-black/40 rounded-full h-3 lg:h-4 overflow-hidden border border-white/20">
              <motion.div
                className={`h-full bg-gradient-to-r ${getMeterColor(meters.communityTrust, 'trust')} ${getGlowColor(meters.communityTrust)} shadow-lg`}
                initial={{ width: '100%' }}
                animate={{ width: `${meters.communityTrust}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  )
}