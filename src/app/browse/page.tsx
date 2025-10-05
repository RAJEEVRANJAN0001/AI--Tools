import { Metadata } from 'next'
import ToolsNavigation from '@/components/ToolsNavigation'
import { getAllTools, getToolsStats } from '@/utils/toolsConsolidator'

export async function generateMetadata(): Promise<Metadata> {
  const stats = getToolsStats()
  
  return {
    title: `All AI Tools | ${stats.totalTools} Tools Across ${stats.totalCategories} Categories`,
    description: `Browse our comprehensive directory of ${stats.totalTools} AI tools across ${stats.totalCategories} categories. Find the perfect AI solution with detailed reviews, features, and use cases.`,
    keywords: [
      'AI tools directory',
      'artificial intelligence tools',
      'machine learning platforms',
      'AI software',
      'business automation',
      'productivity tools',
      'development tools',
      'creative AI tools'
    ].join(', '),
    openGraph: {
      title: `All AI Tools | ${stats.totalTools} Tools Directory`,
      description: `Browse our comprehensive directory of ${stats.totalTools} AI tools across ${stats.totalCategories} categories`,
      type: 'website',
      url: 'https://ai-ecosystem-directory.com/browse',
      images: [
        {
          url: `/api/og?title=All AI Tools&description=${stats.totalTools} Tools Directory&category=Directory`,
          width: 1200,
          height: 630,
          alt: 'AI Tools Directory'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `All AI Tools | ${stats.totalTools} Tools Directory`,
      description: `Browse our comprehensive directory of ${stats.totalTools} AI tools`
    },
    alternates: {
      canonical: 'https://ai-ecosystem-directory.com/browse'
    }
  }
}

export default function BrowseToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToolsNavigation />
      </div>
    </div>
  )
}
