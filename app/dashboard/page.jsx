'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ShoppingBag,
  Heart,
  CreditCard,
  Package,
  Settings,
  Zap,
  ChevronRight,
  ShoppingCart,
  Menu,
  Search,
  Bell,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  RotateCcw,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import ChatButton from '@/components/ChatButton'
import ProductCard from '@/components/ProductCard'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const STATS = [
  {
    label: 'Active Orders',
    value: 3,
    icon: ShoppingBag,
    lightBg: 'bg-orange-50',
    textAccent: 'text-orange-500',
    borderAccent: 'border-l-orange-500',
    href: '/orders',
  },
  {
    label: 'Wishlist Items',
    value: 12,
    icon: Heart,
    lightBg: 'bg-rose-50',
    textAccent: 'text-rose-500',
    borderAccent: 'border-l-rose-500',
    href: '/wishlist',
  },
  {
    label: 'Saved Payment Methods',
    value: 2,
    icon: CreditCard,
    lightBg: 'bg-violet-50',
    textAccent: 'text-violet-500',
    borderAccent: 'border-l-violet-500',
    href: '/account/payment-methods',
  },
]

const ORDERS = [
  {
    id: 'ORD-28471',
    date: 'Jul 12, 2025',
    status: 'Delivered',
    statusColor: 'bg-emerald-100 text-emerald-700',
    statusBar: 'bg-emerald-500',
    StatusIcon: CheckCircle2,
    items: [
      {
        name: 'Samsung 55" 4K Smart TV',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=80&h=80&fit=crop',
        price: 485000,
      },
      {
        name: 'HDMI Cable 2.1',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop',
        price: 8500,
      },
    ],
    total: 493500,
  },
  {
    id: 'ORD-28103',
    date: 'Jul 18, 2025',
    status: 'Shipped',
    statusColor: 'bg-blue-100 text-blue-700',
    statusBar: 'bg-blue-500',
    StatusIcon: Truck,
    items: [
      {
        name: 'Hisense Chest Freezer 200L',
        image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=80&h=80&fit=crop',
        price: 210000,
      },
    ],
    total: 210000,
  },
  {
    id: 'ORD-28390',
    date: 'Jul 22, 2025',
    status: 'Processing',
    statusColor: 'bg-amber-100 text-amber-700',
    statusBar: 'bg-amber-500',
    StatusIcon: RotateCcw,
    items: [
      {
        name: 'Xiaomi Redmi Note 13 Pro',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop',
        price: 195000,
      },
      {
        name: 'Phone Case & Screen Guard',
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=80&h=80&fit=crop',
        price: 6500,
      },
    ],
    total: 201500,
  },
]

const RECOMMENDED = [
  {
    id: 1,
    name: 'Sony WH-1000XM5 Wireless Headphones',
    price: 189000,
    originalPrice: 245000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 1243,
    badge: 'Top Rated',
    badgeColor: 'bg-violet-100 text-violet-700',
  },
  {
    id: 2,
    name: 'Dyson V12 Cordless Vacuum',
    price: 320000,
    originalPrice: 410000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 876,
    badge: 'Price Drop',
    badgeColor: 'bg-red-100 text-red-600',
  },
  {
    id: 3,
    name: 'Nikon Z50 Mirrorless Camera',
    price: 580000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 432,
    badge: 'New',
    badgeColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 4,
    name: 'LG 24" IPS Monitor',
    price: 145000,
    originalPrice: 178000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 654,
    badge: null,
    badgeColor: '',
  },
  {
    id: 5,
    name: 'Instant Pot Duo 7-in-1',
    price: 98000,
    originalPrice: 125000,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 2109,
    badge: 'Best Seller',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
  {
    id: 6,
    name: 'Apple AirPods Pro (2nd Gen)',
    price: 265000,
    originalPrice: 310000,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 3421,
    badge: 'Top Rated',
    badgeColor: 'bg-violet-100 text-violet-700',
  },
]

const QUICK_LINKS = [
  {
    label: 'My Orders',
    desc: 'Track & manage orders',
    icon: Package,
    href: '/orders',
    accent: 'text-orange-500',
    iconBg: 'bg-orange-50',
    isEasyBuy: false,
  },
  {
    label: 'Wishlist',
    desc: '12 saved items',
    icon: Heart,
    href: '/wishlist',
    accent: 'text-rose-500',
    iconBg: 'bg-rose-50',
    isEasyBuy: false,
  },
  {
    label: 'Payment Methods',
    desc: '2 cards saved',
    icon: CreditCard,
    href: '/account/payment-methods',
    accent: 'text-violet-500',
    iconBg: 'bg-violet-50',
    isEasyBuy: false,
  },
  {
    label: 'Account Settings',
    desc: 'Profile & preferences',
    icon: Settings,
    href: '/account/settings',
    accent: 'text-slate-500',
    iconBg: 'bg-slate-50',
    isEasyBuy: false,
  },
  {
    label: 'Easy Buy Status',
    desc: 'View your plan & balance',
    icon: Zap,
    href: '/easy-buy',
    accent: 'text-white',
    iconBg: 'bg-white/20',
    isEasyBuy: true,
  },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function DashboardNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useAuth()
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User'
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-border-light backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 md:gap-6">
        <Link href="/" className="flex-shrink-0">
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Marketplace
          </span>
        </Link>

        <div className="flex-1 max-w-md hidden md:block">
          <div className="search-glow rounded-full px-4 py-2 bg-bg-secondary border border-border-light flex items-center gap-2">
            <Search className="w-4 h-4 text-text-secondary flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none flex-1 text-sm text-text-primary placeholder-text-secondary"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-5 text-sm mr-3">
            {[
              { label: 'Shop', href: '/shop' },
              { label: 'Categories', href: '/shop' },
              { label: 'Deals', href: '/shop' },
              { label: 'Easy Buy', href: '/easy-buy' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-text-primary hover:text-brand-orange transition font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <Link href="/notifications" className="flex items-center">
              <Bell className="w-5 h-5 text-text-primary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full" />
            </Link>
          </button>

          <Link href="/cart" className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <ShoppingCart className="w-5 h-5 text-text-primary" />
            <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              3
            </span>
          </Link>

          <div className="flex items-center gap-2 pl-2 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
              {initials}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-text-primary leading-tight">
                {displayName.split(' ')[0]}
              </p>
              <p className="text-xs text-text-secondary leading-tight">My Account</p>
            </div>
          </div>

          <button
            className="md:hidden p-2 hover:bg-bg-secondary rounded-full transition ml-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu className="w-5 h-5 text-text-primary" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border-light bg-white px-4 py-3 space-y-1">
          {[
            { label: 'Shop', href: '/shop' },
            { label: 'Categories', href: '/shop' },
            { label: 'Deals', href: '/shop' },
            { label: 'Easy Buy', href: '/easy-buy' },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2 text-sm text-text-primary hover:text-brand-orange transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Welcome Banner ───────────────────────────────────────────────────────────

function WelcomeBanner() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const { user } = useAuth()
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User'
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <motion.div
      variants={item}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 p-6 md:p-8 text-white"
      style={{ boxShadow: '0 8px 32px rgba(246,139,30,0.25)' }}
    >
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-32 w-28 h-28 bg-amber-300/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-white/80 text-sm font-medium">{greeting} 👋</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {displayName}
            </h1>
            <p className="text-white/70 text-sm mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {user?.email || ''}
            </p>
          </div>
        </div>

        <Link href="/shop" className="flex-shrink-0">
          <Button className="bg-white text-orange-500 hover:bg-orange-50 font-semibold shadow-sm gap-2">
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Stat Cards ───────────────────────────────────────────────────────────────

function StatCards() {
  return (
    <motion.div
      variants={container}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {STATS.map((stat) => {
        const Icon = stat.icon
        return (
          <motion.div key={stat.label} variants={item}>
            <Link href={stat.href}>
              <div
                className={`bg-white rounded-2xl p-5 border-l-4 ${stat.borderAccent} border border-border-light hover:shadow-md transition-all group cursor-pointer`}
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">
                      {stat.label}
                    </p>
                    <p className="text-4xl font-bold text-text-primary">{stat.value}</p>
                  </div>
                  <div className={`${stat.lightBg} p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${stat.textAccent}`} />
                  </div>
                </div>
                <div
                  className={`mt-3 flex items-center gap-1 text-xs font-medium ${stat.textAccent} group-hover:gap-2 transition-all`}
                >
                  View all <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

// ─── Recent Orders ────────────────────────────────────────────────────────────

function RecentOrders() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
    >
      <motion.div variants={item} className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
            Activity
          </p>
          <h2 className="text-2xl font-bold text-text-primary">Recent Orders</h2>
        </div>
        <Link href="/orders">
          <Button
            variant="outline"
            size="sm"
            className="border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange gap-1"
          >
            View All <ChevronRight className="w-3 h-3" />
          </Button>
        </Link>
      </motion.div>

      <div className="space-y-4">
        {ORDERS.map((order, idx) => {
          const StatusIcon = order.StatusIcon
          return (
            <motion.div
              key={order.id}
              variants={item}
              custom={idx}
              className="bg-white rounded-2xl border border-border-light overflow-hidden hover:shadow-md transition-all"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            >
              <div className={`h-1 w-full ${order.statusBar}`} />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-text-primary text-sm">{order.id}</span>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${order.statusColor}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-secondary">
                      <Clock className="w-3 h-3" />
                      {order.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-auto">
                    <div className="text-right">
                      <p className="text-xs text-text-secondary">Total</p>
                      <p className="font-bold text-text-primary">
                        ₦{order.total.toLocaleString()}
                      </p>
                    </div>
                    <Link href={`/orders/${order.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border-light hover:border-brand-orange hover:text-brand-orange text-xs"
                      >
                        View Order
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border-light flex-wrap">
                  {order.items.map((orderItem, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-bg-secondary flex-shrink-0 border border-border-light">
                        <img
                          src={orderItem.image}
                          alt={orderItem.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-xs font-medium text-text-primary line-clamp-1 max-w-[160px]">
                          {orderItem.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          ₦{orderItem.price.toLocaleString()}
                        </p>
                      </div>
                      {i < order.items.length - 1 && (
                        <div className="w-px h-8 bg-border-light mx-1 hidden sm:block" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}

// ─── Recommended Carousel ─────────────────────────────────────────────────────

function RecommendedCarousel() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
    >
      <motion.div variants={item} className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
            Picked for you
          </p>
          <h2 className="text-2xl font-bold text-text-primary">Recommended for You</h2>
        </div>
        <Link href="/shop">
          <Button
            variant="outline"
            size="sm"
            className="border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange gap-1"
          >
            Browse All <ChevronRight className="w-3 h-3" />
          </Button>
        </Link>
      </motion.div>

      <motion.div variants={item} className="relative px-0 sm:px-10">
        <Carousel opts={{ align: 'start', loop: false }} className="w-full">
          <CarouselContent>
            {RECOMMENDED.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ProductCard product={product} isLoggedIn={true} showBadge={false} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex border-border-light hover:border-brand-orange hover:text-brand-orange -left-10" />
          <CarouselNext className="hidden sm:flex border-border-light hover:border-brand-orange hover:text-brand-orange -right-10" />
        </Carousel>
      </motion.div>
    </motion.section>
  )
}

// ─── Quick Links ──────────────────────────────────────────────────────────────

function QuickLinks() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
    >
      <motion.div variants={item} className="mb-5">
        <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
          Shortcuts
        </p>
        <h2 className="text-2xl font-bold text-text-primary">Quick Access</h2>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {QUICK_LINKS.map((link) => {
          const Icon = link.icon
          return (
            <motion.div key={link.label} variants={item}>
              <Link href={link.href}>
                <div
                  className={`rounded-2xl p-5 h-full flex flex-col gap-3 cursor-pointer transition-all hover:shadow-md group ${
                    link.isEasyBuy
                      ? 'bg-gradient-to-br from-orange-500 to-amber-400'
                      : 'bg-white border border-border-light hover:border-orange-200'
                  }`}
                  style={
                    link.isEasyBuy
                      ? { boxShadow: '0 8px 24px rgba(246,139,30,0.2)' }
                      : { boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }
                  }
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${link.iconBg}`}>
                    <Icon className={`w-5 h-5 ${link.accent}`} />
                  </div>
                  <div>
                    <p
                      className={`font-semibold text-sm leading-tight ${
                        link.isEasyBuy ? 'text-white' : 'text-text-primary'
                      }`}
                    >
                      {link.label}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${
                        link.isEasyBuy ? 'text-white/70' : 'text-text-secondary'
                      }`}
                    >
                      {link.desc}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 mt-auto group-hover:translate-x-1 transition-transform ${
                      link.isEasyBuy ? 'text-white/60' : 'text-text-secondary'
                    }`}
                  />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-bg-secondary">
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Above-fold: animate on load */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <WelcomeBanner />
          <StatCards />
        </motion.div>

        {/* Below-fold: whileInView */}
        <div className="space-y-12 mt-12">
          <RecentOrders />
          <div className="h-px bg-border-light" />
          <RecommendedCarousel />
          <div className="h-px bg-border-light" />
          <QuickLinks />
        </div>
      </main>

      <ChatButton />
    </div>
  )
}
