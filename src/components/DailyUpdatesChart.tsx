'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Calendar, Plus, Zap } from 'lucide-react'

interface DailyUpdate {
  date: string
  count: number
  tools: string[]
  type: 'new' | 'update' | 'feature'
}

// Daily chart component for tracking updates
const useDailyUpdates = () => {
  const [updates, setUpdates] = useState<DailyUpdate[]>([])
  const [totalUpdates, setTotalUpdates] = useState(0)

  useEffect(() => {
    // Generate last 7 days of updates data
    const generateDailyUpdates = () => {
      const today = new Date()
      const last7Days: DailyUpdate[] = []
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        
        // Simulate daily updates (in real app, this would come from database)
        const count = Math.floor(Math.random() * 5) + 1
        const tools = [
          'GPT-4 Turbo', 'Claude 3.5', 'Gemini Pro', 'DeepSeek V3', 
          'Minimax Voice', 'Luma AI', 'RunwayML', 'ElevenLabs'
        ].slice(0, count)
        
        last7Days.push({
          date: date.toISOString().split('T')[0],
          count,
          tools,
          type: i === 0 ? 'new' : i < 3 ? 'update' : 'feature'
        })
      }
      
      setUpdates(last7Days)
      setTotalUpdates(last7Days.reduce((sum, day) => sum + day.count, 0))
    }

    generateDailyUpdates()
    // Update every hour
    const interval = setInterval(generateDailyUpdates, 3600000)
    return () => clearInterval(interval)
  }, [])

  return { updates, totalUpdates }
}

export default function DailyUpdatesChart() {
  const { updates, totalUpdates } = useDailyUpdates()
  
  const maxCount = Math.max(...updates.map(u => u.count), 1)
  const today = new Date().toISOString().split('T')[0]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'new': return 'bg-green-500'
      case 'update': return 'bg-blue-500'
      case 'feature': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'new': return 'New Tools'
      case 'update': return 'Updates'
      case 'feature': return 'Features'
      default: return 'Changes'
    }
  }

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-50 mb-4">
            Daily Updates Tracker
          </h2>
          <p className="text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
            Track our daily progress with new AI tools, updates, and feature improvements
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Daily Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 dark:border-dark-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-50 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Last 7 Days Activity
                </h3>
                <div className="text-sm text-gray-500 dark:text-dark-400">
                  Total: {totalUpdates} updates
                </div>
              </div>

              {/* Chart */}
              <div className="flex items-end justify-between h-48 mb-4">
                {updates.map((day, index) => {
                  const height = (day.count / maxCount) * 100
                  const isToday = day.date === today
                  
                  return (
                    <div key={day.date} className="flex flex-col items-center flex-1 mx-1">
                      <div className="relative group cursor-pointer">
                        <div 
                          className={`w-8 rounded-t-lg transition-all duration-300 group-hover:scale-110 ${
                            getTypeColor(day.type)
                          } ${isToday ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}`}
                          style={{ height: `${Math.max(height, 10)}%` }}
                        />
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                            <div className="font-semibold">{new Date(day.date).toLocaleDateString()}</div>
                            <div>{day.count} {getTypeLabel(day.type)}</div>
                            <div className="text-gray-300 mt-1">
                              {day.tools.slice(0, 2).join(', ')}
                              {day.tools.length > 2 && `... +${day.tools.length - 2} more`}
                            </div>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-dark-400 mt-2 transform -rotate-45 origin-center">
                        {new Date(day.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-gray-600 dark:text-dark-300">New Tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-gray-600 dark:text-dark-300">Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span className="text-gray-600 dark:text-dark-300">Features</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Updates */}
          <div className="space-y-4">
            <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 dark:border-dark-700/50">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-50 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                Today's Updates
              </h3>
              
              {updates.length > 0 && (
                <div className="space-y-3">
                  {updates[updates.length - 1].tools.map((tool, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-700/50">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                        <Plus className="w-4 h-4 text-green-600 dark:text-green-300" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-dark-50 text-sm">
                          {tool}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-dark-400">
                          {getTypeLabel(updates[updates.length - 1].type)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 dark:border-dark-700/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-50 mb-4">
                Weekly Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-dark-300">Total Updates</span>
                  <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{totalUpdates}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-dark-300">Avg. per Day</span>
                  <span className="font-bold text-lg text-green-600 dark:text-green-400">
                    {(totalUpdates / 7).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-dark-300">Peak Day</span>
                  <span className="font-bold text-lg text-purple-600 dark:text-purple-400">
                    {Math.max(...updates.map(u => u.count))} tools
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
