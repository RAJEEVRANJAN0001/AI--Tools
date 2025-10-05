'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  Star, 
  Users, 
  Clock, 
  ExternalLink, 
  TrendingUp, 
  Sparkles,
  ChevronDown,
  Heart,
  BookOpen,
  Code,
  Palette,
  Zap,
  Brain,
  Filter,
  Search
} from 'lucide-react'

interface Tool {
  id: string
  name: string
  developer: string
  description: string
  longDescription: string
  category: string
  subcategory: string
  pricing: string
  rating: number
  users: string
  image: string
  features: string[]
  isNew?: boolean
  isTrending?: boolean
  isHot?: boolean
  badge?: string
  releaseDate: string
  lastUpdated: string
  complexity: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  useCases: string[]
  integrations: string[]
  pros: string[]
  cons: string[]
  detailedFeatures: {
    name: string
    description: string
    available: boolean
    premium?: boolean
  }[]
  pricingTiers: {
    name: string
    price: string
    features: string[]
    popular?: boolean
  }[]
  performance: {
    speed: number
    accuracy: number
    reliability: number
    userSatisfaction: number
  }
  tags: string[]
}

const featuredTools: Tool[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    developer: 'OpenAI',
    description: 'Most advanced large language model with multimodal capabilities for text and image understanding.',
    longDescription: 'GPT-4 is OpenAI\'s most advanced system, producing safer and more useful responses. It can solve difficult problems with greater accuracy, thanks to its broader general knowledge and problem-solving abilities. With multimodal capabilities, it can understand both text and images, making it incredibly versatile for various applications.',
    category: 'Large Language Models',
    subcategory: 'Foundation Models',
    pricing: 'Pay-per-use',
    rating: 4.8,
    users: '100M+',
    image: '/api/placeholder/400/250',
    features: ['Multimodal', '128K Context', 'Code Generation', 'Function Calling', 'JSON Mode', 'Vision API'],
    isHot: true,
    isTrending: true,
    badge: 'G',
    releaseDate: '2023-03-14',
    lastUpdated: '2025-09-05',
    complexity: 'Intermediate',
    useCases: [
      'Content creation and copywriting',
      'Code generation and debugging',
      'Data analysis and visualization',
      'Educational tutoring and explanations',
      'Creative writing and storytelling',
      'Business strategy and planning',
      'Research and summarization',
      'Language translation'
    ],
    integrations: [
      'ChatGPT',
      'OpenAI API',
      'Microsoft Copilot',
      'Zapier',
      'Slack',
      'Discord',
      'WordPress',
      'Notion'
    ],
    pros: [
      'Exceptional reasoning capabilities',
      'Multimodal input support',
      'Large context window',
      'High accuracy and reliability',
      'Extensive API ecosystem'
    ],
    cons: [
      'Usage-based pricing can be expensive',
      'Rate limits on free tier',
      'Occasional hallucinations',
      'No real-time data access'
    ],
    detailedFeatures: [
      { name: 'Text Generation', description: 'Generate human-like text for any purpose', available: true },
      { name: 'Image Understanding', description: 'Analyze and describe images in detail', available: true },
      { name: 'Code Generation', description: 'Write and debug code in 70+ languages', available: true },
      { name: 'Function Calling', description: 'Execute functions and API calls', available: true },
      { name: 'JSON Mode', description: 'Structured output in JSON format', available: true },
      { name: 'Custom Instructions', description: 'Personalized behavior settings', available: true, premium: true }
    ],
    pricingTiers: [
      {
        name: 'Free Tier',
        price: '$0',
        features: ['3 requests per minute', 'Basic features', 'Community support']
      },
      {
        name: 'ChatGPT Plus',
        price: '$20/month',
        features: ['Priority access', 'Faster responses', 'GPT-4 access', 'Custom GPTs'],
        popular: true
      },
      {
        name: 'API Usage',
        price: '$0.03/1K tokens',
        features: ['Pay per use', 'Full API access', 'High rate limits', 'Enterprise support']
      }
    ],
    performance: {
      speed: 85,
      accuracy: 95,
      reliability: 99,
      userSatisfaction: 92
    },
    tags: ['AI', 'LLM', 'Multimodal', 'Code', 'Writing', 'OpenAI', 'GPT', 'Chat']
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    developer: 'Anthropic',
    description: 'Constitutional AI model with enhanced reasoning and extended thinking capabilities.',
    longDescription: 'Claude 3.5 Sonnet represents Anthropic\'s most intelligent model, combining top-tier performance with improved reasoning capabilities. Built with Constitutional AI principles, it offers enhanced safety features while maintaining exceptional performance across various tasks.',
    category: 'Large Language Models',
    subcategory: 'Constitutional AI',
    pricing: 'Free + Pro',
    rating: 4.7,
    users: '50M+',
    image: '/api/placeholder/400/250',
    features: ['200K Context', 'Constitutional AI', 'Tool Use', 'Artifacts', 'Code Interpreter', 'Document Analysis'],
    isNew: true,
    isTrending: true,
    badge: 'C',
    releaseDate: '2024-06-20',
    lastUpdated: '2025-09-04',
    complexity: 'Intermediate',
    useCases: [
      'Complex reasoning and analysis',
      'Ethical decision making',
      'Long document processing',
      'Research and writing',
      'Code review and debugging',
      'Educational content creation',
      'Legal document analysis',
      'Scientific research assistance'
    ],
    integrations: [
      'Claude.ai',
      'Anthropic API',
      'Slack',
      'Google Workspace',
      'Microsoft Teams',
      'Zapier',
      'Custom API integrations'
    ],
    pros: [
      'Strong ethical reasoning',
      'Excellent safety features',
      'Long context window',
      'High-quality outputs',
      'Transparent AI principles'
    ],
    cons: [
      'Limited free tier',
      'Fewer integrations than competitors',
      'Newer ecosystem',
      'Regional availability limitations'
    ],
    detailedFeatures: [
      { name: 'Constitutional AI', description: 'Built-in ethical reasoning and safety', available: true },
      { name: 'Artifacts', description: 'Interactive code and document creation', available: true },
      { name: 'Vision Capabilities', description: 'Image analysis and understanding', available: true },
      { name: 'Tool Use', description: 'Integration with external tools', available: true },
      { name: 'Code Interpreter', description: 'Execute and debug code', available: true },
      { name: 'Advanced Reasoning', description: 'Complex problem-solving capabilities', available: true }
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: '$0',
        features: ['Limited messages', 'Basic features', 'Community access']
      },
      {
        name: 'Pro',
        price: '$20/month',
        features: ['Unlimited messages', 'Priority bandwidth', 'Early access features'],
        popular: true
      },
      {
        name: 'Team',
        price: '$25/month per member',
        features: ['Pro features', 'Collaboration tools', 'Admin controls', 'Usage analytics']
      }
    ],
    performance: {
      speed: 82,
      accuracy: 94,
      reliability: 98,
      userSatisfaction: 91
    },
    tags: ['AI', 'LLM', 'Constitutional', 'Safety', 'Reasoning', 'Anthropic', 'Claude', 'Ethics']
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    developer: 'GitHub',
    description: 'AI pair programmer that provides real-time code suggestions and completions.',
    longDescription: 'GitHub Copilot is your AI pair programmer that helps you write code faster with less work. Trained on billions of lines of code, it turns natural language prompts into coding suggestions across dozens of languages.',
    category: 'Code Generation',
    subcategory: 'IDE Assistant',
    pricing: '$10/month',
    rating: 4.6,
    users: '10M+',
    image: '/api/placeholder/400/250',
    features: ['IDE Integration', 'Multi-language', 'Code Chat', 'Pull Request Summaries', 'CLI Assistant', 'Security Scanning'],
    isTrending: true,
    badge: 'G',
    releaseDate: '2021-06-29',
    lastUpdated: '2025-09-03',
    complexity: 'Beginner',
    useCases: [
      'Code completion and generation',
      'Bug detection and fixing',
      'Code documentation',
      'Learning new programming languages',
      'Refactoring existing code',
      'API integration assistance',
      'Test case generation',
      'Code review assistance'
    ],
    integrations: [
      'VS Code',
      'JetBrains IDEs',
      'Vim/Neovim',
      'Visual Studio',
      'GitHub',
      'Azure DevOps',
      'GitLab',
      'Bitbucket'
    ],
    pros: [
      'Seamless IDE integration',
      'Supports 70+ languages',
      'Fast real-time suggestions',
      'Learns from your coding style',
      'Excellent for boilerplate code'
    ],
    cons: [
      'Subscription-based pricing',
      'Sometimes suggests incorrect code',
      'Limited without internet connection',
      'May encourage dependency on AI'
    ],
    detailedFeatures: [
      { name: 'Code Completion', description: 'Real-time code suggestions as you type', available: true },
      { name: 'Chat Interface', description: 'Ask coding questions in natural language', available: true },
      { name: 'Pull Request Summaries', description: 'Auto-generate PR descriptions', available: true },
      { name: 'Security Vulnerability Detection', description: 'Identify potential security issues', available: true },
      { name: 'CLI Assistant', description: 'Command line help and suggestions', available: true },
      { name: 'Custom Models', description: 'Train on your organization\'s code', available: true, premium: true }
    ],
    pricingTiers: [
      {
        name: 'Individual',
        price: '$10/month',
        features: ['Code completion', 'Chat', 'CLI assistant', 'Mobile app'],
        popular: true
      },
      {
        name: 'Business',
        price: '$19/month per user',
        features: ['Individual features', 'Policy management', 'Organization insights']
      },
      {
        name: 'Enterprise',
        price: '$39/month per user',
        features: ['Business features', 'Custom models', 'Advanced security', 'Audit logs']
      }
    ],
    performance: {
      speed: 95,
      accuracy: 88,
      reliability: 97,
      userSatisfaction: 89
    },
    tags: ['Code', 'IDE', 'Programming', 'GitHub', 'Autocomplete', 'Developer Tools', 'AI Assistant']
  },
  {
    id: 'gemini-2-5-pro',
    name: 'Gemini 2.5 Pro',
    developer: 'Google',
    description: 'Natively multimodal AI with 1M token context window and deep research capabilities.',
    longDescription: 'Gemini 2.5 Pro is Google\'s most advanced AI model with unprecedented 1M token context window and native multimodal capabilities. It excels at understanding and generating content across text, images, video, audio, and code.',
    category: 'Large Language Models',
    subcategory: 'Multimodal AI',
    pricing: 'Free + Paid',
    rating: 4.5,
    users: '80M+',
    image: '/api/placeholder/400/250',
    features: ['1M Context', 'Multimodal', 'Deep Research', 'Code Execution', 'Google Integration', 'Real-time Data'],
    isNew: true,
    badge: 'G',
    releaseDate: '2024-02-15',
    lastUpdated: '2025-09-02',
    complexity: 'Intermediate',
    useCases: [
      'Long document analysis',
      'Multimodal content creation',
      'Research and synthesis',
      'Video and audio analysis',
      'Code generation and debugging',
      'Educational tutoring',
      'Data analysis and visualization',
      'Scientific research assistance'
    ],
    integrations: [
      'Google Workspace',
      'Google Cloud',
      'YouTube',
      'Google Search',
      'Android',
      'Chrome',
      'Google AI Studio',
      'Vertex AI'
    ],
    pros: [
      'Largest context window available',
      'Native multimodal capabilities',
      'Google ecosystem integration',
      'Real-time information access',
      'Strong code generation'
    ],
    cons: [
      'Limited availability in some regions',
      'Newer platform with fewer third-party integrations',
      'Variable response quality',
      'Complex pricing structure'
    ],
    detailedFeatures: [
      { name: '1M Token Context', description: 'Process extremely long documents', available: true },
      { name: 'Multimodal Understanding', description: 'Text, images, video, and audio', available: true },
      { name: 'Code Execution', description: 'Run and debug code in real-time', available: true },
      { name: 'Google Search Integration', description: 'Access real-time information', available: true },
      { name: 'Document Analysis', description: 'Deep analysis of complex documents', available: true },
      { name: 'Custom Model Training', description: 'Fine-tune for specific use cases', available: true, premium: true }
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: '$0',
        features: ['Limited daily usage', 'Basic features', 'Community support']
      },
      {
        name: 'Pro',
        price: '$19.99/month',
        features: ['Increased limits', 'Priority access', 'Advanced features'],
        popular: true
      },
      {
        name: 'API Usage',
        price: '$0.001/1K tokens',
        features: ['Pay per use', 'Full API access', 'Enterprise support']
      }
    ],
    performance: {
      speed: 87,
      accuracy: 91,
      reliability: 94,
      userSatisfaction: 88
    },
    tags: ['AI', 'LLM', 'Multimodal', 'Google', 'Research', 'Long Context', 'Video', 'Audio']
  },
  {
    id: 'canva-magic-studio',
    name: 'Canva Magic Studio',
    developer: 'Canva',
    description: 'AI-powered design platform with comprehensive creative tools and templates.',
    longDescription: 'Canva Magic Studio brings AI-powered design capabilities to everyone. From text-to-image generation to smart design suggestions, it democratizes professional design creation with an intuitive interface and powerful AI features.',
    category: 'Design Tools',
    subcategory: 'Creative AI',
    pricing: 'Free + Pro',
    rating: 4.4,
    users: '60M+',
    image: '/api/placeholder/400/250',
    features: ['Text-to-Image', 'Magic Resize', 'Background Removal', 'Design Assistant', 'Brand Kit', 'Collaboration'],
    isTrending: true,
    badge: 'C',
    releaseDate: '2023-09-12',
    lastUpdated: '2025-09-01',
    complexity: 'Beginner',
    useCases: [
      'Social media graphics',
      'Marketing materials',
      'Presentations and slides',
      'Logo and brand design',
      'Website graphics',
      'Print materials',
      'Video thumbnails',
      'Educational content'
    ],
    integrations: [
      'Google Drive',
      'Dropbox',
      'OneDrive',
      'Social Media Platforms',
      'WordPress',
      'Mailchimp',
      'HubSpot',
      'Slack'
    ],
    pros: [
      'User-friendly interface',
      'Extensive template library',
      'Real-time collaboration',
      'AI-powered design suggestions',
      'Multiple export formats'
    ],
    cons: [
      'Limited customization in free tier',
      'Subscription required for advanced features',
      'Can be overwhelming for beginners',
      'Limited offline functionality'
    ],
    detailedFeatures: [
      { name: 'Magic Design', description: 'AI-generated design suggestions', available: true },
      { name: 'Background Remover', description: 'Remove backgrounds with one click', available: true },
      { name: 'Magic Resize', description: 'Automatically resize for different platforms', available: true },
      { name: 'Text-to-Image', description: 'Generate images from text descriptions', available: true, premium: true },
      { name: 'Brand Kit', description: 'Maintain brand consistency', available: true, premium: true },
      { name: 'Advanced Animation', description: 'Create animated designs', available: true, premium: true }
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: '$0',
        features: ['5GB storage', 'Basic templates', 'Limited AI features']
      },
      {
        name: 'Pro',
        price: '$14.99/month',
        features: ['100GB storage', 'Premium templates', 'AI features', 'Brand kit'],
        popular: true
      },
      {
        name: 'Teams',
        price: '$44.99/month',
        features: ['Unlimited storage', 'Team collaboration', 'Admin controls', 'Priority support']
      }
    ],
    performance: {
      speed: 92,
      accuracy: 86,
      reliability: 95,
      userSatisfaction: 90
    },
    tags: ['Design', 'Creative', 'Templates', 'AI Design', 'Graphics', 'Marketing', 'Canva', 'Visual']
  },
  {
    id: 'autogpt',
    name: 'AutoGPT',
    developer: 'Significant Gravitas',
    description: 'Open-source autonomous AI agent framework for complex task execution.',
    longDescription: 'AutoGPT is an experimental open-source application showcasing GPT-4\'s capabilities. It autonomously achieves goals by breaking them into sub-tasks and executing them iteratively, representing a significant step toward autonomous AI systems.',
    category: 'Agent Frameworks',
    subcategory: 'Autonomous Agents',
    pricing: 'Free',
    rating: 4.3,
    users: '5M+',
    image: '/api/placeholder/400/250',
    features: ['Autonomous', 'Open Source', 'Multi-step Tasks', 'Tool Integration', 'Memory Management', 'Goal Planning'],
    isHot: true,
    badge: 'A',
    releaseDate: '2023-03-30',
    lastUpdated: '2025-08-30',
    complexity: 'Expert',
    useCases: [
      'Automated research tasks',
      'Content creation workflows',
      'Data collection and analysis',
      'Software development assistance',
      'Business process automation',
      'Market research',
      'Competitive analysis',
      'Personal productivity tasks'
    ],
    integrations: [
      'OpenAI API',
      'Google Search',
      'File System',
      'Web Browsing',
      'Email',
      'Calendar',
      'Slack',
      'GitHub'
    ],
    pros: [
      'Completely open source',
      'Autonomous operation',
      'Highly customizable',
      'Active community',
      'No usage fees'
    ],
    cons: [
      'Requires technical expertise',
      'Can be unstable',
      'High API costs',
      'Limited GUI',
      'Steep learning curve'
    ],
    detailedFeatures: [
      { name: 'Autonomous Planning', description: 'Break down goals into actionable steps', available: true },
      { name: 'Tool Integration', description: 'Connect with external APIs and services', available: true },
      { name: 'Memory Management', description: 'Maintain context across sessions', available: true },
      { name: 'Web Browsing', description: 'Browse and interact with websites', available: true },
      { name: 'File Operations', description: 'Read, write, and manage files', available: true },
      { name: 'Custom Plugins', description: 'Extend functionality with plugins', available: true }
    ],
    pricingTiers: [
      {
        name: 'Open Source',
        price: '$0',
        features: ['Full source code', 'Community support', 'Self-hosted'],
        popular: true
      },
      {
        name: 'Cloud Hosting',
        price: 'Variable',
        features: ['Managed hosting', 'Technical support', 'Scalable infrastructure']
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        features: ['Dedicated support', 'Custom development', 'SLA guarantees']
      }
    ],
    performance: {
      speed: 70,
      accuracy: 75,
      reliability: 80,
      userSatisfaction: 85
    },
    tags: ['Agent', 'Autonomous', 'Open Source', 'Automation', 'Research', 'Goal Planning', 'GPT-4']
  }
]

export default function FeaturedTools() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('rating')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showFilters, setShowFilters] = useState<boolean>(false)

  const categories = ['all', 'Large Language Models', 'Code Generation', 'Design Tools', 'Agent Frameworks']

  const filteredTools = featuredTools
    .filter(tool => selectedCategory === 'all' || tool.category === selectedCategory)
    .filter(tool => searchTerm === '' || 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'users':
          return parseInt(b.users.replace(/[^\d]/g, '')) - parseInt(a.users.replace(/[^\d]/g, ''))
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        default:
          return 0
      }
    })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Large Language Models': return <Brain className="w-4 h-4" />
      case 'Code Generation': return <Code className="w-4 h-4" />
      case 'Design Tools': return <Palette className="w-4 h-4" />
      case 'Agent Frameworks': return <Zap className="w-4 h-4" />
      default: return <Sparkles className="w-4 h-4" />
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20'
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20'
      case 'Advanced': return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20'
      case 'Expert': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20'
      default: return 'text-neutral-600 bg-neutral-50 dark:text-neutral-400 dark:bg-neutral-900/20'
    }
  }

  return (
    <section className="py-24 bg-white dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-dark-50 mb-4">
            Featured AI Tools & Platforms
          </h2>
          <p className="text-xl text-neutral-600 dark:text-dark-400 max-w-3xl mx-auto">
            Discover the most innovative and impactful AI tools reshaping industries and workflows. 
            Each tool is thoroughly analyzed with detailed features, pricing, and real-world applications.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-200 dark:border-dark-600 rounded-xl bg-white dark:bg-dark-700 text-neutral-900 dark:text-dark-50 placeholder-neutral-500 dark:placeholder-dark-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-neutral-200 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-neutral-700 dark:text-dark-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral-200 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-neutral-700 dark:text-dark-300"
            >
              <option value="rating">Highest Rated</option>
              <option value="users">Most Users</option>
              <option value="name">Alphabetical</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <Link key={tool.id} href={`/ai-tools/${tool.id}`}>
              <div className="group bg-white dark:bg-dark-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-dark-500 transform hover:-translate-y-2">
                
                {/* Image/Banner */}
                <div className="relative h-48 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-dark-900 dark:to-primary-dark-800 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {tool.isHot && (
                      <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full font-medium">
                        🔥 Hot
                      </span>
                    )}
                    {tool.isTrending && (
                      <span className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full font-medium">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </span>
                    )}
                    {tool.isNew && (
                      <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full font-medium">
                        New
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-sm bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium text-neutral-900 dark:text-dark-50">{tool.rating}</span>
                  </div>

                  {/* Tool Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-dark-400 dark:to-primary-dark-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {tool.badge}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-dark-50 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
                        {tool.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-dark-400">
                        {getCategoryIcon(tool.category)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-neutral-500 dark:text-dark-400">{tool.developer}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getComplexityColor(tool.complexity)}`}>
                        {tool.complexity}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-600 dark:text-dark-300 mb-3">{tool.category}</p>
                    
                    <p className="text-sm text-neutral-700 dark:text-dark-300 leading-relaxed line-clamp-3 mb-4">
                      {tool.description}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-dark-50 mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {tool.features.slice(0, 4).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-neutral-100 dark:bg-dark-600 text-neutral-700 dark:text-dark-300 text-xs rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                      {tool.features.length > 4 && (
                        <span className="px-2 py-1 bg-neutral-100 dark:bg-dark-600 text-neutral-500 dark:text-dark-400 text-xs rounded-md">
                          +{tool.features.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-dark-50 mb-2">Performance</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-dark-400">Speed:</span>
                        <span className="font-medium text-neutral-900 dark:text-dark-50">{tool.performance.speed}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-dark-400">Accuracy:</span>
                        <span className="font-medium text-neutral-900 dark:text-dark-50">{tool.performance.accuracy}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-dark-50 mb-2">Popular Use Cases</h4>
                    <ul className="space-y-1">
                      {tool.useCases.slice(0, 3).map((useCase, index) => (
                        <li key={index} className="text-xs text-neutral-600 dark:text-dark-400 flex items-start gap-2">
                          <span className="w-1 h-1 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-dark-600">
                    <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-dark-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {tool.users}
                      </div>
                      <span className="font-medium text-primary-600 dark:text-primary-400">{tool.pricing}</span>
                    </div>
                    
                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-neutral-400 dark:text-dark-500 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-2">
              No tools found
            </h3>
            <p className="text-neutral-600 dark:text-dark-400">
              Try adjusting your search or filters to find more tools.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link 
            href="/ai-tools"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-dark-500 dark:hover:bg-primary-dark-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Explore All AI Tools
            <ExternalLink className="w-5 h-5" />
          </Link>
          
          <div className="mt-4 flex justify-center gap-8 text-sm text-neutral-600 dark:text-dark-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Detailed Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Community Tested</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Updated Daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
