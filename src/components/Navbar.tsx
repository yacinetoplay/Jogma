"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { Logo } from './Logo'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/our-apps', label: 'Our Apps' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <nav className="relative z-50">
      {/* Gradient border effect */}
      <div className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      
      {/* Navbar content */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-20">
            {/* Logo and links container */}
            <div className="flex items-center gap-12">
              <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
                <Logo />
              </Link>
              {/* Desktop Navigation */}
              <div className="hidden sm:flex sm:space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      "hover:bg-accent/50 hover:text-accent-foreground",
                      pathname === link.href && [
                        "text-foreground",
                        "after:absolute after:bottom-0 after:left-2 after:right-2",
                        "after:h-[2px] after:bg-gradient-to-r after:from-violet-500 after:to-indigo-500"
                      ],
                      pathname !== link.href && "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Theme toggle and mobile menu button */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative w-10 h-10 rounded-lg hover:bg-accent/50"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              "sm:hidden",
              "absolute left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border",
              "transition-all duration-300 ease-in-out",
              isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            )}
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "block px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    "hover:bg-accent/50 hover:text-accent-foreground",
                    pathname === link.href
                      ? "text-foreground bg-accent/50"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}