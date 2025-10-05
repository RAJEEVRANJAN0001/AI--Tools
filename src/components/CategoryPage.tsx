'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Star, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  ChevronDown, 
  Grid, 
  List,
  BookOpen,
  Target,
  Lightbulb,
  AlertTriangle,
  Eye,
  DollarSign,
  BarChart3,
  Clock,
  Award,
  Zap
} from 'lucide-react'
import { AITool, AIToolFilter } from '@/types/aiTools'
import { CategoryInfo } from '@/data/categoryData'
import { formatDate } from '@/utils/dateFormatter'

interface CategoryPageProps {
  category: CategoryInfo
  tools: AITool[]
}

export default function CategoryPage({ category, tools }: CategoryPageProps) {
  const [filter, setFilter] = useState<AIToolFilter>({
    search: '',
    sortBy: 'popularity',
    sortOrder: 'desc'
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'tools' | 'insights'>('overview')

  const updateFilter = (updates: Partial<AIToolFilter>) => {
    setFilter(prev => ({ ...prev, ...updates }))
  }

  const filteredTools = useMemo(() => {
    let filtered = tools.filter(tool => {
      // Search filter
      if (filter.search) {
        const searchLower = filter.search.toLowerCase()
        const matchesSearch = 
          tool.name.toLowerCase().includes(searchLower) ||
          tool.company.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
        
        if (!matchesSearch) return false
      }

      return true
    })

    // Sort tools
    filtered.sort((a, b) => {
      const order = filter.sortOrder === 'asc' ? 1 : -1
      
      switch (filter.sortBy) {
        case 'name':
          return order * a.name.localeCompare(b.name)
        case 'popularity':
          // Use userCount for popularity sorting
          const aUsers = parseInt(a.userCount.replace(/[^\d]/g, '')) || 0
          const bUsers = parseInt(b.userCount.replace(/[^\d]/g, '')) || 0
          return order * (aUsers - bUsers)
        case 'lastUpdated':
          return order * (new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime())
        case 'userCount':
          const aCount = parseInt(a.userCount.replace(/[^\d]/g, '')) || 0
          const bCount = parseInt(b.userCount.replace(/[^\d]/g, '')) || 0
          return order * (aCount - bCount)
        default:
          return 0
      }
    })

    return filtered
  }, [tools, filter])

  const getCategoryIcon = () => {
    switch (category.icon) {
      case '🤖': return <Zap className="w-8 h-8" />
      case '💻': return <BookOpen className="w-8 h-8" />
      case '🎨': return <Target className="w-8 h-8" />
      case '💬': return <Users className="w-8 h-8" />
      case '🖼️': return <Eye className="w-8 h-8" />
      case '🎵': return <BarChart3 className="w-8 h-8" />
      case '📊': return <TrendingUp className="w-8 h-8" />
      case '🛡️': return <AlertTriangle className="w-8 h-8" />
      case '🔧': return <Award className="w-8 h-8" />
      default: return <Lightbulb className="w-8 h-8" />
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-dark-900 dark:to-primary-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-dark-400 hover:text-primary-700 dark:hover:text-primary-dark-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Link>
          </div>

          {/* Category Header */}
          <div className="flex items-start gap-6">
            <div className="bg-white dark:bg-dark-800 p-4 rounded-2xl shadow-lg">
              {getCategoryIcon()}
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-dark-50 mb-4">
                {category.name}
              </h1>
              
              <p className="text-xl text-neutral-600 dark:text-dark-400 mb-6 leading-relaxed">
                {category.description}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 bg-white dark:bg-dark-800 px-4 py-2 rounded-lg shadow-sm">
                  <Users className="w-5 h-5 text-primary-600 dark:text-primary-dark-400" />
                  <span className="text-sm font-medium text-neutral-900 dark:text-dark-50">
                    {category.toolCount} Tools
                  </span>
                </div>
                
                <div className="flex items-center gap-2 bg-white dark:bg-dark-800 px-4 py-2 rounded-lg shadow-sm">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-neutral-900 dark:text-dark-50">
                    {category.detailedInfo.growthRate} Growth
                  </span>
                </div>
                
                <div className="flex items-center gap-2 bg-white dark:bg-dark-800 px-4 py-2 rounded-lg shadow-sm">
                  <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-neutral-900 dark:text-dark-50">
                    {category.detailedInfo.marketSize} Market
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-neutral-200 dark:border-dark-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpen },
              { id: 'tools', label: 'Tools', icon: Grid },
              { id: 'insights', label: 'Market Insights', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-dark-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-dark-400 dark:hover:text-dark-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Overview Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <section>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    About {category.name}
                  </h2>
                  <p className="text-neutral-700 dark:text-dark-300 leading-relaxed">
                    {category.detailedInfo.overview}
                  </p>
                </section>

                {/* Key Features */}
                <section>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-dark-50 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.detailedInfo.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-dark-700 rounded-lg">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-neutral-700 dark:text-dark-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Use Cases */}
                <section>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-dark-50 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Common Use Cases
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.useCases.map((useCase, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 border border-neutral-200 dark:border-dark-600 rounded-lg">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2.5 flex-shrink-0"></div>
                        <span className="text-sm text-neutral-700 dark:text-dark-300">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Top Tools */}
                <div className="bg-neutral-50 dark:bg-dark-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-dark-50 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Top Tools
                  </h3>
                  <div className="space-y-4">
                    {category.topTools.slice(0, 3).map((tool, index) => (
                      <div key={index} className="border-b border-neutral-200 dark:border-dark-600 last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-neutral-900 dark:text-dark-50">{tool.name}</h4>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-primary-500" />
                            <span className="text-sm font-medium">{tool.users}</span>
                          </div>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-dark-400 mb-2">{tool.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-500 dark:text-dark-400">{tool.users} users</span>
                          <span className="font-medium text-primary-600 dark:text-primary-dark-400">{tool.pricing}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Info */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-dark-50 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Market Overview
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600 dark:text-dark-400">Market Size</span>
                      <span className="font-semibold text-neutral-900 dark:text-dark-50">{category.detailedInfo.marketSize}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600 dark:text-dark-400">Growth Rate</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">{category.detailedInfo.growthRate}</span>
                    </div>
                  </div>
                </div>

                {/* Trends */}
                <div className="bg-neutral-50 dark:bg-dark-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-dark-50 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Current Trends
                  </h3>
                  <div className="space-y-2">
                    {category.trends.slice(0, 5).map((trend, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-neutral-700 dark:text-dark-300">{trend}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div>
            {/* Filters and Search */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={filter.search}
                    onChange={(e) => updateFilter({ search: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-neutral-900 dark:text-dark-50 placeholder-neutral-500 dark:placeholder-dark-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-4">
                  <select
                    value={filter.sortBy}
                    onChange={(e) => updateFilter({ sortBy: e.target.value as any })}
                    className="px-4 py-3 border border-neutral-200 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-neutral-700 dark:text-dark-300"
                  >
                    <option value="popularity">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Alphabetical</option>
                  </select>

                  <div className="flex items-center gap-2 bg-white dark:bg-dark-700 border border-neutral-200 dark:border-dark-600 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600 dark:bg-primary-dark-900 dark:text-primary-dark-400' : 'text-neutral-500 hover:text-neutral-700 dark:text-dark-400 dark:hover:text-dark-200'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600 dark:bg-primary-dark-900 dark:text-primary-dark-400' : 'text-neutral-500 hover:text-neutral-700 dark:text-dark-400 dark:hover:text-dark-200'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <Link key={tool.id} href={`/ai-tools/${tool.id}`}>
                    <div className="group bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-dark-500">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-neutral-900 dark:text-dark-50 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-neutral-500 dark:text-dark-400">{tool.company}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-primary-500" />
                          <span className="text-sm font-medium">{tool.userCount}</span>
                        </div>
                      </div>

                      <p className="text-sm text-neutral-600 dark:text-dark-300 mb-4 line-clamp-3">
                        {tool.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-primary-500" />
                          <span className="text-sm font-medium">{tool.userCount}</span>
                        </div>
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-dark-400">{tool.pricing}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTools.map((tool) => (
                  <Link key={tool.id} href={`/ai-tools/${tool.id}`}>
                    <div className="group bg-white dark:bg-dark-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-dark-500">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-dark-50 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
                              {tool.name}
                            </h3>
                            <span className="text-sm text-neutral-500 dark:text-dark-400">{tool.company}</span>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-primary-500" />
                              <span className="text-sm font-medium">{tool.userCount}</span>
                            </div>
                          </div>
                          <p className="text-sm text-neutral-600 dark:text-dark-300 mb-2">{tool.description}</p>
                          <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-dark-400">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-primary-500" />
                              <span>{tool.userCount}</span>
                            </div>
                            <span className="font-medium text-primary-600 dark:text-primary-dark-400">{tool.pricing}</span>
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-neutral-400 dark:text-dark-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-2">
                  No tools found
                </h3>
                <p className="text-neutral-600 dark:text-dark-400">
                  Try adjusting your search or filters to find more tools.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-8">
            {/* Market Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{category.detailedInfo.marketSize}</div>
                <div className="text-sm text-blue-800 dark:text-blue-200">Market Size</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{category.detailedInfo.growthRate}</div>
                <div className="text-sm text-green-800 dark:text-green-200">Annual Growth</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{category.toolCount}</div>
                <div className="text-sm text-purple-800 dark:text-purple-200">Available Tools</div>
              </div>
            </div>

            {/* Benefits & Challenges */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6" />
                  Key Benefits
                </h3>
                <div className="space-y-3">
                  {category.detailedInfo.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-green-800 dark:text-green-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Challenges
                </h3>
                <div className="space-y-3">
                  {category.detailedInfo.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-orange-800 dark:text-orange-200">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Future Outlook */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6" />
                Future Outlook
              </h3>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                {category.detailedInfo.futureOutlook}
              </p>
            </div>

            {/* Implementation Guide - Only for Chatbots category */}
            {category.id === 'chatbots-conversational-ai' && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  Platform Selection Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-200">Enterprise Solutions</h4>
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-dark-800 p-4 rounded-lg">
                        <h5 className="font-medium text-neutral-900 dark:text-dark-50 mb-2">Dialogflow (Google)</h5>
                        <p className="text-sm text-neutral-600 dark:text-dark-400 mb-2">Best for: Multi-platform deployment with Google AI integration</p>
                        <p className="text-xs text-amber-700 dark:text-amber-300">Free tier: 7.5M messages/month • Pricing: $0.002/request</p>
                      </div>
                      <div className="bg-white dark:bg-dark-800 p-4 rounded-lg">
                        <h5 className="font-medium text-neutral-900 dark:text-dark-50 mb-2">Microsoft Bot Framework</h5>
                        <p className="text-sm text-neutral-600 dark:text-dark-400 mb-2">Best for: Teams integration and Azure ecosystem</p>
                        <p className="text-xs text-amber-700 dark:text-amber-300">Free: Standard channels • Premium: $0.50/1K messages</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-200">Specialized Solutions</h4>
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-dark-800 p-4 rounded-lg">
                        <h5 className="font-medium text-neutral-900 dark:text-dark-50 mb-2">Rasa (Open Source)</h5>
                        <p className="text-sm text-neutral-600 dark:text-dark-400 mb-2">Best for: Complete data control and customization</p>
                        <p className="text-xs text-amber-700 dark:text-amber-300">Free: Open source • Enterprise: Custom pricing</p>
                      </div>
                      <div className="bg-white dark:bg-dark-800 p-4 rounded-lg">
                        <h5 className="font-medium text-neutral-900 dark:text-dark-50 mb-2">Intercom Resolution Bot</h5>
                        <p className="text-sm text-neutral-600 dark:text-dark-400 mb-2">Best for: Customer support automation with personalization</p>
                        <p className="text-xs text-amber-700 dark:text-amber-300">Pricing: Add-on to Intercom plans • 14-day trial</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">Quick Decision Matrix</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="text-amber-800 dark:text-amber-200">
                      <strong>Budget-Conscious:</strong> Rasa, ChatGPT API
                    </div>
                    <div className="text-amber-800 dark:text-amber-200">
                      <strong>Enterprise:</strong> Dialogflow, Microsoft Bot Framework
                    </div>
                    <div className="text-amber-800 dark:text-amber-200">
                      <strong>Marketing Focus:</strong> ManyChat, Chatfuel
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Industry Use Cases - Enhanced for Chatbots */}
            {category.id === 'chatbots-conversational-ai' && (
              <div className="bg-neutral-50 dark:bg-dark-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Industry Applications
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      industry: 'E-commerce',
                      icon: '🛒',
                      useCases: ['Product recommendations', 'Order tracking', 'Customer support', 'Abandoned cart recovery'],
                      tools: 'Tidio, ManyChat, Intercom'
                    },
                    {
                      industry: 'Healthcare',
                      icon: '🏥',
                      useCases: ['Symptom checking', 'Appointment scheduling', 'Patient triage', 'Medication reminders'],
                      tools: 'Dialogflow, Microsoft Bot Framework'
                    },
                    {
                      industry: 'Banking & Finance',
                      icon: '🏦',
                      useCases: ['Account inquiries', 'Transaction alerts', 'Loan applications', 'Investment advice'],
                      tools: 'Microsoft Bot Framework, Rasa'
                    },
                    {
                      industry: 'Education',
                      icon: '🎓',
                      useCases: ['Student support', 'Course recommendations', 'Assignment help', 'Campus information'],
                      tools: 'ChatGPT API, Dialogflow'
                    },
                    {
                      industry: 'Travel & Hospitality',
                      icon: '✈️',
                      useCases: ['Booking assistance', 'Travel recommendations', 'Check-in processes', 'Local information'],
                      tools: 'Botpress, TARS'
                    },
                    {
                      industry: 'HR & Recruitment',
                      icon: '👥',
                      useCases: ['Employee onboarding', 'FAQ responses', 'Leave management', 'Candidate screening'],
                      tools: 'Botpress, Microsoft Bot Framework'
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white dark:bg-dark-700 p-6 rounded-lg border border-neutral-200 dark:border-dark-600">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{item.icon}</span>
                        <h4 className="text-lg font-semibold text-neutral-900 dark:text-dark-50">{item.industry}</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-medium text-neutral-700 dark:text-dark-300 mb-2">Common Use Cases:</h5>
                          <ul className="text-xs text-neutral-600 dark:text-dark-400 space-y-1">
                            {item.useCases.map((useCase, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1 h-1 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                {useCase}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-2 border-t border-neutral-200 dark:border-dark-600">
                          <p className="text-xs text-neutral-500 dark:text-dark-400">
                            <strong>Recommended:</strong> {item.tools}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
