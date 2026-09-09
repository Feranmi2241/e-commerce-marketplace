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
  XCircle,
  Clock,
  CalendarDays,
  BadgeCheck,
  AlertCircle,
  Wallet,
  TrendingUp,
  FileText,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

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
  { label: 'Easy Buy',   icon: Zap,             href: '/admin/easy-buy', active: true },
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
            placeholder="Search Easy Buy..."
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

// ─── Mock Data — Eligible Products ───────────────────────────────────────────

const INITIAL_PRODUCTS = [
  {
    id: 'PRD-001',
    name: 'Apple iPhone 15 Pro Max 256GB',
    category: 'Phones & Tablets',
    price: 890000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=56&h=56&fit=crop',
    eligible: true,
  },
  {
    id: 'PRD-002',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    category: 'Phones & Tablets',
    price: 760000,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=56&h=56&fit=crop',
    eligible: true,
  },
  {
    id: 'PRD-003',
    name: 'MacBook Air M3 13" 16GB 512GB',
    category: 'Computing',
    price: 1250000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=56&h=56&fit=crop',
    eligible: true,
  },
  {
    id: 'PRD-004',
    name: 'Samsung 55" Crystal UHD 4K Smart TV',
    category: 'Electronics',
    price: 485000,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=56&h=56&fit=crop',
    eligible: true,
  },
  {
    id: 'PRD-005',
    name: 'Hisense 200L Chest Freezer',
    category: 'Home Appliances',
    price: 210000,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=56&h=56&fit=crop',
    eligible: true,
  },
  {
    id: 'PRD-006',
    name: 'Sony WH-1000XM5 Headphones',
    category: 'Electronics',
    price: 195000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=56&h=56&fit=crop',
    eligible: false,
  },
  {
    id: 'PRD-007',
    name: 'Dyson V15 Detect Vacuum Cleaner',
    category: 'Home Appliances',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=56&h=56&fit=crop',
    eligible: true,
  },
  {
    id: 'PRD-008',
    name: 'LG 9kg Front Load Washing Machine',
    category: 'Home Appliances',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=56&h=56&fit=crop',
    eligible: true,
  },
  {
    id: 'PRD-009',
    name: 'Nikon Z50 Mirrorless Camera',
    category: 'Electronics',
    price: 580000,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=56&h=56&fit=crop',
    eligible: false,
  },
  {
    id: 'PRD-010',
    name: 'Instant Pot Duo 7-in-1 6Qt',
    category: 'Home Appliances',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=56&h=56&fit=crop',
    eligible: false,
  },
]

// ─── Mock Data — Applications ─────────────────────────────────────────────────

function buildInstallments(totalAmount, term, startDate) {
  const monthly = Math.round(totalAmount / term)
  return Array.from({ length: term }, (_, i) => {
    const due = new Date(startDate)
    due.setMonth(due.getMonth() + i + 1)
    return {
      month: i + 1,
      dueDate: due.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }),
      amount: monthly,
      paid: i < Math.floor(term / 2),
    }
  })
}

const MOCK_APPLICATIONS = [
  {
    id: 'EB-001',
    customer: 'Tunde Adeyemi',
    customerEmail: 'tunde.adeyemi@gmail.com',
    customerPhone: '0812 345 6789',
    product: 'Apple iPhone 15 Pro Max 256GB',
    productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=56&h=56&fit=crop',
    totalAmount: 890000,
    downPayment: 178000,
    term: 6,
    applicationDate: 'Jul 22, 2025',
    status: 'Approved',
    installments: buildInstallments(712000, 6, new Date('2025-07-22')),
  },
  {
    id: 'EB-002',
    customer: 'Ngozi Eze',
    customerEmail: 'ngozi.eze@yahoo.com',
    customerPhone: '0803 987 6543',
    product: 'Samsung 55" Crystal UHD 4K Smart TV',
    productImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=56&h=56&fit=crop',
    totalAmount: 485000,
    downPayment: 97000,
    term: 3,
    applicationDate: 'Jul 21, 2025',
    status: 'Pending',
    installments: buildInstallments(388000, 3, new Date('2025-07-21')),
  },
  {
    id: 'EB-003',
    customer: 'Fatima Bello',
    customerEmail: 'fatima.bello@outlook.com',
    customerPhone: '0701 234 5678',
    product: 'MacBook Air M3 13" 16GB 512GB',
    productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=56&h=56&fit=crop',
    totalAmount: 1250000,
    downPayment: 250000,
    term: 12,
    applicationDate: 'Jul 20, 2025',
    status: 'Approved',
    installments: buildInstallments(1000000, 12, new Date('2025-07-20')),
  },
  {
    id: 'EB-004',
    customer: 'Chidi Nwosu',
    customerEmail: 'chidi.nwosu@gmail.com',
    customerPhone: '0905 678 9012',
    product: 'Dyson V15 Detect Vacuum Cleaner',
    productImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=56&h=56&fit=crop',
    totalAmount: 320000,
    downPayment: 64000,
    term: 6,
    applicationDate: 'Jul 19, 2025',
    status: 'Rejected',
    installments: buildInstallments(256000, 6, new Date('2025-07-19')),
  },
  {
    id: 'EB-005',
    customer: 'Amaka Okafor',
    customerEmail: 'amaka.okafor@gmail.com',
    customerPhone: '0816 543 2109',
    product: 'Samsung Galaxy S24 Ultra 512GB',
    productImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=56&h=56&fit=crop',
    totalAmount: 760000,
    downPayment: 152000,
    term: 9,
    applicationDate: 'Jul 18, 2025',
    status: 'Pending',
    installments: buildInstallments(608000, 9, new Date('2025-07-18')),
  },
  {
    id: 'EB-006',
    customer: 'Seun Adesanya',
    customerEmail: 'seun.adesanya@hotmail.com',
    customerPhone: '0708 901 2345',
    product: 'LG 9kg Front Load Washing Machine',
    productImage: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=56&h=56&fit=crop',
    totalAmount: 380000,
    downPayment: 76000,
    term: 3,
    applicationDate: 'Jul 17, 2025',
    status: 'Approved',
    installments: buildInstallments(304000, 3, new Date('2025-07-17')),
  },
  {
    id: 'EB-007',
    customer: 'Kemi Adebayo',
    customerEmail: 'kemi.adebayo@gmail.com',
    customerPhone: '0812 765 4321',
    product: 'Nikon Z50 Mirrorless Camera',
    productImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=56&h=56&fit=crop',
    totalAmount: 580000,
    downPayment: 116000,
    term: 12,
    applicationDate: 'Jul 16, 2025',
    status: 'Pending',
    installments: buildInstallments(464000, 12, new Date('2025-07-16')),
  },
  {
    id: 'EB-008',
    customer: 'Uche Okonkwo',
    customerEmail: 'uche.okonkwo@gmail.com',
    customerPhone: '0803 456 7890',
    product: 'Apple iPhone 15 Pro Max 256GB',
    productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=56&h=56&fit=crop',
    totalAmount: 890000,
    downPayment: 178000,
    term: 9,
    applicationDate: 'Jul 15, 2025',
    status: 'Rejected',
    installments: buildInstallments(712000, 9, new Date('2025-07-15')),
  },
]

// ─── Settings Card ────────────────────────────────────────────────────────────

const TERMS = [3, 6, 9, 12]

function EasyBuySettingsCard() {
  const [downPayment,  setDownPayment]  = useState('20')
  const [interestRate, setInterestRate] = useState('5')
  const [activeTerms,  setActiveTerms]  = useState([3, 6, 9, 12])
  const [minThreshold, setMinThreshold] = useState('130000')
  const [saved,        setSaved]        = useState(false)

  const toggleTerm = (term) => {
    setActiveTerms((prev) =>
      prev.includes(term) ? prev.filter((t) => t !== term) : [...prev, term]
    )
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Card header */}
      <div className="px-6 py-5 border-b border-border-light flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
          <Settings className="w-5 h-5 text-brand-orange" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">Configuration</p>
          <h2 className="text-base font-bold text-text-primary">Easy Buy Settings</h2>
        </div>
        {saved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full"
          >
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700">Saved!</span>
          </motion.div>
        )}
      </div>

      {/* Fields */}
      <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Down Payment % */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
            Default Down Payment
          </label>
          <p className="text-xs text-text-secondary mb-2">Percentage of total price paid upfront</p>
          <div className="relative">
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              min="0"
              max="100"
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-border-light bg-white text-sm font-semibold text-text-primary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-text-secondary pointer-events-none">%</span>
          </div>
          {downPayment && (
            <p className="text-xs text-brand-orange font-medium mt-1.5">
              e.g. ₦{Math.round(890000 * Number(downPayment) / 100).toLocaleString()} on ₦890,000 item
            </p>
          )}
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
            Monthly Interest Rate
          </label>
          <p className="text-xs text-text-secondary mb-2">Applied per month on outstanding balance</p>
          <div className="relative">
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              min="0"
              step="0.1"
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-border-light bg-white text-sm font-semibold text-text-primary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-text-secondary pointer-events-none">%</span>
          </div>
          {interestRate && (
            <p className="text-xs text-text-secondary font-medium mt-1.5">
              {interestRate}% per month on balance
            </p>
          )}
        </div>

        {/* Available Terms */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
            Available Repayment Terms
          </label>
          <p className="text-xs text-text-secondary mb-2">Months customers can choose from</p>
          <div className="flex flex-wrap gap-2">
            {TERMS.map((term) => {
              const isActive = activeTerms.includes(term)
              return (
                <button
                  key={term}
                  type="button"
                  onClick={() => toggleTerm(term)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-brand-orange border-brand-orange text-white shadow-sm'
                      : 'bg-white border-border-light text-text-secondary hover:border-brand-orange hover:text-brand-orange'
                  }`}
                >
                  {isActive && <Check className="w-3 h-3" />}
                  {term}mo
                </button>
              )
            })}
          </div>
          <p className="text-xs text-text-secondary mt-2">
            {activeTerms.length} term{activeTerms.length !== 1 ? 's' : ''} active
          </p>
        </div>

        {/* Minimum Price Threshold */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
            Minimum Price Threshold
          </label>
          <p className="text-xs text-text-secondary mb-2">Products below this price are ineligible</p>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-text-secondary pointer-events-none">₦</span>
            <input
              type="number"
              value={minThreshold}
              onChange={(e) => setMinThreshold(e.target.value)}
              min="0"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border-light bg-white text-sm font-semibold text-text-primary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
            />
          </div>
          <p className="text-xs text-text-secondary font-medium mt-1.5">
            Currently: ₦{Number(minThreshold || 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Save button */}
      <div className="px-6 pb-5">
        <Button
          onClick={handleSave}
          className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-10 px-6 rounded-xl gap-2"
          style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
        >
          <Zap className="w-4 h-4" />
          Save Settings
        </Button>
      </div>
    </motion.div>
  )
}

// ─── Eligible Products Table ──────────────────────────────────────────────────

function EligibleProductsTable({ products, onToggle }) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return products.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [products, search])

  const eligibleCount = products.filter((p) => p.eligible).length

  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border-light flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
            <Package className="w-4 h-4 text-brand-orange" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">Catalogue</p>
            <p className="text-sm font-bold text-text-primary">
              Easy Buy Eligible Products
              <span className="ml-2 text-xs font-semibold bg-orange-100 text-brand-orange px-2 py-0.5 rounded-full">
                {eligibleCount} eligible
              </span>
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="search-glow ml-auto flex items-center gap-2 px-3 py-2 rounded-xl border border-border-light bg-bg-secondary min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="bg-transparent outline-none flex-1 text-xs text-text-primary placeholder-text-secondary"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-text-secondary hover:text-text-primary">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-secondary border-b border-border-light">
              <th className="px-5 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-14">Image</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Product</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Category</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Price</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-text-secondary uppercase tracking-wider">Easy Buy Eligible</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-bg-secondary/60 transition-colors">
                {/* Image */}
                <td className="px-5 py-3.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-border-light bg-bg-secondary flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                </td>

                {/* Name + ID */}
                <td className="px-5 py-3.5 max-w-[220px]">
                  <p className="text-sm font-semibold text-text-primary line-clamp-1">{product.name}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{product.id}</p>
                </td>

                {/* Category */}
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                    {product.category}
                  </span>
                </td>

                {/* Price */}
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <p className="text-sm font-bold text-text-primary">₦{product.price.toLocaleString()}</p>
                </td>

                {/* Switch */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-center gap-2">
                    <Switch
                      checked={product.eligible}
                      onCheckedChange={() => onToggle(product.id)}
                      className="data-[state=checked]:bg-brand-orange"
                    />
                    <span className={`text-xs font-semibold ${product.eligible ? 'text-emerald-600' : 'text-text-secondary'}`}>
                      {product.eligible ? 'Eligible' : 'Excluded'}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      <div className="px-5 py-3 border-t border-border-light">
        <p className="text-xs text-text-secondary">
          Showing <span className="font-semibold text-text-primary">{filtered.length}</span> of{' '}
          <span className="font-semibold text-text-primary">{products.length}</span> products
        </p>
      </div>
    </motion.div>
  )
}

// ─── Application Status Badge ─────────────────────────────────────────────────

function AppStatusBadge({ status }) {
  const map = {
    Pending:  { bg: 'bg-amber-100',   text: 'text-amber-700',   icon: Clock        },
    Approved: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle2 },
    Rejected: { bg: 'bg-red-100',     text: 'text-red-600',     icon: XCircle      },
  }
  const s    = map[status] || map.Pending
  const Icon = s.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  )
}

// ─── Repayment Sheet ──────────────────────────────────────────────────────────

function RepaymentSheet({ application, onClose }) {
  const paidCount   = application.installments.filter((i) => i.paid).length
  const totalPaid   = application.installments.filter((i) => i.paid).reduce((s, i) => s + i.amount, 0)
  const totalOwed   = application.installments.reduce((s, i) => s + i.amount, 0)
  const progressPct = Math.round((paidCount / application.installments.length) * 100)

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
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-light flex-shrink-0">
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-0.5">
              Repayment Tracker
            </p>
            <h2 className="text-lg font-bold text-text-primary">{application.id}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-bg-secondary rounded-full transition">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* Customer + Product info */}
          <div className="flex items-start gap-4 p-4 bg-bg-secondary rounded-2xl border border-border-light">
            <img
              src={application.productImage}
              alt={application.product}
              className="w-14 h-14 rounded-xl object-cover border border-border-light flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-primary line-clamp-1">{application.product}</p>
              <p className="text-xs text-text-secondary mt-0.5">{application.customer}</p>
              <p className="text-xs text-text-secondary">{application.customerEmail}</p>
              <p className="text-xs text-text-secondary">{application.customerPhone}</p>
            </div>
            <AppStatusBadge status={application.status} />
          </div>

          {/* Financial summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Total Price',    value: `₦${application.totalAmount.toLocaleString()}`,  color: 'text-text-primary' },
              { label: 'Down Payment',   value: `₦${application.downPayment.toLocaleString()}`,  color: 'text-brand-orange' },
              { label: 'Balance Financed', value: `₦${(application.totalAmount - application.downPayment).toLocaleString()}`, color: 'text-blue-600' },
            ].map((item) => (
              <div key={item.label} className="bg-bg-secondary rounded-xl p-3 border border-border-light text-center">
                <p className="text-[10px] uppercase tracking-wide text-text-secondary font-semibold mb-1">{item.label}</p>
                <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Term + progress */}
          <div className="p-4 bg-white rounded-2xl border border-border-light">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-brand-orange" />
                <p className="text-sm font-bold text-text-primary">{application.term}-Month Plan</p>
              </div>
              <p className="text-xs font-semibold text-text-secondary">
                {paidCount} of {application.term} paid
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-bg-secondary rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="h-full bg-gradient-to-r from-brand-orange to-amber-400 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-600">₦{totalPaid.toLocaleString()} paid</span>
              <span className="font-semibold text-text-secondary">₦{(totalOwed - totalPaid).toLocaleString()} remaining</span>
            </div>
          </div>

          {/* Installment schedule */}
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-3">
              Installment Schedule
            </p>
            <div className="space-y-2.5">
              {application.installments.map((inst) => (
                <div
                  key={inst.month}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all ${
                    inst.paid
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-white border-border-light'
                  }`}
                >
                  {/* Month number */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    inst.paid
                      ? 'bg-emerald-500 text-white'
                      : 'bg-bg-secondary text-text-secondary border border-border-light'
                  }`}>
                    {inst.month}
                  </div>

                  {/* Due date */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-text-primary">Month {inst.month}</p>
                    <p className="text-[11px] text-text-secondary mt-0.5 flex items-center gap-1">
                      <CalendarDays className="w-3 h-3 flex-shrink-0" />
                      Due: {inst.dueDate}
                    </p>
                  </div>

                  {/* Amount */}
                  <p className="text-sm font-bold text-text-primary flex-shrink-0">
                    ₦{inst.amount.toLocaleString()}
                  </p>

                  {/* Paid / Unpaid badge */}
                  {inst.paid ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      Unpaid
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border-light flex-shrink-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full h-11 rounded-xl border-border-light text-text-secondary hover:text-text-primary font-semibold"
          >
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Applications Table ───────────────────────────────────────────────────────

const APP_PAGE_SIZE = 6

function ApplicationsTable({ applications, onApprove, onReject, onViewRepayment }) {
  const [search,       setSearch]       = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortKey,      setSortKey]      = useState('applicationDate')
  const [sortDir,      setSortDir]      = useState('desc')
  const [page,         setPage]         = useState(1)

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        a.customer.toLowerCase().includes(q) ||
        a.product.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      const matchStatus = statusFilter === 'All' || a.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [applications, search, statusFilter])

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

  const totalPages = Math.max(1, Math.ceil(sorted.length / APP_PAGE_SIZE))
  const paged      = sorted.slice((page - 1) * APP_PAGE_SIZE, page * APP_PAGE_SIZE)

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
    { key: 'customer',        label: 'Customer'         },
    { key: 'product',         label: 'Product'          },
    { key: 'totalAmount',     label: 'Total Amount'     },
    { key: 'term',            label: 'Term'             },
    { key: 'applicationDate', label: 'Applied'          },
    { key: 'status',          label: 'Status'           },
  ]

  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Filter bar */}
      <div className="px-5 py-4 border-b border-border-light flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-brand-orange" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">Applications</p>
            <p className="text-sm font-bold text-text-primary">Easy Buy Applications</p>
          </div>
        </div>

        {/* Search */}
        <div className="search-glow flex items-center gap-2 px-3 py-2 rounded-xl border border-border-light bg-bg-secondary min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search applications..."
            className="bg-transparent outline-none flex-1 text-xs text-text-primary placeholder-text-secondary"
          />
          {search && (
            <button onClick={() => { setSearch(''); setPage(1) }} className="text-text-secondary hover:text-text-primary">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Status filter pills */}
        <div className="flex items-center gap-1.5 bg-bg-secondary border border-border-light rounded-xl p-1">
          {['All', 'Pending', 'Approved', 'Rejected'].map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1) }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === s
                  ? s === 'Approved'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : s === 'Pending'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : s === 'Rejected'
                    ? 'bg-red-500 text-white shadow-sm'
                    : 'bg-brand-orange text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <p className="text-xs text-text-secondary ml-auto">
          <span className="font-semibold text-text-primary">{sorted.length}</span> applications
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-secondary border-b border-border-light">
              {cols.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    <SortIcon col={col.key} />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
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
                      <Zap className="w-7 h-7 text-brand-orange" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-semibold text-text-primary">No applications found</p>
                    <p className="text-xs text-text-secondary">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((app) => (
                <tr key={app.id} className="hover:bg-bg-secondary/60 transition-colors">

                  {/* Customer */}
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-semibold text-text-primary whitespace-nowrap">{app.customer}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{app.id}</p>
                  </td>

                  {/* Product */}
                  <td className="px-4 py-3.5 max-w-[180px]">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={app.productImage}
                        alt={app.product}
                        className="w-8 h-8 rounded-lg object-cover border border-border-light flex-shrink-0"
                      />
                      <p className="text-xs font-semibold text-text-primary line-clamp-2">{app.product}</p>
                    </div>
                  </td>

                  {/* Total Amount */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <p className="text-sm font-bold text-text-primary">₦{app.totalAmount.toLocaleString()}</p>
                    <p className="text-xs text-text-secondary mt-0.5">
                      ₦{app.downPayment.toLocaleString()} down
                    </p>
                  </td>

                  {/* Term */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                      <CalendarDays className="w-3 h-3" />
                      {app.term} months
                    </span>
                  </td>

                  {/* Application Date */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <p className="text-xs text-text-secondary">{app.applicationDate}</p>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <AppStatusBadge status={app.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {app.status === 'Approved' && (
                        <button
                          onClick={() => onViewRepayment(app)}
                          title="View repayment schedule"
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                        >
                          <Wallet className="w-3.5 h-3.5" />
                          Repayments
                        </button>
                      )}
                      {app.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => onApprove(app.id)}
                            title="Approve application"
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Approve
                          </button>
                          <button
                            onClick={() => onReject(app.id)}
                            title="Reject application"
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        </>
                      )}
                      {app.status === 'Rejected' && (
                        <span className="text-xs text-text-secondary italic">No actions</span>
                      )}
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
            {sorted.length === 0 ? 0 : (page - 1) * APP_PAGE_SIZE + 1}–{Math.min(page * APP_PAGE_SIZE, sorted.length)}
          </span>{' '}
          of <span className="font-semibold text-text-primary">{sorted.length}</span> applications
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
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminEasyBuyPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false)
  const pathname = usePathname()
  const [products,         setProducts]         = useState(INITIAL_PRODUCTS)
  const [applications,     setApplications]     = useState(MOCK_APPLICATIONS)
  const [repaymentApp,     setRepaymentApp]     = useState(null)

  const toggleEligibility = (id) => {
    setProducts((prev) =>
      prev.map((p) => p.id === id ? { ...p, eligible: !p.eligible } : p)
    )
  }

  const approveApp = (id) => {
    setApplications((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: 'Approved' } : a)
    )
  }

  const rejectApp = (id) => {
    setApplications((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: 'Rejected' } : a)
    )
  }

  // KPI counts
  const pendingCount  = applications.filter((a) => a.status === 'Pending').length
  const approvedCount = applications.filter((a) => a.status === 'Approved').length
  const rejectedCount = applications.filter((a) => a.status === 'Rejected').length
  const eligibleCount = products.filter((p) => p.eligible).length
  const totalFinanced = applications
    .filter((a) => a.status === 'Approved')
    .reduce((s, a) => s + (a.totalAmount - a.downPayment), 0)

  const KPI_CARDS = [
    {
      label: 'Total Applications',
      value: applications.length,
      icon: FileText,
      iconBg: 'bg-orange-50',
      iconColor: 'text-brand-orange',
      accent: 'bg-brand-orange',
      valueColor: 'text-brand-orange',
    },
    {
      label: 'Pending Review',
      value: pendingCount,
      icon: Clock,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      accent: 'bg-amber-500',
      valueColor: 'text-amber-600',
    },
    {
      label: 'Approved',
      value: approvedCount,
      icon: BadgeCheck,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      accent: 'bg-emerald-500',
      valueColor: 'text-emerald-600',
    },
    {
      label: 'Total Financed',
      value: `₦${(totalFinanced / 1000000).toFixed(1)}M`,
      icon: TrendingUp,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      accent: 'bg-blue-500',
      valueColor: 'text-blue-600',
    },
  ]

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
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="flex items-start justify-between gap-4 flex-wrap"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                Instalment Programme
              </p>
              <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                Manage Easy Buy
                <span className="text-base font-semibold bg-orange-100 text-brand-orange px-3 py-0.5 rounded-full">
                  {eligibleCount} eligible products
                </span>
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Configure instalment settings, manage product eligibility, and review customer applications.
              </p>
            </div>
          </motion.div>

          {/* ── KPI Cards ─────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {KPI_CARDS.map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeCard}
                  className="bg-white rounded-2xl border border-border-light p-5 hover:shadow-md transition-shadow"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2 truncate">
                        {stat.label}
                      </p>
                      <p className={`text-3xl font-bold ${stat.valueColor}`}>{stat.value}</p>
                    </div>
                    <div className={`${stat.iconBg} p-3 rounded-xl flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                  </div>
                  <div className={`mt-4 h-1 rounded-full ${stat.accent} opacity-30`} />
                </motion.div>
              )
            })}
          </motion.div>

          {/* ── Settings Card ─────────────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
          >
            <EasyBuySettingsCard />
          </motion.div>

          {/* ── Eligible Products Table ───────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <EligibleProductsTable products={products} onToggle={toggleEligibility} />
          </motion.div>

          {/* ── Applications Table ────────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <ApplicationsTable
              applications={applications}
              onApprove={approveApp}
              onReject={rejectApp}
              onViewRepayment={(app) => setRepaymentApp(app)}
            />
          </motion.div>

          <div className="h-4" />
        </main>
      </div>

      {/* ── Repayment Sheet ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {repaymentApp && (
          <RepaymentSheet
            application={repaymentApp}
            onClose={() => setRepaymentApp(null)}
          />
        )}
      </AnimatePresence>

    </div>
  )
}
