'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingBag,
  Users,
  BarChart2,
  Star,
  Percent,
  Zap,
  MessageSquare,
  Settings,
  UserCircle,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ImagePlus,
  Trash2,
  GripVertical,
  Check,
  Globe,
  Phone,
  Mail,
  MessageCircle,
  Bot,
  ShieldAlert,
  AlignLeft,
  BadgeCheck,
  Truck,
  RotateCcw,
  Lock,
  Headphones,
  Save,
} from 'lucide-react'

// Social icon SVGs (Facebook/Instagram/Twitter removed from lucide in this version)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)
import { Button } from '@/components/ui/button'

// ─── Admin ────────────────────────────────────────────────────────────────────

const ADMIN = {
  name: 'Chukwuemeka Eze',
  firstName: 'Emeka',
  initials: 'CE',
  role: 'Super Admin',
}

// ─── Sidebar Nav ──────────────────────────────────────────────────────────────

const SIDEBAR_NAV = [
  { label: 'Dashboard',  icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Products',   icon: Package,         href: '/admin/products' },
  { label: 'Categories', icon: Tag,             href: '/admin/categories' },
  { label: 'Orders',     icon: ShoppingBag,     href: '/admin/orders' },
  { label: 'Customers',  icon: Users,           href: '/admin/customers' },
  { label: 'Analytics',  icon: BarChart2,       href: '/admin/analytics' },
  { label: 'Reviews',    icon: Star,            href: '/admin/reviews' },
  { label: 'Discounts',  icon: Percent,         href: '/admin/discounts' },
  { label: 'Easy Buy',   icon: Zap,             href: '/admin/easy-buy' },
  { label: 'Chats',      icon: MessageSquare,   href: '/admin/chats' },
  { label: 'Settings',   icon: Settings,        href: '/admin/settings', active: true },
  { label: 'Account',    icon: UserCircle,      href: '/admin/account' },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const fadeCard = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.35, ease: 'easeOut' } },
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ collapsed, onToggle }) {
  const pathname = usePathname()
  return (
    <aside
      className={`hidden md:flex flex-col bg-white border-r border-border-light transition-all duration-300 flex-shrink-0 ${
        collapsed ? 'w-16' : 'w-56'
      }`}
      style={{ minHeight: '100vh' }}
    >
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-border-light ${collapsed ? 'justify-center' : ''}`}>
        {!collapsed && (
          <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent leading-tight">
            Marketplace<br />
            <span className="text-xs font-semibold text-text-secondary tracking-widest uppercase">Admin</span>
          </span>
        )}
        {collapsed && (
          <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">M</span>
        )}
      </div>

      <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto">
        {SIDEBAR_NAV.map((item) => {
          const Icon = item.icon
          const isActive = pathname && pathname.startsWith(item.href)
          return (
            <Link key={item.label} href={item.href}>
              <div
                className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-orange-50 text-brand-orange'
                    : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-brand-orange' : ''}`} />
                {!collapsed && (
                  <span className={`text-sm font-medium truncate ${isActive ? 'text-brand-orange font-semibold' : ''}`}>
                    {item.label}
                  </span>
                )}
                {!collapsed && isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border-light p-3">
        <button
          onClick={onToggle}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-all text-sm font-medium ${collapsed ? 'justify-center' : ''}`}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  )
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar({ onMobileMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border-light flex items-center gap-4 px-4 md:px-6 py-3">
      <button
        onClick={onMobileMenuToggle}
        className="md:hidden p-2 hover:bg-bg-secondary rounded-full transition flex-shrink-0"
      >
        <Menu className="w-5 h-5 text-text-primary" />
      </button>

      <span className="md:hidden text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent flex-shrink-0">
        Admin
      </span>

      <div className="flex-1 max-w-sm hidden sm:block">
        <div className="search-glow rounded-full px-4 py-2 bg-bg-secondary border border-border-light flex items-center gap-2">
          <Search className="w-4 h-4 text-text-secondary flex-shrink-0" />
          <input
            type="text"
            placeholder="Search settings..."
            className="bg-transparent outline-none flex-1 text-sm text-text-primary placeholder-text-secondary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button className="relative p-2 hover:bg-bg-secondary rounded-full transition">
          <Bell className="w-5 h-5 text-text-primary" />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
            5
          </span>
        </button>

        <div className="flex items-center gap-2.5 pl-2 border-l border-border-light">
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              {ADMIN.initials}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-text-primary leading-tight">{ADMIN.firstName}</p>
            <p className="text-xs text-text-secondary leading-tight">{ADMIN.role}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

// ─── Shared: Section Card wrapper ─────────────────────────────────────────────

function SectionCard({ icon: Icon, eyebrow, title, children, iconBg = 'bg-orange-50', iconColor = 'text-brand-orange' }) {
  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="px-6 py-5 border-b border-border-light flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">{eyebrow}</p>
          <h2 className="text-base font-bold text-text-primary">{title}</h2>
        </div>
      </div>
      <div className="px-6 py-6">
        {children}
      </div>
    </motion.div>
  )
}

// ─── Shared: Save confirmation pill ──────────────────────────────────────────

function SavedPill({ visible }) {
  if (!visible) return null
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full ml-auto"
    >
      <Check className="w-3.5 h-3.5 text-emerald-600" />
      <span className="text-xs font-semibold text-emerald-700">Saved!</span>
    </motion.span>
  )
}

// ─── Mock Banner Data ─────────────────────────────────────────────────────────

const INITIAL_BANNERS = [
  {
    id: 'BNR-001',
    title: 'Electronics Mega Sale — Up to 20% Off',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=600&h=200&fit=crop',
    link: '/category/electronics',
    active: true,
  },
  {
    id: 'BNR-002',
    title: 'New iPhone 15 Pro Max — Now Available',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=200&fit=crop',
    link: '/product/iphone-15-pro-max',
    active: true,
  },
  {
    id: 'BNR-003',
    title: 'Easy Buy — Pay in Instalments',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=200&fit=crop',
    link: '/easy-buy',
    active: true,
  },
  {
    id: 'BNR-004',
    title: 'Home Appliances Clearance — Limited Stock',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=200&fit=crop',
    link: '/category/home-appliances',
    active: false,
  },
]

// ─── Section 1: Banner Manager ────────────────────────────────────────────────

function BannerManager() {
  const [banners,    setBanners]    = useState(INITIAL_BANNERS)
  const [dragIndex,  setDragIndex]  = useState(null)
  const [overIndex,  setOverIndex]  = useState(null)
  const [saved,      setSaved]      = useState(false)
  const fileInputRef = useRef(null)

  const handleDragStart = (i) => setDragIndex(i)
  const handleDragOver  = (e, i) => { e.preventDefault(); setOverIndex(i) }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null); setOverIndex(null); return
    }
    const reordered = [...banners]
    const [moved]   = reordered.splice(dragIndex, 1)
    reordered.splice(dropIndex, 0, moved)
    setBanners(reordered)
    setDragIndex(null)
    setOverIndex(null)
  }

  const handleDragEnd = () => { setDragIndex(null); setOverIndex(null) }

  const toggleActive = (id) => {
    setBanners((prev) => prev.map((b) => b.id === id ? { ...b, active: !b.active } : b))
  }

  const deleteBanner = (id) => {
    setBanners((prev) => prev.filter((b) => b.id !== id))
  }

  const handleAddBanner = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const newBanner = {
      id:     `BNR-${Date.now()}`,
      title:  file.name.replace(/\.[^.]+$/, ''),
      image:  url,
      link:   '/',
      active: true,
    }
    setBanners((prev) => [...prev, newBanner])
    e.target.value = ''
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <SectionCard icon={ImagePlus} eyebrow="Homepage" title="Banner Manager">
      <div className="space-y-4">

        {/* Instruction row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="text-xs text-text-secondary">
            Drag the <GripVertical className="inline w-3.5 h-3.5 text-text-secondary" /> handle to reorder banners. Active banners appear on the homepage carousel.
          </p>
          <div className="flex items-center gap-2">
            <SavedPill visible={saved} />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-9 px-4 rounded-xl gap-2 text-sm"
              style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
            >
              <ImagePlus className="w-4 h-4" />
              Add Banner
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAddBanner} />
          </div>
        </div>

        {/* Banner cards */}
        <div className="space-y-3">
          {banners.map((banner, i) => (
            <div
              key={banner.id}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={(e) => handleDrop(e, i)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-grab active:cursor-grabbing ${
                overIndex === i && dragIndex !== i
                  ? 'border-brand-orange bg-orange-50/50 shadow-md'
                  : dragIndex === i
                  ? 'opacity-50 border-dashed border-brand-orange'
                  : 'border-border-light bg-white hover:border-orange-200 hover:shadow-sm'
              }`}
            >
              {/* Drag handle */}
              <div className="flex-shrink-0 text-text-secondary hover:text-brand-orange transition-colors p-1">
                <GripVertical className="w-5 h-5" />
              </div>

              {/* Order number */}
              <div className="w-6 h-6 rounded-full bg-bg-secondary border border-border-light flex items-center justify-center text-[11px] font-bold text-text-secondary flex-shrink-0">
                {i + 1}
              </div>

              {/* Thumbnail */}
              <div className="w-24 h-14 rounded-xl overflow-hidden border border-border-light flex-shrink-0 bg-bg-secondary">
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
              </div>

              {/* Title + link */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary line-clamp-1">{banner.title}</p>
                <p className="text-xs text-text-secondary mt-0.5 flex items-center gap-1">
                  <Globe className="w-3 h-3 flex-shrink-0" />
                  {banner.link}
                </p>
              </div>

              {/* Active toggle */}
              <button
                onClick={() => toggleActive(banner.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  banner.active
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-gray-50 border-border-light text-text-secondary'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${banner.active ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                {banner.active ? 'Active' : 'Hidden'}
              </button>

              {/* Delete */}
              <button
                onClick={() => deleteBanner(banner.id)}
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {banners.length === 0 && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border-light rounded-2xl p-10 flex flex-col items-center gap-3 cursor-pointer hover:border-brand-orange hover:bg-orange-50/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                <ImagePlus className="w-6 h-6 text-brand-orange" />
              </div>
              <p className="text-sm font-semibold text-text-primary">No banners yet</p>
              <p className="text-xs text-text-secondary">Click to upload your first banner image</p>
            </div>
          )}
        </div>

        {/* Save */}
        {banners.length > 0 && (
          <div className="pt-2">
            <Button
              onClick={handleSave}
              className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-10 px-6 rounded-xl gap-2"
              style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
            >
              <Save className="w-4 h-4" />
              Save Banner Order
            </Button>
          </div>
        )}
      </div>
    </SectionCard>
  )
}

// ─── Section 2: Featured Categories Selector ─────────────────────────────────

const ALL_CATEGORIES = [
  {
    id: 'cat-01',
    name: 'Phones & Tablets',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=80&fit=crop',
    featured: true,
  },
  {
    id: 'cat-02',
    name: 'Computing',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=120&h=80&fit=crop',
    featured: true,
  },
  {
    id: 'cat-03',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=120&h=80&fit=crop',
    featured: true,
  },
  {
    id: 'cat-04',
    name: 'Home Appliances',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=120&h=80&fit=crop',
    featured: true,
  },
  {
    id: 'cat-05',
    name: 'Cosmetics & Beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=120&h=80&fit=crop',
    featured: false,
  },
  {
    id: 'cat-06',
    name: 'Perfumes',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=120&h=80&fit=crop',
    featured: false,
  },
  {
    id: 'cat-07',
    name: 'Power & Accessories',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=120&h=80&fit=crop',
    featured: true,
  },
  {
    id: 'cat-08',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=120&h=80&fit=crop',
    featured: false,
  },
  {
    id: 'cat-09',
    name: 'Gaming',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=120&h=80&fit=crop',
    featured: false,
  },
  {
    id: 'cat-10',
    name: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&h=80&fit=crop',
    featured: false,
  },
  {
    id: 'cat-11',
    name: 'Baby & Kids',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=120&h=80&fit=crop',
    featured: false,
  },
  {
    id: 'cat-12',
    name: 'Food & Groceries',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=80&fit=crop',
    featured: false,
  },
]

function FeaturedCategoriesSelector() {
  const [categories, setCategories] = useState(ALL_CATEGORIES)
  const [saved,      setSaved]      = useState(false)

  const toggleFeatured = (id) => {
    setCategories((prev) =>
      prev.map((c) => c.id === id ? { ...c, featured: !c.featured } : c)
    )
  }

  const featuredCount = categories.filter((c) => c.featured).length

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <SectionCard icon={Tag} eyebrow="Homepage" title="Featured Categories" iconBg="bg-blue-50" iconColor="text-blue-600">
      <div className="space-y-4">

        {/* Info row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="text-xs text-text-secondary">
            Select which categories appear in the homepage featured section. Checked categories are shown to customers.
          </p>
          <div className="flex items-center gap-2">
            <SavedPill visible={saved} />
            <span className="text-xs font-semibold bg-orange-100 text-brand-orange px-2.5 py-1 rounded-full">
              {featuredCount} featured
            </span>
          </div>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggleFeatured(cat.id)}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all group text-left ${
                cat.featured
                  ? 'border-brand-orange shadow-md'
                  : 'border-border-light hover:border-orange-300'
              }`}
            >
              {/* Category image */}
              <div className="relative h-20 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 transition-all ${
                  cat.featured
                    ? 'bg-gradient-to-t from-black/60 via-black/20 to-transparent'
                    : 'bg-gradient-to-t from-black/50 via-black/10 to-transparent'
                }`} />

                {/* Checkbox overlay */}
                <div className={`absolute top-2 right-2 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  cat.featured
                    ? 'bg-brand-orange border-brand-orange'
                    : 'bg-white/80 border-white/60'
                }`}>
                  {cat.featured && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>

              {/* Category name */}
              <div className={`px-3 py-2.5 transition-colors ${
                cat.featured ? 'bg-orange-50' : 'bg-white'
              }`}>
                <p className={`text-xs font-bold leading-tight ${
                  cat.featured ? 'text-brand-orange' : 'text-text-primary'
                }`}>
                  {cat.name}
                </p>
                <p className={`text-[10px] mt-0.5 font-medium ${
                  cat.featured ? 'text-orange-400' : 'text-text-secondary'
                }`}>
                  {cat.featured ? '✓ Featured' : 'Not featured'}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Save */}
        <div className="pt-2">
          <Button
            onClick={handleSave}
            className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-10 px-6 rounded-xl gap-2"
            style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
          >
            <Save className="w-4 h-4" />
            Save Featured Categories
          </Button>
        </div>
      </div>
    </SectionCard>
  )
}

// ─── Section 3: Footer & Trust Badge Text Editor ─────────────────────────────

function FooterTrustEditor() {
  const [footerText, setFooterText] = useState(
    `© 2025 Marketplace Nigeria. All rights reserved.\nYour trusted online store for electronics, home appliances, phones, and more — delivered fast across Nigeria.\n\nRegistered in Nigeria | RC: 1234567 | Lagos, Nigeria`
  )
  const [trustBadges, setTrustBadges] = useState([
    { id: 'tb-1', icon: 'Truck',      label: 'Fast Delivery',     subtext: 'Same-day delivery in Lagos' },
    { id: 'tb-2', icon: 'Lock',       label: 'Secure Payment',    subtext: '256-bit SSL encryption' },
    { id: 'tb-3', icon: 'RotateCcw',  label: 'Easy Returns',      subtext: '7-day hassle-free returns' },
    { id: 'tb-4', icon: 'Headphones', label: '24/7 Support',      subtext: 'Always here to help you' },
    { id: 'tb-5', icon: 'BadgeCheck', label: 'Verified Products', subtext: '100% authentic guarantee' },
  ])
  const [saved, setSaved] = useState(false)

  const updateBadge = (id, field, value) => {
    setTrustBadges((prev) => prev.map((b) => b.id === id ? { ...b, [field]: value } : b))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const iconMap = { Truck, Lock, RotateCcw, Headphones, BadgeCheck }

  return (
    <SectionCard icon={AlignLeft} eyebrow="Content" title="Footer & Trust Badge Text" iconBg="bg-violet-50" iconColor="text-violet-600">
      <div className="space-y-6">

        {/* Footer text */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
            Footer Text
          </label>
          <p className="text-xs text-text-secondary mb-2">
            This text appears in the footer across all pages of the storefront.
          </p>
          <textarea
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition resize-none leading-relaxed"
            placeholder="Enter footer text..."
          />
          <p className="text-xs text-text-secondary mt-1.5 text-right">
            {footerText.length} characters
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-border-light" />

        {/* Trust badges */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
            Trust Badge Labels
          </label>
          <p className="text-xs text-text-secondary mb-4">
            Edit the label and subtext for each trust badge shown on the storefront.
          </p>

          <div className="space-y-3">
            {trustBadges.map((badge) => {
              const Icon = iconMap[badge.icon]
              return (
                <div key={badge.id} className="flex items-center gap-4 p-4 bg-bg-secondary rounded-xl border border-border-light">
                  {/* Icon preview */}
                  <div className="w-10 h-10 rounded-xl bg-white border border-border-light flex items-center justify-center flex-shrink-0 shadow-sm">
                    {Icon && <Icon className="w-5 h-5 text-brand-orange" />}
                  </div>

                  {/* Label + subtext inputs */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={badge.label}
                      onChange={(e) => updateBadge(badge.id, 'label', e.target.value)}
                      placeholder="Badge label"
                      className="px-3 py-2 rounded-xl border border-border-light bg-white text-sm font-semibold text-text-primary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
                    />
                    <input
                      type="text"
                      value={badge.subtext}
                      onChange={(e) => updateBadge(badge.id, 'subtext', e.target.value)}
                      placeholder="Badge subtext"
                      className="px-3 py-2 rounded-xl border border-border-light bg-white text-xs text-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleSave}
            className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-10 px-6 rounded-xl gap-2"
            style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
          >
            <Save className="w-4 h-4" />
            Save Footer & Badges
          </Button>
          <SavedPill visible={saved} />
        </div>
      </div>
    </SectionCard>
  )
}

// ─── Section 4: General Settings Form ────────────────────────────────────────

function GeneralSettingsForm() {
  const [form, setForm] = useState({
    businessName: 'Marketplace Nigeria',
    contactEmail: 'support@marketplace.ng',
    contactPhone: '+234 800 123 4567',
    facebook:     'https://facebook.com/marketplaceng',
    instagram:    'https://instagram.com/marketplaceng',
    twitter:      'https://twitter.com/marketplaceng',
    whatsapp:     '+234 800 123 4567',
    website:      'https://marketplace.ng',
  })
  const [saved, setSaved] = useState(false)

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const inputClass = 'w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition'

  return (
    <SectionCard icon={Globe} eyebrow="Business" title="General Settings" iconBg="bg-emerald-50" iconColor="text-emerald-600">
      <div className="space-y-6">

        {/* Business info */}
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">Business Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Business name */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
                Business Name
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) => set('businessName', e.target.value)}
                  placeholder="Your business name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Contact email */}
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
                Contact Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => set('contactEmail', e.target.value)}
                  placeholder="support@yourbusiness.com"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Contact phone */}
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
                Contact Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                <input
                  type="tel"
                  value={form.contactPhone}
                  onChange={(e) => set('contactPhone', e.target.value)}
                  placeholder="+234 800 000 0000"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
                Website URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => set('website', e.target.value)}
                  placeholder="https://yourbusiness.com"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border-light" />

        {/* Social media */}
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">Social Media Links</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Facebook */}
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 text-blue-600 inline-block"><FacebookIcon /></span> Facebook
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none"><FacebookIcon /></span>
                <input
                  type="url"
                  value={form.facebook}
                  onChange={(e) => set('facebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 text-pink-500 inline-block"><InstagramIcon /></span> Instagram
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500 pointer-events-none"><InstagramIcon /></span>
                <input
                  type="url"
                  value={form.instagram}
                  onChange={(e) => set('instagram', e.target.value)}
                  placeholder="https://instagram.com/yourhandle"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Twitter / X */}
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 text-sky-500 inline-block"><TwitterIcon /></span> Twitter / X
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500 pointer-events-none"><TwitterIcon /></span>
                <input
                  type="url"
                  value={form.twitter}
                  onChange={(e) => set('twitter', e.target.value)}
                  placeholder="https://twitter.com/yourhandle"
                  className={inputClass}
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none" />
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => set('whatsapp', e.target.value)}
                  placeholder="+234 800 000 0000"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleSave}
            className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-10 px-6 rounded-xl gap-2"
            style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
          >
            <Save className="w-4 h-4" />
            Save General Settings
          </Button>
          <SavedPill visible={saved} />
        </div>
      </div>
    </SectionCard>
  )
}

// ─── Section 5: AI Chat Emergency Contact ────────────────────────────────────

function AIChatEmergencyContact() {
  const [contactNumber, setContactNumber] = useState('+234 802 000 9999')
  const [contactName,   setContactName]   = useState('Emeka Eze (Support Lead)')
  const [saved,         setSaved]         = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border-2 border-amber-200 overflow-hidden"
      style={{ boxShadow: '0 2px 20px rgba(245,158,11,0.12)' }}
    >
      {/* Header — distinct amber accent */}
      <div className="px-6 py-5 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Bot className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-xs uppercase tracking-widest text-amber-600 font-bold">AI Chat System</p>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 border border-amber-200 rounded-full text-[10px] font-bold text-amber-700">
              <ShieldAlert className="w-3 h-3" />
              Sensitive
            </span>
          </div>
          <h2 className="text-base font-bold text-text-primary">Emergency Escalation Contact</h2>
        </div>
      </div>

      <div className="px-6 py-6 space-y-5">

        {/* Explanation box */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-800 mb-1">How this contact is used</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              This contact is <strong>never shown publicly</strong> on the storefront. It is only shared automatically with a customer by the AI Chat system if a complaint escalation has not received a human response within <strong>5 minutes</strong>. The AI will send the customer a message like: <em>&quot;Our team hasn&apos;t responded yet. You can reach our support lead directly at [this number].&quot;</em>
            </p>
            <p className="text-xs text-amber-600 font-semibold mt-2">
              ⚠ Make sure this number is always reachable during business hours.
            </p>
          </div>
        </div>

        {/* Contact name */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
            Contact Person Name
          </label>
          <p className="text-xs text-text-secondary mb-2">
            The name of the person or team the AI will reference when sharing this contact.
          </p>
          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="e.g. Emeka Eze (Support Lead)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-200 bg-white text-sm font-semibold text-text-primary placeholder-text-secondary focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/15 transition"
            />
          </div>
        </div>

        {/* Contact number */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
            Emergency Contact Number
          </label>
          <p className="text-xs text-text-secondary mb-2">
            Phone number (WhatsApp preferred) shared with customers only during unresolved escalations.
          </p>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500 pointer-events-none" />
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="+234 800 000 0000"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-200 bg-white text-sm font-bold text-text-primary placeholder-text-secondary focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/15 transition"
            />
          </div>
        </div>

        {/* Preview of what the AI will say */}
        {contactNumber && contactName && (
          <div className="p-4 bg-bg-secondary border border-border-light rounded-2xl">
            <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold mb-2">
              AI Message Preview (after 5 min timeout)
            </p>
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 bg-white border border-border-light rounded-xl px-3 py-2.5 text-xs text-text-primary leading-relaxed">
                Hi! Our support team hasn&apos;t responded to your complaint yet. You can reach{' '}
                <strong>{contactName}</strong> directly at{' '}
                <span className="text-brand-orange font-bold">{contactNumber}</span> for urgent assistance.
                We apologise for the delay.
              </div>
            </div>
          </div>
        )}

        {/* Save */}
        <div className="flex items-center gap-3 pt-1">
          <Button
            onClick={handleSave}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold h-10 px-6 rounded-xl gap-2"
            style={{ boxShadow: '0 4px 16px rgba(245,158,11,0.25)' }}
          >
            <Save className="w-4 h-4" />
            Save Emergency Contact
          </Button>
          <SavedPill visible={saved} />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminSettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-bg-secondary flex">

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />

      {/* ── Mobile sidebar overlay ────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative w-64 bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-4 py-4 border-b border-border-light">
              <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Marketplace Admin
              </span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 hover:bg-bg-secondary rounded-full">
                <X className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
            <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto">
              {SIDEBAR_NAV.map((item) => {
                const Icon = item.icon
                const isActive = pathname && pathname.startsWith(item.href)
                return (
                  <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                    <div className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all ${
                      isActive ? 'bg-orange-50 text-brand-orange' : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                    }`}>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className={`text-sm font-medium ${isActive ? 'font-semibold text-brand-orange' : ''}`}>{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">

          {/* ── Page heading ──────────────────────────────────────────────── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="flex items-start justify-between gap-4 flex-wrap"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                Administration
              </p>
              <h1 className="text-2xl font-bold text-text-primary">Site Settings</h1>
              <p className="text-sm text-text-secondary mt-1">
                Manage your homepage banners, featured categories, footer content, business info, and AI escalation settings.
              </p>
            </div>
          </motion.div>

          {/* ── Section 1: Banner Manager ─────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
          >
            <BannerManager />
          </motion.div>

          {/* ── Section 2: Featured Categories ───────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <FeaturedCategoriesSelector />
          </motion.div>

          {/* ── Section 3: Footer & Trust Badges ─────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <FooterTrustEditor />
          </motion.div>

          {/* ── Section 4: General Settings ──────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <GeneralSettingsForm />
          </motion.div>

          {/* ── Section 5: AI Chat Emergency Contact ─────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <AIChatEmergencyContact />
          </motion.div>

          <div className="h-4" />
        </main>
      </div>
    </div>
  )
}
