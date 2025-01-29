'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  {
    title: 'Getting Started',
    links: [
      { href: '/docs/installation', title: 'Installation' },
      { href: '/docs/configuration', title: 'Configuration' },
      { href: '/docs/usage', title: 'Usage' },
    ],
  },
  {
    title: 'Features',
    links: [
      { href: '/docs/features/code-snippets', title: 'Code Snippets' },
      { href: '/docs/features/syntax-highlighting', title: 'Syntax Highlighting' },
      { href: '/docs/features/sharing', title: 'Sharing' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="space-y-6">
      <div className="mb-4">
        <Link 
          href="/docs"
          className={cn(
            'block font-semibold',
            pathname === '/docs' ? 'text-primary' : 'text-foreground/60'
          )}
        >
          Documentation
        </Link>
      </div>
      {navigation.map((section) => (
        <div key={section.title}>
          <h3 className="font-semibold mb-2">{section.title}</h3>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'block text-sm transition-colors hover:text-foreground/80',
                    pathname === link.href
                      ? 'text-foreground font-medium'
                      : 'text-foreground/60'
                  )}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
