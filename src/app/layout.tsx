import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import Chatbot from '@/components/Chatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Ecosystem Explorer | Discover 500+ AI Tools & Platforms',
  description: 'Comprehensive directory of AI tools, platforms, and technologies. Explore GPT-4, Claude, Midjourney, and 500+ other AI solutions with detailed information, comparisons, and insights.',
  keywords: 'AI tools, artificial intelligence, machine learning, GPT-4, Claude, Midjourney, AI platforms, AI directory',
  authors: [{ name: 'AI Ecosystem Explorer Team' }],
  creator: 'AI Ecosystem Explorer',
  publisher: 'AI Ecosystem Explorer',
  openGraph: {
    title: 'AI Ecosystem Explorer | Discover 500+ AI Tools & Platforms',
    description: 'Comprehensive directory of AI tools, platforms, and technologies.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Ecosystem Explorer | Discover 500+ AI Tools & Platforms',
    description: 'Comprehensive directory of AI tools, platforms, and technologies.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-white dark:bg-dark-900 text-neutral-900 dark:text-dark-50 transition-colors duration-300`}>
        <ThemeProvider>
          {/* Skip navigation link for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-800 text-white px-4 py-2 rounded-md z-50"
          >
            Skip to main content
          </a>
          
          <main id="main-content">
            {children}
          </main>
          
          {/* Global Chatbot */}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}
