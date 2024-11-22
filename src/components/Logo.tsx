"use client"

import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function Logo() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [color, setColor] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setColor(prev => prev === 0 ? 1 : 0)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center font-black text-3xl tracking-tighter">
        <span className="text-foreground">Jogma</span>
      </div>
    )
  }

  const colors = {
    light: [
      ['from-violet-600 to-indigo-600', 'from-violet-500 to-indigo-500'],
      ['from-indigo-600 to-violet-600', 'from-indigo-500 to-violet-500']
    ],
    dark: [
      ['from-violet-400 to-indigo-400', 'from-violet-300 to-indigo-300'],
      ['from-indigo-400 to-violet-400', 'from-indigo-300 to-violet-300']
    ]
  }

  const currentColors = theme === 'dark' ? colors.dark : colors.light
  
  return (
    <div className="flex items-center font-black text-3xl tracking-tighter">
      <span className="text-foreground">J</span>
      <span className="text-foreground">o</span>
      <div className="relative inline-block mx-1">
        <span 
          className={cn(
            "text-transparent bg-clip-text bg-gradient-to-r transition-all duration-1000",
            currentColors[color][0]
          )}
          suppressHydrationWarning
        >
          G
        </span>
        <div 
          className={cn(
            "absolute -inset-2 blur-md bg-gradient-to-r opacity-30 transition-all duration-1000",
            currentColors[color][1]
          )}
          suppressHydrationWarning
        />
        <div 
          className={cn(
            "absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r blur-md opacity-60 transition-all duration-1000",
            currentColors[color][0]
          )}
          suppressHydrationWarning
        />
      </div>
      <span className="text-foreground">m</span>
      <span className="text-foreground">a</span>
    </div>
  )
} 