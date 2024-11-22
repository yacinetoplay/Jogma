"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { Logo } from './Logo'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleThemeChange = () => {
    // Add transitioning class
    document.body.classList.add('transitioning')
    
    // First transition to intermediate state
    setTimeout(() => {
      // Change theme
      setTheme(theme === 'dark' ? 'light' : 'dark')
      
      // Remove transitioning class after full transition
      setTimeout(() => {
        document.body.classList.remove('transitioning')
      }, 700) // Match the transition duration
    }, 350) // Half of the transition duration for the midpoint
  }

  return (
    <nav className="relative z-50 theme-transition">
      <div className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16 md:h-20 items-center">
            <div className="flex items-center gap-4 md:gap-12">
              <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
                <Logo />
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex md:space-x-1">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/services', label: 'Services' },
                  { href: '/our-apps', label: 'Our Apps' },
                  { href: '/contact', label: 'Contact' }
                ].map((link) => (
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

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleThemeChange}
                className="relative w-10 h-10 rounded-lg hover:bg-accent/50 overflow-hidden group theme-transition"
              >
                <div className="relative w-full h-full">
                  <Sun 
                    className={cn(
                      "h-[1.2rem] w-[1.2rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                      "transition-all duration-500 ease-spring",
                      "transform group-hover:scale-110",
                      theme === 'dark' 
                        ? 'rotate-[-120deg] scale-0 opacity-0' 
                        : 'rotate-0 scale-100 opacity-100'
                    )}
                  />
                  <Moon 
                    className={cn(
                      "h-[1.2rem] w-[1.2rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                      "transition-all duration-500 ease-spring",
                      "transform group-hover:scale-110",
                      theme === 'dark'
                        ? 'rotate-0 scale-100 opacity-100'
                        : 'rotate-[120deg] scale-0 opacity-0'
                    )}
                  />
                </div>
                <span className="sr-only">
                  {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                </span>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              "md:hidden",
              "absolute left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border",
              "transition-all duration-300 ease-in-out",
              isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            )}
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/our-apps', label: 'Our Apps' },
                { href: '/contact', label: 'Contact' }
              ].map((link) => (
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