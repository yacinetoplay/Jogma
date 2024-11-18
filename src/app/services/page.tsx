'use client'

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Code, Smartphone, Palette, Globe, Rocket, Shield } from 'lucide-react'

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
    icon: Globe,
    title: "Web Hosting",
    description: "Reliable and secure hosting solutions for your web applications.",
    features: ["Cloud Hosting", "SSL Certificates", "Domain Management", "24/7 Support"],
    color: "from-green-500 to-emerald-500"
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
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your needs
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={item}>
              <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="mb-4">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${service.color} bg-opacity-10`}>
                      <service.icon className="h-6 w-6 text-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <Badge 
                          key={feature} 
                          variant="outline"
                          className="bg-background/50 backdrop-blur-sm"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/contact">Learn More</Link>
                    </Button>
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