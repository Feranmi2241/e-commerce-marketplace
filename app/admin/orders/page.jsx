'use client'

import { useState, useMemo, useRef } from 'react'
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
  Phone,
  Mail,
  MapPin,
  Save,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  Clock,
  XCircle,
  PackageCheck,
  RefreshCw,
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
  { label: 'Orders',     icon: ShoppingBag,     href: '/admin/orders', active: true },
  { label: 'Customers',  icon: Users,           href: '/admin/customers' },
  { label: 'Analytics',  icon: BarChart2,       href: '/admin/analytics' },
  { label: 'Reviews',    icon: Star,            href: '/admin/reviews' },
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

// ─── Constants ────────────────────────────────────────────────────────────────

const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded']
const PAYMENT_METHODS = ['Card', 'Transfer', 'USSD', 'Easy Buy']

// ─── Mock Orders ──────────────────────────────────────────────────────────────

const MOCK_ORDERS = [
  {
    id: 'ORD-10041',
    customer: { name: 'Adaeze Okonkwo',   email: 'adaeze.o@gmail.com',   phone: '+234 803 221 4455' },
    address:  { line1: '14 Adeola Odeku Street', city: 'Victoria Island', state: 'Lagos' },
    date: '2025-07-10',
    items: [
      { name: 'Apple iPhone 15 Pro Max 256GB', qty: 1, price: 1150000, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=56&h=56&fit=crop' },
      { name: 'Anker 65W USB-C GaN Charger',   qty: 2, price: 18500,   image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=56&h=56&fit=crop' },
    ],
    total: 1187000,
    payment: 'Easy Buy',
    easyBuy: true,
    status: 'Processing',
    tracking: '',
  },
  {
    id: 'ORD-10040',
    customer: { name: 'Emeka Nwosu',       email: 'emeka.nwosu@yahoo.com', phone: '+234 706 334 8821' },
    address:  { line1: '7 Wuse Zone 5',    city: 'Abuja',                  state: 'FCT' },
    date: '2025-07-09',
    items: [
      { name: 'Samsung Galaxy S24 Ultra 512GB', qty: 1, price: 980000, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=56&h=56&fit=crop' },
    ],
    total: 980000,
    payment: 'Card',
    easyBuy: true,
    status: 'Shipped',
    tracking: 'GIG-2025-884421',
  },
  {
    id: 'ORD-10039',
    customer: { name: 'Fatima Bello',      email: 'fatima.b@outlook.com',  phone: '+234 812 009 3344' },
    address:  { line1: '22 Ahmadu Bello Way', city: 'Kaduna',              state: 'Kaduna' },
    date: '2025-07-09',
    items: [
      { name: 'Dior Sauvage EDP 100ml',         qty: 1, price: 68000,  image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=56&h=56&fit=crop' },
      { name: "L'Oréal Hyaluronic Acid Serum",  qty: 2, price: 14500,  image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=56&h=56&fit=crop' },
    ],
    total: 97000,
    payment: 'Transfer',
    easyBuy: false,
    status: 'Delivered',
    tracking: 'DHL-NG-20250709',
  },
  {
    id: 'ORD-10038',
    customer: { name: 'Chidi Okafor',      email: 'chidi.ok@gmail.com',    phone: '+234 901 556 7712' },
    address:  { line1: '3 Trans-Amadi Rd', city: 'Port Harcourt',          state: 'Rivers' },
    date: '2025-07-08',
    items: [
      { name: 'MacBook Air M3 16GB 512GB',      qty: 1, price: 1480000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=56&h=56&fit=crop' },
    ],
    total: 1480000,
    payment: 'Easy Buy',
    easyBuy: true,
    status: 'Pending',
    tracking: '',
  },
  {
    id: 'ORD-10037',
    customer: { name: 'Ngozi Eze',         email: 'ngozi.eze@gmail.com',   phone: '+234 805 443 2210' },
    address:  { line1: '9 Ogui Road',      city: 'Enugu',                  state: 'Enugu' },
    date: '2025-07-08',
    items: [
      { name: 'Sony WH-1000XM5 Headphones', qty: 1, price: 189000, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=56&h=56&fit=crop' },
      { name: 'Baseus 20000mAh Power Bank',  qty: 1, price: 32000,  image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=56&h=56&fit=crop' },
    ],
    total: 221000,
    payment: 'Card',
    easyBuy: false,
    status: 'Delivered',
    tracking: 'GIG-2025-771002',
  },
  {
    id: 'ORD-10036',
    customer: { name: 'Tunde Adeyemi',     email: 'tunde.a@hotmail.com',   phone: '+234 703 887 5566' },
    address:  { line1: '45 Bode Thomas St', city: 'Surulere',              state: 'Lagos' },
    date: '2025-07-07',
    items: [
      { name: 'Hisense 200L Chest Freezer',  qty: 1, price: 210000, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=56&h=56&fit=crop' },
    ],
    total: 210000,
    payment: 'USSD',
    easyBuy: false,
    status: 'Cancelled',
    tracking: '',
  },
  {
    id: 'ORD-10035',
    customer: { name: 'Amina Yusuf',       email: 'amina.y@gmail.com',     phone: '+234 816 220 9934' },
    address:  { line1: '11 Murtala Muhammed Way', city: 'Kano',            state: 'Kano' },
    date: '2025-07-07',
    items: [
      { name: 'Samsung 55" 4K Smart TV',    qty: 1, price: 485000, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=56&h=56&fit=crop' },
    ],
    total: 485000,
    payment: 'Easy Buy',
    easyBuy: true,
    status: 'Shipped',
    tracking: 'FEDEX-NG-20250707',
  },
  {
    id: 'ORD-10034',
    customer: { name: 'Seun Adesanya',     email: 'seun.a@gmail.com',      phone: '+234 909 112 4478' },
    address:  { line1: '2 Awolowo Road',   city: 'Ikoyi',                  state: 'Lagos' },
    date: '2025-07-06',
    items: [
      { name: 'Nikon Z50 Mirrorless Camera', qty: 1, price: 580000, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=56&h=56&fit=crop' },
      { name: 'Anker 65W USB-C GaN Charger', qty: 1, price: 18500,  image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=56&h=56&fit=crop' },
    ],
    total: 598500,
    payment: 'Card',
    easyBuy: true,
    status: 'Processing',
    tracking: '',
  },
  {
    id: 'ORD-10033',
    customer: { name: 'Blessing Obi',      email: 'blessing.o@yahoo.com',  phone: '+234 802 334 6671' },
    address:  { line1: '18 Aba Road',      city: 'Port Harcourt',          state: 'Rivers' },
    date: '2025-07-06',
    items: [
      { name: 'LG 9kg Front Load Washing Machine', qty: 1, price: 320000, image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=56&h=56&fit=crop' },
    ],
    total: 320000,
    payment: 'Transfer',
    easyBuy: true,
    status: 'Delivered',
    tracking: 'GIG-2025-660881',
  },
  {
    id: 'ORD-10032',
    customer: { name: 'Kelechi Ibe',       email: 'kelechi.i@gmail.com',   phone: '+234 705 998 2231' },
    address:  { line1: '6 Zik Avenue',     city: 'Awka',                   state: 'Anambra' },
    date: '2025-07-05',
    items: [
      { name: 'Instant Pot Duo 7-in-1 6Qt', qty: 1, price: 98000,  image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=56&h=56&fit=crop' },
      { name: "L'Oréal Hyaluronic Acid Serum", qty: 3, price: 14500, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=56&h=56&fit=crop' },
    ],
    total: 141500,
    payment: 'USSD',
    easyBuy: false,
    status: 'Refunded',
    tracking: '',
  },
  {
    id: 'ORD-10031',
    customer: { name: 'Hauwa Musa',        email: 'hauwa.m@gmail.com',     phone: '+234 813 445 7789' },
    address:  { line1: '33 Sokoto Road',   city: 'Zaria',                  state: 'Kaduna' },
    date: '2025-07-05',
    items: [
      { name: 'Dyson V15 Detect Vacuum',    qty: 1, price: 420000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=56&h=56&fit=crop' },
    ],
    total: 420000,
    payment: 'Easy Buy',
    easyBuy: true,
    status: 'Pending',
    tracking: '',
  },
  {
    id: 'ORD-10030',
    customer: { name: 'Rotimi Afolabi',    email: 'rotimi.a@gmail.com',    phone: '+234 907 221 3345' },
    address:  { line1: '5 Obafemi Awolowo Blvd', city: 'Ibadan',          state: 'Oyo' },
    date: '2025-07-04',
    items: [
      { name: 'Apple AirPods Pro 2nd Gen',  qty: 1, price: 265000, image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=56&h=56&fit=crop' },
      { name: 'Xiaomi Redmi Note 13 Pro',   qty: 1, price: 195000, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=56&h=56&fit=crop' },
    ],
    total: 460000,
    payment: 'Card',
    easyBuy: false,
    status: 'Delivered',
    tracking: 'DHL-NG-20250704',
  },
]

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
            placeholder="Search orders, customers..."
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    Pending:    { bg: 'bg-amber-100',   text: 'text-amber-700',   icon: Clock },
    Processing: { bg: 'bg-blue-100',    text: 'text-blue-700',    icon: RefreshCw },
    Shipped:    { bg: 'bg-violet-100',  text: 'text-violet-700',  icon: Truck },
    Delivered:  { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: PackageCheck },
    Cancelled:  { bg: 'bg-red-100',     text: 'text-red-600',     icon: XCircle },
    Refunded:   { bg: 'bg-gray-100',    text: 'text-gray-600',    icon: CheckCircle2 },
  }
  const s = map[status] || map.Pending
  const Icon = s.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  )
}

function PaymentIcon({ method }) {
  const map = {
    Card:     { icon: CreditCard,  label: 'Card',     color: 'text-blue-600' },
    Transfer: { icon: Banknote,    label: 'Transfer', color: 'text-emerald-600' },
    USSD:     { icon: Smartphone,  label: 'USSD',     color: 'text-violet-600' },
    'Easy Buy': { icon: Zap,       label: 'Easy Buy', color: 'text-amber-600' },
  }
  const m = map[method] || map.Card
  const Icon = m.icon
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${m.color}`}>
      <Icon className="w-3.5 h-3.5" />
      {m.label}
    </span>
  )
}

// ─── Order Detail Sheet ───────────────────────────────────────────────────────

function OrderSheet({ order, onClose, onUpdateStatus, onUpdateTracking }) {
  const [status,   setStatus]   = useState(order.status)
  const [tracking, setTracking] = useState(order.tracking)

  if (!order) return null

  const itemsTotal = order.items.reduce((acc, i) => acc + i.price * i.qty, 0)

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
        className="relative ml-auto w-full max-w-xl bg-white h-full flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light flex-shrink-0">
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-0.5">Order Details</p>
            <h2 className="text-lg font-bold text-text-primary">{order.id}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-bg-secondary rounded-full transition">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Customer info */}
          <div className="bg-bg-secondary rounded-2xl p-4 space-y-2">
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-3">Customer</p>
            <p className="text-sm font-bold text-text-primary">{order.customer.name}</p>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Mail className="w-3.5 h-3.5 flex-shrink-0" />
              {order.customer.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              {order.customer.phone}
            </div>
          </div>

          {/* Shipping address */}
          <div className="bg-bg-secondary rounded-2xl p-4">
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-3">Shipping Address</p>
            <div className="flex items-start gap-2 text-sm text-text-primary">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-brand-orange" />
              <span>{order.address.line1}, {order.address.city}, {order.address.state}</span>
            </div>
          </div>

          {/* Items list */}
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-3">
              Items ({order.items.length})
            </p>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-bg-secondary rounded-xl p-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-border-light bg-white flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary line-clamp-2 leading-snug">{item.name}</p>
                    <p className="text-xs text-text-secondary mt-0.5">Qty: {item.qty}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-text-primary">₦{(item.price * item.qty).toLocaleString()}</p>
                    <p className="text-xs text-text-secondary">₦{item.price.toLocaleString()} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order total */}
            <div className="mt-3 flex items-center justify-between px-3 py-3 bg-orange-50 border border-orange-100 rounded-xl">
              <span className="text-sm font-semibold text-text-primary">Order Total</span>
              <span className="text-lg font-bold text-brand-orange">₦{order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment method + Easy Buy */}
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-bg-secondary rounded-xl p-3">
              <p className="text-xs text-text-secondary font-medium mb-1">Payment</p>
              <PaymentIcon method={order.payment} />
            </div>
            {order.easyBuy && (
              <div className="flex-1 bg-amber-50 border border-amber-100 rounded-xl p-3">
                <p className="text-xs text-amber-600 font-medium mb-1">Easy Buy</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700">
                  <Zap className="w-3.5 h-3.5" />
                  Instalment Plan
                </span>
              </div>
            )}
          </div>

          {/* Status update */}
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">Update Status</p>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition appearance-none cursor-pointer"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Tracking number */}
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">Tracking Number</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
                placeholder="e.g. GIG-2025-884421"
                className="flex-1 px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
              />
              <Button
                onClick={() => { onUpdateStatus(order.id, status); onUpdateTracking(order.id, tracking); onClose() }}
                className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-10 px-4 rounded-xl gap-2 flex-shrink-0"
                style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 8

export default function AdminOrdersPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false)
  const pathname = usePathname()
  const [orders,           setOrders]           = useState(MOCK_ORDERS)
  const [selectedOrder,    setSelectedOrder]    = useState(null)

  // Filters
  const [statusFilter,  setStatusFilter]  = useState('All')
  const [paymentFilter, setPaymentFilter] = useState('All')
  const [dateFrom,      setDateFrom]      = useState('')
  const [dateTo,        setDateTo]        = useState('')

  // Sorting
  const [sortKey, setSortKey] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  // Pagination
  const [page, setPage] = useState(1)

  // ── Filtering ──
  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus  = statusFilter  === 'All' || o.status  === statusFilter
      const matchPayment = paymentFilter === 'All' || o.payment === paymentFilter
      const matchFrom    = !dateFrom || o.date >= dateFrom
      const matchTo      = !dateTo   || o.date <= dateTo
      return matchStatus && matchPayment && matchFrom && matchTo
    })
  }, [orders, statusFilter, paymentFilter, dateFrom, dateTo])

  // ── Sorting ──
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

  // ── Pagination ──
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const paged      = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
    setPage(1)
  }

  const updateStatus = (id, status) =>
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o))

  const updateTracking = (id, tracking) =>
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, tracking } : o))

  const clearFilters = () => {
    setStatusFilter('All'); setPaymentFilter('All'); setDateFrom(''); setDateTo(''); setPage(1)
  }

  const hasFilters = statusFilter !== 'All' || paymentFilter !== 'All' || dateFrom || dateTo

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ChevronsUpDown className="w-3 h-3 text-text-secondary opacity-40" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-brand-orange" />
      : <ChevronDown className="w-3 h-3 text-brand-orange" />
  }

  // Stats
  const pending   = orders.filter((o) => o.status === 'Pending').length
  const shipped   = orders.filter((o) => o.status === 'Shipped').length
  const delivered = orders.filter((o) => o.status === 'Delivered').length
  const revenue   = orders.filter((o) => o.status !== 'Cancelled' && o.status !== 'Refunded').reduce((a, o) => a + o.total, 0)

  return (
    <div className="min-h-screen bg-bg-secondary flex overflow-x-hidden">

      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />

      {/* Mobile sidebar */}
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

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">

          {/* Page heading */}
          <motion.div variants={fadeIn} initial="hidden" animate="show" className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">Fulfilment</p>
              <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                Manage Orders
                <span className="text-base font-semibold bg-orange-100 text-brand-orange px-3 py-0.5 rounded-full">
                  {orders.length} orders
                </span>
              </h1>
              <p className="text-sm text-text-secondary mt-1">Track, update, and manage all customer orders.</p>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeContainer} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue',  value: `₦${(revenue / 1000000).toFixed(1)}M`, color: 'text-brand-orange',  accent: 'bg-brand-orange' },
              { label: 'Pending',        value: pending,                                color: 'text-amber-600',     accent: 'bg-amber-500' },
              { label: 'Shipped',        value: shipped,                                color: 'text-violet-600',    accent: 'bg-violet-500' },
              { label: 'Delivered',      value: delivered,                              color: 'text-emerald-600',   accent: 'bg-emerald-500' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeCard}
                className="bg-white rounded-2xl border border-border-light p-5"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
                <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <div className={`mt-4 h-1 rounded-full ${stat.accent} opacity-30`} />
              </motion.div>
            ))}
          </motion.div>

          {/* Filter bar + table */}
          <motion.div variants={fadeCard} initial="hidden" animate="show" className="bg-white rounded-2xl border border-border-light overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

            {/* Filter bar */}
            <div className="px-5 py-4 border-b border-border-light space-y-3">
              <div className="flex items-center gap-3 flex-wrap">

                {/* Status filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
                  className="px-3 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange transition cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>

                {/* Payment filter */}
                <select
                  value={paymentFilter}
                  onChange={(e) => { setPaymentFilter(e.target.value); setPage(1) }}
                  className="px-3 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange transition cursor-pointer"
                >
                  <option value="All">All Payments</option>
                  {PAYMENT_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>

                {/* Date from */}
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => { setDateFrom(e.target.value); setPage(1) }}
                  className="px-3 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange transition cursor-pointer"
                />

                {/* Date to */}
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => { setDateTo(e.target.value); setPage(1) }}
                  className="px-3 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange transition cursor-pointer"
                />

                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-brand-orange hover:underline font-medium">
                    Clear filters
                  </button>
                )}
              </div>

              <p className="text-xs text-text-secondary">
                Showing <span className="font-semibold text-text-primary">{sorted.length}</span> of{' '}
                <span className="font-semibold text-text-primary">{orders.length}</span> orders
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-secondary border-b border-border-light">
                    {[
                      { key: 'id',       label: 'Order ID'   },
                      { key: 'customer', label: 'Customer'   },
                      { key: 'date',     label: 'Date'       },
                      { key: 'items',    label: 'Items'      },
                      { key: 'total',    label: 'Total'      },
                      { key: 'payment',  label: 'Payment'    },
                    ].map((col) => (
                      <th
                        key={col.key}
                        onClick={() => handleSort(col.key === 'customer' ? 'customer' : col.key === 'items' ? 'items' : col.key)}
                        className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors select-none whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1.5">
                          {col.label}
                          <SortIcon col={col.key} />
                        </div>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-500" />
                        Easy Buy
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border-light">
                  {paged.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
                            <ShoppingBag className="w-7 h-7 text-brand-orange" strokeWidth={1.5} />
                          </div>
                          <p className="text-sm font-semibold text-text-primary">No orders found</p>
                          <p className="text-xs text-text-secondary">Try adjusting your filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paged.map((order) => (
                      <tr
                        key={order.id}
                        onClick={() => setSelectedOrder(order)}
                        className="hover:bg-bg-secondary/60 transition-colors cursor-pointer"
                      >
                        {/* Order ID */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="text-sm font-bold text-brand-orange">{order.id}</span>
                        </td>

                        {/* Customer */}
                        <td className="px-4 py-3.5">
                          <p className="text-sm font-semibold text-text-primary whitespace-nowrap">{order.customer.name}</p>
                          <p className="text-xs text-text-secondary">{order.customer.email}</p>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="text-sm text-text-secondary">{order.date}</span>
                        </td>

                        {/* Item count */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="text-sm font-medium text-text-primary">
                            {order.items.reduce((a, i) => a + i.qty, 0)} item{order.items.reduce((a, i) => a + i.qty, 0) !== 1 ? 's' : ''}
                          </span>
                        </td>

                        {/* Total */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="text-sm font-bold text-text-primary">₦{order.total.toLocaleString()}</span>
                        </td>

                        {/* Payment */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <PaymentIcon method={order.payment} />
                        </td>

                        {/* Easy Buy */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          {order.easyBuy && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                              <Zap className="w-3 h-3" />
                              Easy Buy
                            </span>
                          )}
                        </td>

                        {/* Status inline select */}
                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={order.status}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg border border-border-light bg-white text-xs font-semibold text-text-primary focus:outline-none focus:border-brand-orange transition cursor-pointer"
                          >
                            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
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
                  {sorted.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)}
                </span>{' '}
                of <span className="font-semibold text-text-primary">{sorted.length}</span> orders
              </p>
              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="h-8 w-8 p-0 border-border-light disabled:opacity-40">
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
                <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="h-8 w-8 p-0 border-border-light disabled:opacity-40">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="h-4" />
        </main>
      </div>

      {/* Order detail sheet */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderSheet
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onUpdateStatus={updateStatus}
            onUpdateTracking={updateTracking}
          />
        )}
      </AnimatePresence>

    </div>
  )
}
