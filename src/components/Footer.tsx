"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'Our Apps', path: '/our-apps' },
  { name: 'Contact', path: '/contact' },
]

const creators = [
  { 
    name: 'Yacine Makhloufi', 
    url: 'https://your-portfolio-url.com',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    name: 'Rami Hergli', 
    url: 'https://your-portfolio-url.com',
    color: 'from-purple-500 to-pink-500'
  }
]

export function Footer() {
  const pathname = usePathname()

  return (
    <footer className="w-full border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Navigation */}
          <nav className="flex space-x-6">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm transition-colors hover:text-foreground ${
                  pathname === link.path
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="h-px w-24 bg-border" />

          {/* Credits */}
          <p className="text-sm text-muted-foreground text-center">
            Made with ❤️ by{' '}
            {creators.map((creator, index) => (
              <span key={creator.name}>
                <Link
                  href={creator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block font-medium transition-colors hover:text-foreground
                    bg-clip-text text-transparent bg-gradient-to-r ${creator.color}`}
                >
                  {creator.name}
                </Link>
                {index < creators.length - 1 && <span className="text-foreground"> & </span>}
              </span>
            ))}
          </p>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jogma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 