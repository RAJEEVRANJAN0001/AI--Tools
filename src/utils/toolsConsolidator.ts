import { AITool } from '@/types/aiTools'
import { aiToolsData } from '@/data/aiToolsData'
// import { chatbotTools } from '@/data/chatbotToolsData'
// Import other tool data files as needed

/**
 * Consolidates all tools from different data sources into a single array
 * This ensures we have one source of truth for all tools in the application
 */
export function getAllTools(): AITool[] {
  const allTools: AITool[] = []
  
  // Add main AI tools
  allTools.push(...aiToolsData)
  
  // Add chatbot tools (convert if needed to match AITool interface)
  // TODO: Fix chatbot tools data structure to match AITool interface
  // allTools.push(...chatbotTools)
  
  // Add any other tool categories here
  // allTools.push(...webDevToolsData) // if converted to AITool format
  // allTools.push(...designToolsData) // if they exist
  
  return allTools
}

/**
 * Get a specific tool by ID from all available tools
 */
export function getToolById(id: string): AITool | undefined {
  return getAllTools().find(tool => tool.id === id)
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: string): AITool[] {
  return getAllTools().filter(tool => 
    tool.category.toLowerCase() === category.toLowerCase()
  )
}

/**
 * Get related tools (same category, excluding current tool)
 */
export function getRelatedTools(toolId: string, limit: number = 3): AITool[] {
  const currentTool = getToolById(toolId)
  if (!currentTool) return []
  
  return getAllTools()
    .filter(tool => 
      tool.id !== toolId && 
      tool.category === currentTool.category
    )
    .slice(0, limit)
}

/**
 * Get all unique categories from all tools
 */
export function getAllCategories(): string[] {
  const categories = getAllTools().map(tool => tool.category)
  return Array.from(new Set(categories)).sort()
}

/**
 * Search tools by name, description, or tags
 */
export function searchTools(query: string): AITool[] {
  const searchTerm = query.toLowerCase()
  
  return getAllTools().filter(tool => 
    tool.name.toLowerCase().includes(searchTerm) ||
    tool.description.toLowerCase().includes(searchTerm) ||
    tool.longDescription?.toLowerCase().includes(searchTerm) ||
    tool.company.toLowerCase().includes(searchTerm) ||
    tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

/**
 * Get featured/popular tools
 */
export function getFeaturedTools(limit: number = 6): AITool[] {
  return getAllTools()
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit)
}

/**
 * Get tools statistics
 */
export function getToolsStats() {
  const allTools = getAllTools()
  const categories = getAllCategories()
  
  return {
    totalTools: allTools.length,
    totalCategories: categories.length,
    avgRating: allTools.reduce((sum, tool) => sum + (tool.rating || 0), 0) / allTools.length,
    freeTools: allTools.filter(tool => 
      tool.freeTrialAvailable || 
      tool.tags.some(tag => tag.toLowerCase().includes('free'))
    ).length
  }
}
