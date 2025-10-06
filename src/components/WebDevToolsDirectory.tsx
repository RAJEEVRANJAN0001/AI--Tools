'use client'

import React, { useState, useMemo } from 'react'
import { WebDevTool, WebDevCategory, ToolFilter } from '@/types/webDevTools'
import { formatDate } from '@/utils/dateFormatter'
import { 
  Search, 
  Filter, 
  Star, 
  ExternalLink, 
  Github, 
  TrendingUp,
  Calendar,
  ChevronDown,
  Grid,
  List
} from 'lucide-react'
import Link from 'next/link'

interface WebDevToolsDirectoryProps {
  tools: WebDevTool[]
}

const categories: WebDevCategory[] = [
  'Frontend Frameworks',
  'Backend Frameworks',
  'Database Tools',
  'Testing Tools',
  'Build Tools',
  'Package Managers',
  'Code Editors & IDEs',
  'Version Control',
  'DevOps & CI/CD',
  'Design Tools',
  'CSS Frameworks',
  'JavaScript Libraries',
  'Development Tools',
  'Deployment Platforms',
  'Monitoring & Analytics',
  'Security Tools',
  'Mobile Development',
  'Desktop Development',
  'API Tools',
  'Documentation Tools'
]

const difficulties = ['Beginner', 'Intermediate', 'Advanced']
const statuses = ['Stable', 'Beta', 'Active', 'Deprecated']

export default function WebDevToolsDirectory({ tools }: WebDevToolsDirectoryProps) {
  const [filter, setFilter] = useState<ToolFilter>({
    search: '',
    category: undefined,
    difficulty: undefined,
    status: undefined,
    tags: [],
    sortBy: 'popularity',
    sortOrder: 'desc'
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Stable': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Beta': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Active': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'Deprecated': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const filteredAndSortedTools = useMemo(() => {
    let filtered = tools.filter(tool => {
      // Text search
      if (filter.search) {
        const searchLower = filter.search.toLowerCase()
        const matches = 
          tool.name.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          tool.creator.toLowerCase().includes(searchLower) ||
          tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
        
        if (!matches) return false
      }

      // Category filter
      if (filter.category && tool.category !== filter.category) {
        return false
      }

      // Difficulty filter
      if (filter.difficulty && tool.difficulty !== filter.difficulty) {
        return false
      }

      // Status filter
      if (filter.status && tool.status !== filter.status) {
        return false
      }

      // Tags filter
      if (filter.tags && filter.tags.length > 0) {
        const hasMatchingTag = filter.tags.some(tag => 
          tool.tags.includes(tag.toLowerCase())
        )
        if (!hasMatchingTag) return false
      }

      return true
    })

    // Sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (filter.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'popularity':
          comparison = (b.popularity?.trendingScore || 0) - (a.popularity?.trendingScore || 0)
          break
        case 'lastUpdated':
          comparison = new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
          break
        case 'githubStars':
          comparison = (b.popularity?.githubStars || 0) - (a.popularity?.githubStars || 0)
          break
        default:
          comparison = (b.popularity?.trendingScore || 0) - (a.popularity?.trendingScore || 0)
      }

      return filter.sortOrder === 'desc' ? comparison : -comparison
    })

    return filtered
  }, [tools, filter])

  const updateFilter = (updates: Partial<ToolFilter>) => {
    setFilter(prev => ({ ...prev, ...updates }))
  }

  const clearFilters = () => {
    setFilter({
      search: '',
      category: undefined,
      difficulty: undefined,
      status: undefined,
      tags: [],
      sortBy: 'popularity',
      sortOrder: 'desc'
    })
  }

  // Get unique tags from all tools
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    tools.forEach(tool => {
      tool.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [tools])

  const toggleTag = (tag: string) => {
    const currentTags = filter.tags || []
    if (currentTags.includes(tag)) {
      updateFilter({ tags: currentTags.filter(t => t !== tag) })
    } else {
      updateFilter({ tags: [...currentTags, tag] })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-dark-50 mb-4">
          Web Development Tools Encyclopedia
        </h1>
        <p className="text-xl text-neutral-600 dark:text-dark-300 max-w-3xl mx-auto">
          Comprehensive guide to every major web development tool in use today. Find installation guides, 
          usage examples, best practices, and real-world implementations.
        </p>
        <div className="mt-6 text-neutral-500 dark:text-dark-400">
          {tools.length} tools • Updated daily
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-6 mb-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tools, creators, or technologies..."
            value={filter.search}
            onChange={(e) => updateFilter({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-neutral-200 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-neutral-900 dark:text-dark-50 placeholder-neutral-500 dark:placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-dark-400"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-dark-700 text-neutral-700 dark:text-dark-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-dark-600 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-neutral-100 dark:bg-dark-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-dark-600 text-neutral-900 dark:text-dark-50 shadow-sm' 
                    : 'text-neutral-600 dark:text-dark-400'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white dark:bg-dark-600 text-neutral-900 dark:text-dark-50 shadow-sm' 
                    : 'text-neutral-600 dark:text-dark-400'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Controls */}
            <select
              value={filter.sortBy}
              onChange={(e) => updateFilter({ sortBy: e.target.value as any })}
              className="px-3 py-2 border border-neutral-200 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-neutral-900 dark:text-dark-50 text-sm"
            >
              <option value="popularity">Popularity</option>
              <option value="name">Name</option>
              <option value="lastUpdated">Last Updated</option>
              <option value="githubStars">GitHub Stars</option>
            </select>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-dark-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-dark-300 mb-2">
                  Category
                </label>
                <select
                  value={filter.category || ''}
                  onChange={(e) => updateFilter({ category: e.target.value as WebDevCategory || undefined })}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-neutral-900 dark:text-dark-50 text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-dark-300 mb-2">
                  Difficulty
                </label>
                <select
                  value={filter.difficulty || ''}
                  onChange={(e) => updateFilter({ difficulty: e.target.value || undefined })}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-neutral-900 dark:text-dark-50 text-sm"
                >
                  <option value="">All Levels</option>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-dark-300 mb-2">
                  Status
                </label>
                <select
                  value={filter.status || ''}
                  onChange={(e) => updateFilter({ status: e.target.value || undefined })}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-neutral-900 dark:text-dark-50 text-sm"
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-dark-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      (filter.tags || []).includes(tag)
                        ? 'bg-primary-600 text-white'
                        : 'bg-neutral-100 dark:bg-dark-700 text-neutral-600 dark:text-dark-400 hover:bg-neutral-200 dark:hover:bg-dark-600'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-neutral-600 dark:text-dark-400 hover:text-neutral-900 dark:hover:text-dark-50 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-neutral-600 dark:text-dark-400">
          Showing {filteredAndSortedTools.length} of {tools.length} tools
        </p>
      </div>

      {/* Tools Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedTools.map(tool => (
            <ToolListItem key={tool.id} tool={tool} />
          ))}
        </div>
      )}

      {/* No Results */}
      {filteredAndSortedTools.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-dark-50 mb-2">No tools found</h3>
          <p className="text-neutral-600 dark:text-dark-400 mb-4">
            Try adjusting your search criteria or clearing the filters.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

// Tool Card Component for Grid View
function ToolCard({ tool }: { tool: WebDevTool }) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <Link href={`/tools/${tool.id}`}>
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-dark-50 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-dark-400">{tool.creator}</p>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(tool.difficulty)}`}>
            {tool.difficulty}
          </span>
        </div>

        <p className="text-neutral-700 dark:text-dark-200 text-sm mb-4 flex-1">
          {tool.description}
        </p>

        <div className="space-y-3">
          {/* Popularity Metrics */}
          {tool.popularity && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                {tool.popularity.githubStars && (
                  <div className="flex items-center gap-1 text-neutral-600 dark:text-dark-400">
                    <Star className="w-4 h-4" />
                    <span>{formatNumber(tool.popularity.githubStars)}</span>
                  </div>
                )}
                {tool.popularity.npmDownloads && (
                  <div className="flex items-center gap-1 text-neutral-600 dark:text-dark-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>{formatNumber(tool.popularity.npmDownloads)}</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-xs text-neutral-500 dark:text-dark-500">Trending</div>
                <div className="font-semibold text-primary-600 dark:text-primary-dark-400">
                  {tool.popularity.trendingScore}/100
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {tool.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-1 bg-neutral-100 dark:bg-dark-700 text-neutral-600 dark:text-dark-400 rounded text-xs">
                #{tag}
              </span>
            ))}
            {tool.tags.length > 3 && (
              <span className="px-2 py-1 bg-neutral-100 dark:bg-dark-700 text-neutral-600 dark:text-dark-400 rounded text-xs">
                +{tool.tags.length - 3}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-dark-500">
            <span>{tool.category}</span>
            <span>{formatDate(tool.lastUpdated)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Tool List Item Component for List View
function ToolListItem({ tool }: { tool: WebDevTool }) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <Link href={`/tools/${tool.id}`}>
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group">
        <div className="flex items-start justify-between">
          <div className="flex-1 mr-6">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-dark-50 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
                {tool.name}
              </h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(tool.difficulty)}`}>
                {tool.difficulty}
              </span>
              <span className="text-sm text-neutral-500 dark:text-dark-500">by {tool.creator}</span>
            </div>

            <p className="text-neutral-700 dark:text-dark-200 mb-3">
              {tool.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {tool.tags.slice(0, 5).map(tag => (
                <span key={tag} className="px-2 py-1 bg-neutral-100 dark:bg-dark-700 text-neutral-600 dark:text-dark-400 rounded text-xs">
                  #{tag}
                </span>
              ))}
              {tool.tags.length > 5 && (
                <span className="px-2 py-1 bg-neutral-100 dark:bg-dark-700 text-neutral-600 dark:text-dark-400 rounded text-xs">
                  +{tool.tags.length - 5} more
                </span>
              )}
            </div>

            <div className="text-sm text-neutral-500 dark:text-dark-500">
              {tool.category} • Last updated {new Date(tool.lastUpdated).toLocaleDateString()}
            </div>
          </div>

          {/* Metrics Column */}
          <div className="text-right space-y-2">
            {tool.popularity && (
              <>
                <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-dark-400">
                  {tool.popularity.githubStars && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{formatNumber(tool.popularity.githubStars)}</span>
                    </div>
                  )}
                  {tool.popularity.npmDownloads && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{formatNumber(tool.popularity.npmDownloads)}</span>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="flex gap-2">
              <a 
                href={tool.officialWebsite} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-neutral-100 dark:bg-dark-700 hover:bg-neutral-200 dark:hover:bg-dark-600 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-neutral-600 dark:text-dark-400" />
              </a>
              {tool.githubRepo && (
                <a 
                  href={tool.githubRepo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-neutral-100 dark:bg-dark-700 hover:bg-neutral-200 dark:hover:bg-dark-600 rounded-lg transition-colors"
                >
                  <Github className="w-4 h-4 text-neutral-600 dark:text-dark-400" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
