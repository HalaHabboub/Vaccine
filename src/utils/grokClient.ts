interface GrokMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface GrokResponse {
  choices: Array<{
    message: {
      content: string
      role: string
    }
  }>
}

class GrokClient {
  private apiUrl = process.env.NODE_ENV === 'production' ? '/api/grok' : 'http://localhost:3001/api/grok/chat'

  async sendMessage(messages: GrokMessage[]): Promise<string> {
    console.log('Sending to Grok proxy:', { messages })

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages
        })
      })

      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API error response:', errorText)
        throw new Error(`API request failed: ${response.status} - ${errorText}`)
      }

      const data: GrokResponse = await response.json()
      console.log('Grok response:', data)
      console.log('Choices array:', data.choices)
      console.log('First choice:', data.choices[0])
      console.log('Message object:', data.choices[0]?.message)
      
      const content = data.choices[0]?.message?.content || ''
      console.log('Extracted content:', content)
      console.log('Content length:', content.length)
      
      return content
    } catch (error) {
      console.error('Grok API error:', error)
      throw error
    }
  }

  async startCrisisConversation(contextData: { 
    hatefulComment: string; 
    originalPost?: string | null; 
    hasImages?: boolean; 
    imageCount?: number 
  }): Promise<string> {
    let contextString = `I got this hateful comment: "${contextData.hatefulComment}".`
    
    if (contextData.originalPost) {
      contextString += ` My original post was: "${contextData.originalPost}".`
    }
    
    if (contextData.hasImages && contextData.imageCount) {
      contextString += ` I also have ${contextData.imageCount} screenshot${contextData.imageCount > 1 ? 's' : ''} of the situation.`
    }
    
    contextString += ' I need support.'

    const messages: GrokMessage[] = [
      { role: 'system', content: 'You are a supportive crisis counselor. Keep responses concise (under 30 words). Ask one simple question to understand their situation better, then gently suggest helpful responses. Be supportive but not overly emotional.' },
      { role: 'user', content: contextString }
    ]

    return this.sendMessage(messages)
  }

  async continueConversation(conversationHistory: GrokMessage[], userResponse: string): Promise<string> {
    const updatedHistory = [
      ...conversationHistory,
      { role: 'user' as const, content: userResponse }
    ]

    return this.sendMessage(updatedHistory)
  }

  async evaluateResponse(userResponse: string, hatefulComment: string): Promise<{ isPositive: boolean; feedback: string; score: number }> {
    console.log('🤖 Grok evaluating:', { userResponse, hatefulComment })
    
    const messages: GrokMessage[] = [
      {
        role: 'system',
        content: 'You are evaluating responses to hate comments. Be very lenient - only fail if the response is clearly rude, mean, or disrespectful. Most responses should pass (score 6+). Give gentle, encouraging feedback. Respond ONLY with JSON: {"isPositive": boolean, "feedback": "brief constructive feedback under 40 words", "score": number from 1-10}. Score 6+ passes.'
      },
      {
        role: 'user',
        content: `Original hate comment: "${hatefulComment}"\nUser's response: "${userResponse}"\n\nEvaluate this response for respectfulness and positive impact.`
      }
    ]

    try {
      const response = await this.sendMessage(messages)
      console.log('🤖 Grok raw response:', response)
      
      // Clean response - remove markdown code blocks if present
      let cleanResponse = response.trim()
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/```json\s*/, '').replace(/\s*```$/, '')
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/```\s*/, '').replace(/\s*```$/, '')
      }
      
      console.log('🤖 Cleaned response:', cleanResponse)
      
      // Try to fix incomplete JSON by finding the last complete part
      if (!cleanResponse.endsWith('}')) {
        const lastBrace = cleanResponse.lastIndexOf('}')
        if (lastBrace > 0) {
          cleanResponse = cleanResponse.substring(0, lastBrace + 1)
          console.log('🔧 Fixed incomplete JSON:', cleanResponse)
        }
      }
      
      const evaluation = JSON.parse(cleanResponse)
      console.log('🤖 Grok parsed evaluation:', evaluation)
      
      return {
        isPositive: evaluation.isPositive && evaluation.score >= 6,
        feedback: evaluation.feedback,
        score: evaluation.score
      }
    } catch (error) {
      console.error('❌ Failed to evaluate response:', error)
      
      // Very lenient fallback evaluation - only fail clearly rude responses
      const lowerResponse = userResponse.toLowerCase()
      
      // Only fail if clearly rude/mean/disrespectful
      const isVeryRude = /\b(stupid|idiot|moron|loser|shut up|f\*ck|damn|hate you|kill yourself)\b/i.test(userResponse)
      const isAllCaps = userResponse.length > 10 && userResponse === userResponse.toUpperCase()
      
      if (isVeryRude) {
        return {
          isPositive: false,
          feedback: "Try to avoid harsh language. A calmer response might work better.",
          score: 4
        }
      } else if (isAllCaps) {
        return {
          isPositive: false,
          feedback: "Consider using normal capitalization. It comes across as less aggressive.",
          score: 6
        }
      } else {
        // Pass almost everything else with gentle suggestions
        const hasThank = /\b(thank|appreciate|grateful)\b/i.test(userResponse)
        const hasIgnore = /\b(ignore|not worth)\b/i.test(userResponse)
        const hasBlock = /\b(block|report)\b/i.test(userResponse)
        
        if (hasThank || hasBlock) {
          return {
            isPositive: true,
            feedback: "Great approach! You're handling this professionally.",
            score: 9
          }
        } else if (hasIgnore) {
          return {
            isPositive: true,
            feedback: "Good strategy. Sometimes ignoring is the best response.",
            score: 8
          }
        } else {
          return {
            isPositive: true,
            feedback: "Nice response! You could also try thanking supporters or using moderation tools.",
            score: 7
          }
        }
      }
    }
  }
}

export const grokClient = new GrokClient()
export type { GrokMessage }