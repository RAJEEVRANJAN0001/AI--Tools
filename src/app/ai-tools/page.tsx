import { Metadata } from 'next'
import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTopButton from '@/components/BackToTopButton'
import AIToolsDirectory from '@/components/AIToolsDirectory'

export const metadata: Metadata = {
  title: 'AI Tools Directory | Browse 500+ AI Platforms & Solutions',
  description: 'Comprehensive directory of AI tools and platforms. Discover chatbots, code generators, design tools, writing assistants, and more. Compare features, pricing, and reviews.',
  keywords: 'AI tools directory, artificial intelligence platforms, AI software, machine learning tools, automation tools',
  openGraph: {
    title: 'AI Tools Directory | Browse 500+ AI Platforms & Solutions',
    description: 'Comprehensive directory of AI tools and platforms. Discover and compare the best AI solutions for your needs.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Directory | Browse 500+ AI Platforms & Solutions',
    description: 'Comprehensive directory of AI tools and platforms. Discover and compare the best AI solutions for your needs.',
  },
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    </div>
  )
}

export default function AIToolsPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white dark:bg-dark-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AI Tools Directory
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
                Discover, compare, and choose from 500+ AI tools and platforms. 
                Find the perfect AI solution for your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-primary-200">AI Tools</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-primary-200">Categories</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">Daily</div>
                  <div className="text-primary-200">Updates</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Tools Directory */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Suspense fallback={<LoadingSpinner />}>
              <AIToolsDirectory />
            </Suspense>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTopButton />
    </>
  )
}