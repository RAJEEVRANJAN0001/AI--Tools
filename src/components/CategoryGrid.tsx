'use client'

import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import { 
  Brain, 
  Code, 
  Palette, 
  MessageSquare, 
  Zap, 
  ImageIcon, 
  Music, 
  BarChart, 
  Shield, 
  Wrench,
  Users,
  TrendingUp,
  Star,
  Clock,
  ArrowRight,
  Sparkles,
  Filter,
  Search,
  Grid,
  List
} from 'lucide-react'
import { getAllCategories, getToolsByCategory } from '@/data/categoryData'

interface CategoryData {
  name: string
  description: string
  icon: any
  gradient: string
  toolCount: number
  tools: any[]
  popularity: number
  lastUpdated: string
  tags: string[]
  featured: boolean
  growth: number
  subcategories: string[]
  topTools: string[]
  priceRange: string
  complexity: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Mixed'
  useCases: string[]
}

export default function CategoryGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popularity')
  const [filterBy, setFilterBy] = useState('all')
  const [categories, setCategories] = useState<CategoryData[]>([])

  // Initialize categories with enhanced data
  const initialCategories: CategoryData[] = useMemo(() => [
    {
      name: 'Large Language Models',
      description: 'Advanced AI models for natural language understanding, generation, and reasoning across diverse applications.',
      icon: Brain,
      gradient: 'from-blue-500 to-purple-600',
      toolCount: 15,
      tools: [],
      popularity: 95,
      lastUpdated: '2025-09-05',
      tags: ['Text Generation', 'Conversation', 'Reasoning', 'Multimodal'],
      featured: true,
      growth: 45,
      subcategories: ['Foundation Models', 'Fine-tuned Models', 'Specialized LLMs'],
      topTools: ['GPT-4', 'Claude 3.5 Sonnet', 'Gemini 2.5 Pro'],
      priceRange: 'Free - $100+/month',
      complexity: 'Mixed',
      useCases: ['Content creation', 'Code generation', 'Research assistance', 'Customer support']
    },
    {
      name: 'Code Generation',
      description: 'AI-powered tools for automated code writing, debugging, testing, and software development assistance.',
      icon: Code,
      gradient: 'from-green-500 to-teal-600',
      toolCount: 12,
      tools: [],
      popularity: 88,
      lastUpdated: '2025-09-04',
      tags: ['Programming', 'Debugging', 'Code Review', 'IDE Integration'],
      featured: true,
      growth: 67,
      subcategories: ['IDE Assistants', 'Code Completion', 'Testing Tools'],
      topTools: ['GitHub Copilot', 'Tabnine', 'CodeT5'],
      priceRange: 'Free - $50/month',
      complexity: 'Beginner',
      useCases: ['Autocomplete', 'Bug fixing', 'Code documentation', 'Refactoring']
    },
    {
      name: 'Design Tools',
      description: 'Creative AI platforms for graphic design, UI/UX creation, branding, and visual content generation.',
      icon: Palette,
      gradient: 'from-pink-500 to-rose-600',
      toolCount: 18,
      tools: [],
      popularity: 82,
      lastUpdated: '2025-09-03',
      tags: ['Graphic Design', 'UI/UX', 'Branding', 'Templates'],
      featured: true,
      growth: 52,
      subcategories: ['Graphic Design', 'UI/UX Tools', 'Logo Makers'],
      topTools: ['Canva Magic Studio', 'Figma AI', 'Adobe Firefly'],
      priceRange: 'Free - $60/month',
      complexity: 'Beginner',
      useCases: ['Social media graphics', 'Presentations', 'Marketing materials', 'Web design']
    },
    {
      name: 'Chatbots & Conversational AI',
      description: 'Intelligent chatbot platforms and conversational interfaces for customer service and engagement.',
      icon: MessageSquare,
      gradient: 'from-cyan-500 to-blue-600',
      toolCount: 14,
      tools: [],
      popularity: 76,
      lastUpdated: '2025-09-02',
      tags: ['Customer Service', 'Automation', 'NLP', 'Integration'],
      featured: false,
      growth: 38,
      subcategories: ['Customer Support', 'Sales Bots', 'Personal Assistants'],
      topTools: ['Dialogflow', 'Rasa', 'Botpress'],
      priceRange: 'Free - $200/month',
      complexity: 'Intermediate',
      useCases: ['Customer support', 'Lead generation', 'FAQ automation', 'Personal assistance']
    },
    {
      name: 'Agent Frameworks',
      description: 'Autonomous AI agent platforms that can plan, execute, and iterate on complex multi-step tasks.',
      icon: Zap,
      gradient: 'from-orange-500 to-red-600',
      toolCount: 8,
      tools: [],
      popularity: 72,
      lastUpdated: '2025-09-01',
      tags: ['Automation', 'Planning', 'Execution', 'Autonomy'],
      featured: true,
      growth: 89,
      subcategories: ['Task Automation', 'Research Agents', 'Workflow Agents'],
      topTools: ['AutoGPT', 'LangChain Agents', 'CrewAI'],
      priceRange: 'Free - $150/month',
      complexity: 'Advanced',
      useCases: ['Task automation', 'Research workflows', 'Content pipelines', 'Data processing']
    },
    {
      name: 'Image Generation',
      description: 'AI-powered image creation tools for generating artwork, photos, and visual content from text.',
      icon: ImageIcon,
      gradient: 'from-purple-500 to-indigo-600',
      toolCount: 16,
      tools: [],
      popularity: 84,
      lastUpdated: '2025-09-04',
      tags: ['Text-to-Image', 'Art Creation', 'Photo Editing', 'Style Transfer'],
      featured: true,
      growth: 73,
      subcategories: ['Text-to-Image', 'Image Editing', 'Style Transfer'],
      topTools: ['Midjourney', 'DALL-E 3', 'Stable Diffusion'],
      priceRange: 'Free - $80/month',
      complexity: 'Intermediate',
      useCases: ['Digital art', 'Marketing visuals', 'Concept art', 'Photo enhancement']
    },
    {
      name: 'Voice & Audio',
      description: 'AI tools for speech synthesis, voice cloning, audio generation, and sound processing.',
      icon: Music,
      gradient: 'from-yellow-500 to-orange-600',
      toolCount: 11,
      tools: [],
      popularity: 68,
      lastUpdated: '2025-08-30',
      tags: ['Speech Synthesis', 'Voice Cloning', 'Audio Processing', 'Music Generation'],
      featured: false,
      growth: 56,
      subcategories: ['Speech Synthesis', 'Voice Cloning', 'Music Generation'],
      topTools: ['ElevenLabs', 'Murf', 'Speechify'],
      priceRange: 'Free - $120/month',
      complexity: 'Intermediate',
      useCases: ['Voiceovers', 'Podcasts', 'Audiobooks', 'Music production']
    },
    {
      name: 'Data Analysis',
      description: 'Intelligent data processing, visualization, and analytics tools powered by machine learning.',
      icon: BarChart,
      gradient: 'from-emerald-500 to-green-600',
      toolCount: 13,
      tools: [],
      popularity: 74,
      lastUpdated: '2025-09-03',
      tags: ['Analytics', 'Visualization', 'Machine Learning', 'Business Intelligence'],
      featured: false,
      growth: 42,
      subcategories: ['Business Analytics', 'Data Visualization', 'Predictive Analytics'],
      topTools: ['Tableau AI', 'DataRobot', 'H2O.ai'],
      priceRange: 'Free - $500/month',
      complexity: 'Advanced',
      useCases: ['Business intelligence', 'Predictive analytics', 'Data visualization', 'Market research']
    },
    {
      name: 'AI Safety & Ethics',
      description: 'Tools and frameworks for ensuring responsible AI development, bias detection, and ethical guidelines.',
      icon: Shield,
      gradient: 'from-red-500 to-pink-600',
      toolCount: 6,
      tools: [],
      popularity: 58,
      lastUpdated: '2025-08-28',
      tags: ['Safety', 'Ethics', 'Bias Detection', 'Compliance'],
      featured: false,
      growth: 34,
      subcategories: ['Bias Detection', 'Safety Testing', 'Compliance Tools'],
      topTools: ['AI Fairness 360', 'What-If Tool', 'Responsible AI Toolkit'],
      priceRange: 'Free - $300/month',
      complexity: 'Expert',
      useCases: ['Bias auditing', 'Safety testing', 'Compliance monitoring', 'Ethical guidelines']
    },
    {
      name: 'AI Development Tools',
      description: 'Platforms and frameworks for building, training, and deploying custom AI models and applications.',
      icon: Wrench,
      gradient: 'from-slate-500 to-gray-600',
      toolCount: 20,
      tools: [],
      popularity: 70,
      lastUpdated: '2025-09-02',
      tags: ['ML Frameworks', 'Model Training', 'Deployment', 'APIs'],
      featured: false,
      growth: 48,
      subcategories: ['ML Frameworks', 'Cloud Platforms', 'API Services'],
      topTools: ['TensorFlow', 'PyTorch', 'Hugging Face'],
      priceRange: 'Free - $1000+/month',
      complexity: 'Expert',
      useCases: ['Model development', 'Custom AI solutions', 'Research projects', 'Enterprise AI']
    }
  ], [])

  useEffect(() => {
    setCategories(initialCategories)
  }, [initialCategories])

  const filteredCategories = useMemo(() => {
    return categories
      .filter(category => 
        searchTerm === '' || 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .filter(category => filterBy === 'all' || 
        (filterBy === 'featured' && category.featured) ||
        (filterBy === 'growing' && category.growth > 50) ||
        (filterBy === 'beginner' && category.complexity === 'Beginner')
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'popularity':
            return b.popularity - a.popularity
          case 'tools':
            return b.toolCount - a.toolCount
          case 'growth':
            return b.growth - a.growth
          case 'alphabetical':
            return a.name.localeCompare(b.name)
          default:
            return 0
        }
      })
  }, [categories, searchTerm, filterBy, sortBy])

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20'
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20'
      case 'Advanced': return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20'
      case 'Expert': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20'
      case 'Mixed': return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
      default: return 'text-neutral-600 bg-neutral-50 dark:text-neutral-400 dark:bg-neutral-900/20'
    }
  }

  const totalStats = useMemo(() => ({
    totalCategories: categories.length,
    totalTools: categories.reduce((sum, cat) => sum + cat.toolCount, 0),
    averageGrowth: categories.length > 0 ? Math.round(categories.reduce((sum, cat) => sum + cat.growth, 0) / categories.length) : 0
  }), [categories])

  return (
    <section className="py-24 bg-neutral-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-dark-50 mb-4">
            AI Tool Categories
          </h2>
          <p className="text-xl text-neutral-600 dark:text-dark-400 max-w-3xl mx-auto">
            Explore our comprehensive collection of AI tools organized by category. 
            From language models to creative tools, find the perfect AI solution for your needs.
          </p>
        </div>

        {/* Controls Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-200 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-neutral-900 dark:text-dark-50 placeholder-neutral-500 dark:placeholder-dark-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filters and View Controls */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-500" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 border border-neutral-200 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-neutral-700 dark:text-dark-300"
              >
                <option value="all">All Categories</option>
                <option value="featured">Featured</option>
                <option value="growing">Fast Growing</option>
                <option value="beginner">Beginner Friendly</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral-200 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-neutral-700 dark:text-dark-300"
            >
              <option value="popularity">Most Popular</option>
              <option value="tools">Most Tools</option>
              <option value="growth">Fastest Growing</option>
              <option value="alphabetical">Alphabetical</option>
            </select>

            <div className="flex items-center gap-2 bg-white dark:bg-dark-700 border border-neutral-200 dark:border-dark-600 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600 dark:bg-primary-dark-900 dark:text-primary-dark-400' : 'text-neutral-500 hover:text-neutral-700 dark:text-dark-400 dark:hover:text-dark-200'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600 dark:bg-primary-dark-900 dark:text-primary-dark-400' : 'text-neutral-500 hover:text-neutral-700 dark:text-dark-400 dark:hover:text-dark-200'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => {
              const IconComponent = category.icon || Brain // Fallback to Brain icon if undefined
              return (
                <Link key={category.name} href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="group relative bg-white dark:bg-dark-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-dark-500 transform hover:-translate-y-2 overflow-hidden">
                    
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    {/* Status Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-1">
                      {category.featured && (
                        <span className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full font-medium">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                      {category.growth > 50 && (
                        <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full font-medium">
                          <TrendingUp className="w-3 h-3" />
                          Growing
                        </span>
                      )}
                    </div>

                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {IconComponent && <IconComponent className="w-8 h-8" />}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-dark-50 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
                        {category.name}
                      </h3>
                      
                      <p className="text-sm text-neutral-600 dark:text-dark-300 mb-4 line-clamp-3 leading-relaxed">
                        {category.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-dark-400">
                          <Users className="w-4 h-4" />
                          <span>{category.toolCount} tools</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-medium">+{category.growth}%</span>
                        </div>
                      </div>

                      {/* Complexity Badge */}
                      <div className="mb-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getComplexityColor(category.complexity)}`}>
                          {category.complexity} Level
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {category.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-neutral-100 dark:bg-dark-600 text-neutral-600 dark:text-dark-400 text-xs rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                          {category.tags.length > 3 && (
                            <span className="px-2 py-1 bg-neutral-100 dark:bg-dark-600 text-neutral-500 dark:text-dark-400 text-xs rounded-md">
                              +{category.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Top Tools */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-dark-50 mb-2">Popular Tools</h4>
                        <div className="space-y-1">
                          {category.topTools.slice(0, 2).map((tool, index) => (
                            <div key={index} className="text-xs text-neutral-600 dark:text-dark-400 flex items-center gap-2">
                              <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                              {tool}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-dark-600">
                        <div className="text-xs text-neutral-500 dark:text-dark-400">
                          {category.priceRange}
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredCategories.map((category) => {
              const IconComponent = category.icon || Brain // Fallback to Brain icon if undefined
              return (
                <Link key={category.name} href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="group bg-white dark:bg-dark-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-dark-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-xl text-white shadow-md`}>
                          {IconComponent && <IconComponent className="w-6 h-6" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-dark-50 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
                              {category.name}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getComplexityColor(category.complexity)}`}>
                              {category.complexity}
                            </span>
                            {category.featured && (
                              <span className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full font-medium">
                                <Star className="w-3 h-3" />
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-neutral-600 dark:text-dark-300 mb-2">{category.description}</p>
                          <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-dark-400">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {category.toolCount} tools
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              +{category.growth}% growth
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-neutral-900 dark:text-dark-50">{category.priceRange}</div>
                          <div className="text-xs text-neutral-500 dark:text-dark-400">Price range</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-neutral-400 dark:text-dark-500 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-2">
              No categories found
            </h3>
            <p className="text-neutral-600 dark:text-dark-400">
              Try adjusting your search or filters to find more categories.
            </p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white dark:bg-dark-700 rounded-xl shadow-md">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-dark-400 mb-2">
              {totalStats.totalCategories}
            </div>
            <div className="text-sm text-neutral-600 dark:text-dark-400">Categories</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-dark-700 rounded-xl shadow-md">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-dark-400 mb-2">
              {totalStats.totalTools}
            </div>
            <div className="text-sm text-neutral-600 dark:text-dark-400">Total Tools</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-dark-700 rounded-xl shadow-md">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-dark-400 mb-2">
              {totalStats.averageGrowth}%
            </div>
            <div className="text-sm text-neutral-600 dark:text-dark-400">Avg Growth</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="flex justify-center gap-8 text-sm text-neutral-600 dark:text-dark-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Updated Weekly</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Community Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Real-time Data</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
