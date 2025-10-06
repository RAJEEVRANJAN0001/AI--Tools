import Link from 'next/link'
import { ArrowLeft, TrendingUp, ExternalLink } from 'lucide-react'
import { getAllCategories } from '@/data/categoryData'

export const metadata = {
  title: 'AI Tool Categories - AI Tools Directory',
  description: 'Browse AI tools by category including Large Language Models, Code Generation, Design Tools, and more.',
  keywords: 'AI tools, categories, artificial intelligence, machine learning, productivity tools',
  openGraph: {
    title: 'AI Tool Categories - AI Tools Directory',
    description: 'Browse AI tools by category including Large Language Models, Code Generation, Design Tools, and more.',
    type: 'website',
  },
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-dark-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-dark-600 dark:to-primary-dark-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/ai-tools" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to AI Tools
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI Tool Categories
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 dark:text-primary-dark-100 max-w-4xl mx-auto leading-relaxed mb-6">
              Discover AI tools organized by category. From language models to design tools, find the perfect AI solution for your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-primary-200 dark:text-primary-dark-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>{categories.length} categories</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>{categories.reduce((sum, cat) => sum + cat.toolCount, 0)} tools total</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1">
                <div className="p-8">
                  {/* Category Icon and Info */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-4 bg-primary-100 dark:bg-primary-dark-800 rounded-2xl text-4xl group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-neutral-900 dark:text-dark-50">
                        {category.toolCount}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-dark-400">
                        tools
                      </div>
                    </div>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-dark-50 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 dark:text-dark-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {category.description}
                  </p>

                  {/* Examples */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-neutral-500 dark:text-dark-500 uppercase tracking-wider mb-2">
                      Popular Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(category.examples || []).slice(0, 3).map((example, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-neutral-100 dark:bg-dark-700 text-neutral-700 dark:text-dark-300 text-xs rounded-md"
                        >
                          {example}
                        </span>
                      ))}
                      {(category.examples || []).length > 3 && (
                        <span className="px-2 py-1 bg-neutral-100 dark:bg-dark-700 text-neutral-500 dark:text-dark-400 text-xs rounded-md">
                          +{(category.examples || []).length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-neutral-500 dark:text-dark-500 uppercase tracking-wider mb-2">
                      Use Cases
                    </h4>
                    <ul className="space-y-1">
                      {category.useCases.slice(0, 3).map((useCase, index) => (
                        <li key={index} className="text-xs text-neutral-600 dark:text-dark-400 flex items-start gap-2">
                          <span className="w-1 h-1 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trends */}
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-500 dark:text-dark-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Latest Trends
                    </h4>
                    <div className="text-xs text-neutral-600 dark:text-dark-400">
                      {category.trends.slice(0, 2).join(' • ')}
                    </div>
                  </div>

                  {/* Explore Button */}
                  <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-dark-600">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-dark-400 group-hover:text-primary-700 dark:group-hover:text-primary-dark-300 transition-colors">
                        Explore Category
                      </span>
                      <ExternalLink className="w-4 h-4 text-primary-600 dark:text-primary-dark-400 group-hover:text-primary-700 dark:group-hover:text-primary-dark-300 transition-colors group-hover:translate-x-1 transform duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Categories Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-dark-50 text-center mb-8">
            Most Popular Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories
              .sort((a, b) => b.toolCount - a.toolCount)
              .slice(0, 3)
              .map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-dark-900 dark:to-primary-dark-800 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-dark-50">
                          {category.name}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-dark-400">
                          {category.toolCount} tools available
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-dark-300 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
