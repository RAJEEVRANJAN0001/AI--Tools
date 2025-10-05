'use client'

/* eslint-disable react/no-unescaped-entities */

import React, { useState, useRef, useEffect } from 'react'
import { X, Send, Loader2 } from 'lucide-react'
import { useChatbot } from '@/context/ChatbotContext'

export default function ChatPanel() {
  const { isOpen, isLoading, messages, closeChat, sendMessage } = useChatbot()
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        closeChat()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, closeChat])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeChat()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, closeChat])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const message = inputValue.trim()
    setInputValue('')
    await sendMessage(message)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div 
        ref={panelRef}
        className="w-80 sm:w-96 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-neutral-200 dark:border-dark-600 overflow-hidden animate-slide-up"
        role="dialog"
        aria-label="AI Assistant Chat"
      >
        {/* Header */}
        <div className="bg-primary-800 dark:bg-primary-dark-400 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="font-semibold text-base">AI Assistant</h3>
          </div>
          <button
            onClick={closeChat}
            className="p-1 hover:bg-primary-700 dark:hover:bg-primary-dark-500 rounded-md transition-colors duration-200"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-80 overflow-y-auto px-4 py-3 space-y-3 bg-neutral-50 dark:bg-dark-900">
          {messages.length === 0 ? (
            <div className="text-center text-neutral-500 dark:text-dark-400 py-8">
              <div className="text-2xl mb-2">👋</div>
              <p className="text-sm">Hi! I&apos;m your AI assistant for exploring the AI ecosystem.</p>
              <p className="text-xs mt-1">Ask me about any AI tool or technology!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                role="text"
                aria-live="polite"
              >
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-primary-800 dark:bg-primary-dark-400 text-white'
                      : 'bg-white dark:bg-dark-700 text-neutral-900 dark:text-dark-50 border border-neutral-200 dark:border-dark-600'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div 
                    className={`text-xs mt-1 opacity-70 ${
                      message.role === 'user' ? 'text-primary-100' : 'text-neutral-500 dark:text-dark-400'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-dark-700 border border-neutral-200 dark:border-dark-600 px-3 py-2 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary-600 dark:text-primary-dark-400" />
                  <span className="text-sm text-neutral-600 dark:text-dark-300">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-3 bg-neutral-100 dark:bg-dark-700 border-t border-neutral-200 dark:border-dark-600">
          <div className="flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me about any AI tool..."
              className="flex-1 bg-white dark:bg-dark-800 border border-neutral-200 dark:border-dark-600 rounded-xl px-3 py-2 text-sm text-neutral-900 dark:text-dark-50 placeholder-neutral-500 dark:placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-dark-400 focus:border-transparent transition-all duration-200"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2 bg-primary-800 dark:bg-primary-dark-400 text-white rounded-xl hover:bg-primary-900 dark:hover:bg-primary-dark-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-dark-300 focus:ring-offset-2 dark:focus:ring-offset-dark-700"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
