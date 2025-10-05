import { notFound } from 'next/navigation'
import CategoryPage from '@/components/CategoryPage'
import { getCategoryInfo, getToolsByCategory, categories } from '@/data/categoryData'

interface CategoryPageParams {
  params: Promise<{
    category: string
  }>
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageParams) {
  const { category } = await params
  const categoryInfo = getCategoryInfo(category)
  
  if (!categoryInfo) {
    return {
      title: 'Category Not Found',
      description: 'The requested AI tool category could not be found.'
    }
  }

  return {
    title: `${categoryInfo.name} - AI Tools Directory`,
    description: categoryInfo.description,
    keywords: [
      ...(categoryInfo.examples || []),
      ...categoryInfo.useCases,
      'AI tools',
      'artificial intelligence',
      categoryInfo.name.toLowerCase()
    ].join(', '),
    openGraph: {
      title: `${categoryInfo.name} - AI Tools Directory`,
      description: categoryInfo.description,
      type: 'website',
    },
  }
}

export default async function CategoryPageRoute({ params }: CategoryPageParams) {
  const { category } = await params
  const categoryInfo = getCategoryInfo(category)
  
  if (!categoryInfo) {
    notFound()
  }

  const tools = getToolsByCategory(categoryInfo.name)

  return <CategoryPage category={categoryInfo} tools={tools} />
}
