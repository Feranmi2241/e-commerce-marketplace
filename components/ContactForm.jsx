'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.', {
        duration: 5000,
      })
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div>
      <motion.h2
        className="text-2xl font-bold text-text-primary mb-6 transition-colors duration-200 hover:text-brand-orange cursor-default"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
      >
        Send us a Message
      </motion.h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <motion.label
            htmlFor="name"
            className="block text-sm font-medium text-text-primary mb-2 transition-colors duration-200 hover:text-brand-orange cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 3, delay: 0.1, ease: 'easeInOut', repeat: Infinity }}
          >
            Full Name
          </motion.label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none ${
              errors.name
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-border-light focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <motion.label
            htmlFor="email"
            className="block text-sm font-medium text-text-primary mb-2 transition-colors duration-200 hover:text-brand-orange cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 3, delay: 0.2, ease: 'easeInOut', repeat: Infinity }}
          >
            Email Address
          </motion.label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none ${
              errors.email
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-border-light focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <motion.label
            htmlFor="subject"
            className="block text-sm font-medium text-text-primary mb-2 transition-colors duration-200 hover:text-brand-orange cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 3, delay: 0.3, ease: 'easeInOut', repeat: Infinity }}
          >
            Subject
          </motion.label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none ${
              errors.subject
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-border-light focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange'
            }`}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <motion.label
            htmlFor="message"
            className="block text-sm font-medium text-text-primary mb-2 transition-colors duration-200 hover:text-brand-orange cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 3, delay: 0.4, ease: 'easeInOut', repeat: Infinity }}
          >
            Message
          </motion.label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your inquiry..."
            rows="6"
            className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none resize-none ${
              errors.message
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-border-light focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange'
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-orange hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
