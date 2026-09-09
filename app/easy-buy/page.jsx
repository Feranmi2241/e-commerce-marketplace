'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import ChatButton from '@/components/ChatButton'
import Footer from '@/components/Footer'
import EasyBuyHero from '@/components/EasyBuyHero'
import HowItWorks from '@/components/HowItWorks'
import EligibilityCard from '@/components/EligibilityCard'
import EasyBuyCalculator from '@/components/EasyBuyCalculator'
import EasyBuyCanvas from '@/components/EasyBuyCanvas'
import EasyBuyFAQ from '@/components/EasyBuyFAQ'
import { Button } from '@/components/ui/button'

export default function EasyBuyPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleApplyNow = () => {
    if (!isLoggedIn) return
    // Navigate to application form
    console.log('[v0] Easy Buy application started')
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <EasyBuyHero />

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <HowItWorks />
          </div>
        </section>

        {/* Eligibility & Calculator */}
        <section className="py-20 bg-bg-secondary">
          <div className="max-w-7xl mx-auto px-4 space-y-12">
            <EligibilityCard />
            <EasyBuyCalculator />
          </div>
        </section>

        {/* Apply Now Button */}
        <section className="py-12 bg-white border-t border-border-light">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Button
              size="lg"
              onClick={handleApplyNow}
              disabled={!isLoggedIn}
              className={`${
                !isLoggedIn 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
            >
              {!isLoggedIn ? '🔒 Sign In to Apply' : 'Apply Now'}
            </Button>
            {!isLoggedIn && (
              <p className="text-text-secondary text-sm mt-3">Sign in to your account to apply for Easy Buy</p>
            )}
          </div>
        </section>

        {/* Easy Buy Products Canvas */}
        <section className="py-20 bg-bg-secondary">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-text-secondary text-sm uppercase tracking-wide mb-2 transition-colors duration-200 hover:text-brand-orange cursor-default">Eligible Categories</p>
              <h2 className="text-3xl font-bold text-text-primary transition-colors duration-200 hover:text-brand-orange cursor-default">Shop Easy Buy Products</h2>
              <p className="text-text-secondary mt-3 transition-colors duration-200 hover:text-text-primary">Browse eligible products from our most popular categories</p>
            </div>
            <EasyBuyCanvas isLoggedIn={isLoggedIn} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-text-secondary text-sm uppercase tracking-wide mb-2 transition-colors duration-200 hover:text-brand-orange cursor-default">Frequently Asked</p>
              <h2 className="text-3xl font-bold text-text-primary transition-colors duration-200 hover:text-brand-orange cursor-default">Common Questions</h2>
            </div>
            <EasyBuyFAQ />
          </div>
        </section>
      </main>

      {isLoggedIn && <ChatButton />}
      <Footer />
    </div>
  )
}
