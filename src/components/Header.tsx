'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, ExternalLink } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    'Large Language Models',
    'Code Generation',
    'AI Platforms',
    'Design Tools',
    'Writing Assistants',
    'Agent Frameworks',
    'Developer Tools'
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-600/95 backdrop-blur-sm border-b border-neutral-200 dark:border-dark-500 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-800 to-primary-500 dark:from-primary-dark-400 dark:to-primary-dark-300 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-bold text-xl text-neutral-900 dark:text-dark-50">AI Ecosystem Explorer</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI tools, models, and platforms..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className="text-neutral-600 dark:text-dark-300 hover:text-primary-800 dark:hover:text-primary-dark-300 transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
            <Link 
              href="/ai-tools" 
              className="text-neutral-600 dark:text-dark-300 hover:text-primary-800 dark:hover:text-primary-dark-300 transition-colors duration-200 font-medium"
            >
              AI Tools
            </Link>
            <Link 
              href="/browse" 
              className="text-neutral-600 dark:text-dark-300 hover:text-primary-800 dark:hover:text-primary-dark-300 transition-colors duration-200 font-medium"
            >
              Browse All
            </Link>
            <Link 
              href="/categories" 
              className="text-neutral-600 dark:text-dark-300 hover:text-primary-800 dark:hover:text-primary-dark-300 transition-colors duration-200 font-medium"
            >
              Categories
            </Link>
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-dark-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search AI tools..."
                className="pl-10 pr-4 py-2 bg-neutral-50 dark:bg-dark-800 border border-neutral-200 dark:border-dark-600 rounded-lg text-neutral-900 dark:text-dark-50 placeholder-neutral-500 dark:placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-dark-400 focus:border-transparent transition-all duration-200 w-64"
              />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-dark-300 hover:text-primary-800 dark:hover:text-primary-dark-300 hover:bg-neutral-100 dark:hover:bg-dark-700 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-dark-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI tools..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-dark-800 border border-neutral-200 dark:border-dark-600 rounded-lg text-neutral-900 dark:text-dark-50 placeholder-neutral-500 dark:placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-dark-400 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-50 dark:bg-dark-800 border-t border-neutral-200 dark:border-dark-600">
          <div className="px-4 py-2 space-y-1">
            <Link 
              href="/dashboard" 
              className="block px-4 py-2 text-neutral-700 dark:text-dark-300 hover:bg-neutral-100 dark:hover:bg-dark-700 hover:text-primary-800 dark:hover:text-primary-dark-300 rounded-lg transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/ai-tools" 
              className="block px-4 py-2 text-neutral-700 dark:text-dark-300 hover:bg-neutral-100 dark:hover:bg-dark-700 hover:text-primary-800 dark:hover:text-primary-dark-300 rounded-lg transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Tools
            </Link>
            <Link 
              href="/browse" 
              className="block px-4 py-2 text-neutral-700 dark:text-dark-300 hover:bg-neutral-100 dark:hover:bg-dark-700 hover:text-primary-800 dark:hover:text-primary-dark-300 rounded-lg transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse All Tools
            </Link>
            <Link 
              href="/categories" 
              className="block px-4 py-2 text-neutral-700 dark:text-dark-300 hover:bg-neutral-100 dark:hover:bg-dark-700 hover:text-primary-800 dark:hover:text-primary-dark-300 rounded-lg transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <div className="py-2">
              <h3 className="font-semibold text-neutral-900 dark:text-dark-50 mb-2">Quick Access</h3>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category.toLowerCase().replace(/ /g, '-')}`}
                  className="block px-4 py-2 text-sm text-neutral-700 dark:text-dark-300 hover:bg-neutral-100 dark:hover:bg-dark-700 hover:text-primary-800 dark:hover:text-primary-dark-300 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
