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
    const messages: GrokMessage[] = [
      {
        role: 'system',
        content: 'You are evaluating a user\'s response to hate comments for training purposes. Analyze if the response is respectful, constructive, and promotes positive engagement. Respond with JSON format: {"isPositive": boolean, "feedback": "specific feedback", "score": number from 1-10}. Score 7+ is passing.'
      },
      {
        role: 'user',
        content: `Original hate comment: "${hatefulComment}"\nUser's response: "${userResponse}"\n\nEvaluate this response for respectfulness and positive impact.`
      }
    ]

    try {
      const response = await this.sendMessage(messages)
      const evaluation = JSON.parse(response)
      return {
        isPositive: evaluation.isPositive && evaluation.score >= 7,
        feedback: evaluation.feedback,
        score: evaluation.score
      }
    } catch (error) {
      console.error('Failed to evaluate response:', error)
      // Fallback evaluation
      return {
        isPositive: false,
        feedback: "Unable to evaluate response. Please try a constructive, respectful reply.",
        score: 0
      }
    }
  }
}

export const grokClient = new GrokClient()
export type { GrokMessage }