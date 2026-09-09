'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
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
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  RotateCcw,
  DollarSign,
  ShoppingCart,
  UserPlus,
  Menu,
  X,
  ChevronsUpDown,
  ArrowUpRight,
  ArrowDownRight,
  MessageCircle,
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
  { label: 'Dashboard',  icon: LayoutDashboard, href: '/admin/dashboard', active: true },
  { label: 'Products',   icon: Package,         href: '/admin/products' },
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

// ─── KPI Stats ────────────────────────────────────────────────────────────────

const KPI_STATS = [
  {
    label: 'Total Revenue',
    value: '₦48.6M',
    trend: '+12.4%',
    up: true,
    icon: DollarSign,
    iconBg: 'bg-orange-50',
    iconColor: 'text-brand-orange',
    accentBar: 'bg-brand-orange',
  },
  {
    label: 'Total Orders',
    value: '3,842',
    trend: '+8.1%',
    up: true,
    icon: ShoppingCart,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    accentBar: 'bg-blue-500',
  },
  {
    label: 'New Customers',
    value: '284',
    trend: '+5.3%',
    up: true,
    icon: UserPlus,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    accentBar: 'bg-emerald-500',
  },
  {
    label: 'Pending Orders',
    value: '67',
    trend: '-3.2%',
    up: false,
    icon: Clock,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    accentBar: 'bg-amber-500',
  },
]

// ─── Revenue Line Chart Data ──────────────────────────────────────────────────

const REVENUE_DATA = [
  { month: 'Jan', revenue: 3200000 },
  { month: 'Feb', revenue: 4100000 },
  { month: 'Mar', revenue: 3800000 },
  { month: 'Apr', revenue: 5200000 },
  { month: 'May', revenue: 4700000 },
  { month: 'Jun', revenue: 6100000 },
  { month: 'Jul', revenue: 5800000 },
  { month: 'Aug', revenue: 7200000 },
  { month: 'Sep', revenue: 6500000 },
  { month: 'Oct', revenue: 8100000 },
  { month: 'Nov', revenue: 9400000 },
  { month: 'Dec', revenue: 11200000 },
]

// ─── Order Status Donut Data ──────────────────────────────────────────────────

const ORDER_STATUS_DATA = [
  { name: 'Delivered',   value: 2140, color: '#10b981' },
  { name: 'Processing',  value: 820,  color: '#f59e0b' },
  { name: 'Shipped',     value: 614,  color: '#3b82f6' },
  { name: 'Cancelled',   value: 268,  color: '#ef4444' },
]

// ─── Best Sellers Bar Chart Data ──────────────────────────────────────────────

const BESTSELLERS_DATA = [
  { name: 'Samsung 55" TV',    sold: 312 },
  { name: 'Sony WH-1000XM5',   sold: 278 },
  { name: 'iPhone 15 Pro',     sold: 241 },
  { name: 'Hisense Freezer',   sold: 198 },
  { name: 'Instant Pot Duo',   sold: 176 },
  { name: 'Dyson V12',         sold: 154 },
]

// ─── Recent Orders Table Data ─────────────────────────────────────────────────

const RECENT_ORDERS = [
  { id: 'ORD-38291', customer: 'Adaeze Okonkwo',   date: 'Jul 22, 2025', total: 674000,  status: 'Delivered'  },
  { id: 'ORD-38290', customer: 'Tunde Adeyemi',    date: 'Jul 22, 2025', total: 195000,  status: 'Processing' },
  { id: 'ORD-38289', customer: 'Ngozi Eze',        date: 'Jul 21, 2025', total: 320000,  status: 'Shipped'    },
  { id: 'ORD-38288', customer: 'Emeka Obi',        date: 'Jul 21, 2025', total: 88500,   status: 'Delivered'  },
  { id: 'ORD-38287', customer: 'Fatima Bello',     date: 'Jul 20, 2025', total: 485000,  status: 'Cancelled'  },
  { id: 'ORD-38286', customer: 'Chidi Nwosu',      date: 'Jul 20, 2025', total: 210000,  status: 'Delivered'  },
  { id: 'ORD-38285', customer: 'Amaka Okafor',     date: 'Jul 19, 2025', total: 65000,   status: 'Processing' },
  { id: 'ORD-38284', customer: 'Seun Adesanya',    date: 'Jul 19, 2025', total: 145000,  status: 'Shipped'    },
  { id: 'ORD-38283', customer: 'Kemi Adebayo',     date: 'Jul 18, 2025', total: 28500,   status: 'Delivered'  },
  { id: 'ORD-38282', customer: 'Uche Okonkwo',     date: 'Jul 18, 2025', total: 580000,  status: 'Processing' },
  { id: 'ORD-38281', customer: 'Bola Tinubu-Eze',  date: 'Jul 17, 2025', total: 98000,   status: 'Delivered'  },
  { id: 'ORD-38280', customer: 'Yemi Osinbajo',    date: 'Jul 17, 2025', total: 265000,  status: 'Shipped'    },
]

// ─── Low Stock Alerts ─────────────────────────────────────────────────────────

const LOW_STOCK = [
  { name: 'Samsung 55" Crystal UHD TV',  stock: 3,  image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=48&h=48&fit=crop' },
  { name: 'Sony WH-1000XM5 Headphones',  stock: 5,  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=48&h=48&fit=crop' },
  { name: 'Dyson V12 Cordless Vacuum',   stock: 2,  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=48&h=48&fit=crop' },
  { name: 'Apple AirPods Pro 2nd Gen',   stock: 7,  image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=48&h=48&fit=crop' },
]

// ─── Pending Easy Buy Applications ───────────────────────────────────────────

const EASY_BUY_APPS = [
  { name: 'Tunde Adeyemi',  product: 'iPhone 15 Pro',          amount: 890000,  date: 'Jul 22' },
  { name: 'Ngozi Eze',      product: 'Samsung 55" TV',         amount: 485000,  date: 'Jul 21' },
  { name: 'Fatima Bello',   product: 'Nikon Z50 Camera',       amount: 580000,  date: 'Jul 20' },
  { name: 'Chidi Nwosu',    product: 'Dyson V12 Vacuum',       amount: 320000,  date: 'Jul 19' },
]

// ─── Status Config ────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  Delivered:  { variant: 'success',     icon: CheckCircle2 },
  Processing: { variant: 'warning',     icon: RotateCcw    },
  Shipped:    { variant: 'outline',     icon: Truck        },
  Cancelled:  { variant: 'destructive', icon: XCircle      },
}

// ─── Animation Variants (minimal — one-time fade-in only) ────────────────────

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
            placeholder="Search orders, customers..."
            className="bg-transparent outline-none flex-1 text-sm text-text-primary placeholder-text-secondary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notification bell */}
        <Link href="/admin/notifications" className="relative p-2 hover:bg-bg-secondary rounded-full transition">
          <Bell className="w-5 h-5 text-text-primary" />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
            5
          </span>
        </Link>

        {/* Admin avatar + name */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-border-light">
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              {ADMIN.initials}
            </div>
            {/* Green online dot */}
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

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({ stat }) {
  const Icon      = stat.icon
  const TrendIcon = stat.up ? ArrowUpRight : ArrowDownRight

  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light p-5 hover:shadow-md transition-shadow"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2 truncate">
            {stat.label}
          </p>
          <p className="text-3xl font-bold text-text-primary leading-none">{stat.value}</p>
          <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{stat.trend} vs last month</span>
          </div>
        </div>
        <div className={`${stat.iconBg} p-3 rounded-xl flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${stat.iconColor}`} />
        </div>
      </div>
      {/* Accent bar at bottom */}
      <div className={`mt-4 h-1 rounded-full ${stat.accentBar} opacity-30`} />
    </motion.div>
  )
}

// ─── Revenue Line Chart ───────────────────────────────────────────────────────

function RevenueLineChart() {
  const formatRevenue = (v) => `₦${(v / 1000000).toFixed(1)}M`

  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light p-5"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="mb-4">
        <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
          Performance
        </p>
        <p className="text-base font-bold text-text-primary">Revenue Trend — 2025</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E8EA" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#6B6B72' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatRevenue}
            tick={{ fontSize: 11, fill: '#6B6B72' }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip
            formatter={(v) => [`₦${v.toLocaleString()}`, 'Revenue']}
            contentStyle={{
              background: '#fff',
              border: '1px solid #E8E8EA',
              borderRadius: '12px',
              fontSize: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#F68B1E"
            strokeWidth={2.5}
            dot={{ fill: '#F68B1E', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#F68B1E', strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// ─── Order Status Donut Chart ─────────────────────────────────────────────────

function OrderDonutChart() {
  const total = ORDER_STATUS_DATA.reduce((s, d) => s + d.value, 0)

  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light p-5"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="mb-4">
        <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
          Breakdown
        </p>
        <p className="text-base font-bold text-text-primary">Order Status</p>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        {/* Donut */}
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={ORDER_STATUS_DATA}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {ORDER_STATUS_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, name) => [v.toLocaleString(), name]}
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #E8E8EA',
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xl font-bold text-text-primary leading-none">{total.toLocaleString()}</p>
            <p className="text-[10px] text-text-secondary font-medium mt-0.5">Total</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5 min-w-[120px]">
          {ORDER_STATUS_DATA.map((d) => (
            <div key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="text-xs text-text-secondary font-medium">{d.name}</span>
              </div>
              <span className="text-xs font-bold text-text-primary">{d.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Best Sellers Bar Chart ───────────────────────────────────────────────────

function BestSellersBarChart() {
  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light p-5"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="mb-4">
        <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
          Top Products
        </p>
        <p className="text-base font-bold text-text-primary">Best-Selling Products</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={BESTSELLERS_DATA}
          margin={{ top: 5, right: 10, left: 0, bottom: 40 }}
          barSize={28}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E8EA" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: '#6B6B72' }}
            axisLine={false}
            tickLine={false}
            angle={-30}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6B6B72' }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip
            formatter={(v) => [v, 'Units Sold']}
            contentStyle={{
              background: '#fff',
              border: '1px solid #E8E8EA',
              borderRadius: '12px',
              fontSize: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            }}
          />
          <Bar dataKey="sold" fill="#F68B1E" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// ─── Orders Data Table ────────────────────────────────────────────────────────

const PAGE_SIZE = 5

function OrdersTable() {
  const [sortKey,  setSortKey]  = useState('id')
  const [sortDir,  setSortDir]  = useState('desc')
  const [page,     setPage]     = useState(1)

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  const sorted = useMemo(() => {
    return [...RECENT_ORDERS].sort((a, b) => {
      let av = a[sortKey]
      let bv = b[sortKey]
      if (typeof av === 'string') av = av.toLowerCase()
      if (typeof bv === 'string') bv = bv.toLowerCase()
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [sortKey, sortDir])

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const paged      = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ChevronsUpDown className="w-3 h-3 text-text-secondary opacity-50" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-brand-orange" />
      : <ChevronDown className="w-3 h-3 text-brand-orange" />
  }

  const cols = [
    { key: 'id',       label: 'Order ID'  },
    { key: 'customer', label: 'Customer'  },
    { key: 'date',     label: 'Date'      },
    { key: 'total',    label: 'Total'     },
    { key: 'status',   label: 'Status'    },
  ]

  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border-light flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-0.5">
            Activity
          </p>
          <p className="text-base font-bold text-text-primary">Recent Orders</p>
        </div>
        <Link href="/admin/orders">
          <Button variant="outline" size="sm"
            className="border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange gap-1 text-xs">
            View All <ChevronRight className="w-3 h-3" />
          </Button>
        </Link>
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
                  className="px-5 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    <SortIcon col={col.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {paged.map((order) => {
              const cfg  = STATUS_CONFIG[order.status]
              const Icon = cfg.icon
              return (
                <tr key={order.id} className="hover:bg-bg-secondary/60 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-text-primary whitespace-nowrap">
                    <Link href={`/admin/orders/${order.id}`}
                      className="hover:text-brand-orange transition-colors">
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-text-primary whitespace-nowrap">{order.customer}</td>
                  <td className="px-5 py-3.5 text-text-secondary whitespace-nowrap">{order.date}</td>
                  <td className="px-5 py-3.5 font-semibold text-text-primary whitespace-nowrap">
                    ₦{order.total.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <Badge variant={cfg.variant} className="gap-1">
                      <Icon className="w-3 h-3" />
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-3.5 border-t border-border-light flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-text-secondary">
          Showing <span className="font-semibold text-text-primary">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)}</span> of{' '}
          <span className="font-semibold text-text-primary">{sorted.length}</span> orders
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

// ─── Low Stock Widget ─────────────────────────────────────────────────────────

function LowStockWidget() {
  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="px-4 py-3.5 border-b border-border-light flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-sm font-bold text-text-primary">Low Stock Alerts</p>
        </div>
        <Badge variant="destructive">{LOW_STOCK.length}</Badge>
      </div>

      <div className="divide-y divide-border-light">
        {LOW_STOCK.map((item, i) => (
          <Link key={i} href={`/admin/products?q=${encodeURIComponent(item.name)}`} className="no-underline">
            <div className="flex items-center gap-3 px-4 py-3 hover:bg-bg-secondary/60 transition-colors">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-border-light bg-bg-secondary flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-text-primary line-clamp-1">{item.name}</p>
                <p className={`text-xs font-bold mt-0.5 ${item.stock <= 3 ? 'text-red-500' : 'text-amber-600'}`}>
                  {item.stock} left in stock
                </p>
              </div>
              <Button variant="outline" size="sm"
                className="flex-shrink-0 h-7 px-2 text-[11px] border-border-light hover:border-brand-orange hover:text-brand-orange">
                Restock
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Easy Buy Widget ──────────────────────────────────────────────────────────

function EasyBuyWidget() {
  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="px-4 py-3.5 border-b border-border-light flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
            <Zap className="w-4 h-4 text-brand-orange" />
          </div>
          <p className="text-sm font-bold text-text-primary">Pending Easy Buy</p>
        </div>
        <Badge variant="warning">{EASY_BUY_APPS.length}</Badge>
      </div>

      <div className="divide-y divide-border-light">
        {EASY_BUY_APPS.map((app, i) => (
          <div key={i} className="px-4 py-3 hover:bg-bg-secondary/60 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-text-primary truncate">{app.name}</p>
                <p className="text-[11px] text-text-secondary truncate mt-0.5">{app.product}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-bold text-brand-orange">₦{app.amount.toLocaleString()}</p>
                <p className="text-[10px] text-text-secondary mt-0.5">{app.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <Button size="sm"
                className="h-6 px-2.5 text-[11px] bg-brand-orange hover:bg-orange-600 text-white font-semibold rounded-lg">
                Approve
              </Button>
              <Button variant="outline" size="sm"
                className="h-6 px-2.5 text-[11px] border-border-light text-text-secondary hover:text-red-500 hover:border-red-300 rounded-lg">
                Decline
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-border-light">
        <Link href="/admin/easy-buy"
          className="text-xs text-brand-orange hover:underline font-medium flex items-center gap-1">
          View all applications <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false)

  const fireComplaintToast = () => {
    toast.custom(
      (id) => (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex items-start gap-3 bg-white border border-red-200 rounded-2xl px-4 py-4 shadow-xl max-w-sm w-full"
          style={{ boxShadow: '0 8px 32px rgba(239,68,68,0.15)' }}
        >
          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MessageCircle className="w-5 h-5 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-0.5">Live Complaint</p>
            <p className="text-sm font-semibold text-text-primary">Adaeze Okonkwo</p>
            <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">
              &quot;My order ORD-38291 arrived damaged. I need urgent help!&quot;
            </p>
          </div>
          <div className="flex flex-col gap-1.5 flex-shrink-0">
            <Link href="/admin/chats">
              <Button
                size="sm"
                className="h-7 px-3 text-xs bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg whitespace-nowrap"
                onClick={() => toast.dismiss(id)}
              >
                Respond Now
              </Button>
            </Link>
            <button
              onClick={() => toast.dismiss(id)}
              className="h-7 px-3 text-xs text-text-secondary hover:text-text-primary font-medium rounded-lg hover:bg-bg-secondary transition-colors"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      ),
      { duration: 12000, position: 'top-right' }
    )
  }

  return (
    <div className="min-h-screen bg-bg-secondary flex overflow-x-hidden">

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

      {/* ── Main content area ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        <TopBar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">

          {/* ── Page heading + toast trigger ──────────────────────────────── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="flex items-start justify-between gap-4 flex-wrap"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                Overview
              </p>
              <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
              <p className="text-sm text-text-secondary mt-1">
                Welcome back, {ADMIN.firstName}. Here&apos;s what&apos;s happening today.
              </p>
            </div>

            {/* Mock trigger for complaint toast */}
            <Button
              onClick={fireComplaintToast}
              variant="outline"
              className="border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400 gap-2 text-sm font-semibold flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              Simulate Complaint Alert
            </Button>
          </motion.div>

          {/* ── KPI Cards ─────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
          >
            {KPI_STATS.map((stat) => (
              <KpiCard key={stat.label} stat={stat} />
            ))}
          </motion.div>

          {/* ── Charts row: Line + Donut ───────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
          >
            <div className="lg:col-span-2">
              <RevenueLineChart />
            </div>
            <div>
              <OrderDonutChart />
            </div>
          </motion.div>

          {/* ── Best Sellers Bar Chart ─────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <BestSellersBarChart />
          </motion.div>

          {/* ── Orders Table + Sidebar Widgets ────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-4"
          >
            {/* Orders table — takes 2/3 width on xl */}
            <div className="xl:col-span-2">
              <OrdersTable />
            </div>

            {/* Sidebar widgets — takes 1/3 width on xl */}
            <div className="space-y-4">
              <LowStockWidget />
              <EasyBuyWidget />
            </div>
          </motion.div>

          {/* ── Bottom spacer ─────────────────────────────────────────────── */}
          <div className="h-4" />

        </main>
      </div>
    </div>
  )
}
