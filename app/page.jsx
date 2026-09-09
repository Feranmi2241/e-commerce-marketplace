'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import PromoCarousel from '@/components/PromoCarousel'
import AnimatedCanvas from '@/components/AnimatedCanvas'
import CategoryGrid from '@/components/CategoryGrid'
import FlashDeals from '@/components/FlashDeals'
import EasyBuyBanner from '@/components/EasyBuyBanner'
import FeaturedProducts from '@/components/FeaturedProducts'
import TrustBadges from '@/components/TrustBadges'
import TestimonialMarquee from '@/components/TestimonialMarquee'
import Footer from '@/components/Footer'
import ChatButton from '@/components/ChatButton'

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <PromoCarousel />
      <AnimatedCanvas isLoggedIn={isLoggedIn} />
      <CategoryGrid />
      <FlashDeals isLoggedIn={isLoggedIn} />
      <EasyBuyBanner />
      <FeaturedProducts isLoggedIn={isLoggedIn} />
      <TrustBadges />
      <TestimonialMarquee />
      <Footer />
      {isLoggedIn && <ChatButton />}
    </div>
  )
}
