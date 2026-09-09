'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
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
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Menu,
  X,
  CheckCircle2,
  EyeOff,
  Trash2,
  Eye,
  Flag,
  MessageCircle,
  AlertCircle,
  Clock,
  CheckCheck,
  Send,
  Filter,
  StarHalf,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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
  { label: 'Reviews',    icon: Star,            href: '/admin/reviews', active: true },
  { label: 'Discounts',  icon: Percent,         href: '/admin/discounts' },
  { label: 'Easy Buy',   icon: Zap,             href: '/admin/easy-buy' },
  { label: 'Chats',      icon: MessageSquare,   href: '/admin/chats' },
  { label: 'Settings',   icon: Settings,        href: '/admin/settings' },
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
            placeholder="Search reviews, disputes..."
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

// ─── Mock Reviews Data ────────────────────────────────────────────────────────

const MOCK_REVIEWS = [
  {
    id: 'REV-001',
    product: 'Apple iPhone 15 Pro Max 256GB',
    productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=48&h=48&fit=crop',
    customer: 'Adaeze Okonkwo',
    customerAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=32&h=32&fit=crop&crop=face',
    rating: 5,
    excerpt: 'Absolutely love this phone! The camera quality is outstanding and the battery life is incredible. Best purchase I have made this year.',
    date: '2025-07-18',
    status: 'Published',
  },
  {
    id: 'REV-002',
    product: 'Samsung Galaxy S24 Ultra 512GB',
    productImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=48&h=48&fit=crop',
    customer: 'Emeka Nwosu',
    customerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face',
    rating: 4,
    excerpt: 'Great phone overall. The S-Pen is very useful for my work. Delivery was fast and packaging was secure. Minor issue with heating.',
    date: '2025-07-15',
    status: 'Published',
  },
  {
    id: 'REV-003',
    product: 'Sony WH-1000XM5 Headphones',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=48&h=48&fit=crop',
    customer: 'Ngozi Eze',
    customerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    rating: 5,
    excerpt: 'The noise cancellation is absolutely top-notch. I use these every day at the office and they block out everything. Worth every naira!',
    date: '2025-07-14',
    status: 'Published',
  },
  {
    id: 'REV-004',
    product: 'MacBook Air M3 16GB 512GB',
    productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=48&h=48&fit=crop',
    customer: 'Chidi Okafor',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    rating: 5,
    excerpt: 'This laptop is a beast. Handles all my design work without breaking a sweat. The battery lasts all day. Highly recommend to professionals.',
    date: '2025-07-12',
    status: 'Published',
  },
  {
    id: 'REV-005',
    product: 'Dior Sauvage EDP 100ml',
    productImage: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=48&h=48&fit=crop',
    customer: 'Fatima Bello',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face',
    rating: 2,
    excerpt: 'I suspect this is not original. The scent fades within 2 hours and the bottle looks slightly different from what I have seen in stores.',
    date: '2025-07-11',
    status: 'Flagged',
  },
  {
    id: 'REV-006',
    product: 'Samsung 55" 4K Smart TV',
    productImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=48&h=48&fit=crop',
    customer: 'Amina Yusuf',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face',
    rating: 4,
    excerpt: 'Picture quality is stunning. Smart features work well with Netflix and YouTube. Setup was straightforward. Remote could be better designed.',
    date: '2025-07-10',
    status: 'Published',
  },
  {
    id: 'REV-007',
    product: 'Dyson V15 Detect Vacuum',
    productImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=48&h=48&fit=crop',
    customer: 'Hauwa Musa',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face',
    rating: 5,
    excerpt: 'This vacuum is incredible. Picks up everything including pet hair. The laser detection feature is genius. My house has never been cleaner.',
    date: '2025-07-09',
    status: 'Published',
  },
  {
    id: 'REV-008',
    product: 'Apple AirPods Pro 2nd Gen',
    productImage: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=48&h=48&fit=crop',
    customer: 'Rotimi Afolabi',
    customerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=32&h=32&fit=crop&crop=face',
    rating: 4,
    excerpt: 'Excellent sound quality and the ANC is very good. Fit is comfortable for long listening sessions. Charging case is compact and convenient.',
    date: '2025-07-08',
    status: 'Published',
  },
  {
    id: 'REV-009',
    product: "L'Oréal Hyaluronic Acid Serum",
    productImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=48&h=48&fit=crop',
    customer: 'Kemi Adebayo',
    customerAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face',
    rating: 3,
    excerpt: 'Product is okay but I have used better serums. Skin feels slightly hydrated but nothing dramatic. Packaging arrived slightly damaged.',
    date: '2025-07-07',
    status: 'Published',
  },
  {
    id: 'REV-010',
    product: 'Nikon Z50 Mirrorless Camera',
    productImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=48&h=48&fit=crop',
    customer: 'Seun Adesanya',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    rating: 5,
    excerpt: 'Absolutely stunning image quality. The autofocus is lightning fast. Perfect for both photography and videography. Very happy with this purchase.',
    date: '2025-07-06',
    status: 'Published',
  },
  {
    id: 'REV-011',
    product: 'Hisense 200L Chest Freezer',
    productImage: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=48&h=48&fit=crop',
    customer: 'Tunde Adeyemi',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
    rating: 1,
    excerpt: 'This product is a scam. Stopped working after 3 days. Customer service is useless. I want a full refund immediately. Do not buy from this store.',
    date: '2025-07-05',
    status: 'Flagged',
  },
  {
    id: 'REV-012',
    product: 'Baseus 20000mAh Power Bank',
    productImage: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=48&h=48&fit=crop',
    customer: 'Blessing Obi',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face',
    rating: 4,
    excerpt: 'Charges my phone quickly and the capacity is as advertised. Compact enough to carry in a bag. Good value for money at this price point.',
    date: '2025-07-04',
    status: 'Hidden',
  },
]

// ─── Mock Disputes Data ───────────────────────────────────────────────────────

const MOCK_DISPUTES = [
  {
    id: 'DIS-001',
    customer: 'Adaeze Okonkwo',
    customerAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&h=40&fit=crop&crop=face',
    orderId: 'ORD-10041',
    subject: 'Item arrived damaged',
    description: 'My iPhone 15 Pro Max arrived with a cracked screen protector and a dent on the box. The phone itself seems fine but I am concerned about internal damage. I need this resolved urgently.',
    date: '2025-07-19',
    status: 'Open',
    priority: 'High',
  },
  {
    id: 'DIS-002',
    customer: 'Emeka Nwosu',
    customerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
    orderId: 'ORD-10040',
    subject: 'Wrong item delivered',
    description: 'I ordered the Samsung Galaxy S24 Ultra in Titanium Black but received the Titanium Gray variant. I specifically chose black. Please arrange a swap or refund.',
    date: '2025-07-18',
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    id: 'DIS-003',
    customer: 'Fatima Bello',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
    orderId: 'ORD-10039',
    subject: 'Suspected counterfeit perfume',
    description: 'The Dior Sauvage I received does not smell like the original. The scent fades within 2 hours and the bottle serial number does not match Dior records. I believe this is a fake product.',
    date: '2025-07-17',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: 'DIS-004',
    customer: 'Chidi Okafor',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    orderId: 'ORD-10038',
    subject: 'Easy Buy instalment not reflecting',
    description: 'I was approved for Easy Buy on my MacBook Air M3 but the first instalment deduction has not been processed. My bank account shows no debit. Please check and confirm.',
    date: '2025-07-16',
    status: 'Open',
    priority: 'Medium',
  },
  {
    id: 'DIS-005',
    customer: 'Tunde Adeyemi',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    orderId: 'ORD-10036',
    subject: 'Freezer stopped working after 3 days',
    description: 'The Hisense chest freezer I purchased stopped cooling completely after just 3 days of use. I have tried all troubleshooting steps. This is clearly a manufacturing defect. I want a replacement.',
    date: '2025-07-14',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: 'DIS-006',
    customer: 'Ngozi Eze',
    customerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    orderId: 'ORD-10037',
    subject: 'Delivery delayed by 5 days',
    description: 'My order was supposed to arrive on July 3rd but it did not arrive until July 8th. No communication was sent about the delay. I had to call multiple times to get updates.',
    date: '2025-07-10',
    status: 'Resolved',
    priority: 'Low',
  },
  {
    id: 'DIS-007',
    customer: 'Amina Yusuf',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
    orderId: 'ORD-10035',
    subject: 'TV remote not included in package',
    description: 'The Samsung 55" TV arrived without the remote control. The box was sealed so it must have been missing from the factory. Please send the remote as soon as possible.',
    date: '2025-07-09',
    status: 'Resolved',
    priority: 'Medium',
  },
  {
    id: 'DIS-008',
    customer: 'Kelechi Ibe',
    customerAvatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face',
    orderId: 'ORD-10032',
    subject: 'Refund not received after 14 days',
    description: 'My refund for order ORD-10032 was approved on June 21st but I have not received the money in my account after 14 days. My bank says no transfer has been initiated from your end.',
    date: '2025-07-05',
    status: 'Open',
    priority: 'High',
  },
]

// ─── Helper Components ────────────────────────────────────────────────────────

function StarRating({ rating, size = 'sm' }) {
  const sz = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sz} flex-shrink-0 ${
            i <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

function ReviewStatusBadge({ status }) {
  const map = {
    Published: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    Flagged:   { bg: 'bg-red-100',     text: 'text-red-600',     dot: 'bg-red-500' },
    Hidden:    { bg: 'bg-gray-100',    text: 'text-gray-500',    dot: 'bg-gray-400' },
  }
  const s = map[status] || map.Hidden
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {status}
    </span>
  )
}

function DisputeStatusBadge({ status }) {
  const map = {
    'Open':        { bg: 'bg-red-100',    text: 'text-red-600',     icon: AlertCircle },
    'In Progress': { bg: 'bg-amber-100',  text: 'text-amber-700',   icon: Clock },
    'Resolved':    { bg: 'bg-emerald-100',text: 'text-emerald-700', icon: CheckCheck },
  }
  const s   = map[status] || map['Open']
  const Icon = s.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  )
}

function PriorityBadge({ priority }) {
  const map = {
    High:   { bg: 'bg-red-50',    text: 'text-red-500',    border: 'border-red-200' },
    Medium: { bg: 'bg-amber-50',  text: 'text-amber-600',  border: 'border-amber-200' },
    Low:    { bg: 'bg-gray-50',   text: 'text-gray-500',   border: 'border-gray-200' },
  }
  const s = map[priority] || map.Low
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border ${s.bg} ${s.text} ${s.border}`}>
      {priority}
    </span>
  )
}

// ─── Respond Sheet ────────────────────────────────────────────────────────────

function RespondSheet({ dispute, onClose, onUpdateStatus }) {
  const [status,   setStatus]   = useState(dispute.status)
  const [response, setResponse] = useState('')

  if (!dispute) return null

  const handleSend = () => {
    onUpdateStatus(dispute.id, status)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className="relative ml-auto w-full max-w-lg bg-white h-full flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-border-light flex-shrink-0">
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-0.5">Dispute Response</p>
            <h2 className="text-base font-bold text-text-primary">{dispute.id}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-bg-secondary rounded-full transition">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Customer + order info */}
          <div className="flex items-center gap-4 bg-bg-secondary rounded-2xl p-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-border-light flex-shrink-0">
              <img src={dispute.customerAvatar} alt={dispute.customer} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-text-primary">{dispute.customer}</p>
              <p className="text-xs text-text-secondary mt-0.5">Order: <span className="font-semibold text-brand-orange">{dispute.orderId}</span></p>
              <p className="text-xs text-text-secondary mt-0.5">{dispute.date}</p>
            </div>
            <div className="ml-auto flex flex-col items-end gap-1.5 flex-shrink-0">
              <DisputeStatusBadge status={dispute.status} />
              <PriorityBadge priority={dispute.priority} />
            </div>
          </div>

          {/* Subject + description */}
          <div className="bg-bg-secondary rounded-2xl p-4 space-y-2">
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">Complaint</p>
            <p className="text-sm font-bold text-text-primary">{dispute.subject}</p>
            <p className="text-sm text-text-secondary leading-relaxed">{dispute.description}</p>
          </div>

          {/* Update status */}
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">Update Status</p>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition appearance-none cursor-pointer"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Response textarea */}
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">Your Response</p>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={5}
              placeholder="Type your response to the customer here..."
              className="w-full px-4 py-3 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition resize-none"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border-light flex items-center gap-3 flex-shrink-0">
          <Button
            onClick={handleSend}
            className="flex-1 bg-brand-orange hover:bg-orange-600 text-white font-semibold rounded-xl gap-2 h-11"
            style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
          >
            <Send className="w-4 h-4" />
            Send Response
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="h-11 px-5 rounded-xl border-border-light text-text-secondary hover:text-text-primary"
          >
            Cancel
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Reviews Table ────────────────────────────────────────────────────────────

const REVIEWS_PAGE_SIZE = 8

function ReviewsTable({ reviews, onUpdateStatus, onDelete }) {
  const [search,       setSearch]       = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [ratingFilter, setRatingFilter] = useState('All')
  const [sortKey,      setSortKey]      = useState('date')
  const [sortDir,      setSortDir]      = useState('desc')
  const [page,         setPage]         = useState(1)

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        r.product.toLowerCase().includes(q) ||
        r.customer.toLowerCase().includes(q) ||
        r.excerpt.toLowerCase().includes(q)
      const matchStatus = statusFilter === 'All' || r.status === statusFilter
      const matchRating = ratingFilter === 'All' || r.rating === Number(ratingFilter)
      return matchSearch && matchStatus && matchRating
    })
  }, [reviews, search, statusFilter, ratingFilter])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let av = a[sortKey]
      let bv = b[sortKey]
      if (typeof av === 'string') av = av.toLowerCase()
      if (typeof bv === 'string') bv = bv.toLowerCase()
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1  : -1
      return 0
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / REVIEWS_PAGE_SIZE))
  const paged      = sorted.slice((page - 1) * REVIEWS_PAGE_SIZE, page * REVIEWS_PAGE_SIZE)

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
    setPage(1)
  }

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ChevronsUpDown className="w-3 h-3 text-text-secondary opacity-40" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-brand-orange" />
      : <ChevronDown className="w-3 h-3 text-brand-orange" />
  }

  const cols = [
    { key: 'product',  label: 'Product'  },
    { key: 'customer', label: 'Customer' },
    { key: 'rating',   label: 'Rating'   },
    { key: 'excerpt',  label: 'Review'   },
    { key: 'date',     label: 'Date'     },
    { key: 'status',   label: 'Status'   },
  ]

  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Section header */}
      <div className="px-5 py-4 border-b border-border-light">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-0.5">Moderation</p>
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              Product Reviews
              <span className="text-sm font-semibold bg-orange-100 text-brand-orange px-2.5 py-0.5 rounded-full">
                {reviews.length}
              </span>
            </h2>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="search-glow flex-1 min-w-[200px] max-w-xs flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border-light bg-bg-secondary">
            <Search className="w-4 h-4 text-text-secondary flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search product, customer..."
              className="bg-transparent outline-none flex-1 text-sm text-text-primary placeholder-text-secondary"
            />
            {search && (
              <button onClick={() => { setSearch(''); setPage(1) }} className="text-text-secondary hover:text-text-primary">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            className="px-3 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange transition cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Flagged">Flagged</option>
            <option value="Hidden">Hidden</option>
          </select>

          {/* Rating filter */}
          <select
            value={ratingFilter}
            onChange={(e) => { setRatingFilter(e.target.value); setPage(1) }}
            className="px-3 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange transition cursor-pointer"
          >
            <option value="All">All Ratings</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>
            ))}
          </select>

          <p className="text-xs text-text-secondary ml-auto">
            <span className="font-semibold text-text-primary">{sorted.length}</span> reviews
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-secondary border-b border-border-light">
              {cols.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.key !== 'excerpt' && handleSort(col.key)}
                  className={`px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider select-none whitespace-nowrap ${
                    col.key !== 'excerpt' ? 'cursor-pointer hover:text-text-primary transition-colors' : ''
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.key !== 'excerpt' && <SortIcon col={col.key} />}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border-light">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
                      <Star className="w-7 h-7 text-brand-orange" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-semibold text-text-primary">No reviews found</p>
                    <p className="text-xs text-text-secondary">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((review) => (
                <tr key={review.id} className="hover:bg-bg-secondary/60 transition-colors">

                  {/* Product */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-border-light bg-bg-secondary flex-shrink-0">
                        <img src={review.productImage} alt={review.product} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs font-semibold text-text-primary max-w-[140px] line-clamp-2 leading-snug">
                        {review.product}
                      </p>
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-border-light flex-shrink-0">
                        <img src={review.customerAvatar} alt={review.customer} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-medium text-text-primary">{review.customer}</span>
                    </div>
                  </td>

                  {/* Star rating */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex flex-col gap-0.5">
                      <StarRating rating={review.rating} />
                      <span className="text-[11px] text-text-secondary font-medium">{review.rating}/5</span>
                    </div>
                  </td>

                  {/* Review excerpt */}
                  <td className="px-4 py-3.5 max-w-[240px]">
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">{review.excerpt}</p>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm text-text-secondary">{review.date}</span>
                  </td>

                  {/* Status badge */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <ReviewStatusBadge status={review.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {/* Approve / Publish */}
                      <button
                        onClick={() => onUpdateStatus(review.id, 'Published')}
                        title="Approve / Publish"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      {/* Hide */}
                      <button
                        onClick={() => onUpdateStatus(review.id, 'Hidden')}
                        title="Hide review"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:bg-bg-secondary transition-colors"
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => onDelete(review.id)}
                        title="Delete review"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-3.5 border-t border-border-light flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-text-secondary">
          Showing{' '}
          <span className="font-semibold text-text-primary">
            {sorted.length === 0 ? 0 : (page - 1) * REVIEWS_PAGE_SIZE + 1}–{Math.min(page * REVIEWS_PAGE_SIZE, sorted.length)}
          </span>{' '}
          of <span className="font-semibold text-text-primary">{sorted.length}</span> reviews
        </p>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline" size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="h-8 w-8 p-0 border-border-light disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              variant={p === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPage(p)}
              className={`h-8 w-8 p-0 text-xs font-semibold ${
                p === page
                  ? 'bg-brand-orange hover:bg-orange-600 text-white border-brand-orange'
                  : 'border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange'
              }`}
            >
              {p}
            </Button>
          ))}
          <Button
            variant="outline" size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="h-8 w-8 p-0 border-border-light disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Disputes Section ─────────────────────────────────────────────────────────

function DisputesSection({ disputes, onRespond }) {
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = useMemo(() => {
    return disputes.filter((d) =>
      statusFilter === 'All' || d.status === statusFilter
    )
  }, [disputes, statusFilter])

  const openCount       = disputes.filter((d) => d.status === 'Open').length
  const inProgressCount = disputes.filter((d) => d.status === 'In Progress').length
  const resolvedCount   = disputes.filter((d) => d.status === 'Resolved').length

  return (
    <motion.div
      variants={fadeContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="space-y-4"
    >
      {/* Section header */}
      <motion.div variants={fadeIn} className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">Support</p>
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            Customer Disputes &amp; Complaints
            <span className="text-sm font-semibold bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full">
              {openCount} open
            </span>
          </h2>
          <p className="text-sm text-text-secondary mt-1">Manage and resolve customer complaints and disputes.</p>
        </div>

        {/* Status filter pills */}
        <div className="flex items-center gap-1.5 bg-bg-secondary border border-border-light rounded-xl p-1">
          {['All', 'Open', 'In Progress', 'Resolved'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === s
                  ? s === 'Open'
                    ? 'bg-red-500 text-white shadow-sm'
                    : s === 'In Progress'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : s === 'Resolved'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-brand-orange text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white'
              }`}
            >
              {s}
              {s !== 'All' && (
                <span className="ml-1.5 opacity-80">
                  {s === 'Open' ? openCount : s === 'In Progress' ? inProgressCount : resolvedCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Dispute cards grid */}
      {filtered.length === 0 ? (
        <motion.div
          variants={fadeCard}
          className="bg-white rounded-2xl border border-border-light p-16 text-center"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCheck className="w-7 h-7 text-emerald-500" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-semibold text-text-primary">No disputes in this category</p>
            <p className="text-xs text-text-secondary">All clear!</p>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((dispute) => (
            <motion.div
              key={dispute.id}
              variants={fadeCard}
              className={`bg-white rounded-2xl border overflow-hidden hover:shadow-md transition-shadow ${
                dispute.status === 'Open'
                  ? 'border-red-200'
                  : dispute.status === 'In Progress'
                  ? 'border-amber-200'
                  : 'border-border-light'
              }`}
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            >
              {/* Card top accent bar */}
              <div className={`h-1 w-full ${
                dispute.status === 'Open'
                  ? 'bg-red-400'
                  : dispute.status === 'In Progress'
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'
              }`} />

              <div className="p-5">
                {/* Top row: customer + badges */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-border-light flex-shrink-0">
                      <img src={dispute.customerAvatar} alt={dispute.customer} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary">{dispute.customer}</p>
                      <p className="text-xs text-text-secondary mt-0.5">
                        <span className="font-semibold text-brand-orange">{dispute.orderId}</span> · {dispute.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <DisputeStatusBadge status={dispute.status} />
                    <PriorityBadge priority={dispute.priority} />
                  </div>
                </div>

                {/* Subject */}
                <p className="text-sm font-bold text-text-primary mb-2">{dispute.subject}</p>

                {/* Description excerpt */}
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 mb-4">
                  {dispute.description}
                </p>

                {/* Footer: dispute ID + respond button */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-border-light">
                  <span className="text-xs font-semibold text-text-secondary">{dispute.id}</span>
                  <Button
                    onClick={() => onRespond(dispute)}
                    size="sm"
                    className={`h-8 px-4 text-xs font-semibold rounded-xl gap-1.5 ${
                      dispute.status === 'Resolved'
                        ? 'bg-bg-secondary text-text-secondary hover:bg-gray-100 border border-border-light'
                        : 'bg-brand-orange hover:bg-orange-600 text-white'
                    }`}
                    style={dispute.status !== 'Resolved' ? { boxShadow: '0 2px 8px rgba(246,139,30,0.25)' } : {}}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {dispute.status === 'Resolved' ? 'View' : 'Respond'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminReviewsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false)
  const pathname = usePathname()
  const [reviews,          setReviews]          = useState(MOCK_REVIEWS)
  const [disputes,         setDisputes]         = useState(MOCK_DISPUTES)
  const [respondingTo,     setRespondingTo]     = useState(null)

  const handleUpdateReviewStatus = (id, status) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status } : r))
  }

  const handleDeleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id))
  }

  const handleUpdateDisputeStatus = (id, status) => {
    setDisputes((prev) => prev.map((d) => d.id === id ? { ...d, status } : d))
  }

  // Stats
  const publishedCount = reviews.filter((r) => r.status === 'Published').length
  const flaggedCount   = reviews.filter((r) => r.status === 'Flagged').length
  const hiddenCount    = reviews.filter((r) => r.status === 'Hidden').length
  const avgRating      = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'
  const openDisputes   = disputes.filter((d) => d.status === 'Open').length

  return (
    <div className="min-h-screen bg-bg-secondary flex overflow-x-hidden">

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
          <motion.div variants={fadeIn} initial="hidden" animate="show">
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">Moderation</p>
            <h1 className="text-2xl font-bold text-text-primary">Reviews &amp; Disputes</h1>
            <p className="text-sm text-text-secondary mt-1">
              Moderate product reviews and resolve customer complaints.
            </p>
          </motion.div>

          {/* ── Stats row ─────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {[
              {
                label: 'Total Reviews',
                value: reviews.length,
                color: 'text-brand-orange',
                accent: 'bg-brand-orange',
                iconBg: 'bg-orange-50',
                icon: Star,
                iconColor: 'text-brand-orange',
              },
              {
                label: 'Published',
                value: publishedCount,
                color: 'text-emerald-600',
                accent: 'bg-emerald-500',
                iconBg: 'bg-emerald-50',
                icon: Eye,
                iconColor: 'text-emerald-600',
              },
              {
                label: 'Flagged',
                value: flaggedCount,
                color: 'text-red-500',
                accent: 'bg-red-500',
                iconBg: 'bg-red-50',
                icon: Flag,
                iconColor: 'text-red-500',
              },
              {
                label: 'Avg. Rating',
                value: avgRating,
                color: 'text-amber-600',
                accent: 'bg-amber-500',
                iconBg: 'bg-amber-50',
                icon: StarHalf,
                iconColor: 'text-amber-600',
              },
              {
                label: 'Open Disputes',
                value: openDisputes,
                color: 'text-violet-600',
                accent: 'bg-violet-500',
                iconBg: 'bg-violet-50',
                icon: AlertCircle,
                iconColor: 'text-violet-600',
              },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeCard}
                  className="bg-white rounded-2xl border border-border-light p-5 hover:shadow-md transition-shadow"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold leading-tight">{stat.label}</p>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.iconBg}`}>
                      <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                    </div>
                  </div>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  <div className={`mt-4 h-1 rounded-full ${stat.accent} opacity-30`} />
                </motion.div>
              )
            })}
          </motion.div>

          {/* ── Reviews Table ─────────────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
          >
            <ReviewsTable
              reviews={reviews}
              onUpdateStatus={handleUpdateReviewStatus}
              onDelete={handleDeleteReview}
            />
          </motion.div>

          {/* ── Disputes Section ──────────────────────────────────────────── */}
          <DisputesSection
            disputes={disputes}
            onRespond={(dispute) => setRespondingTo(dispute)}
          />

          <div className="h-4" />
        </main>
      </div>

      {/* ── Respond Sheet ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {respondingTo && (
          <RespondSheet
            dispute={respondingTo}
            onClose={() => setRespondingTo(null)}
            onUpdateStatus={handleUpdateDisputeStatus}
          />
        )}
      </AnimatePresence>

    </div>
  )
}
