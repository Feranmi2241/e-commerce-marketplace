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
  Menu,
  X,
  ChevronsUpDown,
  Plus,
  Pencil,
  Trash2,
  ImagePlus,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Filter,
  SlidersHorizontal,
  Upload,
  GripVertical,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  { label: 'Products',   icon: Package,         href: '/admin/products',  active: true },
  { label: 'Categories', icon: Tag,             href: '/admin/categories' },
  { label: 'Orders',     icon: ShoppingBag,     href: '/admin/orders' },
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


// ─── Mock Products ────────────────────────────────────────────────────────────

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

const MOCK_PRODUCTS = [
  {
    id: 'PRD-001',
    name: 'Apple iPhone 15 Pro Max 256GB Natural Titanium',
    category: 'Phones & Tablets',
    price: 1150000,
    discount: 5,
    stock: 18,
    status: 'Active',
    easyBuy: true,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=80&h=80&fit=crop',
    specs: [
      { key: 'Storage', value: '256GB' },
      { key: 'RAM', value: '8GB' },
      { key: 'Display', value: '6.7" Super Retina XDR' },
    ],
  },
  {
    id: 'PRD-002',
    name: 'Samsung Galaxy S24 Ultra 512GB Titanium Black',
    category: 'Phones & Tablets',
    price: 980000,
    discount: 8,
    stock: 24,
    status: 'Active',
    easyBuy: true,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=80&h=80&fit=crop',
    specs: [
      { key: 'Storage', value: '512GB' },
      { key: 'RAM', value: '12GB' },
      { key: 'Display', value: '6.8" Dynamic AMOLED' },
    ],
  },
  {
    id: 'PRD-003',
    name: 'MacBook Air M3 13" 16GB 512GB Midnight',
    category: 'Computing',
    price: 1480000,
    discount: 3,
    stock: 9,
    status: 'Active',
    easyBuy: true,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop',
    specs: [
      { key: 'Chip', value: 'Apple M3' },
      { key: 'RAM', value: '16GB' },
      { key: 'Storage', value: '512GB SSD' },
    ],
  },
  {
    id: 'PRD-004',
    name: 'Samsung 55" Crystal UHD 4K Smart TV',
    category: 'Electronics',
    price: 485000,
    discount: 10,
    stock: 3,
    status: 'Active',
    easyBuy: true,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=80&h=80&fit=crop',
    specs: [
      { key: 'Screen Size', value: '55 inches' },
      { key: 'Resolution', value: '4K UHD' },
      { key: 'Smart OS', value: 'Tizen' },
    ],
  },
  {
    id: 'PRD-005',
    name: 'Hisense 200L Chest Freezer HF-200',
    category: 'Home Appliances',
    price: 210000,
    discount: 0,
    stock: 12,
    status: 'Active',
    easyBuy: true,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=80&h=80&fit=crop',
    specs: [
      { key: 'Capacity', value: '200 Litres' },
      { key: 'Energy Rating', value: 'A+' },
      { key: 'Color', value: 'White' },
    ],
  },
  {
    id: 'PRD-006',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    category: 'Electronics',
    price: 189000,
    discount: 12,
    stock: 5,
    status: 'Active',
    easyBuy: false,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
    specs: [
      { key: 'Battery Life', value: '30 hours' },
      { key: 'Connectivity', value: 'Bluetooth 5.2' },
      { key: 'Color', value: 'Black' },
    ],
  },
  {
    id: 'PRD-007',
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    category: 'Home Appliances',
    price: 420000,
    discount: 7,
    stock: 0,
    status: 'Out of Stock',
    easyBuy: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop',
    specs: [
      { key: 'Suction Power', value: '240 AW' },
      { key: 'Run Time', value: '60 min' },
      { key: 'Filter', value: 'HEPA' },
    ],
  },
  {
    id: 'PRD-008',
    name: 'Xiaomi Redmi Note 13 Pro 256GB Midnight Black',
    category: 'Phones & Tablets',
    price: 195000,
    discount: 5,
    stock: 41,
    status: 'Active',
    easyBuy: false,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop',
    specs: [
      { key: 'Storage', value: '256GB' },
      { key: 'RAM', value: '8GB' },
      { key: 'Camera', value: '200MP' },
    ],
  },
  {
    id: 'PRD-009',
    name: 'LG 9kg Front Load Washing Machine F4V5RYP2T',
    category: 'Home Appliances',
    price: 320000,
    discount: 0,
    stock: 7,
    status: 'Active',
    easyBuy: true,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=80&h=80&fit=crop',
    specs: [
      { key: 'Capacity', value: '9kg' },
      { key: 'Spin Speed', value: '1400 RPM' },
      { key: 'Energy Rating', value: 'A+++' },
    ],
  },
  {
    id: 'PRD-010',
    name: 'Nikon Z50 Mirrorless Camera Body',
    category: 'Electronics',
    price: 580000,
    discount: 0,
    stock: 6,
    status: 'Active',
    easyBuy: true,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=80&h=80&fit=crop',
    specs: [
      { key: 'Sensor', value: '20.9MP APS-C' },
      { key: 'Video', value: '4K UHD' },
      { key: 'Mount', value: 'Nikon Z' },
    ],
  },
  {
    id: 'PRD-011',
    name: 'Anker 65W USB-C GaN Charger PowerPort III',
    category: 'Power & Accessories',
    price: 18500,
    discount: 15,
    stock: 120,
    status: 'Active',
    easyBuy: false,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=80&h=80&fit=crop',
    specs: [
      { key: 'Output', value: '65W' },
      { key: 'Ports', value: '2x USB-C, 1x USB-A' },
      { key: 'Compatibility', value: 'Universal' },
    ],
  },
  {
    id: 'PRD-012',
    name: 'Baseus 20000mAh Power Bank 65W Fast Charge',
    category: 'Power & Accessories',
    price: 32000,
    discount: 10,
    stock: 55,
    status: 'Active',
    easyBuy: false,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=80&h=80&fit=crop',
    specs: [
      { key: 'Capacity', value: '20000mAh' },
      { key: 'Output', value: '65W Max' },
      { key: 'Ports', value: '3 Ports' },
    ],
  },
  {
    id: 'PRD-013',
    name: "L'Oréal Paris Revitalift 1.5% Pure Hyaluronic Acid Serum",
    category: 'Cosmetics & Beauty',
    price: 14500,
    discount: 0,
    stock: 88,
    status: 'Active',
    easyBuy: false,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop',
    specs: [
      { key: 'Volume', value: '30ml' },
      { key: 'Skin Type', value: 'All Skin Types' },
      { key: 'Key Ingredient', value: 'Hyaluronic Acid' },
    ],
  },
  {
    id: 'PRD-014',
    name: 'Dior Sauvage Eau de Parfum 100ml',
    category: 'Perfumes',
    price: 68000,
    discount: 0,
    stock: 22,
    status: 'Active',
    easyBuy: false,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=80&h=80&fit=crop',
    specs: [
      { key: 'Volume', value: '100ml' },
      { key: 'Concentration', value: 'Eau de Parfum' },
      { key: 'Gender', value: 'Men' },
    ],
  },
  {
    id: 'PRD-015',
    name: 'Apple AirPods Pro 2nd Generation with MagSafe Case',
    category: 'Electronics',
    price: 265000,
    discount: 5,
    stock: 0,
    status: 'Out of Stock',
    easyBuy: false,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=80&h=80&fit=crop',
    specs: [
      { key: 'Battery Life', value: '6 hours (30 with case)' },
      { key: 'Connectivity', value: 'Bluetooth 5.3' },
      { key: 'Noise Cancellation', value: 'Active' },
    ],
  },
  {
    id: 'PRD-016',
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker 6Qt',
    category: 'Home Appliances',
    price: 98000,
    discount: 20,
    stock: 34,
    status: 'Active',
    easyBuy: false,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=80&h=80&fit=crop',
    specs: [
      { key: 'Capacity', value: '6 Quarts' },
      { key: 'Functions', value: '7-in-1' },
      { key: 'Power', value: '1000W' },
    ],
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
      {/* Logo */}
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

      {/* Nav items */}
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

      {/* Collapse toggle */}
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

      {/* Mobile menu button */}
      <button
        onClick={onMobileMenuToggle}
        className="md:hidden p-2 hover:bg-bg-secondary rounded-full transition flex-shrink-0"
      >
        <Menu className="w-5 h-5 text-text-primary" />
      </button>

      {/* Mobile logo */}
      <span className="md:hidden text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent flex-shrink-0">
        Admin
      </span>

      {/* Search */}
      <div className="flex-1 max-w-sm hidden sm:block">
        <div className="search-glow rounded-full px-4 py-2 bg-bg-secondary border border-border-light flex items-center gap-2">
          <Search className="w-4 h-4 text-text-secondary flex-shrink-0" />
          <input
            type="text"
            placeholder="Search products, orders..."
            className="bg-transparent outline-none flex-1 text-sm text-text-primary placeholder-text-secondary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notification bell */}
        <button className="relative p-2 hover:bg-bg-secondary rounded-full transition">
          <Bell className="w-5 h-5 text-text-primary" />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
            5
          </span>
        </button>

        {/* Admin avatar + name */}
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


// ─── Products Table ───────────────────────────────────────────────────────────

const PAGE_SIZE = 8

function ProductsTable({ onEdit }) {
  const [products, setProducts]             = useState(MOCK_PRODUCTS)
  const [search, setSearch]                 = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter]     = useState('All')
  const [easyBuyFilter, setEasyBuyFilter]   = useState(false)
  const [sortKey, setSortKey]               = useState('id')
  const [sortDir, setSortDir]               = useState('asc')
  const [page, setPage]                     = useState(1)
  const [selected, setSelected]             = useState([])
  const [showBulkCatDropdown, setShowBulkCatDropdown] = useState(false)

  // ── Filtering ──
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      const matchCategory = categoryFilter === 'All' || p.category === categoryFilter
      const matchStatus   = statusFilter === 'All' || p.status === statusFilter
      const matchEasyBuy  = !easyBuyFilter || p.easyBuy === true
      return matchSearch && matchCategory && matchStatus && matchEasyBuy
    })
  }, [products, search, categoryFilter, statusFilter, easyBuyFilter])

  // ── Sorting ──
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let av = a[sortKey]
      let bv = b[sortKey]
      if (typeof av === 'string') av = av.toLowerCase()
      if (typeof bv === 'string') bv = bv.toLowerCase()
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [filtered, sortKey, sortDir])

  // ── Pagination ──
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const paged      = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
    setPage(1)
  }

  // ── Row selection ──
  const allPageSelected = paged.length > 0 && paged.every((p) => selected.includes(p.id))
  const toggleAll = () => {
    if (allPageSelected) setSelected((s) => s.filter((id) => !paged.find((p) => p.id === id)))
    else setSelected((s) => [...new Set([...s, ...paged.map((p) => p.id)])])
  }
  const toggleOne = (id) =>
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])

  // ── Bulk actions ──
  const bulkDelete = () => {
    setProducts((prev) => prev.filter((p) => !selected.includes(p.id)))
    setSelected([])
  }
  const bulkChangeCategory = (cat) => {
    setProducts((prev) =>
      prev.map((p) => selected.includes(p.id) ? { ...p, category: cat } : p)
    )
    setSelected([])
    setShowBulkCatDropdown(false)
  }

  // ── Easy Buy inline toggle ──
  const toggleEasyBuy = (id) =>
    setProducts((prev) =>
      prev.map((p) => p.id === id ? { ...p, easyBuy: !p.easyBuy } : p)
    )

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ChevronsUpDown className="w-3 h-3 text-text-secondary opacity-40" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-brand-orange" />
      : <ChevronDown className="w-3 h-3 text-brand-orange" />
  }

  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* ── Search + Filter Bar ── */}
      <div className="px-5 py-4 border-b border-border-light space-y-3">
        <div className="flex items-center gap-3 flex-wrap">

          {/* Search */}
          <div className="search-glow flex-1 min-w-[200px] rounded-xl px-4 py-2.5 bg-bg-secondary border border-border-light flex items-center gap-2">
            <Search className="w-4 h-4 text-text-secondary flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search by name, ID, or category..."
              className="bg-transparent outline-none flex-1 text-sm text-text-primary placeholder-text-secondary"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-text-secondary hover:text-text-primary transition">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1) }}
            className="px-3 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange transition cursor-pointer"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            className="px-3 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange transition cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          {/* Easy Buy filter */}
          <button
            onClick={() => { setEasyBuyFilter((v) => !v); setPage(1) }}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
              easyBuyFilter
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : 'border-border-light text-text-secondary hover:border-amber-300 hover:text-amber-600'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Easy Buy Only
          </button>
        </div>

        {/* Result count + clear filters */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-secondary">
            Showing <span className="font-semibold text-text-primary">{sorted.length}</span> of{' '}
            <span className="font-semibold text-text-primary">{products.length}</span> products
          </p>
          {(search || categoryFilter !== 'All' || statusFilter !== 'All' || easyBuyFilter) && (
            <button
              onClick={() => { setSearch(''); setCategoryFilter('All'); setStatusFilter('All'); setEasyBuyFilter(false); setPage(1) }}
              className="text-xs text-brand-orange hover:underline font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* ── Bulk Action Bar ── */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="px-5 py-3 bg-orange-50 border-b border-orange-100 flex items-center gap-3 flex-wrap"
          >
            <span className="text-sm font-bold text-brand-orange">
              {selected.length} product{selected.length > 1 ? 's' : ''} selected
            </span>

            <div className="flex items-center gap-2 ml-auto flex-wrap">
              {/* Bulk category change */}
              <div className="relative">
                <button
                  onClick={() => setShowBulkCatDropdown((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-light bg-white text-xs font-semibold text-text-primary hover:border-brand-orange hover:text-brand-orange transition"
                >
                  <Tag className="w-3.5 h-3.5" />
                  Change Category
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showBulkCatDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-border-light rounded-xl shadow-lg z-20 py-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => bulkChangeCategory(cat)}
                        className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-orange-50 hover:text-brand-orange transition"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Bulk delete */}
              <button
                onClick={bulkDelete}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Selected
              </button>

              <button
                onClick={() => setSelected([])}
                className="text-xs text-text-secondary hover:text-text-primary font-medium transition"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-secondary border-b border-border-light">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={allPageSelected}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded border-border-light accent-brand-orange cursor-pointer"
                />
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-16">
                Image
              </th>
              {[
                { key: 'name',     label: 'Product Name' },
                { key: 'category', label: 'Category'     },
                { key: 'price',    label: 'Price'        },
                { key: 'stock',    label: 'Stock'        },
                { key: 'status',   label: 'Status'       },
              ].map((col) => (
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  Easy Buy
                </div>
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border-light">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
                      <Package className="w-7 h-7 text-brand-orange" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-semibold text-text-primary">No products found</p>
                    <p className="text-xs text-text-secondary">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((product) => (
                <motion.tr
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`hover:bg-bg-secondary/60 transition-colors ${
                    selected.includes(product.id) ? 'bg-orange-50/40' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selected.includes(product.id)}
                      onChange={() => toggleOne(product.id)}
                      className="w-4 h-4 rounded border-border-light accent-brand-orange cursor-pointer"
                    />
                  </td>

                  {/* Thumbnail */}
                  <td className="px-3 py-3.5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-border-light bg-bg-secondary flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                  </td>

                  {/* Name + ID */}
                  <td className="px-4 py-3.5 max-w-[220px]">
                    <p className="text-sm font-semibold text-text-primary line-clamp-2 leading-snug">
                      {product.name}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5">{product.id}</p>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-xs font-medium text-text-secondary bg-bg-secondary px-2.5 py-1 rounded-full">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <p className="text-sm font-bold text-text-primary">
                      ₦{product.price.toLocaleString()}
                    </p>
                    {product.discount > 0 && (
                      <p className="text-xs text-emerald-600 font-medium mt-0.5">-{product.discount}% off</p>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-bold ${
                        product.stock === 0 ? 'text-red-500'
                        : product.stock <= 5 ? 'text-amber-600'
                        : 'text-text-primary'
                      }`}>
                        {product.stock}
                      </span>
                      {product.stock <= 5 && product.stock > 0 && (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    {product.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                        <XCircle className="w-3 h-3" />
                        Out of Stock
                      </span>
                    )}
                  </td>

                  {/* Easy Buy Switch */}
                  <td className="px-4 py-3.5">
                    <Switch
                      checked={product.easyBuy}
                      onCheckedChange={() => toggleEasyBuy(product.id)}
                      className="data-[state=checked]:bg-amber-500"
                    />
                  </td>

                  {/* Edit / Delete */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 rounded-lg text-text-secondary hover:text-brand-orange hover:bg-orange-50 transition"
                        title="Edit product"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setProducts((prev) => prev.filter((p) => p.id !== product.id))}
                        className="p-2 rounded-lg text-text-secondary hover:text-red-500 hover:bg-red-50 transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="px-5 py-3.5 border-t border-border-light flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-text-secondary">
          Showing{' '}
          <span className="font-semibold text-text-primary">
            {sorted.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)}
          </span>{' '}
          of <span className="font-semibold text-text-primary">{sorted.length}</span> products
        </p>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
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
            variant="outline"
            size="sm"
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


// ─── Add / Edit Product Sheet ─────────────────────────────────────────────────

function ProductSheet({ open, onClose, editProduct }) {
  const isEdit      = !!editProduct
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    name:        editProduct?.name        || '',
    description: editProduct?.description || '',
    category:    editProduct?.category    || '',
    price:       editProduct?.price       || '',
    discount:    editProduct?.discount    || 0,
    stock:       editProduct?.stock       || '',
    easyBuy:     editProduct?.easyBuy     || false,
    specs:       editProduct?.specs?.length ? editProduct.specs : [{ key: '', value: '' }],
    previewUrls: editProduct?.image ? [editProduct.image] : [],
  })

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  // Spec handlers
  const addSpec    = () => set('specs', [...form.specs, { key: '', value: '' }])
  const removeSpec = (i) => set('specs', form.specs.filter((_, idx) => idx !== i))
  const updateSpec = (i, field, val) =>
    set('specs', form.specs.map((s, idx) => idx === i ? { ...s, [field]: val } : s))

  // Image handlers
  const handleImages = (e) => {
    const urls = Array.from(e.target.files).map((f) => URL.createObjectURL(f))
    set('previewUrls', [...form.previewUrls, ...urls])
  }
  const removeImage = (i) => set('previewUrls', form.previewUrls.filter((_, idx) => idx !== i))

  if (!open) return null

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
        className="relative ml-auto w-full max-w-2xl bg-white h-full flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light flex-shrink-0">
          <div>
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-0.5">
              {isEdit ? 'Edit Product' : 'New Product'}
            </p>
            <h2 className="text-lg font-bold text-text-primary">
              {isEdit ? 'Update Product Details' : 'Add New Product'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-bg-secondary rounded-full transition">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* Product Name */}
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Apple iPhone 15 Pro Max 256GB"
              className="w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Write a clear, detailed product description..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition appearance-none cursor-pointer"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price + Discount + Stock */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
                Price (₦) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="0"
                min="0"
                className="w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
                Discount (%)
              </label>
              <input
                type="number"
                value={form.discount}
                onChange={(e) => set('discount', e.target.value)}
                placeholder="0"
                min="0"
                max="100"
                className="w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
                Stock Qty <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => set('stock', e.target.value)}
                placeholder="0"
                min="0"
                className="w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
              />
            </div>
          </div>

          {/* Live price preview */}
          {form.price > 0 && (
            <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 flex items-center gap-6">
              <div>
                <p className="text-xs text-text-secondary font-medium">Selling Price</p>
                <p className="text-lg font-bold text-brand-orange">₦{Number(form.price).toLocaleString()}</p>
              </div>
              {form.discount > 0 && (
                <>
                  <div className="w-px h-8 bg-orange-200" />
                  <div>
                    <p className="text-xs text-text-secondary font-medium">After {form.discount}% Discount</p>
                    <p className="text-lg font-bold text-emerald-600">
                      ₦{Math.round(form.price * (1 - form.discount / 100)).toLocaleString()}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Multi-image upload */}
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
              Product Images
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border-light rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-brand-orange hover:bg-orange-50/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition">
                <ImagePlus className="w-5 h-5 text-brand-orange" />
              </div>
              <p className="text-sm font-semibold text-text-primary">Click to upload images</p>
              <p className="text-xs text-text-secondary">PNG, JPG, WEBP — up to 5MB each</p>
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
            </div>

            {/* Preview thumbnails */}
            {form.previewUrls.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {form.previewUrls.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-border-light bg-bg-secondary">
                      <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-brand-orange text-white px-1.5 py-0.5 rounded-md">
                        Main
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Specifications key-value list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-text-primary uppercase tracking-wide">
                Specifications
              </label>
              <button
                onClick={addSpec}
                className="flex items-center gap-1 text-xs font-semibold text-brand-orange hover:text-orange-600 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Row
              </button>
            </div>
            <div className="space-y-2">
              {form.specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-text-secondary flex-shrink-0 cursor-grab" />
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => updateSpec(idx, 'key', e.target.value)}
                    placeholder="Spec name (e.g. RAM)"
                    className="flex-1 px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/10 transition"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => updateSpec(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. 8GB)"
                    className="flex-1 px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/10 transition"
                  />
                  <button
                    onClick={() => removeSpec(idx)}
                    disabled={form.specs.length === 1}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-red-500 hover:bg-red-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Easy Buy eligibility */}
          <div className="flex items-center justify-between bg-amber-50 border border-amber-100 rounded-xl px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">Easy Buy Eligible</p>
                <p className="text-xs text-text-secondary mt-0.5">
                  Enable for products priced ₦130,000 and above
                </p>
              </div>
            </div>
            <Switch
              checked={form.easyBuy}
              onCheckedChange={(val) => set('easyBuy', val)}
              className="data-[state=checked]:bg-amber-500"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border-light bg-white flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-border-light text-sm font-semibold text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition"
          >
            Cancel
          </button>
          <Button
            className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-6 h-10 rounded-xl gap-2"
            style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
          >
            {isEdit ? <><CheckCircle2 className="w-4 h-4" /> Save Changes</> : <><Plus className="w-4 h-4" /> Add Product</>}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminProductsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false)
  const [sheetOpen,        setSheetOpen]        = useState(false)
  const [editProduct,      setEditProduct]      = useState(null)
  const pathname = usePathname()

  const openAddSheet  = () => { setEditProduct(null); setSheetOpen(true) }
  const openEditSheet = (product) => { setEditProduct(product); setSheetOpen(true) }
  const closeSheet    = () => { setSheetOpen(false); setEditProduct(null) }

  return (
    <div className="min-h-screen bg-bg-secondary flex overflow-x-hidden">

      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />

      {/* Mobile sidebar overlay */}
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
                      <span className={`text-sm font-medium ${isActive ? 'font-semibold text-brand-orange' : ''}`}>
                        {item.label}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">

          {/* Page heading */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="flex items-start justify-between gap-4 flex-wrap"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                Inventory
              </p>
              <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                Manage Products
                <span className="text-base font-semibold bg-orange-100 text-brand-orange px-3 py-0.5 rounded-full">
                  {MOCK_PRODUCTS.length} products
                </span>
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Add, edit, and manage your entire product catalogue from here.
              </p>
            </div>

            <Button
              onClick={openAddSheet}
              className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-10 px-5 rounded-xl gap-2 flex-shrink-0"
              style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
            >
              <Plus className="w-4 h-4" />
              Add New Product
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              {
                label: 'Total Products',
                value: MOCK_PRODUCTS.length,
                icon: Package,
                iconBg: 'bg-orange-50',
                iconColor: 'text-brand-orange',
                accent: 'bg-brand-orange',
              },
              {
                label: 'Active',
                value: MOCK_PRODUCTS.filter((p) => p.status === 'Active').length,
                icon: CheckCircle2,
                iconBg: 'bg-emerald-50',
                iconColor: 'text-emerald-600',
                accent: 'bg-emerald-500',
              },
              {
                label: 'Out of Stock',
                value: MOCK_PRODUCTS.filter((p) => p.status === 'Out of Stock').length,
                icon: XCircle,
                iconBg: 'bg-red-50',
                iconColor: 'text-red-500',
                accent: 'bg-red-500',
              },
              {
                label: 'Easy Buy Eligible',
                value: MOCK_PRODUCTS.filter((p) => p.easyBuy).length,
                icon: Zap,
                iconBg: 'bg-amber-50',
                iconColor: 'text-amber-600',
                accent: 'bg-amber-500',
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
                    <div>
                      <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
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

          {/* Products table */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
          >
            <ProductsTable onEdit={openEditSheet} />
          </motion.div>

          <div className="h-4" />
        </main>
      </div>

      {/* Add / Edit Sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <ProductSheet
            open={sheetOpen}
            onClose={closeSheet}
            editProduct={editProduct}
          />
        )}
      </AnimatePresence>

    </div>
  )
}
