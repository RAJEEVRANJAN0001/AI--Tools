export interface WebDevTool {
  id: string
  name: string
  category: WebDevCategory
  subCategory?: string
  creator: string
  maintainer?: string
  officialWebsite: string
  githubRepo?: string
  description: string
  longDescription: string
  
  // Core Features
  coreFeatures: string[]
  uniqueSellingPoints: string[]
  
  // Installation & Setup
  systemRequirements: string[]
  prerequisites: string[]
  installationSteps: InstallationStep[]
  
  // Usage
  commonCommands: Command[]
  
  // Use Cases
  useCases: UseCase[]
  realWorldExamples: RealWorldExample[]
  
  // Best Practices
  bestPractices: string[]
  performanceOptimizations: string[]
  securityConsiderations: string[]
  commonPitfalls: string[]
  troubleshooting: TroubleshootingTip[]
  
  // Resources
  officialDocs: string
  tutorials: Resource[]
  communityResources: Resource[]
  extensions: Extension[]
  
  // Metadata
  version: string
  lastUpdated: string
  popularity: PopularityMetrics
  license: string
  tags: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  status: 'Active' | 'Deprecated' | 'Beta' | 'Stable'
}

export interface InstallationStep {
  step: number
  title: string
  description: string
  code?: string
  language?: string
  platform?: 'Windows' | 'macOS' | 'Linux' | 'All'
}

export interface Command {
  command: string
  description: string
  example: string
  options?: CommandOption[]
}

export interface CommandOption {
  flag: string
  description: string
  example?: string
}

export interface UseCase {
  title: string
  description: string
  scenario: string
  benefits: string[]
}

export interface RealWorldExample {
  projectName: string
  company?: string
  description: string
  url?: string
  keyFeatures: string[]
}

export interface TroubleshootingTip {
  problem: string
  solution: string
  code?: string
}

export interface Resource {
  title: string
  url: string
  type: 'Article' | 'Video' | 'Course' | 'Book' | 'Documentation' | 'Tutorial'
  author?: string
  description?: string
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface Extension {
  name: string
  description: string
  url: string
  category: string
}

export interface PopularityMetrics {
  githubStars?: number
  npmDownloads?: number
  stackOverflowQuestions?: number
  jobListings?: number
  marketShare?: number
  trendingScore: number
}

export type WebDevCategory = 
  | 'Frontend Frameworks'
  | 'Backend Frameworks'
  | 'Database Tools'
  | 'Testing Tools'
  | 'Build Tools'
  | 'Package Managers'
  | 'Code Editors & IDEs'
  | 'Version Control'
  | 'DevOps & CI/CD'
  | 'Design Tools'
  | 'CSS Frameworks'
  | 'JavaScript Libraries'
  | 'Development Tools'
  | 'Deployment Platforms'
  | 'Monitoring & Analytics'
  | 'Security Tools'
  | 'Mobile Development'
  | 'Desktop Development'
  | 'API Tools'
  | 'Documentation Tools'

export interface ToolFilter {
  category?: WebDevCategory
  tags?: string[]
  difficulty?: string
  status?: string
  search?: string
  sortBy?: 'name' | 'popularity' | 'lastUpdated' | 'githubStars'
  sortOrder?: 'asc' | 'desc'
}
