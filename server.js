import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'

// Load environment variables
config()

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// Grok API proxy endpoint
app.post('/api/grok/chat', async (req, res) => {
  try {
    const { messages, images } = req.body
    
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_GROK_API_KEY}`
      },
      body: JSON.stringify({
        messages,
        model: 'grok-2-1212',
        stream: false,
        temperature: 0.3,
        max_tokens: 150,
        presence_penalty: 0.7,
        frequency_penalty: 0.5
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Grok API error:', errorText)
      return res.status(response.status).json({ error: errorText })
    }

    const data = await response.json()
    console.log('Grok response:', data)
    
    res.json(data)
  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Grok proxy server is running' })
})

app.listen(PORT, () => {
  console.log(`Grok proxy server running on http://localhost:${PORT}`)
})