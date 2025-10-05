import { AITool } from '@/types/aiTools'
import { aiToolsData } from '@/data/aiToolsData'

export interface CategoryInfo {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  toolCount: number
  examples?: string[]
  useCases: string[]
  trends: string[]
  featured?: boolean
  detailedInfo: {
    overview: string
    keyFeatures: string[]
    benefits: string[]
    challenges: string[]
    futureOutlook: string
    marketSize: string
    growthRate: string
  }
  topTools: {
    name: string
    description: string
    pricing: string
    users: string
    keyFeatures: string[]
  }[]
}

// Data structure for categories
export const categories: CategoryInfo[] = [
  {
    id: 'large-language-models',
    name: 'Large Language Models',
    slug: 'large-language-models',
    description: 'Advanced AI models capable of understanding and generating human-like text across various domains and languages.',
    icon: '🤖',
    toolCount: 15,
    examples: ['GPT-4', 'Claude 3.5 Sonnet', 'Gemini 2.5 Pro', 'PaLM 2'],
    useCases: [
      'Content creation and writing assistance',
      'Code generation and debugging',
      'Language translation and localization',
      'Question answering and research',
      'Creative writing and storytelling',
      'Business communication and emails',
      'Document analysis and summarization',
      'Educational tutoring and explanation'
    ],
    trends: [
      'Multimodal capabilities (text, image, audio)',
      'Longer context windows (1M+ tokens)',
      'Improved reasoning and mathematical abilities',
      'Real-time processing and streaming',
      'Domain-specific fine-tuning',
      'Reduced hallucination rates',
      'Better factual accuracy',
      'Enhanced code understanding'
    ],
    featured: true,
    detailedInfo: {
      overview: 'Large Language Models represent the pinnacle of natural language processing technology. These sophisticated AI systems can understand context, generate human-like text, and perform complex reasoning tasks across multiple domains. They serve as the foundation for most modern AI applications.',
      keyFeatures: [
        'Human-like text generation',
        'Multi-language support',
        'Complex reasoning capabilities',
        'Code generation and debugging',
        'Document analysis and summarization',
        'Creative writing assistance',
        'Real-time conversation abilities',
        'Context-aware responses'
      ],
      benefits: [
        'Dramatically improved productivity in writing tasks',
        'Accessible AI capabilities for non-technical users',
        'Multilingual communication support',
        'Enhanced creativity and ideation',
        'Automated content generation at scale',
        'Intelligent research and analysis assistance'
      ],
      challenges: [
        'Hallucination and factual accuracy issues',
        'Potential bias in generated content',
        'High computational requirements',
        'Privacy and data security concerns',
        'Dependency on training data quality',
        'Need for human oversight and validation'
      ],
      futureOutlook: 'The future of LLMs includes even larger context windows, multimodal capabilities, improved factual accuracy, and specialized models for specific domains. We expect to see more efficient architectures and better integration with external knowledge sources.',
      marketSize: '$7.2B',
      growthRate: '34% CAGR'
    },
    topTools: [
      {
        name: 'GPT-4o',
        description: 'OpenAI\'s most advanced multimodal model with exceptional reasoning capabilities.',
        pricing: '$20/month',
        users: '100M+',
        keyFeatures: ['Multimodal input', 'Advanced reasoning', 'Code generation', 'Real-time processing']
      },
      {
        name: 'Claude 3.5 Sonnet',
        description: 'Anthropic\'s highly capable model with strong safety features and reasoning.',
        pricing: '$20/month',
        users: '10M+',
        keyFeatures: ['Constitutional AI', 'Long context', 'Ethical reasoning', 'Code analysis']
      },
      {
        name: 'Gemini Pro',
        description: 'Google\'s flagship model with excellent integration across Google services.',
        pricing: '$20/month',
        users: '50M+',
        keyFeatures: ['Multimodal capabilities', 'Google integration', 'Real-time information', 'Multiple languages']
      }
    ]
  },
  {
    id: 'code-generation',
    name: 'Code Generation',
    slug: 'code-generation',
    description: 'AI-powered tools that assist developers in writing, debugging, and optimizing code across multiple programming languages.',
    icon: '💻',
    toolCount: 28,
    examples: ['GitHub Copilot', 'Cursor', 'Tabnine', 'CodeWhisperer'],
    useCases: [
      'Code completion and suggestions',
      'Bug detection and fixing',
      'Code refactoring and optimization',
      'Documentation generation',
      'Test case creation',
      'API integration assistance',
      'Database query generation',
      'Code translation between languages'
    ],
    trends: [
      'IDE integration improvements',
      'Context-aware code suggestions',
      'Multi-language support expansion',
      'Real-time collaboration features',
      'Security vulnerability detection',
      'Performance optimization suggestions',
      'Natural language to code conversion',
      'Code review automation'
    ],
    featured: true,
    detailedInfo: {
      overview: 'AI-powered code generation tools are revolutionizing software development by providing intelligent assistance throughout the coding process. These tools leverage large language models trained on vast code repositories to understand programming patterns and generate contextually relevant code suggestions.',
      keyFeatures: [
        'Intelligent code completion',
        'Multi-language programming support',
        'Real-time error detection',
        'Automated refactoring suggestions',
        'Documentation generation',
        'Test case creation',
        'Code optimization recommendations',
        'Natural language to code conversion'
      ],
      benefits: [
        'Significantly faster development cycles',
        'Reduced coding errors and bugs',
        'Improved code quality and consistency',
        'Enhanced learning for new developers',
        'Automated routine coding tasks',
        'Better documentation practices'
      ],
      challenges: [
        'Code quality and security concerns',
        'Over-dependence on AI suggestions',
        'License and copyright issues',
        'Need for human code review',
        'Potential introduction of vulnerabilities',
        'Learning curve for effective usage'
      ],
      futureOutlook: 'The future of AI-powered coding includes more sophisticated understanding of business logic, automated testing, and end-to-end application development. We expect to see AI agents capable of building complete applications from natural language descriptions.',
      marketSize: '$2.3B',
      growthRate: '45% CAGR'
    },
    topTools: [
      {
        name: 'GitHub Copilot',
        description: 'AI pair programmer that suggests code and entire functions in real-time.',
        pricing: '$10/month',
        users: '1M+',
        keyFeatures: ['Real-time suggestions', 'Multi-language support', 'Context awareness', 'IDE integration']
      },
      {
        name: 'Cursor',
        description: 'AI-first code editor with powerful code generation and editing capabilities.',
        pricing: '$20/month',
        users: '500K+',
        keyFeatures: ['AI chat interface', 'Code refactoring', 'Multi-file editing', 'Smart completions']
      },
      {
        name: 'Tabnine',
        description: 'AI assistant for software developers with personalized code completions.',
        pricing: '$12/month',
        users: '1M+',
        keyFeatures: ['Personalized suggestions', 'Code privacy', 'Team learning', 'Multiple IDEs']
      }
    ]
  },
  {
    id: 'design-tools',
    name: 'Design Tools',
    slug: 'design-tools',
    description: 'AI-powered design platforms that automate creative processes and enhance visual content creation.',
    icon: '🎨',
    toolCount: 35,
    examples: ['Figma AI', 'Adobe Firefly', 'Canva AI', 'Midjourney'],
    useCases: [
      'Automated layout generation',
      'Brand identity creation',
      'UI/UX design assistance',
      'Image enhancement and editing',
      'Logo and graphics generation',
      'Color palette suggestions',
      'Typography recommendations',
      'Responsive design optimization'
    ],
    trends: [
      'AI-powered design systems',
      'Automated A/B testing for designs',
      'Real-time collaboration features',
      'Brand consistency enforcement',
      'Accessibility optimization',
      'Cross-platform design sync',
      'Voice-controlled design',
      'Generative design exploration'
    ],
    featured: true,
    detailedInfo: {
      overview: 'AI design tools are transforming the creative industry by automating repetitive tasks and enhancing creative workflows. These platforms combine machine learning with design principles to help both professional designers and non-designers create compelling visual content.',
      keyFeatures: [
        'Automated design generation',
        'Smart layout suggestions',
        'Brand consistency tools',
        'Color and typography AI',
        'Asset optimization',
        'Template customization',
        'Real-time collaboration',
        'Export automation'
      ],
      benefits: [
        'Faster design iteration cycles',
        'Consistent brand application',
        'Accessible design for non-designers',
        'Automated asset optimization',
        'Reduced design costs',
        'Enhanced creative exploration'
      ],
      challenges: [
        'Maintaining design uniqueness',
        'Balancing automation with creativity',
        'Learning curve for AI tools',
        'Quality control requirements',
        'Brand guideline compliance',
        'Client acceptance of AI-generated designs'
      ],
      futureOutlook: 'The future of AI design tools includes more sophisticated understanding of design principles, automated user testing, and seamless integration between design and development workflows. We expect to see AI that can create entire design systems and adapt designs for different contexts automatically.',
      marketSize: '$1.8B',
      growthRate: '52% CAGR'
    },
    topTools: [
      {
        name: 'Figma AI',
        description: 'AI-powered features within the popular design platform for enhanced productivity.',
        pricing: '$15/month',
        users: '4M+',
        keyFeatures: ['Auto-layout', 'Design suggestions', 'Component generation', 'Accessibility checks']
      },
      {
        name: 'Adobe Firefly',
        description: 'Creative generative AI for text effects, color variations, and generative fills.',
        pricing: '$23/month',
        users: '25M+',
        keyFeatures: ['Text to image', 'Generative fill', 'Text effects', 'Style matching']
      },
      {
        name: 'Canva AI',
        description: 'AI-powered design assistance with magic resize, background removal, and more.',
        pricing: '$15/month',
        users: '135M+',
        keyFeatures: ['Magic resize', 'Background removal', 'Brand kit', 'Template generation']
      }
    ]
  },
  {
    id: 'chatbots-conversational-ai',
    name: 'Chatbots & Conversational AI',
    slug: 'chatbots-conversational-ai',
    description: 'Intelligent chatbot platforms and conversational interfaces for customer service and engagement.',
    icon: '💬',
    toolCount: 14,
    examples: ['Dialogflow', 'Rasa', 'Microsoft Bot Framework', 'Botpress'],
    useCases: [
      'Customer support automation',
      'Lead generation and qualification',
      'E-commerce shopping assistance',
      'Educational tutoring and Q&A',
      'Healthcare information and triage',
      'Banking and financial services',
      'Travel planning and booking',
      'HR and employee assistance',
      'Social media marketing automation',
      'FAQ automation and deflection',
      'Appointment scheduling',
      'Multi-language customer service'
    ],
    trends: [
      'LLM integration (ChatGPT, Claude)',
      'Voice-enabled interactions',
      'Multimodal conversation capabilities',
      'Emotional intelligence integration',
      'Seamless human handoff',
      'Personalization and memory',
      'Industry-specific specialization',
      'Real-time language translation',
      'Integration with IoT devices',
      'Predictive response suggestions',
      'No-code bot development',
      'Advanced analytics and insights'
    ],
    featured: true,
    detailedInfo: {
      overview: 'Chatbots and conversational AI represent a fundamental shift in how businesses interact with customers and users. Modern platforms integrate advanced LLMs like ChatGPT and Claude, providing sophisticated natural language understanding with 24/7 availability, instant responses, and scalable customer service. These systems continuously learn from interactions to improve effectiveness, with enterprise-grade solutions processing billions of messages globally.',
      keyFeatures: [
        'Advanced natural language processing',
        'Multi-turn conversation handling',
        'Intent recognition and routing',
        'Contextual memory retention',
        'Sentiment analysis and emotion detection',
        'Multi-channel deployment (web, mobile, social)',
        'Real-time analytics and reporting',
        'Seamless human handoff capabilities',
        'LLM integration (GPT-4, Claude, Gemini)',
        'Voice and audio processing',
        'Custom personality development',
        'Enterprise security and compliance'
      ],
      benefits: [
        '24/7 customer service availability',
        'Reduced operational costs (up to 30% cost savings)',
        'Instant response times (< 1 second)',
        'Scalable customer support for millions of users',
        'Consistent service quality across channels',
        'Multilingual support (100+ languages)',
        'Automated ticket deflection (33% resolution rate)',
        'Enhanced customer satisfaction scores',
        'Improved agent productivity with AI assistance',
        'Data-driven insights from conversation analytics'
      ],
      challenges: [
        'Understanding complex, multi-intent queries',
        'Maintaining conversation context across sessions',
        'Handling emotional and sensitive situations',
        'Privacy and data security compliance',
        'Integration with legacy systems and databases',
        'Balancing automation with human touch',
        'Training and maintaining conversational flows',
        'Managing conversation quality at scale',
        'Avoiding bias in AI responses',
        'Cultural sensitivity across global deployments'
      ],
      futureOutlook: 'The future of conversational AI includes more human-like interactions with advanced emotional intelligence, seamless integration across all customer touchpoints, and proactive conversation capabilities. We expect to see AI agents capable of handling complex multi-step processes, providing truly personalized experiences, and collaborating with human agents in real-time. Integration with AR/VR environments and IoT devices will create ambient conversational experiences.',
      marketSize: '$2.8B',
      growthRate: '89% CAGR'
    },
    topTools: [
      {
        name: 'Dialogflow',
        description: 'Google\'s flagship conversational AI platform with sophisticated NLP capabilities and both ES and CX editions for enterprise deployment.',
        pricing: 'Free tier + $0.002/request',
        users: '1.5M+',
        keyFeatures: ['Google AI integration', 'Multi-platform deployment', 'Voice and text interactions', 'Webhook integration']
      },
      {
        name: 'Rasa',
        description: 'Open-source conversational AI framework with complete data control, supporting 100+ languages and enterprise deployment.',
        pricing: 'Open Source + Enterprise',
        users: '500K+',
        keyFeatures: ['Complete data control', 'Custom NLU pipeline', 'On-premise deployment', 'Contextual conversations']
      },
      {
        name: 'Microsoft Bot Framework',
        description: 'Comprehensive enterprise platform for building intelligent bots with deep Azure ecosystem integration.',
        pricing: 'Free + $0.50/1000 messages',
        users: '200K+',
        keyFeatures: ['Azure integration', 'Enterprise security', 'Multi-channel deployment', 'Bot Builder SDK']
      },
      {
        name: 'Botpress',
        description: 'Extensible conversational AI platform with latest LLM integration, processing 1B+ messages with military-grade security.',
        pricing: 'Free + $495/month Team',
        users: '750K+',
        keyFeatures: ['Latest LLM engines', 'Visual development', '100+ languages', 'Enterprise security']
      },
      {
        name: 'Intercom Resolution Bot',
        description: 'AI-powered support bot with hyper-personalized responses, automatically resolving 33% of customer questions.',
        pricing: 'Add-on pricing',
        users: '25K+',
        keyFeatures: ['Predictive responses', 'Hyper-personalization', 'Multi-language support', 'Auto-escalation']
      },
      {
        name: 'Zendesk Answer Bot',
        description: 'ML-powered chatbot integrated with Zendesk ecosystem for article suggestions and ticket deflection.',
        pricing: 'Zendesk Suite add-on',
        users: '100K+',
        keyFeatures: ['Knowledge base integration', 'ML article suggestions', 'Ticket deflection', 'Agent assistance']
      },
      {
        name: 'ChatGPT API Integration',
        description: 'Integration platform for adding ChatGPT conversational AI capabilities with state-of-the-art language understanding.',
        pricing: '$0.002/1K tokens (GPT-3.5)',
        users: '100M+',
        keyFeatures: ['Advanced language model', 'Function calling', 'Streaming responses', 'Custom instructions']
      },
      {
        name: 'ManyChat',
        description: 'Marketing automation platform specializing in Facebook Messenger, Instagram, and SMS chatbot campaigns.',
        pricing: 'Free + $15/month Pro',
        users: '1M+',
        keyFeatures: ['Social media integration', 'Marketing automation', 'E-commerce tools', 'Broadcasting']
      },
      {
        name: 'Tidio',
        description: 'All-in-one customer service platform combining AI chatbots (Lyro) with live chat functionality.',
        pricing: 'Free + $24.17/month',
        users: '300K+',
        keyFeatures: ['AI + live chat', 'E-commerce integrations', 'Visitor tracking', 'Proactive messaging']
      },
      {
        name: 'TARS',
        description: 'Conversational AI platform focused on lead generation with extensive template library and white-label options.',
        pricing: 'Free + $99/month Pro',
        users: '50K+',
        keyFeatures: ['Lead generation focus', 'Template library', 'White-label options', 'Conversion optimization']
      },
      {
        name: 'Kommunicate',
        description: 'Customer service automation platform with ChatGPT integration and seamless human-bot collaboration.',
        pricing: 'Free + $40/month Growth',
        users: '30K+',
        keyFeatures: ['ChatGPT integration', 'Human-bot handoff', 'Team collaboration', 'Multi-channel deployment']
      },
      {
        name: 'Pandorabots',
        description: 'AI chatbot platform using AIML technology for custom personality development and advanced conversation training.',
        pricing: 'Free + $19/month',
        users: '100K+',
        keyFeatures: ['AIML technology', 'Custom personalities', 'Voice integration', 'Conversation logs']
      },
      {
        name: 'SendPulse Chatbots',
        description: 'Multi-channel chatbot platform with AI integration for marketing automation across Telegram, WhatsApp, and Instagram.',
        pricing: 'Free + $6.40/month',
        users: '150K+',
        keyFeatures: ['Multi-channel bots', 'AI model integration', 'Marketing automation', 'Voice recognition']
      },
      {
        name: 'Chatfuel',
        description: 'No-code chatbot platform specializing in Facebook Messenger and Instagram automation for marketing and engagement.',
        pricing: 'Free + $79/month Pro',
        users: '500K+',
        keyFeatures: ['No-code development', 'Social media specialization', 'Broadcasting', 'E-commerce tools']
      }
    ]
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    slug: 'data-analysis',
    description: 'AI-powered platforms that transform raw data into actionable insights through advanced analytics and visualization.',
    icon: '📊',
    toolCount: 43,
    examples: ['Tableau AI', 'Power BI AI', 'DataRobot', 'H2O.ai'],
    useCases: [
      'Business intelligence and reporting',
      'Predictive analytics and forecasting',
      'Customer behavior analysis',
      'Financial risk assessment',
      'Market trend identification',
      'Operational efficiency optimization',
      'Fraud detection and prevention',
      'Supply chain optimization'
    ],
    trends: [
      'Natural language query interfaces',
      'Automated insight generation',
      'Real-time analytics processing',
      'Self-service analytics platforms',
      'Advanced data visualization',
      'Machine learning integration',
      'Cloud-based analytics solutions',
      'Collaborative data exploration'
    ],
    featured: true,
    detailedInfo: {
      overview: 'AI-powered data analysis tools democratize data science by making advanced analytics accessible to business users without technical expertise. These platforms automatically identify patterns, generate insights, and create visualizations that drive data-informed decision making.',
      keyFeatures: [
        'Automated data preparation',
        'Advanced statistical analysis',
        'Machine learning model building',
        'Interactive data visualization',
        'Natural language querying',
        'Collaborative analytics',
        'Real-time data processing',
        'Predictive modeling capabilities'
      ],
      benefits: [
        'Faster time to insights',
        'Democratized data access',
        'Improved decision accuracy',
        'Reduced analysis costs',
        'Automated reporting capabilities',
        'Enhanced data literacy across organizations'
      ],
      challenges: [
        'Data quality and governance',
        'Integration with existing systems',
        'User adoption and training',
        'Ensuring data privacy compliance',
        'Managing complex data sources',
        'Interpreting AI-generated insights correctly'
      ],
      futureOutlook: 'The future of AI-powered data analysis includes fully automated insight generation, conversational analytics interfaces, and predictive capabilities that anticipate business needs. We expect to see AI agents that can proactively identify opportunities and risks in real-time.',
      marketSize: '$3.1B',
      growthRate: '76% CAGR'
    },
    topTools: [
      {
        name: 'Tableau AI',
        description: 'Advanced analytics platform with AI-powered insights and natural language queries.',
        pricing: '$75/month',
        users: '50K+',
        keyFeatures: ['Natural language queries', 'Automated insights', 'Advanced visualizations', 'Enterprise integration']
      },
      {
        name: 'DataRobot',
        description: 'Automated machine learning platform for building and deploying predictive models.',
        pricing: 'Custom pricing',
        users: '500+',
        keyFeatures: ['AutoML capabilities', 'Model deployment', 'Feature engineering', 'MLOps integration']
      },
      {
        name: 'H2O.ai',
        description: 'Open-source machine learning platform with automated feature engineering.',
        pricing: 'Open Source',
        users: '20K+',
        keyFeatures: ['AutoML', 'Model interpretability', 'Scalable processing', 'Enterprise features']
      }
    ]
  },
  {
    id: 'agent-frameworks',
    name: 'Agent Frameworks',
    slug: 'agent-frameworks',
    description: 'Autonomous AI agents that can reason, plan, and execute complex tasks with minimal human intervention.',
    icon: '🤖',
    toolCount: 42,
    featured: true,
    detailedInfo: {
      overview: 'Agent frameworks represent the cutting edge of AI development, creating systems that can autonomously handle complex, multi-step tasks. These frameworks enable AI agents to perceive their environment, make decisions, and take actions to achieve specific goals.',
      keyFeatures: [
        'Autonomous task execution',
        'Multi-step reasoning capabilities',
        'Tool integration and API usage',
        'Goal-oriented behavior',
        'Learning from feedback',
        'Human-AI collaboration interfaces'
      ],
      benefits: [
        'Reduced manual intervention in complex workflows',
        'Improved efficiency in repetitive tasks',
        'Enhanced problem-solving capabilities',
        'Scalable automation solutions',
        '24/7 operational capability'
      ],
      challenges: [
        'Ensuring reliable and safe autonomous behavior',
        'Managing complex decision-making processes',
        'Balancing autonomy with human oversight',
        'Handling edge cases and unexpected scenarios'
      ],
      futureOutlook: 'Agent frameworks are expected to become increasingly sophisticated, with better reasoning capabilities and more seamless integration with existing systems. The future will likely see specialized agents for different domains working together in coordinated teams.',
      marketSize: '$1.2B',
      growthRate: '67% CAGR'
    },
    topTools: [
      {
        name: 'AutoGPT',
        description: 'Autonomous AI agent that can break down goals into sub-tasks and execute them independently.',
        pricing: 'Open Source',
        users: '180K+',
        keyFeatures: ['Task decomposition', 'Memory management', 'Tool usage', 'Web browsing']
      },
      {
        name: 'LangChain',
        description: 'Framework for developing applications with language models that can reason and take action.',
        pricing: 'Open Source',
        users: '500K+',
        keyFeatures: ['Chain composition', 'Memory systems', 'Agent execution', 'Tool integration']
      },
      {
        name: 'CrewAI',
        description: 'Multi-agent framework for orchestrating teams of AI agents working on complex tasks.',
        pricing: 'Open Source',
        users: '75K+',
        keyFeatures: ['Multi-agent coordination', 'Role-based agents', 'Task delegation', 'Collaborative planning']
      }
    ],
    useCases: [
      'Automated task execution',
      'Multi-step problem solving',
      'Data analysis and research',
      'Customer service automation',
      'Content planning and creation',
      'System integration and monitoring'
    ],
    trends: [
      'Goal-oriented task completion',
      'Multi-tool integration',
      'Self-improving capabilities',
      'Human-AI collaboration',
      'Ethical decision making',
      'Domain-specific specialization'
    ]
  }
]

// Helper functions
export function getToolsByCategory(categoryName: string): AITool[] {
  return aiToolsData.filter(tool => tool.category === categoryName)
}

export function getCategoryInfo(slug: string): CategoryInfo | undefined {
  const category = categories.find(c => c.slug === slug)
  if (!category) return undefined

  // Update tool count with actual data
  const actualToolCount = getToolsByCategory(category.name).length
  return {
    ...category,
    toolCount: actualToolCount
  }
}

export function getAllCategories(): CategoryInfo[] {
  return categories.map(category => ({
    ...category,
    toolCount: getToolsByCategory(category.name).length
  }))
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find(category => category.slug === slug)
}

export function getFeaturedCategories(): CategoryInfo[] {
  return categories.filter(category => category.featured)
}

export function getCategoryStats() {
  return {
    totalCategories: categories.length,
    totalTools: categories.reduce((sum, cat) => sum + cat.toolCount, 0),
    fastestGrowingCategory: categories.reduce((prev, current) => 
      (parseFloat(current.detailedInfo.growthRate) > parseFloat(prev.detailedInfo.growthRate)) ? current : prev
    )
  }
}
