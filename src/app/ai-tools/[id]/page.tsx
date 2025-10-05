import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import AIToolDetailPage from '@/components/AIToolDetailPage'
import { aiToolsData } from '@/data/aiToolsData'

type Props = {
  params: Promise<{ id: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const tool = aiToolsData.find(t => t.id === id)
  
  if (!tool) {
    return {
      title: 'AI Tool Not Found',
      description: 'The requested AI tool could not be found.'
    }
  }

  return {
    title: `${tool.name} - ${tool.company} | AI Tools Directory`,
    description: tool.description,
    keywords: tool.tags?.join(', '),
    openGraph: {
      title: `${tool.name} - ${tool.company}`,
      description: tool.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - ${tool.company}`,
      description: tool.description,
    },
  }
}

// Generate static params for all tools
export async function generateStaticParams() {
  return aiToolsData.map((tool) => ({
    id: tool.id,
  }))
}

export default async function AIToolPage({ params }: Props) {
  const { id } = await params
  const tool = aiToolsData.find(t => t.id === id)
  
  if (!tool) {
    notFound()
  }

  // Get related tools from the same category
  const relatedTools = aiToolsData
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3)

  return <AIToolDetailPage tool={tool} relatedTools={relatedTools} />
}
