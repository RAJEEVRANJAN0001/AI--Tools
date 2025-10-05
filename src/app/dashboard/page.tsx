'use client'

import React from 'react'
import Link from 'next/link'
import { BarChart3, TrendingUp, Users, Star, ExternalLink, ArrowRight, Globe, Code, Palette, Bot } from 'lucide-react'
import { getAllTools, getAllCategories, getFeaturedTools, getToolsStats } from '@/utils/toolsConsolidator'

export default function DashboardPage() {
  const allTools = getAllTools()
  const categories = getAllCategories()
  const featuredTools = getFeaturedTools(8)
  const stats = getToolsStats()

  // Group tools by category for analytics
  const toolsByCategory = categories.map(category => ({
    name: category,
    count: allTools.filter(tool => tool.category === category).length,
    tools: allTools.filter(tool => tool.category === category).slice(0, 3)
  })).sort((a, b) => b.count - a.count)

  // Get category icon
  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('chatbot') || category.toLowerCase().includes('conversational')) return Bot
    if (category.toLowerCase().includes('code') || category.toLowerCase().includes('development')) return Code
    if (category.toLowerCase().includes('design') || category.toLowerCase().includes('creative')) return Palette
    return Globe
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Tools Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Comprehensive overview of all AI tools and platforms in our directory
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Tools</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTools}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCategories}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgRating.toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Free Tools</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.freeTools}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Tools */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Tools</h2>
            <Link 
              href="/ai-tools" 
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTools.map(tool => (
              <Link 
                key={tool.id}
                href={`/ai-tools/${tool.id}`}
                className="group p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {tool.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{tool.company}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Users className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{tool.userCount}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Categories Overview</h2>
            <Link 
              href="/categories" 
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {toolsByCategory.map(category => {
              const Icon = getCategoryIcon(category.name)
              return (
                <div key={category.name} className="p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} tools</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {category.tools.map(tool => (
                      <Link
                        key={tool.id}
                        href={`/ai-tools/${tool.id}`}
                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {tool.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">by {tool.company}</span>
                        <ExternalLink className="w-3 h-3 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                    {category.count > 3 && (
                      <Link
                        href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        View all {category.count} tools →
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/browse"
            className="group p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Browse All Tools</h3>
            </div>
            <p className="text-blue-100 mb-3">Explore our complete directory with advanced filtering and search</p>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/categories"
            className="group p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Categories</h3>
            </div>
            <p className="text-purple-100 mb-3">Browse tools organized by category and use case</p>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/ai-tools"
            className="group p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
          >
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Top Rated</h3>
            </div>
            <p className="text-green-100 mb-3">Discover the highest-rated AI tools and platforms</p>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
