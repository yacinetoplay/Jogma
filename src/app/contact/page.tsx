'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import emailjs from 'emailjs-com'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    }

    try {
      const response = await emailjs.send(
        'service_jogma',
        'jogma_rply',
        templateParams,
        '63B9pULgHWjPSrVRE'
      )
      console.log('Message sent:', response)

      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon!",
      })

      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      console.error('Error sending email:', error)
      toast({
        title: "Message Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
        Get in <span className="text-blue-600">Touch</span>
      </h1>
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
              className="mt-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              className="mt-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              required
              className="mt-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
            />
          </div>
          <Button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold text-lg rounded-lg shadow-lg hover:from-blue-600 hover:to-teal-500 focus:ring-2 focus:ring-teal-500 transition-all duration-300"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  )
}