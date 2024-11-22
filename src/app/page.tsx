'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Code, Rocket, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section 
        className="relative py-12 md:py-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4" >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Hero Text */}
            <motion.div 
              className="flex-1 text-center md:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">
                Welcome to JOGMA
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                We craft innovative digital solutions that transform ideas into reality. 
                Elevate your digital presence with our cutting-edge development services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="group">
                  <Link href="/services" style={{color:"orange"}}>
                    Explore Services
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div 
              className="flex-1 relative"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="aspect-square max-w-[500px] mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-full blur-3xl" />
                <div className="relative w-full h-full rounded-full border border-foreground/10 backdrop-blur-sm p-8">
                  {/* Add animated elements here */}
                  <div className="absolute top-1/4 left-1/4 animate-float-slow">
                    <Code className="w-12 h-12 text-violet-500" />
                  </div>
                  <div className="absolute top-1/2 right-1/4 animate-float-medium">
                    <Rocket className="w-12 h-12 text-indigo-500" />
                  </div>
                  <div className="absolute bottom-1/4 left-1/2 animate-float-fast">
                    <Shield className="w-12 h-12 text-violet-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine technical expertise with creative innovation to deliver exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Modern Tech Stack",
                description: "We use the latest technologies to build fast, scalable, and maintainable applications."
              },
              {
                icon: Rocket,
                title: "Performance First",
                description: "Our solutions are optimized for speed and efficiency, ensuring the best user experience."
              },
              {
                icon: Shield,
                title: "Security Focused",
                description: "We prioritize security in every project, protecting your data and users."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-lg bg-background border border-border"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index }}
              >
                <feature.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's work together to bring your vision to life. Contact us today to discuss your project.
            </p>
            <Button asChild size="lg">
              <Link href="/contact" style={{color:"orange"}}>Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}