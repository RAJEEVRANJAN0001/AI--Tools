'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Grid, List, Star, Users, ExternalLink } from 'lucide-react'
import { aiTools, categories } from '@/data/aiTools'
import { AITool, SearchFilters } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'popularity'>('name')

  const filteredTools = useMemo(() => {
    let filtered = aiTools.filter((tool) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          tool.name.toLowerCase().includes(query) ||
          tool.developer.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.features.some(feature => feature.toLowerCase().includes(query))
        )
      }
      return true
    })

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(tool => tool.category === filters.category)
    }

    // Pricing filter
    if (filters.pricing) {
      switch (filters.pricing) {
        case 'free':
          filtered = filtered.filter(tool => tool.isFree)
          break
        case 'open-source':
          filtered = filtered.filter(tool => tool.isOpenSource)
          break
        case 'paid':
          filtered = filtered.filter(tool => !tool.isFree)
          break
      }
    }

    // API filter
    if (filters.hasAPI) {
      filtered = filtered.filter(tool => tool.hasAPI)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'popularity':
          return parseInt(b.userCount?.replace(/[^\d]/g, '') || '0') - parseInt(a.userCount?.replace(/[^\d]/g, '') || '0')
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchQuery, filters, sortBy])

  const ToolCard = ({ tool }: { tool: AITool }) => (
    <div className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
            {tool.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{tool.developer}</p>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {tool.category}
          </span>
        </div>
        <div className="flex space-x-2">
          {tool.isNew && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
              New
            </span>
          )}
          {tool.isTrending && (
            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
              Trending
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-4">
        {tool.features.slice(0, 3).map((feature) => (
          <span
            key={feature}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
          >
            {feature}
          </span>
        ))}
        {tool.features.length > 3 && (
          <span className="px-2 py-1 text-gray-500 text-xs">
            +{tool.features.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          {tool.rating && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{tool.rating}</span>
            </div>
          )}
          {tool.userCount && (
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{tool.userCount}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-blue-600">{tool.pricing}</span>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All AI Tools & Platforms</h1>
          <p className="text-lg text-gray-600">
            Discover and compare {aiTools.length} AI tools across {categories.length} categories
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={filters.category || ''}
                onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={filters.pricing || ''}
                onChange={(e) => setFilters({ ...filters, pricing: e.target.value as any })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Pricing</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
                <option value="open-source">Open Source</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="popularity">Sort by Popularity</option>
              </select>

              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredTools.length} of {aiTools.length} tools
          </p>
        </div>

        {/* Tools Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No tools found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilters({})
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
