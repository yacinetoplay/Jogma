import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to DevStudio</h1>
        <p className="text-xl text-gray-600 mb-8">We craft innovative digital solutions for the modern world</p>
        <Button asChild>
          <Link href="/our-apps">Explore Our Apps</Link>
        </Button>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Web Development</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>We create responsive, user-friendly websites and web applications using cutting-edge technologies.</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mobile App Development</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Our team builds native and cross-platform mobile apps that deliver exceptional user experiences.</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>UI/UX Design</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>We design intuitive and visually appealing interfaces that enhance user engagement and satisfaction.</CardDescription>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to bring your ideas to life?</h2>
        <p className="text-xl text-gray-600 mb-8">Let's collaborate and create something amazing together</p>
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </section>
    </div>
  )
}