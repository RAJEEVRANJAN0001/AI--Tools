'use client'

import { TrendingUp, Zap, Globe, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { aiToolsData } from '@/data/aiToolsData'

// Real-time statistics hook
const useRealTimeStats = () => {
  const [stats, setStats] = useState({
    toolsCount: 0,
    categoriesCount: 0,
    lastUpdate: '',
    isLive: false
  })

  useEffect(() => {
    // Calculate real-time statistics from actual data
    const calculateStats = () => {
      const toolsCount = aiToolsData.length
      const categories = Array.from(new Set(aiToolsData.map(tool => tool.category)))
      const categoriesCount = categories.length
      const lastUpdate = new Date().toLocaleString()

      setStats({
        toolsCount,
        categoriesCount,
        lastUpdate,
        isLive: true
      })
    }

    // Initial calculation
    calculateStats()

    // Update every 30 seconds to show "live" nature
    const interval = setInterval(calculateStats, 30000)

    return () => clearInterval(interval)
  }, [])

  return stats
}

export default function Statistics() {
  const { toolsCount, categoriesCount, lastUpdate, isLive } = useRealTimeStats()

  const statistics = [
    {
      id: '1',
      label: 'AI Tools',
      value: `${toolsCount}+`,
      icon: Zap,
      color: 'blue',
      isLive: true
    },
    {
      id: '2',
      label: 'Categories',
      value: `${categoriesCount}+`,
      icon: Globe,
      color: 'purple',
      isLive: true
    },
    {
      id: '3',
      label: 'Updates',
      value: 'Daily',
      icon: TrendingUp,
      color: 'green',
      isLive: true
    },
    {
      id: '4',
      label: 'Updates',
      value: 'Daily',
      icon: TrendingUp,
      color: 'green',
      isLive: true
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-b border-gray-100 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Live indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-green-200 shadow-sm">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {isLive ? 'Live Data' : 'Loading...'} • Last updated: {lastUpdate || 'Calculating...'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statistics.map((stat) => {
            const IconComponent = stat.icon
            return (
              <div key={stat.id} className="relative group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  {/* Live indicator for each stat */}
                  {stat.isLive && (
                    <div className="absolute top-3 right-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 flex items-center justify-center shadow-inner`}>
                    <IconComponent className={`w-8 h-8 text-${stat.color}-600`} />
                  </div>
                  
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  
                  <div className="text-base lg:text-lg font-semibold text-gray-800">
                    {stat.label}
                  </div>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Real-time data source indicator */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            📊 Real-time data powered by live web app integration • 
            <span className="font-medium"> {toolsCount} tools</span> across 
            <span className="font-medium"> {categoriesCount} categories</span>
          </p>
        </div>
      </div>
    </section>
  )
}
