'use client'

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Code, Smartphone, Palette, Rocket, Shield } from 'lucide-react'

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom web applications built with modern technologies and best practices.",
    features: ["React/Next.js", "TypeScript", "Responsive Design", "API Integration"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    features: ["React Native", "Native APIs", "Push Notifications", "Offline Support"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design solutions that enhance user experience and engagement.",
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description: "Optimize your applications for speed, efficiency, and user experience.",
    features: ["Load Time Analysis", "Code Optimization", "Caching", "SEO"],
    color: "from-violet-500 to-purple-500"
  },
  {
    icon: Shield,
    title: "Security Services",
    description: "Protect your applications with industry-standard security measures.",
    features: ["Security Audits", "Authentication", "Data Encryption", "GDPR Compliance"],
    color: "from-yellow-500 to-orange-500"
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Services() {
  return (
    <div className="min-h-screen bg-background py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">Our Services</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Comprehensive digital solutions tailored to your needs
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={item}>
              <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
                <div className="p-4 md:p-6">
                  <div className="mb-4">
                    <div className={`inline-flex p-2 md:p-3 rounded-lg bg-gradient-to-r ${service.color} bg-opacity-10`}>
                      <service.icon className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">{service.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4">{service.description}</p>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {service.features.map((feature) => (
                        <Badge 
                          key={feature} 
                          variant="outline"
                          className="text-xs md:text-sm bg-background/50 backdrop-blur-sm"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
} 