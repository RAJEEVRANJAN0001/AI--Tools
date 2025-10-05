import { webDevTools } from '@/data/webDevToolsData'
import WebDevToolsDirectory from '@/components/WebDevToolsDirectory'

export default function WebDevToolsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-dark-900">
      <WebDevToolsDirectory tools={webDevTools} />
    </div>
  )
}

export const metadata = {
  title: 'Web Development Tools Encyclopedia - Complete Directory',
  description: 'Comprehensive guide to every major web development tool in use today. Find installation guides, usage examples, best practices, and real-world implementations.',
  keywords: 'web development, tools, frameworks, libraries, IDE, version control, testing, deployment',
}
