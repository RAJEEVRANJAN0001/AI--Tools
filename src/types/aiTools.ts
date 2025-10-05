export interface AIFeature {
  name: string
  description: string
  available: boolean
}

export interface AICapability {
  name: string
  description: string
  level?: 'Basic' | 'Advanced' | 'Expert'
}

export interface AIIntegration {
  name: string
  description: string
  type?: 'API' | 'Plugin' | 'Native' | 'Webhook'
  available?: boolean
}

export interface InstallationStep {
  title: string
  description: string
  code?: string
}

export interface Installation {
  requirements?: string[]
  steps: string[] | InstallationStep[]
}

export interface AITool {
  id: string
  name: string
  company: string
  category: AICategory
  subCategory?: string
  description: string
  longDescription: string
  
  // Core Features
  coreFeatures: string[]
  uniqueSellingPoints: string[]
  features: AIFeature[]
  
  // Technical Details
  modelType?: string
  contextWindow?: string
  languages?: string[]
  platforms?: string[]
  
  // Pricing & Access
  pricing: string
  apiAccess: boolean
  freeTrialAvailable: boolean
  pricingDetails?: Record<string, string>
  
  // Capabilities
  capabilities: AICapability[]
  useCases: AIUseCase[]
  limitations?: string[]
  
  // Performance Metrics
  performance?: PerformanceMetrics
  
  // Integration & Usage
  integrations: AIIntegration[]
  sdks?: string[]
  installation: Installation
  
  // Resources
  officialWebsite: string
  documentation?: string
  apiDocs?: string
  githubRepo?: string
  communityForum?: string
  communityResources?: Resource[]
  tutorials?: Resource[]
  
  // Metadata
  releaseDate: string
  lastUpdated: string
  version?: string
  popularity: PopularityMetrics
  status: AIToolStatus
  userCount: string
  tags: string[]
}

export interface AIUseCase {
  title: string
  description: string
  industry?: string
  scenario?: string
  benefits?: string[]
  example?: string
  examples?: string[]
  complexity?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

export interface PerformanceMetrics {
  accuracy: number
  speed: number
  reliability: number
  latency?: string
  uptime?: string
  benchmark?: string
}

export interface BenchmarkScore {
  benchmark: string
  score: string
  ranking?: string
}

export interface Resource {
  title: string
  url: string
  type: 'Article' | 'Video' | 'Course' | 'Book' | 'Documentation' | 'Tutorial' | 'Blog' | 'Paper'
  author?: string
  description?: string
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface PopularityMetrics {
  githubStars?: number
  userCount?: number
  monthlyActiveUsers?: number
  communitySize?: number
  trendingScore: number
  marketShare?: number
  weeklyDownloads?: number
}

export type AICategory = 
  | 'Large Language Models'
  | 'Code Generation'
  | 'Design & Creative Tools'
  | 'Design Tools'
  | 'Writing Assistants'
  | 'AI Platforms & Services'
  | 'Agent Frameworks'
  | 'Developer Tools'
  | 'Video Generation'
  | 'Voice & Audio'
  | 'Specialized Tools'
  | 'Image Generation'
  | 'Data Analysis'
  | 'Automation Tools'
  | 'Chatbots & Conversational AI'
  | 'Research Tools'
  | 'Business Intelligence'

export type AIToolStatus = 
  | 'Active'
  | 'Beta'
  | 'Preview'
  | 'Deprecated'
  | 'Coming Soon'

export interface AIToolFilter {
  category?: AICategory
  tags?: string[]
  status?: AIToolStatus
  search?: string
  sortBy?: 'name' | 'popularity' | 'lastUpdated' | 'userCount'
  sortOrder?: 'asc' | 'desc'
}
