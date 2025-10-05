import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 dark:bg-dark-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">AI Ecosystem Directory</h3>
            <p className="text-neutral-300 text-sm">
              Your comprehensive guide to the latest AI tools, platforms, and innovations. 
              Discover, compare, and choose the perfect AI solutions for your needs.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://twitter.com" 
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link 
                href="https://linkedin.com" 
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link 
                href="https://github.com" 
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="View our GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Explore</h4>
            <nav className="space-y-2">
              <Link 
                href="/ai-tools" 
                className="block text-neutral-300 hover:text-white transition-colors text-sm"
              >
                AI Tools
              </Link>
              <Link 
                href="/categories" 
                className="block text-neutral-300 hover:text-white transition-colors text-sm"
              >
                Categories
              </Link>
              <Link 
                href="/browse" 
                className="block text-neutral-300 hover:text-white transition-colors text-sm"
              >
                Browse All
              </Link>
              <Link 
                href="/webdev-tools" 
                className="block text-neutral-300 hover:text-white transition-colors text-sm"
              >
                Web Dev Tools
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Popular Categories</h4>
            <nav className="space-y-2">
              <Link 
                href="/categories/chatbots-conversational-ai" 
                className="block text-neutral-300 hover:text-white transition-colors text-sm"
              >
                Chatbots & AI
              </Link>
              <Link 
                href="/categories/code-generation" 
                className="block text-neutral-300 hover:text-white transition-colors text-sm"
              >
                Code Generation
              </Link>
              <Link 
                href="/categories/design-creative-tools" 
                className="block text-neutral-300 hover:text-white transition-colors text-sm"
              >
                Design Tools
              </Link>
              <Link 
                href="/categories/writing-assistants" 
                className="block text-neutral-300 hover:text-white transition-colors text-sm"
              >
                Writing Assistants
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <nav className="space-y-2">
              <Link 
                href="/about" 
                className="block text-neutral-300 hover:text-white transition-colors text-sm"
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="block text-neutral-300 hover:text-white transition-colors text-sm"
              >
                Contact
              </Link>
              <Link 
                href="/privacy" 
                className="block text-neutral-300 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="block text-neutral-300 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              © {currentYear} AI Ecosystem Directory. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link 
                href="/sitemap" 
                className="text-neutral-400 hover:text-white transition-colors text-sm"
              >
                Sitemap
              </Link>
              <Link 
                href="/rss" 
                className="text-neutral-400 hover:text-white transition-colors text-sm"
              >
                RSS
              </Link>
              <div className="text-neutral-400 text-sm">
                Made with ❤️ for the AI community
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer