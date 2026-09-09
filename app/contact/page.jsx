'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import ContactInfo from '@/components/ContactInfo'

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar isLoggedIn={false} />
      
      {/* Hero Section */}
      <motion.section
        className="w-full py-16 md:py-24 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">
              Get in Touch
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto transition-colors duration-200 hover:text-text-primary">
              Have a question or feedback? We’d love to hear from you. Reach out to our support team and we’ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Two Column Layout */}
      <section className="w-full py-16 md:py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ContactForm />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ContactInfo />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
