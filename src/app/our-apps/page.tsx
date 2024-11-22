'use client'

import { useState } from 'react'
import { ThreeScene } from '@/components/ThreeScene'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface BoxData {
  title: string
  description: string
  imageSrc: string
  status?: 'available' | 'coming-soon' | 'maintenance'
  tags?: string[]
  link?: string
}

const boxesData: BoxData[] = [
  {
    title: "MathGenius",
    description: "An innovative math learning app that makes mathematics fun and engaging for students of all ages.",
    imageSrc: "/placeholder.svg?height=200&width=200",
    status: 'available',
    tags: ['Education', 'Mathematics'],
    link: 'https://mathgenius-app.com'
  },
  {
    title: "LanguageMaster",
    description: "Master any language with our AI-powered language learning platform.",
    imageSrc: "/placeholder.svg?height=200&width=200",
    status: 'coming-soon',
    tags: ['Education', 'Languages']
  },
  {
    title: "StudyBuddy",
    description: "Your personal study companion for better academic performance.",
    imageSrc: "/placeholder.svg?height=200&width=200",
    status: 'maintenance',
    tags: ['Education', 'Productivity']
  }
]

export default function OurApps() {
  const [selectedBox, setSelectedBox] = useState<BoxData | null>(null)

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Available</Badge>
      case 'maintenance':
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">Under Maintenance</Badge>
      case 'coming-soon':
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">Coming Soon</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <ThreeScene selectedBox={selectedBox} />
      <div className="relative z-10 flex-grow flex justify-center items-center py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Our Apps</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our suite of innovative applications designed to enhance your daily life
            </p>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
              {boxesData.map((box, index) => (
                <Card
                  key={index}
                  className={`group transition-all duration-300 hover:shadow-xl
                    ${box.status === 'maintenance' ? 'opacity-75' : ''}
                    ${selectedBox === box ? 'ring-2 ring-primary scale-105' : 'hover:scale-102'}
                  `}
                >
                  <div className="p-6 flex flex-col items-center text-center h-full">
                    <div 
                      className="w-32 h-32 rounded-lg mb-4 overflow-hidden bg-muted relative group-hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => box.status !== 'maintenance' && setSelectedBox(box)}
                    >
                      <img 
                        src={box.imageSrc} 
                        alt={box.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                      {box.status === 'maintenance' && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-sm font-medium text-muted-foreground">Temporarily Unavailable</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{box.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">{box.description}</p>
                    <div className="space-y-3 w-full">
                      <div className="flex items-center justify-center gap-2">
                        {getStatusBadge(box.status)}
                        {box.status === 'available' && box.link && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            asChild
                          >
                            <Link href={box.link} target="_blank" rel="noopener noreferrer">
                              Visit App
                            </Link>
                          </Button>
                        )}
                      </div>
                      {box.tags && (
                        <div className="flex flex-wrap gap-2 justify-center mt-2">
                          {box.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}