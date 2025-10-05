'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export default function ToolsNavigation() {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-neutral-200 dark:border-dark-700 p-6">
      <nav className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-dark-400 mb-6">
        <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-dark-400 transition-colors">
          <Home className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-neutral-900 dark:text-dark-50 font-medium">Browse All Tools</span>
      </nav>
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-dark-50 mb-4">
          AI Tools Directory
        </h1>
        <p className="text-neutral-600 dark:text-dark-400 max-w-2xl mx-auto">
          Discover and explore our comprehensive collection of AI tools across all categories. 
          Find the perfect AI solution for your needs with detailed information about features, 
          pricing, and use cases.
        </p>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/ai-tools" className="group p-4 rounded-lg border border-neutral-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-dark-600 transition-colors">
          <h3 className="font-semibold text-neutral-900 dark:text-dark-50 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
            AI Tools
          </h3>
          <p className="text-sm text-neutral-600 dark:text-dark-400 mt-1">
            Browse AI-powered tools and platforms
          </p>
        </Link>
        
        <Link href="/webdev-tools" className="group p-4 rounded-lg border border-neutral-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-dark-600 transition-colors">
          <h3 className="font-semibold text-neutral-900 dark:text-dark-50 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
            Web Dev Tools
          </h3>
          <p className="text-sm text-neutral-600 dark:text-dark-400 mt-1">
            Development tools and frameworks
          </p>
        </Link>
        
        <Link href="/categories" className="group p-4 rounded-lg border border-neutral-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-dark-600 transition-colors">
          <h3 className="font-semibold text-neutral-900 dark:text-dark-50 group-hover:text-primary-600 dark:group-hover:text-primary-dark-400 transition-colors">
            Categories
          </h3>
          <p className="text-sm text-neutral-600 dark:text-dark-400 mt-1">
            Explore tools by category
          </p>
        </Link>
      </div>
    </div>
  )
}
