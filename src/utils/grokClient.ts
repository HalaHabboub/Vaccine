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
}

export const grokClient = new GrokClient()
export type { GrokMessage }