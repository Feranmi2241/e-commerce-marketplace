'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
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
  ResponsiveContainer,
  Legend,
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
  Menu,
  X,
  Download,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  UserPlus,
  DollarSign,
  Receipt,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
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
  { label: 'Analytics',  icon: BarChart2,       href: '/admin/analytics', active: true },
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
            placeholder="Search analytics..."
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

const KPI_CARDS = [
  {
    label: 'Total Revenue',
    value: '₦48.6M',
    sub: 'Jul 2024 – Jul 2025',
    trend: '+12.4%',
    up: true,
    icon: DollarSign,
    iconBg: 'bg-orange-50',
    iconColor: 'text-brand-orange',
    accent: 'bg-brand-orange',
  },
  {
    label: 'Total Orders',
    value: '3,842',
    sub: 'All time',
    trend: '+8.1%',
    up: true,
    icon: ShoppingCart,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    accent: 'bg-blue-500',
  },
  {
    label: 'New Customers',
    value: '1,284',
    sub: 'Last 12 months',
    trend: '+5.3%',
    up: true,
    icon: UserPlus,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    accent: 'bg-emerald-500',
  },
  {
    label: 'Avg. Order Value',
    value: '₦126,500',
    sub: 'Per completed order',
    trend: '-2.1%',
    up: false,
    icon: Receipt,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    accent: 'bg-violet-500',
  },
]

// Revenue over time — monthly, 12 months
const REVENUE_DATA = [
  { month: 'Aug',  revenue: 3200000 },
  { month: 'Sep',  revenue: 4100000 },
  { month: 'Oct',  revenue: 3800000 },
  { month: 'Nov',  revenue: 5200000 },
  { month: 'Dec',  revenue: 6800000 },
  { month: 'Jan',  revenue: 4700000 },
  { month: 'Feb',  revenue: 5100000 },
  { month: 'Mar',  revenue: 6100000 },
  { month: 'Apr',  revenue: 5800000 },
  { month: 'May',  revenue: 7200000 },
  { month: 'Jun',  revenue: 8400000 },
  { month: 'Jul',  revenue: 11200000 },
]

// Orders over time — monthly, 12 months
const ORDERS_DATA = [
  { month: 'Aug',  orders: 198 },
  { month: 'Sep',  orders: 241 },
  { month: 'Oct',  orders: 220 },
  { month: 'Nov',  orders: 310 },
  { month: 'Dec',  orders: 412 },
  { month: 'Jan',  orders: 278 },
  { month: 'Feb',  orders: 295 },
  { month: 'Mar',  orders: 360 },
  { month: 'Apr',  orders: 340 },
  { month: 'May',  orders: 430 },
  { month: 'Jun',  orders: 510 },
  { month: 'Jul',  orders: 648 },
]

// Top-selling products — horizontal bar
const TOP_PRODUCTS_DATA = [
  { name: 'iPhone 15 Pro Max',       sold: 312 },
  { name: 'Samsung Galaxy S24 Ultra',sold: 278 },
  { name: 'Sony WH-1000XM5',         sold: 241 },
  { name: 'MacBook Air M3',          sold: 198 },
  { name: 'Samsung 55" 4K TV',       sold: 176 },
  { name: 'Apple AirPods Pro 2',     sold: 154 },
  { name: 'Dyson V15 Vacuum',        sold: 132 },
  { name: 'Nikon Z50 Camera',        sold: 118 },
]

// Top categories — donut
const TOP_CATEGORIES_DATA = [
  { name: 'Phones & Tablets',  value: 38, color: '#F68B1E' },
  { name: 'Laptops & PCs',     value: 22, color: '#3b82f6' },
  { name: 'Home Appliances',   value: 17, color: '#10b981' },
  { name: 'Cosmetics',         value: 13, color: '#a855f7' },
  { name: 'Audio & Headphones',value: 10, color: '#f59e0b' },
]

// Customer growth — area chart, monthly
const CUSTOMER_GROWTH_DATA = [
  { month: 'Aug',  customers: 620,  returning: 380 },
  { month: 'Sep',  customers: 710,  returning: 420 },
  { month: 'Oct',  customers: 680,  returning: 410 },
  { month: 'Nov',  customers: 820,  returning: 490 },
  { month: 'Dec',  customers: 1040, returning: 610 },
  { month: 'Jan',  customers: 760,  returning: 480 },
  { month: 'Feb',  customers: 810,  returning: 510 },
  { month: 'Mar',  customers: 920,  returning: 560 },
  { month: 'Apr',  customers: 880,  returning: 540 },
  { month: 'May',  customers: 1050, returning: 640 },
  { month: 'Jun',  customers: 1180, returning: 720 },
  { month: 'Jul',  customers: 1420, returning: 860 },
]

// Shared tooltip style
const TOOLTIP_STYLE = {
  background: '#fff',
  border: '1px solid #E8E8EA',
  borderRadius: '12px',
  fontSize: '12px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
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
          <p className="text-xs text-text-secondary mt-1">{stat.sub}</p>
          <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{stat.trend} vs last period</span>
          </div>
        </div>
        <div className={`${stat.iconBg} p-3 rounded-xl flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${stat.iconColor}`} />
        </div>
      </div>
      <div className={`mt-4 h-1 rounded-full ${stat.accent} opacity-30`} />
    </motion.div>
  )
}

// ─── Revenue Line Chart ───────────────────────────────────────────────────────

function RevenueChart() {
  const fmt = (v) => `₦${(v / 1000000).toFixed(1)}M`

  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light p-6"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">Revenue</p>
          <p className="text-base font-bold text-text-primary">Revenue Over Time</p>
          <p className="text-xs text-text-secondary mt-0.5">Monthly revenue — last 12 months</p>
        </div>
        <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-xl px-3 py-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-brand-orange" />
          <span className="text-xs font-bold text-brand-orange">+12.4%</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F68B1E" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E8EA" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#6B6B72' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={fmt}
            tick={{ fontSize: 11, fill: '#6B6B72' }}
            axisLine={false}
            tickLine={false}
            width={54}
          />
          <Tooltip
            formatter={(v) => [`₦${v.toLocaleString()}`, 'Revenue']}
            contentStyle={TOOLTIP_STYLE}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="url(#revenueGrad)"
            strokeWidth={2.5}
            dot={{ fill: '#F68B1E', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#F68B1E', strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// ─── Orders Line Chart ────────────────────────────────────────────────────────

function OrdersChart() {
  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light p-6"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">Orders</p>
          <p className="text-base font-bold text-text-primary">Orders Over Time</p>
          <p className="text-xs text-text-secondary mt-0.5">Monthly order count — last 12 months</p>
        </div>
        <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-xl px-3 py-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-xs font-bold text-blue-500">+8.1%</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={ORDERS_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E8EA" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#6B6B72' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6B6B72' }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip
            formatter={(v) => [v.toLocaleString(), 'Orders']}
            contentStyle={TOOLTIP_STYLE}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ fill: '#3b82f6', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#3b82f6', strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// ─── Top Products Horizontal Bar Chart ───────────────────────────────────────

function TopProductsChart() {
  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light p-6"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="mb-5">
        <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">Products</p>
        <p className="text-base font-bold text-text-primary">Top-Selling Products</p>
        <p className="text-xs text-text-secondary mt-0.5">Units sold — selected period</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          layout="vertical"
          data={TOP_PRODUCTS_DATA}
          margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
          barSize={18}
        >
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F68B1E" stopOpacity={0.85} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E8EA" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: '#6B6B72' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 11, fill: '#6B6B72' }}
            axisLine={false}
            tickLine={false}
            width={148}
          />
          <Tooltip
            formatter={(v) => [v, 'Units Sold']}
            contentStyle={TOOLTIP_STYLE}
          />
          <Bar dataKey="sold" fill="url(#barGrad)" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// ─── Top Categories Donut Chart ───────────────────────────────────────────────

function TopCategoriesChart() {
  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light p-6"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="mb-5">
        <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">Categories</p>
        <p className="text-base font-bold text-text-primary">Revenue by Category</p>
        <p className="text-xs text-text-secondary mt-0.5">Share of total revenue — selected period</p>
      </div>

      <div className="flex items-center gap-6 flex-wrap">
        {/* Donut */}
        <div className="relative flex-shrink-0 mx-auto">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={TOP_CATEGORIES_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={88}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {TOP_CATEGORIES_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, name) => [`${v}%`, name]}
                contentStyle={TOOLTIP_STYLE}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-2xl font-bold text-text-primary leading-none">100%</p>
            <p className="text-[10px] text-text-secondary font-medium mt-0.5">Revenue</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 min-w-[160px]">
          {TOP_CATEGORIES_DATA.map((d) => (
            <div key={d.name} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="text-xs text-text-secondary font-medium truncate">{d.name}</span>
              </div>
              <span className="text-xs font-bold text-text-primary flex-shrink-0">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Customer Growth Area Chart ───────────────────────────────────────────────

function CustomerGrowthChart() {
  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light p-6"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">Customers</p>
          <p className="text-base font-bold text-text-primary">Customer Growth</p>
          <p className="text-xs text-text-secondary mt-0.5">New vs returning customers — last 12 months</p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-600">+5.3%</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-text-secondary font-medium">New Customers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-violet-500" />
          <span className="text-xs text-text-secondary font-medium">Returning</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={CUSTOMER_GROWTH_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="newCustGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#10b981" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="retCustGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E8EA" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#6B6B72' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6B6B72' }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip
            formatter={(v, name) => [v.toLocaleString(), name === 'customers' ? 'New Customers' : 'Returning']}
            contentStyle={TOOLTIP_STYLE}
          />
          <Area
            type="monotone"
            dataKey="customers"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#newCustGrad)"
            dot={{ fill: '#10b981', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#10b981', strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="returning"
            stroke="#a855f7"
            strokeWidth={2.5}
            fill="url(#retCustGrad)"
            dot={{ fill: '#a855f7', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#a855f7', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// ─── Date Range Picker ────────────────────────────────────────────────────────

const DATE_PRESETS = [
  { label: 'Last 7 days',   days: 7  },
  { label: 'Last 30 days',  days: 30 },
  { label: 'Last 90 days',  days: 90 },
  { label: 'Last 12 months',days: 365 },
]

function DateRangePicker({ activePreset, onPresetChange, from, to, onFromChange, onToChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Preset pills */}
      <div className="flex items-center gap-1.5 bg-bg-secondary border border-border-light rounded-xl p-1">
        {DATE_PRESETS.map((p) => (
          <button
            key={p.days}
            onClick={() => onPresetChange(p.days)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activePreset === p.days
                ? 'bg-brand-orange text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary hover:bg-white'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Custom date inputs */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border-light bg-white">
          <CalendarDays className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
          <input
            type="date"
            value={from}
            onChange={(e) => onFromChange(e.target.value)}
            className="text-xs text-text-primary bg-transparent outline-none cursor-pointer"
          />
        </div>
        <span className="text-xs text-text-secondary font-medium">to</span>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border-light bg-white">
          <CalendarDays className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
          <input
            type="date"
            value={to}
            onChange={(e) => onToChange(e.target.value)}
            className="text-xs text-text-primary bg-transparent outline-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminAnalyticsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false)
  const [activePreset,     setActivePreset]     = useState(365)
  const [dateFrom,         setDateFrom]         = useState('2024-07-01')
  const [dateTo,           setDateTo]           = useState('2025-07-31')
  const pathname = usePathname()

  const handlePresetChange = (days) => {
    setActivePreset(days)
    const end   = new Date()
    const start = new Date()
    start.setDate(end.getDate() - days)
    setDateTo(end.toISOString().split('T')[0])
    setDateFrom(start.toISOString().split('T')[0])
  }

  const handleExport = () => {
    // Mock export — in production this would trigger a CSV/PDF download
    const blob = new Blob(
      [`Analytics Report\nPeriod: ${dateFrom} to ${dateTo}\n\nRevenue: ₦48,600,000\nOrders: 3,842\nNew Customers: 1,284\nAvg Order Value: ₦126,500`],
      { type: 'text/plain' }
    )
    const url = URL.createObjectURL(blob)
    const a   = document.createElement('a')
    a.href    = url
    a.download = `analytics-report-${dateFrom}-${dateTo}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

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

          {/* ── Page heading + date range + export ───────────────────────── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
          >
            {/* Title row */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
                  Insights
                </p>
                <h1 className="text-2xl font-bold text-text-primary">Analytics &amp; Reports</h1>
                <p className="text-sm text-text-secondary mt-1">
                  Track revenue, orders, customers, and product performance.
                </p>
              </div>

              {/* Export button */}
              <Button
                onClick={handleExport}
                className="bg-brand-orange hover:bg-orange-600 text-white font-semibold rounded-xl gap-2 flex-shrink-0 h-10 px-5"
                style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
              >
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>

            {/* Date range picker */}
            <div className="bg-white rounded-2xl border border-border-light px-5 py-4"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-3 flex-wrap justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-brand-orange" />
                  <span className="text-sm font-semibold text-text-primary">Date Range</span>
                  <span className="text-xs text-text-secondary ml-1">
                    {dateFrom} → {dateTo}
                  </span>
                </div>
                <DateRangePicker
                  activePreset={activePreset}
                  onPresetChange={handlePresetChange}
                  from={dateFrom}
                  to={dateTo}
                  onFromChange={setDateFrom}
                  onToChange={setDateTo}
                />
              </div>
            </div>
          </motion.div>

          {/* ── KPI Cards ─────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
          >
            {KPI_CARDS.map((stat) => (
              <KpiCard key={stat.label} stat={stat} />
            ))}
          </motion.div>

          {/* ── Revenue + Orders charts (side by side) ────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <RevenueChart />
            <OrdersChart />
          </motion.div>

          {/* ── Top Products + Top Categories (side by side) ──────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-4"
          >
            {/* Top products takes 3/5 */}
            <div className="lg:col-span-3">
              <TopProductsChart />
            </div>
            {/* Top categories takes 2/5 */}
            <div className="lg:col-span-2">
              <TopCategoriesChart />
            </div>
          </motion.div>

          {/* ── Customer Growth (full width) ──────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <CustomerGrowthChart />
          </motion.div>

          <div className="h-4" />
        </main>
      </div>
    </div>
  )
}
