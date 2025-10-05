'use client'

import { useState, useEffect } from 'react'
import { Search, TrendingUp, Zap, Globe, Clock } from 'lucide-react'
import { aiToolsData } from '@/data/aiToolsData'

// Real-time stats hook for Hero section
const useHeroStats = () => {
  const [stats, setStats] = useState({
    toolsCount: 0,
    categoriesCount: 0,
    isLive: false,
    lastUpdate: ''
  })

  useEffect(() => {
    const calculateStats = () => {
      const toolsCount = aiToolsData.length
      const categories = Array.from(new Set(aiToolsData.map(tool => tool.category)))
      const categoriesCount = categories.length
      const lastUpdate = new Date().toLocaleTimeString()

      setStats({
        toolsCount,
        categoriesCount,
        isLive: true,
        lastUpdate
      })
    }

    calculateStats()
    // Update every 60 seconds
    const interval = setInterval(calculateStats, 60000)
    return () => clearInterval(interval)
  }, [])

  return stats
}

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const { toolsCount, categoriesCount, isLive, lastUpdate } = useHeroStats()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="relative bg-gradient-to-br from-neutral-50 via-white to-primary-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 py-20 lg:py-28 transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-dark-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300 dark:bg-primary-dark-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Live Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-8 animate-fade-in border border-green-200 dark:border-green-700/50 backdrop-blur-sm">
            <div className={`w-2 h-2 rounded-full mr-2 ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <TrendingUp className="w-4 h-4 mr-2" />
            Live Data: {toolsCount} AI Tools & Platforms • Updated {lastUpdate}
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-dark-50 mb-6 animate-slide-up">
            Your Complete Guide to the
            <span className="bg-gradient-to-r from-primary-800 to-primary-600 dark:from-primary-dark-400 dark:to-primary-dark-300 bg-clip-text text-transparent block mt-2">
              AI Ecosystem 2025
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-dark-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-100">
            Explore and research the latest AI models, tools, and platforms. 
            Get comprehensive information, compare features, and find the right AI solution for your projects.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12 animate-slide-up delay-200">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-dark-400 w-6 h-6" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for AI tools, models, or platforms to learn about..."
                className="w-full pl-16 pr-32 py-6 text-lg border-2 border-neutral-200 dark:border-dark-600 rounded-2xl focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-dark-400/20 focus:border-primary-500 dark:focus:border-primary-dark-400 transition-all duration-200 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm text-neutral-900 dark:text-dark-50 placeholder-neutral-500 dark:placeholder-dark-400"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-800 dark:bg-primary-dark-400 hover:bg-primary-900 dark:hover:bg-primary-dark-300 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-dark-300 focus:ring-offset-2 dark:focus:ring-offset-dark-800"
              >
                Explore
              </button>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up delay-250">
            <a
              href="/ai-tools"
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-dark-600 dark:hover:bg-primary-dark-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Zap className="w-5 h-5 mr-2" />
              Explore AI Tools
            </a>
            <a
              href="/tools"
              className="inline-flex items-center px-8 py-4 bg-white dark:bg-dark-800 hover:bg-neutral-50 dark:hover:bg-dark-700 text-neutral-700 dark:text-dark-300 font-semibold rounded-xl border border-neutral-200 dark:border-dark-600 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Globe className="w-5 h-5 mr-2" />
              Web Dev Tools
            </a>
          </div>

          {/* Real-time Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up delay-300">
            <div className="relative group">
              <div className="flex items-center justify-center space-x-3 p-6 bg-white/60 dark:bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-neutral-200 dark:border-dark-600 hover:bg-white/80 dark:hover:bg-dark-800/80 transition-all duration-200 group-hover:scale-105 shadow-lg hover:shadow-xl">
                {/* Live indicator */}
                <div className="absolute top-3 right-3">
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-dark-800 dark:to-primary-dark-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-inner">
                  <Zap className="w-6 h-6 text-primary-800 dark:text-primary-dark-300" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary-800 to-primary-600 dark:from-primary-dark-300 dark:to-primary-dark-200 bg-clip-text text-transparent">
                    {toolsCount}+
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-dark-300 font-medium">AI Tools</div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="flex items-center justify-center space-x-3 p-6 bg-white/60 dark:bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-neutral-200 dark:border-dark-600 hover:bg-white/80 dark:hover:bg-dark-800/80 transition-all duration-200 group-hover:scale-105 shadow-lg hover:shadow-xl">
                {/* Live indicator */}
                <div className="absolute top-3 right-3">
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-dark-800 dark:to-secondary-dark-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-inner">
                  <Globe className="w-6 h-6 text-secondary-800 dark:text-secondary-dark-300" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold bg-gradient-to-r from-secondary-800 to-secondary-600 dark:from-secondary-dark-300 dark:to-secondary-dark-200 bg-clip-text text-transparent">
                    {categoriesCount}+
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-dark-300 font-medium">Categories</div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="flex items-center justify-center space-x-3 p-6 bg-white/60 dark:bg-dark-800/60 backdrop-blur-sm rounded-2xl border border-neutral-200 dark:border-dark-600 hover:bg-white/80 dark:hover:bg-dark-800/80 transition-all duration-200 group-hover:scale-105 shadow-lg hover:shadow-xl">
                {/* Daily chart indicator */}
                <div className="absolute top-3 right-3">
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-blue-400 rounded-sm animate-pulse"></div>
                    <div className="w-1 h-3 bg-blue-300 rounded-sm animate-pulse delay-100"></div>
                    <div className="w-1 h-5 bg-blue-500 rounded-sm animate-pulse delay-200"></div>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-success-100 to-success-200 dark:from-success-dark-800 dark:to-success-dark-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-inner">
                  <TrendingUp className="w-6 h-6 text-success-800 dark:text-success-dark-300" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold bg-gradient-to-r from-success-800 to-success-600 dark:from-success-dark-300 dark:to-success-dark-200 bg-clip-text text-transparent">
                    Daily
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-dark-300 font-medium">Updates</div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-12 animate-slide-up delay-400">
            <p className="text-neutral-600 dark:text-dark-300 mb-4">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['GPT-4', 'Claude', 'Gemini', 'Code Generation', 'AI Agents', 'Free Tools'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-4 py-2 bg-neutral-100 dark:bg-dark-700 hover:bg-neutral-200 dark:hover:bg-dark-600 text-neutral-700 dark:text-dark-300 hover:text-primary-800 dark:hover:text-primary-dark-300 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
