import { motion } from 'framer-motion'
import { useState } from 'react'
import { ModernButton } from './ModernButton'

interface CommunityPost {
  id: string
  type: 'experience' | 'resource'
  title: string
  description: string
  author?: string
  timestamp: string
  category?: string
  url?: string
}

const fakePosts: CommunityPost[] = [
  {
    id: '1',
    type: 'experience',
    title: 'How I Handled My First Wave of Hate Comments',
    description: 'Last month, my video went viral and I got overwhelmed with negative comments. Here\'s what I learned about staying resilient and focusing on the supportive community.',
    author: 'Sarah_Creator',
    timestamp: '2 days ago',
    category: 'Personal Story'
  },
  {
    id: '2',
    type: 'resource',
    title: 'Digital Wellness Toolkit',
    description: 'A comprehensive guide with apps, browser extensions, and strategies for maintaining mental health while being active online.',
    timestamp: '1 week ago',
    category: 'Mental Health',
    url: '#'
  },
  {
    id: '3',
    type: 'experience',
    title: 'Building a Supportive Mod Team',
    description: 'After years of managing harassment alone, I finally built a team of moderators. Here are the lessons I learned about delegation and community management.',
    author: 'TechReviewer_Mike',
    timestamp: '3 days ago',
    category: 'Community Management'
  },
  {
    id: '4',
    type: 'resource',
    title: 'Crisis Response Flowchart',
    description: 'A step-by-step visual guide for content creators on how to respond when facing coordinated harassment campaigns.',
    timestamp: '5 days ago',
    category: 'Emergency Response',
    url: '#'
  },
  {
    id: '5',
    type: 'experience',
    title: 'The Power of Taking Breaks',
    description: 'I used to think taking social media breaks showed weakness. Sharing how strategic breaks actually strengthened my content and mental health.',
    author: 'LifestyleBlogger_Ana',
    timestamp: '1 week ago',
    category: 'Self-Care'
  },
  {
    id: '6',
    type: 'resource',
    title: 'Legal Resources for Online Harassment',
    description: 'Compiled list of legal aid organizations, pro-bono lawyers, and resources specifically for content creators facing harassment.',
    timestamp: '2 weeks ago',
    category: 'Legal Support',
    url: '#'
  }
]

interface CommunityPageProps {
  onBack: () => void
}

export function CommunityPage({ onBack }: CommunityPageProps) {
  const [filter, setFilter] = useState<'all' | 'experience' | 'resource'>('all')
  
  const filteredPosts = fakePosts.filter(post => 
    filter === 'all' || post.type === filter
  )

  const getCardStyling = (type: string) => {
    return 'bg-white/95 border-white/50 text-gray-800'
  }

  const getIcon = (type: string) => {
    return type === 'experience' ? '💭' : '📚'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple-darker via-brand-purple to-brand-orange-dark overflow-hidden">
      <div className="relative z-10 min-h-screen py-6 md:py-8 px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="text-brand-white/80 hover:text-brand-white transition-colors flex items-center gap-2"
            >
              ← Back to Home
            </button>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-black text-brand-white mb-4">
              Community
            </h1>
            <p className="text-lg md:text-xl text-brand-white/80 max-w-2xl mx-auto">
              Share experiences, find resources, and connect with fellow creators
            </p>
          </div>

          {/* Filter Buttons - Mobile Friendly */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 px-4">
            <ModernButton
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'primary' : 'secondary'}
              size="sm"
              className="w-full sm:w-auto"
            >
              All Posts
            </ModernButton>
            <ModernButton
              onClick={() => setFilter('experience')}
              variant={filter === 'experience' ? 'primary' : 'secondary'}
              size="sm"
              className="w-full sm:w-auto"
            >
              💭 Experiences
            </ModernButton>
            <ModernButton
              onClick={() => setFilter('resource')}
              variant={filter === 'resource' ? 'primary' : 'secondary'}
              size="sm"
              className="w-full sm:w-auto"
            >
              📚 Resources
            </ModernButton>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${getCardStyling(post.type)} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer backdrop-blur-sm border border-white/20 h-full flex flex-col`}
              >
                {/* Header - Fixed height */}
                <div className="p-6 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl flex-shrink-0">{getIcon(post.type)}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.type === 'experience' 
                        ? 'bg-brand-purple/20 text-brand-purple' 
                        : 'bg-brand-orange/20 text-brand-orange'
                    }`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 leading-tight min-h-[3.5rem] line-clamp-2">
                    {post.title}
                  </h3>
                </div>

                {/* Description - Flexible height */}
                <div className="px-6 flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                    {post.description}
                  </p>
                </div>

                {/* Footer - Fixed height */}
                <div className="p-6 pt-4 border-t border-gray-200 mt-auto flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>📅</span>
                      <span>{post.timestamp}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      post.type === 'experience' 
                        ? 'bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/20' 
                        : 'bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20'
                    }`}>
                      {post.type === 'experience' ? '💬 Read' : '🔗 View'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto mt-12 md:mt-16 px-4"
        >
          <div className="bg-gradient-to-r from-brand-purple/20 to-brand-orange/20 border border-brand-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-white mb-3 md:mb-4">
              Share Your Story
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-brand-white/80 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              Help others by sharing your experiences or resources that made a difference
            </p>
            <div className="flex justify-center">
              <ModernButton 
                variant="primary" 
                size="lg"
                className="w-full sm:w-auto max-w-xs"
              >
                📝 Submit Your Post
              </ModernButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}