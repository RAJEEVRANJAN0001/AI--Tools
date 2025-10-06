'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { AITool } from '@/types/aiTools'
import { formatDate } from '@/utils/dateFormatter'

// Helper function to format numbers
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
import { 
  Star, 
  ExternalLink, 
  Globe, 
  Calendar,
  TrendingUp,
  Download,
  Shield,
  Zap,
  Brain,
  Code,
  Palette,
  PenTool,
  Settings,
  Bot,
  Terminal,
  Video,
  Mic,
  Target,
  Check,
  Copy,
  Play,
  BookOpen,
  Github,
  FileText,
  MessageSquare,
  Award,
  Lightbulb,
  ArrowLeft,
  ChevronRight,
  Share2,
  Bookmark,
  Heart,
  HeartHandshake,
  AlertTriangle,
  Info,
  Smartphone,
  Monitor,
  Cloud,
  Database,
  Lock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Clock,
  DollarSign,
  Layers,
  Filter,
  Search
} from 'lucide-react'
import Link from 'next/link'
import BackButton from '@/components/BackButton'

// Dynamic imports for performance
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
  </div>
)

interface AIToolDetailPageProps {
  tool: AITool
  relatedTools?: AITool[]
}

// Enhanced category icon mapping with more categories
const getCategoryIcon = (category: string) => {
  const iconMap = {
    'Large Language Models': Brain,
    'Code Generation': Code,
    'Design & Creative Tools': Palette,
    'Writing Assistants': PenTool,
    'AI Platforms & Services': Settings,
    'Agent Frameworks': Bot,
    'Developer Tools': Terminal,
    'Video Generation': Video,
    'Voice & Audio': Mic,
    'Specialized Tools': Target,
    'Image Generation': Palette,
    'Data Analysis': TrendingUp,
    'Automation Tools': Settings,
    'Research Tools': BookOpen,
    'Business Intelligence': TrendingUp,
    'Chatbots & Conversational AI': MessageSquare,
    'Content Creation & Writing': PenTool,
    'Design & Visual Creation': Palette,
    'Productivity & Automation': Settings,
  }
  return iconMap[category as keyof typeof iconMap] || Zap
}

// SEO metadata generation function
export const generateToolMetadata = (tool: AITool): Metadata => ({
  title: `${tool.name} - AI Tool Review & Pricing | AI Ecosystem Directory`,
  description: `Comprehensive review of ${tool.name} by ${tool.company}. Features, pricing, use cases, and integrations. ${tool.description}`,
  keywords: [
    tool.name,
    tool.company,
    tool.category,
    'AI tool',
    'review',
    'pricing',
    ...tool.tags
  ].join(', '),
  openGraph: {
    title: `${tool.name} - AI Tool Review`,
    description: tool.description,
    type: 'article',
    publishedTime: tool.lastUpdated,
    tags: tool.tags,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${tool.name} Review`,
    description: tool.description.substring(0, 160),
  },
})

export default function AIToolDetailPage({ tool, relatedTools = [] }: AIToolDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'examples' | 'usecases' | 'integrations' | 'pricing' | 'reviews'>('overview')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [viewCount, setViewCount] = useState(0)
  const [filterTag, setFilterTag] = useState<string>('')

  const CategoryIcon = getCategoryIcon(tool.category)

  // Load saved preferences
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedTools') || '[]')
    const savedLikes = JSON.parse(localStorage.getItem('likedTools') || '[]')
    setIsBookmarked(savedBookmarks.includes(tool.id))
    setIsLiked(savedLikes.includes(tool.id))
    
    // Simulate view tracking
    const views = parseInt(localStorage.getItem(`views_${tool.id}`) || '0')
    setViewCount(views + 1)
    localStorage.setItem(`views_${tool.id}`, (views + 1).toString())
  }, [tool.id])

  // Optimized clipboard function
  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }, [])

  // Enhanced number formatting
  const formatNumber = useCallback((num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }, [])

  // Bookmark functionality
  const toggleBookmark = useCallback(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedTools') || '[]')
    const newBookmarks = isBookmarked 
      ? savedBookmarks.filter((id: string) => id !== tool.id)
      : [...savedBookmarks, tool.id]
    
    localStorage.setItem('bookmarkedTools', JSON.stringify(newBookmarks))
    setIsBookmarked(!isBookmarked)
  }, [isBookmarked, tool.id])

  // Like functionality
  const toggleLike = useCallback(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedTools') || '[]')
    const newLikes = isLiked 
      ? savedLikes.filter((id: string) => id !== tool.id)
      : [...savedLikes, tool.id]
    
    localStorage.setItem('likedTools', JSON.stringify(newLikes))
    setIsLiked(!isLiked)
  }, [isLiked, tool.id])

  // Share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out ${tool.name} - ${tool.description}`

  const handleShare = useCallback(async (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      copy: shareUrl
    }

    if (platform === 'copy') {
      await copyToClipboard(shareUrl, 'share-url')
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
    }
    setShowShareModal(false)
  }, [shareUrl, shareText, copyToClipboard])

  // Enhanced tabs with additional content
  const tabs = useMemo(() => [
    { id: 'overview', label: 'Overview', icon: BookOpen, count: null },
    { id: 'usecases', label: 'Use Cases', icon: Lightbulb, count: tool.useCases?.length || 0 },
    { id: 'integrations', label: 'Integrations', icon: Settings, count: tool.integrations?.length || 0 },
    { id: 'pricing', label: 'Pricing', icon: Award, count: null },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare, count: null }
  ], [tool])

  // Filtered related tools
  const filteredRelatedTools = useMemo(() => {
    if (!filterTag) return relatedTools
    return relatedTools.filter(relTool => 
      relTool.tags.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase()))
    )
  }, [relatedTools, filterTag])

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: tool.name,
            description: tool.description,
            applicationCategory: tool.category,
            operatingSystem: 'Web',
            author: {
              '@type': 'Organization',
              name: tool.company
            },
            offers: {
              '@type': 'Offer',
              price: tool.pricing.includes('Free') ? '0' : 'varies',
              priceCurrency: 'USD',
              description: tool.pricing
            },
            url: tool.officialWebsite,
            datePublished: tool.lastUpdated,
            keywords: tool.tags.join(', ')
          })
        }}
      />

      <div className="min-h-screen bg-neutral-50 dark:bg-dark-900">
        {/* Enhanced Header with Glassmorphism */}
        <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-dark-600 dark:via-primary-dark-700 dark:to-primary-dark-800 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Enhanced Navigation with Back Button */}
            <div className="flex items-center justify-between mb-6">
              <nav className="flex items-center gap-2 text-sm text-primary-200 dark:text-primary-dark-200" aria-label="Breadcrumb">
                <BackButton 
                  customPath="/ai-tools" 
                  label="AI Tools" 
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
                />
                <ChevronRight className="w-4 h-4 text-primary-200" aria-hidden="true" />
                <span className="text-white font-medium">{tool.name}</span>
              </nav>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Enhanced Tool Info */}
              <div className="flex-1">
                <div className="flex items-start gap-6 mb-6">
                  {/* Tool Logo/Avatar with Enhanced Styling */}
                  <div className="relative group">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-3xl border border-white/20 group-hover:scale-105 transition-transform">
                      {tool.name.charAt(0)}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                  </div>

                  <div className="flex-1">
                    {/* Tool Name and Category */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight">{tool.name}</h1>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-sm border border-white/20">
                          <CategoryIcon className="w-4 h-4" />
                          {tool.category}
                        </span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={toggleLike}
                          className={`p-2 rounded-lg transition-all ${
                            isLiked 
                              ? 'bg-red-500/20 text-red-200 hover:bg-red-500/30' 
                              : 'bg-white/10 hover:bg-white/20'
                          }`}
                          aria-label={isLiked ? 'Unlike this tool' : 'Like this tool'}
                        >
                          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={toggleBookmark}
                          className={`p-2 rounded-lg transition-all ${
                            isBookmarked 
                              ? 'bg-yellow-500/20 text-yellow-200 hover:bg-yellow-500/30' 
                              : 'bg-white/10 hover:bg-white/20'
                          }`}
                          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this tool'}
                        >
                          {isBookmarked ? <Bookmark className="w-5 h-5 fill-current" /> : <Bookmark className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => setShowShareModal(true)}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                          aria-label="Share this tool"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Company and Views */}
                    <div className="flex items-center gap-4 mb-4">
                      <p className="text-xl text-primary-100 dark:text-primary-dark-100">
                        by <span className="font-semibold">{tool.company}</span>
                      </p>
                      <div className="flex items-center gap-1 text-primary-200 dark:text-primary-dark-200">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{formatNumber(viewCount)} views</span>
                      </div>
                    </div>

                    {/* Enhanced Description */}
                    <p className="text-lg text-primary-50 dark:text-primary-dark-50 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>

                {/* Enhanced Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="text-lg font-bold">{formatDate(tool.lastUpdated)}</div>
                    <div className="text-sm text-primary-200 dark:text-primary-dark-200">Last Updated</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Panel */}
              <div className="w-full lg:w-80">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="space-y-4">
                    <a
                      href={tool.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-all hover:scale-105 shadow-lg"
                    >
                      <Globe className="w-5 h-5" />
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    
                    {tool.documentation && (
                      <a
                        href={tool.documentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
                      >
                        <FileText className="w-5 h-5" />
                        Documentation
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    {tool.githubRepo && (
                      <a
                        href={tool.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
                      >
                        <Github className="w-5 h-5" />
                        GitHub
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    {tool.communityForum && (
                      <a
                        href={tool.communityForum}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
                      >
                        <MessageSquare className="w-5 h-5" />
                        Community
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    {/* Pricing Quick Info */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-green-300" />
                        <span className="font-semibold">Pricing</span>
                      </div>
                      <p className="text-sm text-primary-100">{tool.pricing}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Tabs with Counts */}
          <div className="mb-8">
            <div className="border-b border-neutral-200 dark:border-dark-600">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map(tab => {
                  const TabIcon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600 dark:text-primary-dark-400 transform scale-105'
                          : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-dark-400 dark:hover:text-dark-200 hover:border-neutral-300 dark:hover:border-dark-500'
                      }`}
                      aria-selected={activeTab === tab.id}
                      role="tab"
                    >
                      <TabIcon className="w-4 h-4" />
                      {tab.label}
                      {tab.count !== null && tab.count > 0 && (
                        <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                          activeTab === tab.id 
                            ? 'bg-primary-100 text-primary-700 dark:bg-primary-dark-900 dark:text-primary-dark-300'
                            : 'bg-neutral-100 text-neutral-600 dark:bg-dark-700 dark:text-dark-400'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Tab Content with Enhanced Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === 'overview' && <OverviewTab tool={tool} />}
              {activeTab === 'usecases' && <UseCasesTab tool={tool} />}
              {activeTab === 'integrations' && <IntegrationsTab tool={tool} />}
              {activeTab === 'pricing' && <PricingTab tool={tool} />}
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* Performance Metrics with Enhanced Visuals */}
              {tool.performance && (
                <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-neutral-200 dark:border-dark-700">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-dark-400" />
                    Performance Metrics
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Accuracy', value: tool.performance.accuracy, color: 'bg-primary-600 dark:bg-primary-dark-500' },
                      { label: 'Speed', value: tool.performance.speed, color: 'bg-green-500' },
                      { label: 'Reliability', value: tool.performance.reliability, color: 'bg-blue-500' }
                    ].map((metric, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-neutral-600 dark:text-dark-400 font-medium">{metric.label}</span>
                          <span className="font-semibold text-neutral-900 dark:text-dark-50">
                            {metric.value}%
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-dark-600 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`${metric.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Overall Score */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-dark-900/30 dark:to-blue-900/30 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-dark-400">
                        {Math.round((tool.performance.accuracy + tool.performance.speed + tool.performance.reliability) / 3)}%
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-dark-400">Overall Score</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Tags with Search */}
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-neutral-200 dark:border-dark-700">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setFilterTag(tag)}
                      className="px-3 py-1 bg-primary-50 dark:bg-primary-dark-900 text-primary-700 dark:text-primary-dark-300 rounded-lg text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-dark-800 transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tool Status and Info */}
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-neutral-200 dark:border-dark-700">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Tool Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600 dark:text-dark-400">Status</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600 dark:text-dark-400">Category</span>
                    <span className="text-neutral-900 dark:text-dark-50 font-medium">{tool.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600 dark:text-dark-400">Company</span>
                    <span className="text-neutral-900 dark:text-dark-50 font-medium">{tool.company}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600 dark:text-dark-400">Updated</span>
                    <span className="text-neutral-900 dark:text-dark-50 font-medium">{formatDate(tool.lastUpdated)}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Related Tools with Filter */}
              {relatedTools.length > 0 && (
                <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-neutral-200 dark:border-dark-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50">Related Tools</h3>
                    {filterTag && (
                      <button
                        onClick={() => setFilterTag('')}
                        className="text-xs text-primary-600 dark:text-primary-dark-400 hover:underline"
                      >
                        Clear filter
                      </button>
                    )}
                  </div>
                  {filterTag && (
                    <div className="mb-3 text-xs text-neutral-500 dark:text-dark-400">
                      Filtered by: #{filterTag}
                    </div>
                  )}
                  <div className="space-y-3">
                    {filteredRelatedTools.slice(0, 3).map(relatedTool => (
                      <Link 
                        key={relatedTool.id} 
                        href={`/ai-tools/${relatedTool.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-dark-700 transition-all hover:scale-102 group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-dark-500 dark:to-primary-dark-700 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                          {relatedTool.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-neutral-900 dark:text-dark-50 truncate group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
                            {relatedTool.name}
                          </div>
                          <div className="text-sm text-neutral-600 dark:text-dark-400 truncate">
                            {relatedTool.company}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors" />
                      </Link>
                    ))}
                  </div>
                  {filteredRelatedTools.length > 3 && (
                    <div className="mt-3 text-center">
                      <button className="text-sm text-primary-600 dark:text-primary-dark-400 hover:underline">
                        View all {filteredRelatedTools.length} related tools
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Share {tool.name}</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Twitter
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Facebook
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-2 p-3 bg-neutral-50 dark:bg-dark-700 text-neutral-600 dark:text-dark-400 rounded-lg hover:bg-neutral-100 dark:hover:bg-dark-600 transition-colors"
                >
                  {copiedCode === 'share-url' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  Copy Link
                </button>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full mt-4 p-2 bg-neutral-100 dark:bg-dark-700 text-neutral-600 dark:text-dark-400 rounded-lg hover:bg-neutral-200 dark:hover:bg-dark-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

// Enhanced Tab Components
function OverviewTab({ tool }: { tool: AITool }) {
  return (
    <div className="space-y-6">
      {/* Enhanced Features Section */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-neutral-200 dark:border-dark-700">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary-600 dark:text-primary-dark-400" />
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tool.features.map((feature, index) => (
            <div key={index} className="group flex items-start gap-3 p-4 bg-neutral-50 dark:bg-dark-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-dark-600 transition-all hover:scale-102">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 dark:text-dark-50 mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
                  {feature.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-dark-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Capabilities */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-neutral-200 dark:border-dark-700">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary-600 dark:text-primary-dark-400" />
          Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tool.capabilities.map((capability, index) => (
            <div key={index} className="group p-4 border border-neutral-200 dark:border-dark-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-dark-600 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-primary-100 dark:bg-primary-dark-900 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-primary-600 dark:text-primary-dark-400" />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-dark-50 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
                  {capability.name}
                </h3>
              </div>
              <p className="text-sm text-neutral-600 dark:text-dark-400 leading-relaxed">{capability.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Installation Guide */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-neutral-200 dark:border-dark-700">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-6 flex items-center gap-2">
          <Download className="w-6 h-6 text-primary-600 dark:text-primary-dark-400" />
          Getting Started
        </h2>
        <div className="space-y-6">
          {tool.installation.steps.map((step, index) => (
            <div key={index} className="flex gap-4 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-dark-500 dark:to-primary-dark-600 text-white rounded-full flex items-center justify-center font-semibold text-sm group-hover:scale-110 transition-transform shadow-lg">
                  {index + 1}
                </div>
                {index < tool.installation.steps.length - 1 && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-neutral-200 dark:bg-dark-600"></div>
                )}
              </div>
              <div className="flex-1 pb-6">
                {typeof step === 'string' ? (
                  <p className="text-neutral-600 dark:text-dark-400 leading-relaxed">{step}</p>
                ) : (
                  <>
                    <h3 className="font-semibold text-neutral-900 dark:text-dark-50 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-dark-400 mb-3 leading-relaxed">{step.description}</p>
                    {step.code && (
                      <div className="relative">
                        <pre className="bg-neutral-900 dark:bg-dark-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm border border-neutral-700">
                          <code>{step.code}</code>
                        </pre>
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => navigator.clipboard.writeText(step.code!)}
                            className="p-1 bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-400 hover:text-white transition-colors"
                            title="Copy code"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Requirements */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <Monitor className="w-5 h-5" />
          System Requirements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <Smartphone className="w-4 h-4" />
            <span>Web Browser</span>
          </div>
          <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <Cloud className="w-4 h-4" />
            <span>Internet Connection</span>
          </div>
          <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <Database className="w-4 h-4" />
            <span>Account Required</span>
          </div>
        </div>
      </div>
    </div>
  )
}


function UseCasesTab({ tool }: { tool: AITool }) {
  return (
    <div className="space-y-6">
      {tool.useCases.map((useCase, index) => (
        <div key={index} className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-neutral-200 dark:border-dark-700">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-dark-900 dark:to-primary-dark-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Lightbulb className="w-7 h-7 text-primary-600 dark:text-primary-dark-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-dark-50 mb-3">{useCase.title}</h3>
              <p className="text-neutral-600 dark:text-dark-400 mb-6 leading-relaxed">{useCase.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-dark-50 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary-600 dark:text-primary-dark-400" />
                    Example Implementation
                  </h4>
                  <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-dark-700 dark:to-dark-600 p-4 rounded-lg border border-neutral-200 dark:border-dark-600">
                    <p className="text-sm text-neutral-700 dark:text-dark-300 leading-relaxed">{useCase.example}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-dark-50 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-600" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {useCase.benefits?.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-dark-400">
                        <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="leading-relaxed">{benefit}</span>
                      </li>
                    )) || (
                      <li className="flex items-start gap-3 text-sm text-neutral-600 dark:text-dark-400">
                        <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span>Significant workflow improvements and efficiency gains</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function IntegrationsTab({ tool }: { tool: AITool }) {
  const [selectedIntegration, setSelectedIntegration] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-neutral-200 dark:border-dark-700">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-6 flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary-600 dark:text-primary-dark-400" />
          Integrations & Compatibility
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tool.integrations.map((integration, index) => (
            <div 
              key={index} 
              className={`group p-4 border rounded-lg cursor-pointer transition-all ${
                selectedIntegration === index
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-dark-900/30'
                  : 'border-neutral-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-dark-600 hover:shadow-md'
              }`}
              onClick={() => setSelectedIntegration(selectedIntegration === index ? null : index)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-dark-500 dark:to-primary-dark-700 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                  {integration.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-dark-50 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
                  {integration.name}
                </h3>
              </div>
              <p className="text-sm text-neutral-600 dark:text-dark-400 leading-relaxed">{integration.description}</p>
              
              {selectedIntegration === index && (
                <div className="mt-4 pt-4 border-t border-primary-200 dark:border-primary-dark-700">
                  <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-dark-400">
                    <Zap className="w-4 h-4" />
                    <span className="font-medium">Easy to integrate</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Integration Categories */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              Cloud Platforms
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Seamless integration with major cloud providers and platforms
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Development Tools
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Works with popular development frameworks and tools
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PricingTab({ tool }: { tool: AITool }) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 border border-neutral-200 dark:border-dark-700">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-6 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-primary-600 dark:text-primary-dark-400" />
          Pricing Information
        </h2>
        
        {/* Main Pricing */}
        <div className="mb-8">
          <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-dark-900/30 dark:to-primary-dark-800/30 rounded-xl border border-primary-200 dark:border-primary-dark-700">
            <div className="w-12 h-12 bg-primary-600 dark:bg-primary-dark-500 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-dark-100 mb-2">Current Pricing Model</h3>
              <p className="text-lg text-primary-800 dark:text-primary-dark-200 font-medium">{tool.pricing}</p>
            </div>
          </div>
        </div>

        {/* Detailed Pricing Breakdown */}
        {tool.pricingDetails && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary-600 dark:text-primary-dark-400" />
              Pricing Breakdown
            </h4>
            <div className="bg-neutral-50 dark:bg-dark-700 rounded-xl p-6 border border-neutral-200 dark:border-dark-600">
              <div className="space-y-4">
                {Object.entries(tool.pricingDetails).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-dark-600 last:border-b-0">
                    <span className="text-neutral-700 dark:text-dark-300 font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-semibold text-neutral-900 dark:text-dark-50 text-lg">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pricing Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
              <Check className="w-5 h-5" />
              What's Included
            </h4>
            <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Full feature access
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                API integration
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Customer support
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Regular updates
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Free Trial Info
            </h4>
            <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
              Most plans include a trial period or freemium tier to test functionality.
            </p>
            <a
              href={tool.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 font-medium"
            >
              Check current offers
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Pricing Tip */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Pro Tip</h4>
              <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                Visit the official website for the most up-to-date pricing information, special offers, and enterprise discounts. Many AI tools offer educational or startup pricing tiers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
