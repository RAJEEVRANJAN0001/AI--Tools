export interface AITool {
  id: string
  name: string
  developer: string
  description: string
  category: string
  pricing: string
  officialLink: string
  apiLink?: string
  githubLink?: string
  features: string[]
  strengths: string[]
  useCases: string[]
  rating?: number
  userCount?: string
  isNew?: boolean
  isTrending?: boolean
  isFree?: boolean
  hasAPI?: boolean
  isOpenSource?: boolean
  createdDate: string
  updatedDate: string
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  toolCount: number
  color: string
  slug: string
}

export interface SearchFilters {
  category?: string
  pricing?: 'free' | 'freemium' | 'paid' | 'open-source'
  features?: string[]
  hasAPI?: boolean
  isOpenSource?: boolean
  developer?: string
}

export interface Review {
  id: string
  toolId: string
  rating: number
  title: string
  content: string
  pros: string[]
  cons: string[]
  createdDate: string
  verified: boolean
  helpful: number
}

export interface ComparisonItem {
  tool: AITool
  selected: boolean
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
