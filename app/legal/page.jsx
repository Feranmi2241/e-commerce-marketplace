'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState('terms')

  const tosTableOfContents = [
    { id: 'tos-overview', label: 'Overview' },
    { id: 'tos-use-license', label: 'Use License' },
    { id: 'tos-disclaimer', label: 'Disclaimer' },
    { id: 'tos-limitations', label: 'Limitations of Liability' },
    { id: 'tos-accuracy', label: 'Accuracy of Materials' },
    { id: 'tos-materials', label: 'Materials License' },
    { id: 'tos-modifications', label: 'Modifications' },
  ]

  const privacyTableOfContents = [
    { id: 'privacy-overview', label: 'Overview' },
    { id: 'privacy-collection', label: 'Information We Collect' },
    { id: 'privacy-usage', label: 'How We Use Information' },
    { id: 'privacy-sharing', label: 'Information Sharing' },
    { id: 'privacy-security', label: 'Security' },
    { id: 'privacy-cookies', label: 'Cookies and Tracking' },
    { id: 'privacy-rights', label: 'Your Rights' },
    { id: 'privacy-contact', label: 'Contact Us' },
  ]

  const toc = activeSection === 'terms' ? tosTableOfContents : privacyTableOfContents

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar isLoggedIn={false} />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">
              Terms & Policies
            </h1>
            <p className="text-lg text-text-secondary transition-colors duration-200 hover:text-text-primary">
              Please read these documents carefully to understand our terms and how we handle your data.
            </p>
          </motion.div>

          {/* Tabs */}
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <TabsList className="grid w-full max-w-md mb-8">
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            </TabsList>

            <div className="flex gap-8">
              {/* Sidebar TOC */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                className="hidden lg:block w-64 flex-shrink-0 sticky top-24 h-fit"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                    On This Page
                  </h3>
                  <nav className="space-y-2">
                    {toc.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="block w-full text-left text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 py-2 px-3 rounded hover:bg-gray-50"
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                className="flex-1 max-w-3xl"
              >
                {/* Terms of Service */}
                <TabsContent value="terms" className="space-y-8">
                  <div className="text-sm text-text-secondary mb-8">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>

                  {/* Overview */}
                  <section id="tos-overview">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Overview</h2>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      These Terms of Service ("Terms") constitute a legally binding agreement between you and our platform. By accessing or using our website and services, you agree to be bound by these Terms. If you do not agree to any part of these Terms, you may not use our services.
                    </p>
                    <p className="text-text-secondary leading-relaxed">
                      We reserve the right to modify these Terms at any time. Continued use of our platform following any modifications constitutes your acceptance of the updated Terms.
                    </p>
                  </section>

                  {/* Use License */}
                  <section id="tos-use-license" className="pt-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Use License</h2>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      Permission is granted to temporarily download one copy of the materials (information or software) on our platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 ml-4">
                      <li>Modify or copy the materials</li>
                      <li>Use the materials for any commercial purpose or for any public display</li>
                      <li>Attempt to decompile or reverse engineer any software contained on the platform</li>
                      <li>Remove any copyright or other proprietary notations</li>
                      <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                    </ul>
                  </section>

                  {/* Disclaimer */}
                  <section id="tos-disclaimer" className="pt-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Disclaimer</h2>
                    <p className="text-text-secondary leading-relaxed">
                      The materials on our platform are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                  </section>

                  {/* Limitations */}
                  <section id="tos-limitations" className="pt-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Limitations of Liability</h2>
                    <p className="text-text-secondary leading-relaxed">
                      In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our platform, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
                    </p>
                  </section>

                  {/* Accuracy */}
                  <section id="tos-accuracy" className="pt-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Accuracy of Materials</h2>
                    <p className="text-text-secondary leading-relaxed">
                      The materials appearing on our platform could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our platform are accurate, complete, or current. We may make changes to the materials contained on our platform at any time without notice.
                    </p>
                  </section>

                  {/* Materials License */}
                  <section id="tos-materials" className="pt-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Materials License</h2>
                    <p className="text-text-secondary leading-relaxed">
                      The license granted in this section is limited to a non-transferable, non-exclusive license to view and use our platform in accordance with these Terms. We grant you a limited license to access and view the content and materials on our platform solely for your personal, non-commercial use.
                    </p>
                  </section>

                  {/* Modifications */}
                  <section id="tos-modifications" className="pt-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Modifications</h2>
                    <p className="text-text-secondary leading-relaxed">
                      We may revise these terms of service for our website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service. We reserve the right to update, change or replace any part of these Terms.
                    </p>
                  </section>
                </TabsContent>

                {/* Privacy Policy */}
                <TabsContent value="privacy" className="space-y-8">
                  <div className="text-sm text-text-secondary mb-8">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>

                  {/* Overview */}
                  <section id="privacy-overview">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Overview</h2>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      At our marketplace, we are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our online platform.
                    </p>
                    <p className="text-text-secondary leading-relaxed">
                      Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our platform. By accessing our platform, you signify that you have read, understood, and agree to our collection and use of your personal information as outlined herein.
                    </p>
                  </section>

                  {/* Collection */}
                  <section id="privacy-collection" className="pt-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Information We Collect</h2>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      We collect information in various ways, including information you voluntarily provide and information collected automatically as you navigate our platform:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-text-primary mb-2 transition-colors duration-200 hover:text-brand-orange cursor-default">Personal Information You Provide</h3>
                        <p className="text-text-secondary leading-relaxed">
                          When you register, place an order, or contact us, we collect personal information such as your name, email address, phone number, postal address, payment information, and any other details you provide.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-2 transition-colors duration-200 hover:text-brand-orange cursor-default">Automatic Information</h3>
                        <p className="text-text-secondary leading-relaxed">
                          We automatically collect certain information about your device and how you interact with our platform, including IP address, browser type, pages visited, and the time and date of your visits.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Usage */}
                  <section id="privacy-usage" className="pt-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">How We Use Information</h2>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      We use the information we collect for various purposes, including:
                    </p>
                    <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 ml-4">
                      <li>Processing and fulfilling your orders</li>
                      <li>Sending transactional emails and updates</li>
                      <li>Providing customer support and responding to inquiries</li>
                      <li>Improving our website and services</li>
                      <li>Marketing and promotional communications (with your consent)</li>
                      <li>Preventing fraudulent transactions and protecting against abuse</li>
                    </ul>
                  </section>

                  {/* Sharing */}
                  <section id="privacy-sharing" className="pt-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Information Sharing</h2>
                    <p className="text-text-secondary leading-relaxed">
                      We do not sell, trade, or rent your personal information to third parties. We may share information with third-party service providers who assist us in operating our website and conducting our business, such as payment processors, shipping partners, and analytics providers. These third parties are bound by confidentiality agreements and are only permitted to use your information as necessary to provide services to us.
                    </p>
                  </section>

                  {/* Security */}
                  <section id="privacy-security" className="pt-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Security</h2>
                    <p className="text-text-secondary leading-relaxed">
                      We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                    </p>
                  </section>

                  {/* Cookies */}
                  <section id="privacy-cookies" className="pt-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Cookies and Tracking</h2>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      Our website uses cookies and similar tracking technologies to enhance your experience. Cookies are small files stored on your device that help us remember your preferences and track your activity. You can control cookie settings through your browser preferences.
                    </p>
                    <p className="text-text-secondary leading-relaxed">
                      We use analytics tools to understand how visitors use our platform, which helps us improve our services and user experience.
                    </p>
                  </section>

                  {/* Rights */}
                  <section id="privacy-rights" className="pt-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Your Rights</h2>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      Depending on your location, you may have certain rights regarding your personal information, including:
                    </p>
                    <ul className="list-disc list-inside text-text-secondary leading-relaxed space-y-2 ml-4">
                      <li>The right to access your personal information</li>
                      <li>The right to correct inaccurate information</li>
                      <li>The right to request deletion of your information</li>
                      <li>The right to opt-out of marketing communications</li>
                      <li>The right to data portability</li>
                    </ul>
                  </section>

                  {/* Contact */}
                  <section id="privacy-contact" className="pt-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default">Contact Us</h2>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      If you have questions about this Privacy Policy or our privacy practices, please contact us at:
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 text-text-secondary">
                      <p>Email: privacy@marketplace.com</p>
                      <p>Phone: +234 (0) 800-000-0000</p>
                      <p>Address: Lagos, Nigeria</p>
                    </div>
                  </section>
                </TabsContent>
              </motion.div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
