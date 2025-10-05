import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, messages } = await request.json()
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    // System prompt with AI Ecosystem context
    const systemPrompt = `You are an AI assistant for the "AI Ecosystem Explorer" web application. This platform helps users discover and learn about AI tools and technologies.

Platform features:
- 500+ AI tools and platforms
- Categories: LLMs, Code Generation, Design Tools, Writing, Audio, Video, Data Analytics, Agent Frameworks
- Featured tools: GPT-4, Claude, GitHub Copilot, Midjourney, Canva AI, AutoGPT

Your role:
- Help users understand AI tools and their capabilities
- Provide comparisons between different AI solutions
- Suggest appropriate tools for specific use cases
- Keep responses helpful, concise, and professional
- Be honest about limitations

User question: ${message}`

    // Simple request format
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: systemPrompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      }
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

    console.log('Calling Gemini API...')
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const responseData = await response.text()
    console.log('Gemini API Status:', response.status)
    console.log('Gemini API Response:', responseData.substring(0, 500) + '...')

    if (!response.ok) {
      console.error('Gemini API Error:', response.status, responseData)
      
      // Return a helpful fallback response
      return NextResponse.json({ 
        response: `I'm here to help you explore AI tools! However, I'm experiencing some technical difficulties right now. 

Here are some popular AI tools from our directory:

🤖 **Language Models**: GPT-4, Claude 3.5, Gemini Pro
💻 **Coding**: GitHub Copilot, Cursor, Replit AI
🎨 **Design**: Midjourney, DALL-E 3, Canva AI
✍️ **Writing**: Jasper, Copy.ai, Grammarly

You can browse our full directory to discover more tools in each category. What type of AI tool are you looking for?`
      })
    }

    const data = JSON.parse(responseData)
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      const aiResponse = data.candidates[0].content.parts[0].text
      
      return NextResponse.json({ 
        response: aiResponse,
        timestamp: new Date().toISOString()
      })
    }

    // Fallback response if the format is unexpected
    return NextResponse.json({ 
      response: "I'm your AI assistant for exploring AI tools! How can I help you discover the perfect AI solution for your needs?"
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    
    // Friendly fallback response
    return NextResponse.json({ 
      response: `Hello! I'm your AI assistant for the AI Ecosystem Explorer. 

I can help you:
- Discover AI tools for any purpose
- Compare different AI platforms
- Learn about AI capabilities and pricing
- Find free and open-source alternatives

What would you like to know about AI tools today?`
    })
  }
}
