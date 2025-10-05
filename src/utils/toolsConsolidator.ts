import { AITool } from '@/types/aiTools'
import { aiToolsData } from '@/data/aiToolsData'

export function getAllTools(): AITool[] {
  return aiToolsData
}

export function getToolsByCategory(category: string): AITool[] {
  return getAllTools().filter(tool => tool.category === category)
}

export function getToolById(id: string): AITool | undefined {
  return getAllTools().find(tool => tool.id === id)
}

export function searchTools(query: string): AITool[] {
  if (!query.trim()) {
    return getAllTools()
  }
  
  const searchTerm = query.toLowerCase()
  
  return getAllTools().filter(tool => {
    return (
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.company?.toLowerCase().includes(searchTerm)
    )
  })
}

export function getFeaturedTools(limit: number = 6): AITool[] {
  return getAllTools()
    .sort((a, b) => {
      const aPopularity = a.popularity?.trendingScore || 0
      const bPopularity = b.popularity?.trendingScore || 0
      return bPopularity - aPopularity
    })
    .slice(0, limit)
}

export function getToolStatistics() {
  const allTools = getAllTools()
  const freeToolsCount = allTools.filter(tool => 
    tool.freeTrialAvailable || tool.pricing.toLowerCase().includes('free')
  ).length
  
  return {
    totalTools: allTools.length,
    totalCategories: new Set(allTools.map(tool => tool.category)).size,
    freeTools: freeToolsCount,
    avgRating: 4.2 // placeholder since ratings aren't available in current data structure
  }
}

export function getAllCategories() {
  const allTools = getAllTools()
  const categories = new Set(allTools.map(tool => tool.category))
  return Array.from(categories).map(category => ({
    name: category,
    count: allTools.filter(tool => tool.category === category).length
  }))
}

export function getToolsStats() {
  return getToolStatistics()
}
