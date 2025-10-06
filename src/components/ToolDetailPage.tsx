'use client'

import React, { useState } from 'react'
import { WebDevTool } from '@/types/webDevTools'
import { formatDate } from '@/utils/dateFormatter'
import { 
  ExternalLink, 
  Github, 
  Star, 
  Download, 
  Calendar, 
  Code2,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react'

interface ToolDetailPageProps {
  tool: WebDevTool
}

export default function ToolDetailPage({ tool }: ToolDetailPageProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Stable': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Beta': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Deprecated': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-dark-50">{tool.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tool.difficulty)}`}>
                {tool.difficulty}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tool.status)}`}>
                {tool.status}
              </span>
            </div>
            
            <p className="text-lg text-neutral-600 dark:text-dark-300 mb-4">{tool.description}</p>
            <p className="text-neutral-700 dark:text-dark-200 leading-relaxed">{tool.longDescription}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {tool.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-primary-100 dark:bg-primary-dark-900 text-primary-800 dark:text-primary-dark-200 rounded-md text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="lg:w-80">
            <div className="bg-neutral-50 dark:bg-dark-700 rounded-xl p-6">
              <h3 className="font-semibold text-neutral-900 dark:text-dark-50 mb-4">Quick Info</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-dark-400">Creator:</span>
                  <span className="text-neutral-900 dark:text-dark-50 font-medium">{tool.creator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-dark-400">Version:</span>
                  <span className="text-neutral-900 dark:text-dark-50 font-medium">{tool.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-dark-400">License:</span>
                  <span className="text-neutral-900 dark:text-dark-50 font-medium">{tool.license}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-dark-400">Last Updated:</span>
                  <span className="text-neutral-900 dark:text-dark-50 font-medium">
                    {formatDate(tool.lastUpdated)}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <a 
                  href={tool.officialWebsite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Website
                </a>
                {tool.githubRepo && (
                  <a 
                    href={tool.githubRepo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-neutral-600 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popularity Metrics */}
      {tool.popularity && (
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Popularity & Metrics
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {tool.popularity.githubStars && (
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900 dark:text-dark-50">
                  {formatNumber(tool.popularity.githubStars)}
                </div>
                <div className="text-sm text-neutral-600 dark:text-dark-400">GitHub Stars</div>
              </div>
            )}
            
            {tool.popularity.npmDownloads && (
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900 dark:text-dark-50">
                  {formatNumber(tool.popularity.npmDownloads)}
                </div>
                <div className="text-sm text-neutral-600 dark:text-dark-400">NPM Downloads/Week</div>
              </div>
            )}
            
            {tool.popularity.stackOverflowQuestions && (
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900 dark:text-dark-50">
                  {formatNumber(tool.popularity.stackOverflowQuestions)}
                </div>
                <div className="text-sm text-neutral-600 dark:text-dark-400">Stack Overflow</div>
              </div>
            )}
            
            {tool.popularity.jobListings && (
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900 dark:text-dark-50">
                  {formatNumber(tool.popularity.jobListings)}
                </div>
                <div className="text-sm text-neutral-600 dark:text-dark-400">Job Listings</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Core Features */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-6 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" />
          Core Features & Capabilities
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Key Features</h3>
            <ul className="space-y-2">
              {tool.coreFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-700 dark:text-dark-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Unique Selling Points</h3>
            <ul className="space-y-2">
              {tool.uniqueSellingPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-700 dark:text-dark-200">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Installation & Setup */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-6 flex items-center gap-2">
          <Download className="w-6 h-6 text-blue-500" />
          Installation & Setup
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">System Requirements</h3>
            <ul className="space-y-2">
              {tool.systemRequirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-700 dark:text-dark-200">{req}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Prerequisites</h3>
            <ul className="space-y-2">
              {tool.prerequisites.map((prereq, index) => (
                <li key={index} className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-700 dark:text-dark-200">{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Installation Steps</h3>
          <div className="space-y-6">
            {tool.installationSteps.map((step, index) => (
              <div key={index} className="border border-neutral-200 dark:border-dark-600 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </span>
                  <h4 className="text-lg font-semibold text-neutral-900 dark:text-dark-50">{step.title}</h4>
                </div>
                <p className="text-neutral-700 dark:text-dark-200 mb-4">{step.description}</p>
                {step.code && (
                  <div className="relative">
                    <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{step.code}</code>
                    </pre>
                    <button 
                      onClick={() => copyToClipboard(step.code!, `install-${index}`)}
                      className="absolute top-2 right-2 p-2 bg-neutral-700 hover:bg-neutral-600 rounded-md transition-colors"
                    >
                      {copiedCode === `install-${index}` ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-neutral-300" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Guide */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-6 flex items-center gap-2">
          <Code2 className="w-6 h-6 text-purple-500" />
          Usage Guide
        </h2>
        
        {/* Common Commands */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Common Commands</h3>
          <div className="space-y-4">
            {tool.commonCommands.map((cmd, index) => (
              <div key={index} className="border border-neutral-200 dark:border-dark-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="bg-neutral-100 dark:bg-dark-700 px-2 py-1 rounded text-sm font-mono">
                    {cmd.command}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(cmd.example, `cmd-${index}`)}
                    className="p-1 hover:bg-neutral-100 dark:hover:bg-dark-700 rounded transition-colors"
                  >
                    {copiedCode === `cmd-${index}` ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-neutral-500" />
                    )}
                  </button>
                </div>
                <p className="text-neutral-700 dark:text-dark-200 text-sm mb-2">{cmd.description}</p>
                <code className="bg-neutral-900 text-neutral-100 px-3 py-1 rounded text-sm font-mono block">
                  {cmd.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          Use Cases & Real-World Examples
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Common Use Cases</h3>
            <div className="space-y-4">
              {tool.useCases.map((useCase, index) => (
                <div key={index} className="border border-neutral-200 dark:border-dark-600 rounded-lg p-4">
                  <h4 className="font-semibold text-neutral-900 dark:text-dark-50 mb-2">{useCase.title}</h4>
                  <p className="text-neutral-700 dark:text-dark-200 text-sm mb-3">{useCase.description}</p>
                  <div className="bg-neutral-50 dark:bg-dark-700 p-3 rounded text-sm">
                    <strong className="text-neutral-900 dark:text-dark-50">Scenario:</strong> {useCase.scenario}
                  </div>
                  <div className="mt-3">
                    <strong className="text-neutral-900 dark:text-dark-50 text-sm">Benefits:</strong>
                    <ul className="mt-1 space-y-1">
                      {useCase.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="text-neutral-700 dark:text-dark-200 text-sm flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Real-World Examples</h3>
            <div className="space-y-4">
              {tool.realWorldExamples.map((example, index) => (
                <div key={index} className="border border-neutral-200 dark:border-dark-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900 dark:text-dark-50">{example.projectName}</h4>
                    {example.url && (
                      <a 
                        href={example.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-dark-400 dark:hover:text-primary-dark-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  {example.company && (
                    <p className="text-neutral-600 dark:text-dark-400 text-sm mb-2">by {example.company}</p>
                  )}
                  <p className="text-neutral-700 dark:text-dark-200 text-sm mb-3">{example.description}</p>
                  <div>
                    <strong className="text-neutral-900 dark:text-dark-50 text-sm">Key Features:</strong>
                    <ul className="mt-1 space-y-1">
                      {example.keyFeatures.map((feature, fIndex) => (
                        <li key={fIndex} className="text-neutral-700 dark:text-dark-200 text-sm flex items-center gap-2">
                          <Star className="w-3 h-3 text-yellow-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices & Tips */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-green-500" />
          Best Practices & Tips
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Best Practices
              </h3>
              <ul className="space-y-2">
                {tool.bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-dark-200 text-sm">{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Common Pitfalls
              </h3>
              <ul className="space-y-2">
                {tool.commonPitfalls.map((pitfall, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-dark-200 text-sm">{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Performance Optimizations</h3>
              <ul className="space-y-2">
                {tool.performanceOptimizations.map((optimization, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-dark-200 text-sm">{optimization}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Security Considerations</h3>
              <ul className="space-y-2">
                {tool.securityConsiderations.map((consideration, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-dark-200 text-sm">{consideration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Troubleshooting */}
        {tool.troubleshooting.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Troubleshooting</h3>
            <div className="space-y-4">
              {tool.troubleshooting.map((tip, index) => (
                <div key={index} className="border border-neutral-200 dark:border-dark-600 rounded-lg p-4">
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Problem: {tip.problem}</h4>
                  <p className="text-neutral-700 dark:text-dark-200 text-sm mb-3">{tip.solution}</p>
                  {tip.code && (
                    <div className="relative">
                      <pre className="bg-neutral-900 text-neutral-100 p-3 rounded text-sm overflow-x-auto">
                        <code>{tip.code}</code>
                      </pre>
                      <button 
                        onClick={() => copyToClipboard(tip.code!, `trouble-${index}`)}
                        className="absolute top-2 right-2 p-1 bg-neutral-700 hover:bg-neutral-600 rounded transition-colors"
                      >
                        {copiedCode === `trouble-${index}` ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-neutral-300" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Resources & References */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-dark-50 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-purple-500" />
          Resources & References
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Official Resources</h3>
            <div className="space-y-3">
              <a 
                href={tool.officialDocs} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 border border-neutral-200 dark:border-dark-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-dark-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-900 dark:text-dark-50">Official Documentation</span>
                  <ExternalLink className="w-4 h-4 text-neutral-500" />
                </div>
              </a>
              
              {tool.tutorials.map((tutorial, index) => (
                <a 
                  key={index}
                  href={tutorial.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 border border-neutral-200 dark:border-dark-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-dark-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-neutral-900 dark:text-dark-50">{tutorial.title}</span>
                    <ExternalLink className="w-4 h-4 text-neutral-500" />
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-dark-400">
                    <span className="bg-neutral-100 dark:bg-dark-600 px-2 py-1 rounded">{tutorial.type}</span>
                    {tutorial.difficulty && (
                      <span className={`px-2 py-1 rounded ${getDifficultyColor(tutorial.difficulty)}`}>
                        {tutorial.difficulty}
                      </span>
                    )}
                  </div>
                  {tutorial.description && (
                    <p className="text-sm text-neutral-700 dark:text-dark-200 mt-2">{tutorial.description}</p>
                  )}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-50 mb-4">Community & Extensions</h3>
            <div className="space-y-3">
              {tool.communityResources.map((resource, index) => (
                <a 
                  key={index}
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 border border-neutral-200 dark:border-dark-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-dark-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-neutral-900 dark:text-dark-50">{resource.title}</span>
                    <ExternalLink className="w-4 h-4 text-neutral-500" />
                  </div>
                  <span className="text-sm bg-neutral-100 dark:bg-dark-600 px-2 py-1 rounded text-neutral-600 dark:text-dark-400">
                    {resource.type}
                  </span>
                  {resource.description && (
                    <p className="text-sm text-neutral-700 dark:text-dark-200 mt-2">{resource.description}</p>
                  )}
                </a>
              ))}
              
              {tool.extensions.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-neutral-900 dark:text-dark-50 mb-3">Popular Extensions</h4>
                  <div className="space-y-3">
                    {tool.extensions.map((extension, index) => (
                      <a 
                        key={index}
                        href={extension.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block p-3 border border-neutral-200 dark:border-dark-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-dark-700 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-neutral-900 dark:text-dark-50 text-sm">{extension.name}</span>
                          <ExternalLink className="w-3 h-3 text-neutral-500" />
                        </div>
                        <p className="text-xs text-neutral-700 dark:text-dark-200 mb-2">{extension.description}</p>
                        <span className="text-xs bg-neutral-100 dark:bg-dark-600 px-2 py-1 rounded text-neutral-600 dark:text-dark-400">
                          {extension.category}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
