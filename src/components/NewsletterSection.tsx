'use client'

import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1000)
  }

  return (
    <div className="py-24 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-dark-900 dark:to-primary-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white dark:bg-dark-800 rounded-3xl p-12 shadow-2xl border border-primary-200 dark:border-primary-dark-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-dark-400 dark:to-primary-dark-600 rounded-2xl mb-6 text-white">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1M7 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
          </div>
          
          {!isSubscribed ? (
            <>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-dark-50 mb-4">
                Stay Updated with AI Innovation
              </h2>
              
              <p className="text-lg text-neutral-600 dark:text-dark-400 mb-8 max-w-2xl mx-auto">
                Get weekly insights on the latest AI tools, trends, and breakthroughs. 
                Join thousands of professionals staying ahead in the AI revolution.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 border border-neutral-200 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-neutral-900 dark:text-dark-50 placeholder-neutral-500 dark:placeholder-dark-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-dark-500 dark:hover:bg-primary-dark-600 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>

              <p className="text-sm text-neutral-500 dark:text-dark-400">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-2">
                Thank you for subscribing!
              </h3>
              <p className="text-neutral-600 dark:text-dark-400">
                You'll receive our first newsletter within the next week.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
