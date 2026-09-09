'use client'

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
import { useAuth } from '@/contexts/AuthContext'

export default function HomePage() {
  const { isLoggedIn } = useAuth()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
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
