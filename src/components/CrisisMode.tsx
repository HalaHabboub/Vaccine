import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { grokClient, type GrokMessage } from '../utils/grokClient'

interface Strategy {
  id: string
  title: string
  icon: string
  description: string
  mentalHealthImpact: number
  communityTrustImpact: number
  warning?: string
  recommended?: boolean
}

interface ConversationMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

type CrisisMode = 'input' | 'conversation' | 'strategies'

export function CrisisMode() {
  const [hatefulComment, setHatefulComment] = useState('')
  const [originalPost, setOriginalPost] = useState('')
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)
  const [mode, setMode] = useState<CrisisMode>('input')
  const [conversationMessages, setConversationMessages] = useState<ConversationMessage[]>([])
  const [grokHistory, setGrokHistory] = useState<GrokMessage[]>([])
  const [userInput, setUserInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentTypingMessage, setCurrentTypingMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversationMessages])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setUploadedImages(prev => [...prev, ...Array.from(files)])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  // const convertImageToBase64 = (file: File): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.onload = () => resolve(reader.result as string)
  //     reader.onerror = reject
  //     reader.readAsDataURL(file)
  //   })
  // }

  const typeMessage = (message: string, onComplete: (message: string) => void) => {
    setCurrentTypingMessage('')
    setIsTyping(true)
    
    let currentIndex = 0
    const typingSpeed = 30 // milliseconds per character
    
    const typeNextChar = () => {
      if (currentIndex < message.length) {
        setCurrentTypingMessage(message.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeNextChar, typingSpeed)
      } else {
        setIsTyping(false)
        setCurrentTypingMessage('')
        onComplete(message)
      }
    }
    
    // Start typing after a brief pause
    setTimeout(typeNextChar, 500)
  }

  const startConversation = async () => {
    if (!hatefulComment.trim()) return

    setIsAnalyzing(true)
    setMode('conversation')
    
    try {
      const initialHistory: GrokMessage[] = [
        { role: 'system', content: 'You are a supportive crisis counselor. Keep responses concise (under 30 words). Ask one simple question to understand their situation better, then gently suggest helpful responses. Be supportive but not overly emotional.' }
      ]

      // Prepare context for Grok
      const contextData = {
        hatefulComment,
        originalPost: originalPost.trim() || null,
        hasImages: uploadedImages.length > 0,
        imageCount: uploadedImages.length
      }
      
      const response = await grokClient.startCrisisConversation(contextData)
      
      // Use typing effect for the response
      typeMessage(response, (finalMessage) => {
        const assistantMessage: ConversationMessage = {
          id: Date.now().toString(),
          role: 'assistant',
          content: finalMessage,
          timestamp: new Date()
        }
        
        setConversationMessages([assistantMessage])
        setGrokHistory([
          ...initialHistory,
          { role: 'user', content: `I got this hateful comment: "${hatefulComment}". I need support.` },
          { role: 'assistant', content: finalMessage }
        ])
      })
    } catch (error) {
      console.error('Failed to start conversation:', error)
      // Fallback to original mode
      setMode('strategies')
      analyzeComment()
    } finally {
      setIsAnalyzing(false)
    }
  }

  const analyzeComment = () => {
    setStrategies([
      {
        id: 'rant',
        title: 'Rant Back',
        icon: '😤',
        description: 'Reply with anger and defend yourself aggressively',
        mentalHealthImpact: -30,
        communityTrustImpact: -40,
        warning: 'Feeds trolls, escalates situation, damages reputation'
      },
      {
        id: 'ignore',
        title: 'Ignore Forever',
        icon: '🙈',
        description: 'Don\'t respond and try to forget about it',
        mentalHealthImpact: -15,
        communityTrustImpact: 0,
        warning: 'Internal stress accumulates over time'
      },
      {
        id: 'block',
        title: 'Block & Report',
        icon: '🚫',
        description: 'Remove the user from your space and report to platform',
        mentalHealthImpact: 15,
        communityTrustImpact: 5,
        recommended: true
      },
      {
        id: 'positive',
        title: 'Rally Your Community',
        icon: '💪',
        description: 'Post appreciation for supportive fans without mentioning hate',
        mentalHealthImpact: 20,
        communityTrustImpact: 30,
        recommended: true
      }
    ])
  }

  const sendMessage = async () => {
    if (!userInput.trim() || isTyping) return

    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userInput,
      timestamp: new Date()
    }

    setConversationMessages(prev => [...prev, userMessage])
    setUserInput('')
    setIsTyping(true)

    try {
      const response = await grokClient.continueConversation(grokHistory, userInput)
      
      // Use typing effect for the response
      typeMessage(response, (finalMessage) => {
        const assistantMessage: ConversationMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: finalMessage,
          timestamp: new Date()
        }

        setConversationMessages(prev => [...prev, assistantMessage])
        setGrokHistory(prev => [
          ...prev,
          { role: 'user', content: userInput },
          { role: 'assistant', content: finalMessage }
        ])
      })
    } catch (error) {
      console.error('Failed to send message:', error)
      const errorMessage: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I\'m sorry, I\'m having trouble connecting right now. Please try again in a moment.',
        timestamp: new Date()
      }
      setConversationMessages(prev => [...prev, errorMessage])
    }
  }

  const showStrategies = () => {
    setMode('strategies')
    analyzeComment()
  }

  const resetConversation = () => {
    setMode('input')
    setConversationMessages([])
    setGrokHistory([])
    setHatefulComment('')
    setOriginalPost('')
    setUploadedImages([])
    setStrategies([])
    setSelectedStrategy(null)
  }

  const getImpactColor = (impact: number) => {
    if (impact >= 15) return 'text-green-400'
    if (impact >= 0) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getImpactText = (impact: number) => {
    if (impact > 0) return `+${impact}`
    return `${impact}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2 lg:p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 lg:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Crisis Support
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 px-4">
            Get compassionate support and guidance when you need it most
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 lg:p-8 mb-4 lg:mb-8 shadow-xl"
        >
          {/* Original Post Context */}
          <label className="block text-gray-800 mb-4 lg:mb-6">
            <span className="text-lg lg:text-xl font-semibold mb-2 block flex items-center gap-2">
              <span className="text-primary-orange text-xl lg:text-2xl">📝</span> What did you originally post? (Optional)
            </span>
            <textarea
              value={originalPost}
              onChange={(e) => setOriginalPost(e.target.value)}
              placeholder="Share your original post content for better context..."
              className="w-full p-3 lg:p-4 rounded-xl bg-white text-gray-800 placeholder-gray-500 border-2 border-gray-200 focus:border-primary-orange focus:outline-none resize-none text-base lg:text-lg shadow-md"
              rows={3}
            />
          </label>

          {/* Image Upload */}
          <div className="mb-4 lg:mb-6">
            <span className="text-lg lg:text-xl font-semibold mb-2 block text-gray-800 flex items-center gap-2">
              <span className="text-primary-orange text-xl lg:text-2xl">📸</span> Upload Screenshots (Optional)
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer inline-flex items-center px-4 lg:px-5 py-2 lg:py-3 bg-white/90 text-gray-800 rounded-xl border-2 border-primary-orange/30 hover:border-primary-orange transition-all shadow-md font-medium"
            >
              <span className="text-base lg:text-lg">📷 Add Images</span>
            </label>
            
            {/* Display uploaded images */}
            {uploadedImages.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 lg:gap-3">
                {uploadedImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg border border-white/20"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 bg-red-500 text-white rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center text-xs lg:text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hateful Comment */}
          <label className="block text-gray-800 mb-4">
            <span className="text-lg lg:text-xl font-semibold mb-2 block flex items-center gap-2">
              <span className="text-primary-orange text-xl lg:text-2xl">💬</span> The hateful comment you received:
            </span>
            <textarea
              value={hatefulComment}
              onChange={(e) => setHatefulComment(e.target.value)}
              placeholder="Example: 'You're a fraud, stop scamming everyone!'"
              className="w-full p-3 lg:p-4 rounded-xl bg-white text-gray-800 placeholder-gray-500 border-2 border-gray-200 focus:border-primary-orange focus:outline-none resize-none text-base lg:text-lg shadow-md"
              rows={4}
            />
          </label>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startConversation}
            disabled={!hatefulComment.trim() || isAnalyzing}
            className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-purple-600 text-white font-bold py-3 lg:py-5 px-6 lg:px-8 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl text-base lg:text-lg border-2 border-white/20"
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              'Talk to a Compassionate AI Counselor'
            )}
          </motion.button>
        </motion.div>

        {/* Conversation Interface */}
        <AnimatePresence>
          {mode === 'conversation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 lg:p-8 mb-4 lg:mb-8 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-3">
                <h2 className="text-xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-primary-orange">🤝</span> Crisis Conversation
                </h2>
                <div className="flex gap-2 lg:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={showStrategies}
                    className="bg-white/90 hover:bg-white text-gray-800 border-2 border-primary-orange/30 hover:border-primary-orange px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl font-medium shadow-md text-sm lg:text-base"
                  >
                    See Strategies
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetConversation}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl font-medium shadow-md text-sm lg:text-base"
                  >
                    Start Over
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div className="bg-gray-50 border border-primary-orange/20 rounded-xl p-3 lg:p-6 mb-4 h-64 lg:h-96 overflow-y-auto">
                {conversationMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[90%] lg:max-w-[80%] p-3 lg:p-4 rounded-xl shadow-lg border-2 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 border-purple-500/50'
                          : 'bg-white/95 border border-primary-orange/10'
                      }`}
                    >
                      <p className={`text-base lg:text-lg leading-relaxed font-medium ${message.role === 'user' ? 'text-white' : 'text-gray-800'}`}>{message.content}</p>
                      <p className={`text-xs lg:text-sm mt-2 ${message.role === 'user' ? 'text-purple-200' : 'text-gray-600'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator or live typing message */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border-2 border-primary-orange/20 p-3 lg:p-4 rounded-xl shadow-lg max-w-[90%] lg:max-w-[80%]">
                      {currentTypingMessage ? (
                        <>
                          <p className="text-base lg:text-lg leading-relaxed text-gray-800 font-medium">{currentTypingMessage}</p>
                          <div className="inline-block w-2 h-4 lg:h-5 bg-primary-orange ml-1 animate-pulse"></div>
                        </>
                      ) : (
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-primary-orange rounded-full animate-bounce"></div>
                          <div className="w-3 h-3 bg-primary-orange rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-3 h-3 bg-primary-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Take your time... tell me what's on your mind and how you're feeling..."
                  className="flex-1 p-3 lg:p-4 rounded-xl bg-white text-gray-800 placeholder-gray-500 border-2 border-gray-200 focus:border-primary-orange focus:outline-none text-base lg:text-lg shadow-md"
                  disabled={isTyping}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!userInput.trim() || isTyping}
                  className="bg-gradient-to-r from-primary-orange to-primary-orange/80 hover:from-primary-orange/90 hover:to-primary-orange/70 text-white font-bold px-6 lg:px-8 py-3 lg:py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-base lg:text-lg"
                >
                  Send
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Strategies Display */}
        <AnimatePresence>
          {mode === 'strategies' && strategies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-3">
                <h2 className="text-xl lg:text-2xl font-bold text-white">
                  Your Options:
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetConversation}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium"
                >
                  Start Over
                </motion.button>
              </div>
              
              <div className="grid gap-4">
                {strategies.map((strategy, index) => (
                  <motion.div
                    key={strategy.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedStrategy(strategy.id)}
                    className={`relative cursor-pointer transition-all ${
                      selectedStrategy === strategy.id ? 'ring-2 ring-white' : ''
                    }`}
                  >
                    {strategy.recommended && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold z-10">
                        RECOMMENDED
                      </div>
                    )}
                    
                    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-6 border ${
                      strategy.recommended 
                        ? 'border-green-500/50' 
                        : strategy.warning 
                        ? 'border-red-500/30' 
                        : 'border-white/20'
                    }`}>
                      <div className="flex items-start gap-3 lg:gap-4">
                        <span className="text-2xl lg:text-4xl">{strategy.icon}</span>
                        
                        <div className="flex-1">
                          <h3 className="text-lg lg:text-xl font-bold text-white mb-2">
                            {strategy.title}
                          </h3>
                          <p className="text-white/70 mb-3 lg:mb-4 text-sm lg:text-base">
                            {strategy.description}
                          </p>
                          
                          {/* Impact Meters */}
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs lg:text-sm text-white/50">Mental Health:</span>
                              <span className={`font-bold text-sm lg:text-base ${getImpactColor(strategy.mentalHealthImpact)}`}>
                                {getImpactText(strategy.mentalHealthImpact)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs lg:text-sm text-white/50">Community Trust:</span>
                              <span className={`font-bold text-sm lg:text-base ${getImpactColor(strategy.communityTrustImpact)}`}>
                                {getImpactText(strategy.communityTrustImpact)}
                              </span>
                            </div>
                          </div>
                          
                          {strategy.warning && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2 lg:p-3">
                              <p className="text-red-300 text-xs lg:text-sm flex items-start gap-2">
                                <span>⚠️</span>
                                <span>{strategy.warning}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 lg:mt-8 p-4 lg:p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <p className="text-white/80 text-center text-sm lg:text-base">
                  💡 <strong>Remember:</strong> Your mental health and community are your greatest assets. 
                  Choose strategies that protect both.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}