'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatbotContextType {
  isOpen: boolean
  isLoading: boolean
  messages: Message[]
  toggleChat: () => void
  closeChat: () => void
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  // Load chat state from sessionStorage
  useEffect(() => {
    const savedState = sessionStorage.getItem('chatbot-state')
    if (savedState) {
      try {
        const { isOpen: savedIsOpen } = JSON.parse(savedState)
        setIsOpen(savedIsOpen)
      } catch (error) {
        console.warn('Failed to parse chatbot state from sessionStorage')
      }
    }
  }, [])

  // Save chat state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('chatbot-state', JSON.stringify({ isOpen }))
  }, [isOpen])

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const closeChat = useCallback(() => {
    setIsOpen(false)
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          messages: messages
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI assistant')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, something went wrong. Please try again later.",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const value: ChatbotContextType = {
    isOpen,
    isLoading,
    messages,
    toggleChat,
    closeChat,
    sendMessage,
    clearMessages
  }

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  )
}

export function useChatbot() {
  const context = useContext(ChatbotContext)
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider')
  }
  return context
}
