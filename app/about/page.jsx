'use client'

import Navbar from '@/components/Navbar'
import ChatButton from '@/components/ChatButton'
import Footer from '@/components/Footer'
import AboutHero from '@/components/AboutHero'
import CompanyStory from '@/components/CompanyStory'
import StatsSection from '@/components/StatsSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import AboutCTA from '@/components/AboutCTA'
import { useState } from 'react'

export default function AboutPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="bg-white min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} onLoginToggle={() => setIsLoggedIn(!isLoggedIn)} />
      
      <AboutHero />
      
      <CompanyStory />
      
      <StatsSection />
      
      <WhyChooseUs />
      
      <AboutCTA isLoggedIn={isLoggedIn} />
      
      {isLoggedIn && <ChatButton />}
      
      <Footer />
    </div>
  )
}
