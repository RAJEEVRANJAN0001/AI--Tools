'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  TrendingUp, 
  Clock,
  Grid,
  List,
  ChevronDown,
  ExternalLink
} from 'lucide-react'
import { getAllTools, getAllCategories } from '@/utils/toolsConsolidator'

export default function AIToolsDirectory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('popularity')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const tools = getAllTools()
  const categoryData = getAllCategories()
  const categories = ['All', ...categoryData.map(cat => cat.name)]

  const filteredAndSortedTools = useMemo(() => {
    let filtered = tools

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(tool => tool.category === selectedCategory)
    }

    // Sort tools
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'popularity':
        filtered.sort((a, b) => (b.popularity?.trendingScore || 0) - (a.popularity?.trendingScore || 0))
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        break
      default:
        break
    }

    return filtered
  }, [tools, searchQuery, selectedCategory, sortBy])

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search AI tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-200 dark:border-dark-700 rounded-lg 
                     bg-white dark:bg-dark-900 text-neutral-900 dark:text-dark-50
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     placeholder-neutral-500 dark:placeholder-dark-400"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-neutral-200 dark:border-dark-700 rounded-lg
                       bg-white dark:bg-dark-900 text-neutral-900 dark:text-dark-50
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral-200 dark:border-dark-700 rounded-lg
                       bg-white dark:bg-dark-900 text-neutral-900 dark:text-dark-50
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="popularity">Most Popular</option>
              <option value="name">Name A-Z</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid' 
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' 
                  : 'text-neutral-500 hover:text-neutral-700 dark:text-dark-400 dark:hover:text-dark-200'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list' 
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' 
                  : 'text-neutral-500 hover:text-neutral-700 dark:text-dark-400 dark:hover:text-dark-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-dark-700">
          <p className="text-neutral-600 dark:text-dark-400">
            Showing {filteredAndSortedTools.length} of {tools.length} AI tools
          </p>
        </div>
      </div>

      {/* Tools Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedTools.map((tool) => (
            <ToolListItem key={tool.id} tool={tool} />
          ))}
        </div>
      )}

      {/* No Results */}
      {filteredAndSortedTools.length === 0 && (
        <div className="text-center py-12">
          <div className="text-neutral-400 dark:text-dark-500 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-dark-50 mb-2">
            No tools found
          </h3>
          <p className="text-neutral-600 dark:text-dark-400">
            Try adjusting your search criteria or browse all categories
          </p>
        </div>
      )}
    </div>
  )
}

// Tool Card Component for Grid View
function ToolCard({ tool }: { tool: any }) {
  return (
    <Link href={`/ai-tools/${tool.id}`} className="group">
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-xl 
                    transition-all duration-300 group-hover:-translate-y-1 
                    border border-neutral-200 dark:border-dark-700 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-dark-50 
                         group-hover:text-primary-600 dark:group-hover:text-primary-400 
                         transition-colors line-clamp-2">
              {tool.name}
            </h3>
            <ExternalLink className="w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 
                                   transition-opacity flex-shrink-0 ml-2" />
          </div>
          
          <p className="text-sm text-neutral-600 dark:text-dark-400 mb-3">
            by {tool.company}
          </p>
          
          <p className="text-neutral-700 dark:text-dark-300 text-sm line-clamp-3 mb-4">
            {tool.description}
          </p>
        </div>

        {/* Metrics */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-dark-400">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{tool.userCount || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{tool.pricing}</span>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="px-6 pb-6">
          <span className="inline-block bg-primary-100 dark:bg-primary-900 
                         text-primary-800 dark:text-primary-200 
                         px-3 py-1 rounded-full text-xs font-medium">
            {tool.category}
          </span>
        </div>
      </div>
    </Link>
  )
}

// Tool List Item Component for List View
function ToolListItem({ tool }: { tool: any }) {
  return (
    <Link href={`/ai-tools/${tool.id}`} className="group">
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg 
                    transition-all duration-300 border border-neutral-200 dark:border-dark-700 
                    p-6 group-hover:border-primary-300 dark:group-hover:border-primary-700">
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-dark-50 
                           group-hover:text-primary-600 dark:group-hover:text-primary-400 
                           transition-colors">
                {tool.name}
              </h3>
              <span className="bg-primary-100 dark:bg-primary-900 
                             text-primary-800 dark:text-primary-200 
                             px-2 py-1 rounded text-xs font-medium">
                {tool.category}
              </span>
            </div>
            
            <p className="text-sm text-neutral-600 dark:text-dark-400 mb-2">
              by {tool.company}
            </p>
            
            <p className="text-neutral-700 dark:text-dark-300 mb-4 line-clamp-2">
              {tool.description}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-neutral-600 dark:text-dark-400">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{tool.userCount || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{tool.pricing}</span>
              </div>
            </div>
          </div>
          
          <ExternalLink className="w-5 h-5 text-neutral-400 opacity-0 group-hover:opacity-100 
                                 transition-opacity flex-shrink-0" />
        </div>
      </div>
    </Link>
  )
}