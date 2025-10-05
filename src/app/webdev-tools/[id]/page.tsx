import { webDevTools } from '@/data/webDevToolsData'
import ToolDetailPage from '@/components/ToolDetailPage'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function WebDevToolPage({ params }: PageProps) {
  const { id } = await params
  const tool = webDevTools.find(t => t.id === id)

  if (!tool) {
    notFound()
  }

  return <ToolDetailPage tool={tool} />
}

// Generate static paths for all tools
export async function generateStaticParams() {
  return webDevTools.map((tool) => ({
    id: tool.id,
  }))
}

// Generate metadata for each tool page
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const tool = webDevTools.find(t => t.id === id)

  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The requested web development tool was not found.'
    }
  }

  return {
    title: `${tool.name} - Web Development Tool Guide`,
    description: tool.description,
    keywords: tool.tags.join(', '),
    openGraph: {
      title: `${tool.name} - Complete Guide`,
      description: tool.description,
      type: 'article',
    }
  }
}
