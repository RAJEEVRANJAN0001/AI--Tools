'use client'

import React, { useState, useEffect } from 'react'
import { Bot, MessageCircle } from 'lucide-react'
import { useChatbot } from '@/context/ChatbotContext'

export default function RobotMascot() {
  const { toggleChat, isOpen } = useChatbot()
  const [isClicked, setIsClicked] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Track scroll position for following behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle click to open chat
  const handleRobotClick = () => {
    setIsClicked(true)
    toggleChat()
    
    // Reset click animation after a delay
    setTimeout(() => setIsClicked(false), 300)
  }

  return (
    <div 
      className={`fixed bottom-20 right-4 w-16 h-16 cursor-pointer z-40 transition-all duration-300 ${
        isClicked ? 'scale-125' : isHovered ? 'scale-110' : 'scale-100'
      }`}
      style={{
        transform: `translateY(${Math.min(scrollY * 0.05, 30)}px) ${
          isClicked ? 'scale(1.25)' : isHovered ? 'scale(1.1)' : 'scale(1)'
        }`
      }}
      onClick={handleRobotClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main robot container */}
      <div className={`w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-dark-400 dark:to-primary-dark-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
        isOpen ? 'ring-4 ring-primary-300 dark:ring-primary-dark-300 ring-opacity-50' : ''
      }`}>
        {/* Robot icon with animation */}
        <div className={`transition-all duration-300 ${isClicked ? 'rotate-12' : ''}`}>
          {isOpen ? (
            <MessageCircle className="w-8 h-8 text-white" />
          ) : (
            <Bot className="w-8 h-8 text-white" />
          )}
        </div>
        
        {/* Floating animation overlay */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      
      {/* Pulsing ring when active */}
      {isOpen && (
        <div className="absolute inset-0 rounded-full border-2 border-primary-400 dark:border-primary-dark-300 animate-ping opacity-75"></div>
      )}
      
      {/* Status indicator */}
      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full transition-all duration-200 ${
        isOpen 
          ? 'bg-green-400 ring-2 ring-green-200 dark:ring-green-800' 
          : 'bg-primary-500 dark:bg-primary-dark-400'
      }`}>
        {isOpen && (
          <div className="absolute inset-0 rounded-full bg-green-400 animate-pulse"></div>
        )}
      </div>
      
      {/* Tooltip */}
      <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 transition-all duration-200 ${
        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } pointer-events-none`}>
        <div className="bg-neutral-800 dark:bg-dark-700 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
          {isOpen ? 'Close chat' : 'Chat with AI Assistant'}
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-800 dark:border-t-dark-700"></div>
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-primary-300 dark:bg-primary-dark-300 rounded-full transition-all duration-1000 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
              animationDelay: `${i * 200}ms`,
              animation: isHovered ? 'float-up 2s ease-in-out infinite' : 'none'
            }}
          />
        ))}
      </div>
    </div>
  )
}
