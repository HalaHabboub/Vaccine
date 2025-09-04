import { motion } from 'framer-motion'

interface SocialMediaCardProps {
  type: 'post' | 'comment' | 'reply' | 'feedback'
  author?: string
  content: string
  timestamp?: string
  isUserPost?: boolean
  className?: string
}

export function SocialMediaCard({ 
  type, 
  author, 
  content, 
  timestamp, 
  isUserPost = false,
  className = '' 
}: SocialMediaCardProps) {
  const getCardStyling = () => {
    switch (type) {
      case 'post':
        return isUserPost 
          ? 'bg-brand-purple/10 border-brand-purple/30' 
          : 'bg-white border-neutral-200'
      case 'comment':
        return 'bg-red-50 border-red-200'
      case 'reply':
        return isUserPost 
          ? 'bg-brand-orange/10 border-brand-orange/30' 
          : 'bg-neutral-50 border-neutral-200'
      case 'feedback':
        return 'bg-gradient-to-r from-brand-purple/10 to-brand-orange/10 border-brand-purple/20'
      default:
        return 'bg-white border-neutral-200'
    }
  }

  const getAuthorStyling = () => {
    if (isUserPost) return 'text-brand-purple font-bold'
    if (type === 'comment') return 'text-red-600 font-semibold'
    return 'text-neutral-700 font-semibold'
  }

  const getIcon = () => {
    switch (type) {
      case 'post':
        return isUserPost ? '📝' : '💬'
      case 'comment':
        return '💢'
      case 'reply':
        return '↩️'
      case 'feedback':
        return '📊'
      default:
        return '💬'
    }
  }

  return (
    <div
      className={`${getCardStyling()} border-2 rounded-2xl p-6 shadow-lg max-w-2xl ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{getIcon()}</span>
        <div className="flex-1">
          {author && (
            <span className={`${getAuthorStyling()} text-lg`}>
              {author}
            </span>
          )}
          {timestamp && (
            <span className="text-neutral-500 text-sm ml-2">
              {timestamp}
            </span>
          )}
          {type === 'feedback' && !author && (
            <span className="text-brand-purple font-bold text-lg">
              System Feedback
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="text-neutral-800 text-lg leading-relaxed">
        {type === 'post' && !isUserPost && (
          <span className="text-neutral-600 font-medium text-base block mb-2">
            Comment:
          </span>
        )}
        {type === 'post' && isUserPost && (
          <span className="text-brand-purple font-medium text-base block mb-2">
            You posted:
          </span>
        )}
        {type === 'reply' && isUserPost && (
          <span className="text-brand-orange font-medium text-base block mb-2">
            Your reply:
          </span>
        )}
        
        <div className="font-medium">
          "{content}"
        </div>
      </div>

      {/* Engagement indicators for realism */}
      {(type === 'post' || type === 'comment') && (
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-current/10">
          <button className="flex items-center gap-2 text-neutral-500 hover:text-brand-purple transition-colors">
            <span>❤️</span>
            <span className="text-sm">{Math.floor(Math.random() * 50) + 1}</span>
          </button>
          <button className="flex items-center gap-2 text-neutral-500 hover:text-brand-orange transition-colors">
            <span>💬</span>
            <span className="text-sm">{Math.floor(Math.random() * 20) + 1}</span>
          </button>
          <button className="flex items-center gap-2 text-neutral-500 hover:text-green-500 transition-colors">
            <span>🔄</span>
            <span className="text-sm">{Math.floor(Math.random() * 10) + 1}</span>
          </button>
        </div>
      )}
    </div>
  )
}