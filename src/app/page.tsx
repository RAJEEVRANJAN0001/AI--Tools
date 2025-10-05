import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedTools from '@/components/FeaturedTools'
import CategoryGrid from '@/components/CategoryGrid'
import Statistics from '@/components/Statistics'
import DailyUpdatesChart from '@/components/DailyUpdatesChart'
import Footer from '@/components/Footer'
import BackToTopButton from '@/components/BackToTopButton'
import NewsletterSection from '@/components/NewsletterSection'

// Dynamic imports for performance optimization
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
  </div>
)

// Enhanced SEO Metadata with better structure and additional properties
export const metadata: Metadata = {
  title: {
    default: 'AI Ecosystem Directory - Discover the Best AI Tools & Platforms',
    template: '%s | AI Ecosystem Directory'
  },
  description: 'Comprehensive directory of 500+ AI tools, platforms, and resources. Find the perfect AI solution for your needs with detailed reviews, pricing comparisons, and expert insights. Updated daily with the latest AI innovations.',
  keywords: [
    'AI tools',
    'artificial intelligence',
    'machine learning',
    'AI platforms',
    'AI directory',
    'LLM',
    'code generation',
    'design tools',
    'chatbots',
    'conversational AI',
    'AI automation',
    'GPT tools',
    'AI productivity',
    'business AI',
    'AI analytics',
    'computer vision',
    'natural language processing',
    'deep learning',
    'AI marketplace',
    'AI solutions'
  ].join(', '),
  authors: [{ name: 'AI Ecosystem Directory Team' }],
  creator: 'AI Ecosystem Directory',
  publisher: 'AI Ecosystem Directory',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ai-ecosystem-directory.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-ecosystem-directory.com',
    siteName: 'AI Ecosystem Directory',
    title: 'AI Ecosystem Directory - Discover the Best AI Tools & Platforms',
    description: 'Comprehensive directory of 500+ AI tools, platforms, and resources. Find the perfect AI solution for your needs with detailed reviews and pricing comparisons.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Ecosystem Directory - Discover the Best AI Tools',
      },
      {
        url: '/og-image-square.png',
        width: 1200,
        height: 1200,
        alt: 'AI Ecosystem Directory Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Ecosystem Directory - Discover the Best AI Tools & Platforms',
    description: 'Comprehensive directory of 500+ AI tools. Find the perfect AI solution with detailed reviews and pricing comparisons.',
    site: '@AIEcosystemDir',
    creator: '@AIEcosystemDir',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'AI Tools Directory',
}

export default function Home() {
  return (
    <>
      {/* Enhanced Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': 'https://ai-ecosystem-directory.com/#website',
                url: 'https://ai-ecosystem-directory.com',
                name: 'AI Ecosystem Directory',
                description: 'Comprehensive directory of AI tools, platforms, and resources',
                publisher: {
                  '@id': 'https://ai-ecosystem-directory.com/#organization'
                },
                potentialAction: {
                  '@type': 'SearchAction',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate: 'https://ai-ecosystem-directory.com/search?q={search_term_string}',
                  },
                  'query-input': 'required name=search_term_string',
                },
                inLanguage: 'en-US',
              },
              {
                '@type': 'Organization',
                '@id': 'https://ai-ecosystem-directory.com/#organization',
                name: 'AI Ecosystem Directory',
                description: 'The most comprehensive directory of AI tools and platforms',
                url: 'https://ai-ecosystem-directory.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://ai-ecosystem-directory.com/logo.png',
                  width: 400,
                  height: 400,
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'customer service',
                  availableLanguage: ['English'],
                },
                sameAs: [
                  'https://twitter.com/AIEcosystemDir',
                  'https://linkedin.com/company/ai-ecosystem-directory',
                  'https://github.com/ai-ecosystem-directory',
                ],
              },
              {
                '@type': 'WebPage',
                '@id': 'https://ai-ecosystem-directory.com/#webpage',
                url: 'https://ai-ecosystem-directory.com',
                name: 'AI Ecosystem Directory - Discover the Best AI Tools & Platforms',
                isPartOf: {
                  '@id': 'https://ai-ecosystem-directory.com/#website'
                },
                about: {
                  '@id': 'https://ai-ecosystem-directory.com/#organization'
                },
                description: 'Comprehensive directory of 500+ AI tools, platforms, and resources. Find the perfect AI solution for your needs.',
                breadcrumb: {
                  '@id': 'https://ai-ecosystem-directory.com/#breadcrumb'
                },
                inLanguage: 'en-US',
                potentialAction: {
                  '@type': 'ReadAction',
                  target: ['https://ai-ecosystem-directory.com']
                },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://ai-ecosystem-directory.com/#breadcrumb',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://ai-ecosystem-directory.com',
                  },
                ],
              },
              {
                '@type': 'ItemList',
                name: 'AI Tool Categories',
                description: 'Comprehensive list of AI tool categories available in our directory',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Chatbots & Conversational AI',
                    url: 'https://ai-ecosystem-directory.com/category/chatbots-conversational-ai',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Code Generation & Development',
                    url: 'https://ai-ecosystem-directory.com/category/code-generation',
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'Content Creation & Writing',
                    url: 'https://ai-ecosystem-directory.com/category/content-creation',
                  },
                  {
                    '@type': 'ListItem',
                    position: 4,
                    name: 'Design & Visual Creation',
                    url: 'https://ai-ecosystem-directory.com/category/design-visual',
                  },
                  {
                    '@type': 'ListItem',
                    position: 5,
                    name: 'Data Analysis & Insights',
                    url: 'https://ai-ecosystem-directory.com/category/data-analysis',
                  },
                  {
                    '@type': 'ListItem',
                    position: 6,
                    name: 'Productivity & Automation',
                    url: 'https://ai-ecosystem-directory.com/category/productivity-automation',
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://api.ai-ecosystem-directory.com" />

      <main className="min-h-screen bg-white dark:bg-dark-900 selection:bg-primary-100 dark:selection:bg-primary-dark-900 selection:text-primary-900 dark:selection:text-primary-dark-100">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200"
        >
          Skip to main content
        </a>

        {/* Header */}
        <Header />

        {/* Main Content */}
        <div id="main-content">
          {/* Hero Section */}
          <section 
            id="hero" 
            className="scroll-mt-20" 
            aria-labelledby="hero-heading"
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Hero />
            </Suspense>
          </section>

          {/* Statistics Section */}
          <section 
            id="statistics" 
            className="scroll-mt-20" 
            aria-labelledby="statistics-heading"
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Statistics />
            </Suspense>
          </section>

          {/* Daily Updates Chart Section */}
          <section 
            id="daily-updates" 
            className="scroll-mt-20" 
            aria-labelledby="daily-updates-heading"
          >
            <Suspense fallback={<LoadingSpinner />}>
              <DailyUpdatesChart />
            </Suspense>
          </section>

          {/* Featured AI Tools Section */}
          <section 
            id="featured-tools" 
            className="scroll-mt-20" 
            aria-labelledby="featured-tools-heading"
          >
            <div className="container mx-auto px-4 py-16">
              <div className="text-center mb-12">
                <h2 
                  id="featured-tools-heading" 
                  className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-dark-50 mb-4"
                >
                  Featured AI Tools
                </h2>
                <p className="text-lg text-neutral-600 dark:text-dark-400 max-w-2xl mx-auto">
                  Discover hand-picked AI tools that are leading innovation across industries
                </p>
              </div>
              <Suspense fallback={<LoadingSpinner />}>
                <FeaturedTools />
              </Suspense>
            </div>
          </section>

          {/* AI Categories Section */}
          <section 
            id="categories" 
            className="scroll-mt-20 bg-neutral-50 dark:bg-dark-800" 
            aria-labelledby="categories-heading"
          >
            <div className="container mx-auto px-4 py-16">
              <div className="text-center mb-12">
                <h2 
                  id="categories-heading" 
                  className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-dark-50 mb-4"
                >
                  Explore AI Categories
                </h2>
                <p className="text-lg text-neutral-600 dark:text-dark-400 max-w-2xl mx-auto">
                  Browse our comprehensive collection of AI tools organized by category and use case
                </p>
              </div>
              <Suspense fallback={<LoadingSpinner />}>
                <CategoryGrid />
              </Suspense>
            </div>
          </section>

          {/* Newsletter & CTA Section */}
          <section 
            id="newsletter" 
            className="scroll-mt-20" 
            aria-labelledby="newsletter-heading"
          >
            <Suspense fallback={<LoadingSpinner />}>
              <NewsletterSection />
            </Suspense>
          </section>
        </div>

        {/* Footer */}
        <Footer />

        {/* Back to Top Button */}
        <BackToTopButton />

        {/* Performance monitoring script placeholder */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Web Vitals monitoring
                if ('web-vital' in window) {
                  window.webVitals.getCLS(console.log);
                  window.webVitals.getFID(console.log);
                  window.webVitals.getFCP(console.log);
                  window.webVitals.getLCP(console.log);
                  window.webVitals.getTTFB(console.log);
                }
              `,
            }}
          />
        )}
      </main>
    </>
  )
}
