'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface BackButtonProps {
  customPath?: string
  label?: string
  className?: string
  showIcon?: boolean
}

export default function BackButton({ 
  customPath, 
  label = 'Back', 
  className = '',
  showIcon = true 
}: BackButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleBack = () => {
    setIsLoading(true)
    
    if (customPath) {
      router.push(customPath)
    } else {
      // Check if there's history to go back to
      if (window.history.length > 1) {
        router.back()
      } else {
        // Fallback to home page if no history
        router.push('/')
      }
    }
    
    // Reset loading state after navigation
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <button
      onClick={handleBack}
      disabled={isLoading}
      className={`
        group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
        text-gray-600 hover:text-gray-900 
        bg-white hover:bg-gray-50
        border border-gray-200 hover:border-gray-300
        rounded-lg shadow-sm hover:shadow-md
        transition-all duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${className}
      `}
      aria-label={`${label} to previous page`}
    >
      {showIcon && (
        <ArrowLeft 
          className={`
            w-4 h-4 transition-transform duration-200
            ${isLoading ? 'animate-pulse' : 'group-hover:-translate-x-0.5'}
          `} 
        />
      )}
      <span className={isLoading ? 'animate-pulse' : ''}>
        {isLoading ? 'Going back...' : label}
      </span>
    </button>
  )
}