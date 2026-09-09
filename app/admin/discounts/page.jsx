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
  Plus,
  Pencil,
  Trash2,
  ImagePlus,
  CheckCircle2,
  Clock,
  XCircle,
  CalendarDays,
  Tag as TagIcon,
  Flame,
  Check,
  ChevronDown as ChevDown,
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
  { label: 'Discounts',  icon: Percent,         href: '/admin/discounts', active: true },
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
            placeholder="Search promotions..."
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

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  'Phones & Tablets',
  'Computing',
  'Electronics',
  'Home Appliances',
  'Cosmetics & Beauty',
  'Perfumes',
  'Power & Accessories',
  'Fashion',
]

const SELECTABLE_PRODUCTS = [
  { id: 'PRD-001', name: 'Apple iPhone 15 Pro Max 256GB', category: 'Phones & Tablets' },
  { id: 'PRD-002', name: 'Samsung Galaxy S24 Ultra 512GB', category: 'Phones & Tablets' },
  { id: 'PRD-003', name: 'MacBook Air M3 13" 16GB 512GB', category: 'Computing' },
  { id: 'PRD-004', name: 'Samsung 55" Crystal UHD 4K Smart TV', category: 'Electronics' },
  { id: 'PRD-005', name: 'Hisense 200L Chest Freezer', category: 'Home Appliances' },
  { id: 'PRD-006', name: 'Sony WH-1000XM5 Headphones', category: 'Electronics' },
  { id: 'PRD-007', name: 'Dyson V15 Detect Vacuum Cleaner', category: 'Home Appliances' },
  { id: 'PRD-008', name: 'Xiaomi Redmi Note 13 Pro 256GB', category: 'Phones & Tablets' },
  { id: 'PRD-009', name: 'LG 9kg Front Load Washing Machine', category: 'Home Appliances' },
  { id: 'PRD-010', name: 'Nikon Z50 Mirrorless Camera', category: 'Electronics' },
  { id: 'PRD-011', name: 'Anker 65W USB-C GaN Charger', category: 'Power & Accessories' },
  { id: 'PRD-012', name: 'Baseus 20000mAh Power Bank', category: 'Power & Accessories' },
  { id: 'PRD-013', name: "L'Oréal Hyaluronic Acid Serum", category: 'Cosmetics & Beauty' },
  { id: 'PRD-014', name: 'Dior Sauvage EDP 100ml', category: 'Perfumes' },
  { id: 'PRD-015', name: 'Apple AirPods Pro 2nd Gen', category: 'Electronics' },
  { id: 'PRD-016', name: 'Instant Pot Duo 7-in-1 6Qt', category: 'Home Appliances' },
]

const MOCK_PROMOTIONS = [
  {
    id: 'PROMO-001',
    name: 'Phones Flash Sale',
    discountType: 'percentage',
    discountValue: 15,
    appliesTo: 'category',
    appliesToValue: 'Phones & Tablets',
    startDate: '2025-07-20T08:00',
    endDate: '2025-07-22T23:59',
    status: 'Expired',
    bannerImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=160&fit=crop',
  },
  {
    id: 'PROMO-002',
    name: 'MacBook Independence Deal',
    discountType: 'fixed',
    discountValue: 50000,
    appliesTo: 'products',
    appliesToValue: 'MacBook Air M3 13" 16GB 512GB',
    startDate: '2025-08-01T00:00',
    endDate: '2025-08-07T23:59',
    status: 'Scheduled',
    bannerImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=160&fit=crop',
  },
  {
    id: 'PROMO-003',
    name: 'Electronics Mega Sale',
    discountType: 'percentage',
    discountValue: 20,
    appliesTo: 'category',
    appliesToValue: 'Electronics',
    startDate: '2025-07-25T00:00',
    endDate: '2025-07-31T23:59',
    status: 'Active',
    bannerImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400&h=160&fit=crop',
  },
  {
    id: 'PROMO-004',
    name: 'Home Appliances Clearance',
    discountType: 'percentage',
    discountValue: 12,
    appliesTo: 'category',
    appliesToValue: 'Home Appliances',
    startDate: '2025-07-28T00:00',
    endDate: '2025-08-04T23:59',
    status: 'Scheduled',
    bannerImage: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=160&fit=crop',
  },
  {
    id: 'PROMO-005',
    name: 'Dyson Flash Deal',
    discountType: 'fixed',
    discountValue: 30000,
    appliesTo: 'products',
    appliesToValue: 'Dyson V15 Detect Vacuum Cleaner',
    startDate: '2025-07-24T10:00',
    endDate: '2025-07-24T22:00',
    status: 'Active',
    bannerImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=160&fit=crop',
  },
  {
    id: 'PROMO-006',
    name: 'Beauty & Cosmetics Weekend',
    discountType: 'percentage',
    discountValue: 25,
    appliesTo: 'category',
    appliesToValue: 'Cosmetics & Beauty',
    startDate: '2025-07-19T00:00',
    endDate: '2025-07-20T23:59',
    status: 'Expired',
    bannerImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=160&fit=crop',
  },
  {
    id: 'PROMO-007',
    name: 'Sony Headphones Deal',
    discountType: 'fixed',
    discountValue: 20000,
    appliesTo: 'products',
    appliesToValue: 'Sony WH-1000XM5 Headphones',
    startDate: '2025-07-26T00:00',
    endDate: '2025-07-28T23:59',
    status: 'Scheduled',
    bannerImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=160&fit=crop',
  },
  {
    id: 'PROMO-008',
    name: 'Power Bank Promo',
    discountType: 'percentage',
    discountValue: 10,
    appliesTo: 'category',
    appliesToValue: 'Power & Accessories',
    startDate: '2025-07-23T00:00',
    endDate: '2025-07-30T23:59',
    status: 'Active',
    bannerImage: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=160&fit=crop',
  },
]

// ─── Status Badge ─────────────────────────────────────────────────────────────

function PromotionStatusBadge({ status }) {
  const map = {
    Active:    { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', icon: CheckCircle2 },
    Scheduled: { bg: 'bg-blue-100',    text: 'text-blue-700',    dot: 'bg-blue-500',    icon: Clock },
    Expired:   { bg: 'bg-gray-100',    text: 'text-gray-500',    dot: 'bg-gray-400',    icon: XCircle },
  }
  const s    = map[status] || map.Expired
  const Icon = s.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  )
}

// ─── Multi-Select Combobox ────────────────────────────────────────────────────

function MultiSelectCombobox({ options, selected, onChange, placeholder }) {
  const [open,   setOpen]   = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef(null)

  // Close on outside click
  useState(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  })

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  )

  const toggle = (val) => {
    if (selected.includes(val)) onChange(selected.filter((v) => v !== val))
    else onChange([...selected, val])
  }

  const displayLabel = selected.length === 0
    ? placeholder
    : selected.length === 1
    ? selected[0]
    : `${selected.length} selected`

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
      >
        <span className={selected.length === 0 ? 'text-text-secondary' : 'text-text-primary font-medium'}>
          {displayLabel}
        </span>
        <ChevronDown className="w-4 h-4 text-text-secondary flex-shrink-0" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-border-light rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {/* Search inside dropdown */}
            <div className="px-3 py-2.5 border-b border-border-light">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-secondary">
                <Search className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent outline-none flex-1 text-xs text-text-primary placeholder-text-secondary"
                  autoFocus
                />
              </div>
            </div>

            {/* Options list */}
            <div className="max-h-52 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-xs text-text-secondary text-center">No options found</p>
              ) : (
                filtered.map((opt) => {
                  const isSelected = selected.includes(opt)
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggle(opt)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                        isSelected
                          ? 'bg-orange-50 text-brand-orange'
                          : 'text-text-primary hover:bg-bg-secondary'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-brand-orange border-brand-orange'
                          : 'border-border-light bg-white'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className="truncate">{opt}</span>
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer: clear + done */}
            {selected.length > 0 && (
              <div className="px-3 py-2.5 border-t border-border-light flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onChange([])}
                  className="text-xs text-text-secondary hover:text-red-500 font-medium transition"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs font-semibold text-brand-orange hover:text-orange-600 transition"
                >
                  Done ({selected.length})
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Promotion Sheet ──────────────────────────────────────────────────────────

const EMPTY_FORM = {
  name:          '',
  discountType:  'percentage',   // 'percentage' | 'fixed'
  discountValue: '',
  appliesToType: 'category',     // 'category' | 'products'
  selectedCategories: [],
  selectedProducts:   [],
  startDate:     '',
  endDate:       '',
  bannerPreview: '',
}

function PromotionSheet({ editPromo, onClose, onSave }) {
  const isEdit      = !!editPromo
  const fileInputRef = useRef(null)

  const [form, setForm] = useState(() => {
    if (!editPromo) return { ...EMPTY_FORM }
    return {
      name:               editPromo.name,
      discountType:       editPromo.discountType,
      discountValue:      editPromo.discountValue,
      appliesToType:      editPromo.appliesTo,
      selectedCategories: editPromo.appliesTo === 'category' ? [editPromo.appliesToValue] : [],
      selectedProducts:   editPromo.appliesTo === 'products' ? [editPromo.appliesToValue] : [],
      startDate:          editPromo.startDate,
      endDate:            editPromo.endDate,
      bannerPreview:      editPromo.bannerImage || '',
    }
  })

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleBannerUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      set('bannerPreview', url)
    }
  }

  const handleSave = () => {
    const appliesToValue =
      form.appliesToType === 'category'
        ? form.selectedCategories.join(', ')
        : form.selectedProducts.join(', ')

    onSave({
      id:             editPromo?.id || `PROMO-${Date.now()}`,
      name:           form.name,
      discountType:   form.discountType,
      discountValue:  Number(form.discountValue),
      appliesTo:      form.appliesToType,
      appliesToValue,
      startDate:      form.startDate,
      endDate:        form.endDate,
      status:         'Scheduled',
      bannerImage:    form.bannerPreview,
    })
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
        className="relative ml-auto w-full max-w-xl bg-white h-full flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-light flex-shrink-0">
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-0.5">
              {isEdit ? 'Edit Promotion' : 'New Promotion'}
            </p>
            <h2 className="text-lg font-bold text-text-primary">
              {isEdit ? 'Update Promotion' : 'Create New Promotion'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-bg-secondary rounded-full transition">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* ── 1. Promotion Name ── */}
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
              Promotion Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Electronics Mega Sale"
              className="w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
            />
          </div>

          {/* ── 2. Discount Type Tabs ── */}
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-2">
              Discount Type <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-0 bg-bg-secondary border border-border-light rounded-xl p-1">
              {[
                { key: 'percentage', label: '% Percentage', icon: Percent },
                { key: 'fixed',      label: '₦ Fixed Amount', icon: TagIcon },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => set('discountType', key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    form.discountType === key
                      ? 'bg-brand-orange text-white shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* Discount value input */}
            <div className="mt-3 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-text-secondary pointer-events-none">
                {form.discountType === 'percentage' ? '%' : '₦'}
              </span>
              <input
                type="number"
                value={form.discountValue}
                onChange={(e) => set('discountValue', e.target.value)}
                placeholder={form.discountType === 'percentage' ? '0 – 100' : '0'}
                min="0"
                max={form.discountType === 'percentage' ? 100 : undefined}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
              />
            </div>

            {/* Live preview */}
            {form.discountValue > 0 && (
              <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-100 rounded-xl">
                <Flame className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                <p className="text-xs font-semibold text-brand-orange">
                  {form.discountType === 'percentage'
                    ? `${form.discountValue}% off — customers save ${form.discountValue}% on eligible items`
                    : `₦${Number(form.discountValue).toLocaleString()} off — fixed discount on eligible items`}
                </p>
              </div>
            )}
          </div>

          {/* ── 3. Applies To — Category or Products ── */}
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-2">
              Applies To <span className="text-red-500">*</span>
            </label>

            {/* Toggle: Category vs Products */}
            <div className="flex items-center gap-0 bg-bg-secondary border border-border-light rounded-xl p-1 mb-3">
              {[
                { key: 'category', label: 'Category' },
                { key: 'products', label: 'Specific Products' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => set('appliesToType', key)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                    form.appliesToType === key
                      ? 'bg-white text-text-primary shadow-sm border border-border-light'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Multi-select combobox */}
            {form.appliesToType === 'category' ? (
              <MultiSelectCombobox
                options={CATEGORIES}
                selected={form.selectedCategories}
                onChange={(val) => set('selectedCategories', val)}
                placeholder="Select categories..."
              />
            ) : (
              <MultiSelectCombobox
                options={SELECTABLE_PRODUCTS.map((p) => p.name)}
                selected={form.selectedProducts}
                onChange={(val) => set('selectedProducts', val)}
                placeholder="Select products..."
              />
            )}

            {/* Selected chips */}
            {(form.appliesToType === 'category' ? form.selectedCategories : form.selectedProducts).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2.5">
                {(form.appliesToType === 'category' ? form.selectedCategories : form.selectedProducts).map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 border border-orange-200 text-brand-orange text-xs font-semibold rounded-full"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => {
                        const field = form.appliesToType === 'category' ? 'selectedCategories' : 'selectedProducts'
                        set(field, form[field].filter((v) => v !== item))
                      }}
                      className="hover:text-red-500 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── 4 & 5. Start + End Date-Time Pickers ── */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
                Start Date &amp; Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                <input
                  type="datetime-local"
                  value={form.startDate}
                  onChange={(e) => set('startDate', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
                End Date &amp; Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                <input
                  type="datetime-local"
                  value={form.endDate}
                  onChange={(e) => set('endDate', e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Duration preview */}
          {form.startDate && form.endDate && new Date(form.endDate) > new Date(form.startDate) && (
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              <p className="text-xs font-semibold text-blue-600">
                Duration:{' '}
                {Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / (1000 * 60 * 60 * 24))} day(s)
              </p>
            </div>
          )}

          {/* ── 6. Banner Image Upload ── */}
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
              Flash Deals Banner Image
            </label>
            <p className="text-xs text-text-secondary mb-2">
              This image will appear in the homepage Flash Deals section. Recommended: 1200×480px.
            </p>

            {form.bannerPreview ? (
              <div className="relative group rounded-xl overflow-hidden border border-border-light">
                <img
                  src={form.bannerPreview}
                  alt="Banner preview"
                  className="w-full h-36 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl text-xs font-semibold text-text-primary hover:bg-bg-secondary transition"
                  >
                    <ImagePlus className="w-3.5 h-3.5" />
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => set('bannerPreview', '')}
                    className="flex items-center gap-1.5 px-3 py-2 bg-red-500 rounded-xl text-xs font-semibold text-white hover:bg-red-600 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
                <div className="absolute top-2 left-2 bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Banner Preview
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border-light rounded-xl p-8 flex flex-col items-center gap-2 cursor-pointer hover:border-brand-orange hover:bg-orange-50/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition">
                  <ImagePlus className="w-6 h-6 text-brand-orange" />
                </div>
                <p className="text-sm font-semibold text-text-primary">Click to upload banner</p>
                <p className="text-xs text-text-secondary">PNG, JPG, WEBP — recommended 1200×480px</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerUpload}
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border-light flex items-center gap-3 flex-shrink-0">
          <Button
            onClick={handleSave}
            className="flex-1 bg-brand-orange hover:bg-orange-600 text-white font-semibold rounded-xl gap-2 h-11"
            style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
          >
            <Flame className="w-4 h-4" />
            {isEdit ? 'Save Changes' : 'Create Promotion'}
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

// ─── Promotions Table ─────────────────────────────────────────────────────────

const PAGE_SIZE = 8

function PromotionsTable({ promotions, onEdit, onDelete }) {
  const [search,       setSearch]       = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortKey,      setSortKey]      = useState('startDate')
  const [sortDir,      setSortDir]      = useState('desc')
  const [page,         setPage]         = useState(1)

  const filtered = useMemo(() => {
    return promotions.filter((p) => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.appliesToValue.toLowerCase().includes(q)
      const matchStatus = statusFilter === 'All' || p.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [promotions, search, statusFilter])

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

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const paged      = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

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
    { key: 'name',          label: 'Promotion Name'   },
    { key: 'discountType',  label: 'Discount'         },
    { key: 'appliesToValue',label: 'Applies To'       },
    { key: 'startDate',     label: 'Start Date'       },
    { key: 'endDate',       label: 'End Date'         },
    { key: 'status',        label: 'Status'           },
  ]

  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Filter bar */}
      <div className="px-5 py-4 border-b border-border-light flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="search-glow flex-1 min-w-[200px] max-w-sm flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border-light bg-bg-secondary">
          <Search className="w-4 h-4 text-text-secondary flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search promotions..."
            className="bg-transparent outline-none flex-1 text-sm text-text-primary placeholder-text-secondary"
          />
          {search && (
            <button onClick={() => { setSearch(''); setPage(1) }} className="text-text-secondary hover:text-text-primary">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1.5 bg-bg-secondary border border-border-light rounded-xl p-1">
          {['All', 'Active', 'Scheduled', 'Expired'].map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1) }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === s
                  ? s === 'Active'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : s === 'Scheduled'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : s === 'Expired'
                    ? 'bg-gray-400 text-white shadow-sm'
                    : 'bg-brand-orange text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <p className="text-xs text-text-secondary ml-auto">
          <span className="font-semibold text-text-primary">{sorted.length}</span> promotions
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-secondary border-b border-border-light">
              {/* Banner thumbnail col */}
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-16">
                Banner
              </th>
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
                <td colSpan={8} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
                      <Percent className="w-7 h-7 text-brand-orange" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-semibold text-text-primary">No promotions found</p>
                    <p className="text-xs text-text-secondary">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((promo) => (
                <tr key={promo.id} className="hover:bg-bg-secondary/60 transition-colors">

                  {/* Banner thumbnail */}
                  <td className="px-4 py-3.5">
                    <div className="w-14 h-10 rounded-lg overflow-hidden border border-border-light bg-bg-secondary flex-shrink-0">
                      {promo.bannerImage ? (
                        <img src={promo.bannerImage} alt={promo.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImagePlus className="w-4 h-4 text-text-secondary" />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3.5 max-w-[180px]">
                    <p className="text-sm font-bold text-text-primary line-clamp-1">{promo.name}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{promo.id}</p>
                  </td>

                  {/* Discount type + value */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        promo.discountType === 'percentage'
                          ? 'bg-orange-100 text-brand-orange'
                          : 'bg-violet-100 text-violet-700'
                      }`}>
                        {promo.discountType === 'percentage'
                          ? `${promo.discountValue}% OFF`
                          : `₦${promo.discountValue.toLocaleString()} OFF`}
                      </span>
                    </div>
                  </td>

                  {/* Applies to */}
                  <td className="px-4 py-3.5 max-w-[160px]">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                        promo.appliesTo === 'category'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-amber-50 text-amber-600'
                      }`}>
                        {promo.appliesTo === 'category' ? 'Cat' : 'Prod'}
                      </span>
                      <span className="text-xs text-text-secondary line-clamp-1">{promo.appliesToValue}</span>
                    </div>
                  </td>

                  {/* Start date */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                      <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
                      {promo.startDate.replace('T', ' ')}
                    </div>
                  </td>

                  {/* End date */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                      <CalendarDays className="w-3.5 h-3.5 flex-shrink-0" />
                      {promo.endDate.replace('T', ' ')}
                    </div>
                  </td>

                  {/* Status badge */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <PromotionStatusBadge status={promo.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(promo)}
                        title="Edit promotion"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-brand-orange hover:bg-orange-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(promo.id)}
                        title="Delete promotion"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-red-500 hover:bg-red-50 transition-colors"
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
            {sorted.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)}
          </span>{' '}
          of <span className="font-semibold text-text-primary">{sorted.length}</span> promotions
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

export default function AdminDiscountsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false)
  const pathname = usePathname()
  const [promotions,       setPromotions]       = useState(MOCK_PROMOTIONS)
  const [sheetOpen,        setSheetOpen]        = useState(false)
  const [editPromo,        setEditPromo]        = useState(null)

  const openCreate = () => { setEditPromo(null); setSheetOpen(true) }
  const openEdit   = (promo) => { setEditPromo(promo); setSheetOpen(true) }
  const closeSheet = () => { setSheetOpen(false); setEditPromo(null) }

  const handleSave = (promo) => {
    setPromotions((prev) => {
      const exists = prev.find((p) => p.id === promo.id)
      if (exists) return prev.map((p) => p.id === promo.id ? promo : p)
      return [promo, ...prev]
    })
  }

  const handleDelete = (id) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id))
  }

  // Stats
  const activeCount    = promotions.filter((p) => p.status === 'Active').length
  const scheduledCount = promotions.filter((p) => p.status === 'Scheduled').length
  const expiredCount   = promotions.filter((p) => p.status === 'Expired').length

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
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">Promotions</p>
              <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                Discounts &amp; Flash Sales
                <span className="text-base font-semibold bg-orange-100 text-brand-orange px-3 py-0.5 rounded-full">
                  {promotions.length} total
                </span>
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Create and manage discount promotions and flash sale campaigns.
              </p>
            </div>

            <Button
              onClick={openCreate}
              className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-10 px-5 rounded-xl gap-2 flex-shrink-0"
              style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
            >
              <Plus className="w-4 h-4" />
              Create New Promotion
            </Button>
          </motion.div>

          {/* ── Stats cards ───────────────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              {
                label: 'Total Promotions',
                value: promotions.length,
                icon: Percent,
                iconBg: 'bg-orange-50',
                iconColor: 'text-brand-orange',
                accent: 'bg-brand-orange',
                valueColor: 'text-brand-orange',
              },
              {
                label: 'Active',
                value: activeCount,
                icon: CheckCircle2,
                iconBg: 'bg-emerald-50',
                iconColor: 'text-emerald-600',
                accent: 'bg-emerald-500',
                valueColor: 'text-emerald-600',
              },
              {
                label: 'Scheduled',
                value: scheduledCount,
                icon: Clock,
                iconBg: 'bg-blue-50',
                iconColor: 'text-blue-500',
                accent: 'bg-blue-500',
                valueColor: 'text-blue-600',
              },
              {
                label: 'Expired',
                value: expiredCount,
                icon: XCircle,
                iconBg: 'bg-gray-50',
                iconColor: 'text-gray-400',
                accent: 'bg-gray-400',
                valueColor: 'text-gray-500',
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

          {/* ── Active promotions banner preview strip ────────────────────── */}
          {promotions.filter((p) => p.status === 'Active' && p.bannerImage).length > 0 && (
            <motion.div
              variants={fadeCard}
              initial="hidden"
              animate="show"
              className="bg-white rounded-2xl border border-border-light p-5"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-brand-orange" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">Live Now</p>
                  <p className="text-sm font-bold text-text-primary">Active Flash Deal Banners</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {promotions
                  .filter((p) => p.status === 'Active' && p.bannerImage)
                  .map((promo) => (
                    <div key={promo.id} className="relative rounded-xl overflow-hidden border border-border-light group">
                      <img
                        src={promo.bannerImage}
                        alt={promo.name}
                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-3 right-3">
                        <p className="text-white text-xs font-bold line-clamp-1">{promo.name}</p>
                        <span className="inline-flex items-center gap-1 mt-0.5 px-1.5 py-0.5 bg-brand-orange rounded text-[10px] font-bold text-white">
                          {promo.discountType === 'percentage'
                            ? `${promo.discountValue}% OFF`
                            : `₦${promo.discountValue.toLocaleString()} OFF`}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* ── Promotions table ──────────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
          >
            <PromotionsTable
              promotions={promotions}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          </motion.div>

          <div className="h-4" />
        </main>
      </div>

      {/* ── Promotion Sheet ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {sheetOpen && (
          <PromotionSheet
            editPromo={editPromo}
            onClose={closeSheet}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

    </div>
  )
}
