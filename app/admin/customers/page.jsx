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
  Mail,
  Phone,
  MapPin,
  ShieldOff,
  ShieldCheck,
  Calendar,
  ShoppingCart,
  Wallet,
  CheckCircle2,
  Clock,
  XCircle,
  Truck,
  PackageCheck,
  RefreshCw,
  CreditCard,
  Banknote,
  Smartphone,
  Home,
  Building2,
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
  { label: 'Customers',  icon: Users,           href: '/admin/customers', active: true },
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

// ─── Mock Customers ───────────────────────────────────────────────────────────

const MOCK_CUSTOMERS = [
  {
    id: 'CUS-001',
    name: 'Adaeze Okonkwo',
    email: 'adaeze.o@gmail.com',
    phone: '+234 803 221 4455',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=48&h=48&fit=crop&crop=face',
    joinDate: '2023-03-14',
    totalOrders: 18,
    totalSpent: 4820000,
    status: 'Active',
    addresses: [
      { label: 'Home',   line1: '14 Adeola Odeku Street', city: 'Victoria Island', state: 'Lagos',  icon: Home },
      { label: 'Office', line1: '3rd Floor, Civic Tower', city: 'Onikan',          state: 'Lagos',  icon: Building2 },
    ],
    orders: [
      { id: 'ORD-10041', date: '2025-07-10', total: 1187000, status: 'Processing', items: 2 },
      { id: 'ORD-10028', date: '2025-06-22', total: 980000,  status: 'Delivered',  items: 1 },
      { id: 'ORD-10015', date: '2025-05-11', total: 485000,  status: 'Delivered',  items: 1 },
      { id: 'ORD-10003', date: '2025-04-02', total: 210000,  status: 'Cancelled',  items: 3 },
    ],
    easyBuy: [
      { product: 'Apple iPhone 15 Pro Max', amount: 1150000, status: 'Approved',  date: '2025-07-10', instalments: '6 months' },
      { product: 'Samsung 55" 4K Smart TV', amount: 485000,  status: 'Completed', date: '2025-05-11', instalments: '3 months' },
    ],
  },
  {
    id: 'CUS-002',
    name: 'Emeka Nwosu',
    email: 'emeka.nwosu@yahoo.com',
    phone: '+234 706 334 8821',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=48&h=48&fit=crop&crop=face',
    joinDate: '2023-07-29',
    totalOrders: 11,
    totalSpent: 3140000,
    status: 'Active',
    addresses: [
      { label: 'Home', line1: '7 Wuse Zone 5', city: 'Abuja', state: 'FCT', icon: Home },
    ],
    orders: [
      { id: 'ORD-10040', date: '2025-07-09', total: 980000,  status: 'Shipped',   items: 1 },
      { id: 'ORD-10021', date: '2025-06-01', total: 1480000, status: 'Delivered',  items: 1 },
      { id: 'ORD-10009', date: '2025-04-18', total: 320000,  status: 'Delivered',  items: 2 },
    ],
    easyBuy: [
      { product: 'MacBook Air M3 16GB',          amount: 1480000, status: 'Completed', date: '2025-06-01', instalments: '12 months' },
      { product: 'Samsung Galaxy S24 Ultra 512GB', amount: 980000, status: 'Approved',  date: '2025-07-09', instalments: '6 months' },
    ],
  },
  {
    id: 'CUS-003',
    name: 'Fatima Bello',
    email: 'fatima.b@outlook.com',
    phone: '+234 812 009 3344',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face',
    joinDate: '2024-01-05',
    totalOrders: 7,
    totalSpent: 680000,
    status: 'Active',
    addresses: [
      { label: 'Home', line1: '22 Ahmadu Bello Way', city: 'Kaduna', state: 'Kaduna', icon: Home },
    ],
    orders: [
      { id: 'ORD-10039', date: '2025-07-09', total: 97000,  status: 'Delivered',  items: 3 },
      { id: 'ORD-10018', date: '2025-05-20', total: 68000,  status: 'Delivered',  items: 1 },
      { id: 'ORD-10007', date: '2025-03-14', total: 145000, status: 'Delivered',  items: 2 },
    ],
    easyBuy: [],
  },
  {
    id: 'CUS-004',
    name: 'Chidi Okafor',
    email: 'chidi.ok@gmail.com',
    phone: '+234 901 556 7712',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face',
    joinDate: '2022-11-18',
    totalOrders: 24,
    totalSpent: 9870000,
    status: 'Active',
    addresses: [
      { label: 'Home',   line1: '3 Trans-Amadi Rd',    city: 'Port Harcourt', state: 'Rivers', icon: Home },
      { label: 'Office', line1: '12 Rumuola Road',     city: 'Port Harcourt', state: 'Rivers', icon: Building2 },
    ],
    orders: [
      { id: 'ORD-10038', date: '2025-07-08', total: 1480000, status: 'Pending',   items: 1 },
      { id: 'ORD-10025', date: '2025-06-14', total: 2100000, status: 'Delivered',  items: 2 },
      { id: 'ORD-10012', date: '2025-05-03', total: 890000,  status: 'Delivered',  items: 1 },
      { id: 'ORD-10001', date: '2025-03-01', total: 580000,  status: 'Refunded',   items: 2 },
    ],
    easyBuy: [
      { product: 'MacBook Air M3 16GB 512GB', amount: 1480000, status: 'Pending',   date: '2025-07-08', instalments: '12 months' },
      { product: 'iPhone 15 Pro Max 256GB',   amount: 1150000, status: 'Completed', date: '2025-06-14', instalments: '6 months' },
    ],
  },
  {
    id: 'CUS-005',
    name: 'Ngozi Eze',
    email: 'ngozi.eze@gmail.com',
    phone: '+234 805 443 2210',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face',
    joinDate: '2023-09-22',
    totalOrders: 9,
    totalSpent: 1240000,
    status: 'Active',
    addresses: [
      { label: 'Home', line1: '9 Ogui Road', city: 'Enugu', state: 'Enugu', icon: Home },
    ],
    orders: [
      { id: 'ORD-10037', date: '2025-07-08', total: 221000, status: 'Delivered',  items: 2 },
      { id: 'ORD-10022', date: '2025-06-05', total: 189000, status: 'Delivered',  items: 1 },
      { id: 'ORD-10010', date: '2025-04-20', total: 320000, status: 'Shipped',    items: 1 },
    ],
    easyBuy: [],
  },
  {
    id: 'CUS-006',
    name: 'Tunde Adeyemi',
    email: 'tunde.a@hotmail.com',
    phone: '+234 703 887 5566',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop&crop=face',
    joinDate: '2024-02-11',
    totalOrders: 5,
    totalSpent: 420000,
    status: 'Blocked',
    addresses: [
      { label: 'Home', line1: '45 Bode Thomas St', city: 'Surulere', state: 'Lagos', icon: Home },
    ],
    orders: [
      { id: 'ORD-10036', date: '2025-07-07', total: 210000, status: 'Cancelled',  items: 1 },
      { id: 'ORD-10014', date: '2025-05-08', total: 98000,  status: 'Delivered',  items: 2 },
    ],
    easyBuy: [
      { product: 'Hisense 200L Chest Freezer', amount: 210000, status: 'Rejected', date: '2025-07-07', instalments: '3 months' },
    ],
  },
  {
    id: 'CUS-007',
    name: 'Amina Yusuf',
    email: 'amina.y@gmail.com',
    phone: '+234 816 220 9934',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48&fit=crop&crop=face',
    joinDate: '2023-05-30',
    totalOrders: 14,
    totalSpent: 3680000,
    status: 'Active',
    addresses: [
      { label: 'Home',   line1: '11 Murtala Muhammed Way', city: 'Kano',  state: 'Kano',  icon: Home },
      { label: 'Office', line1: '4 Bompai Road',           city: 'Kano',  state: 'Kano',  icon: Building2 },
    ],
    orders: [
      { id: 'ORD-10035', date: '2025-07-07', total: 485000,  status: 'Shipped',   items: 1 },
      { id: 'ORD-10023', date: '2025-06-09', total: 980000,  status: 'Delivered',  items: 1 },
      { id: 'ORD-10011', date: '2025-04-25', total: 265000,  status: 'Delivered',  items: 2 },
    ],
    easyBuy: [
      { product: 'Samsung 55" 4K Smart TV',      amount: 485000, status: 'Approved',  date: '2025-07-07', instalments: '6 months' },
      { product: 'Samsung Galaxy S24 Ultra 512GB', amount: 980000, status: 'Completed', date: '2025-06-09', instalments: '6 months' },
    ],
  },
  {
    id: 'CUS-008',
    name: 'Seun Adesanya',
    email: 'seun.a@gmail.com',
    phone: '+234 909 112 4478',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
    joinDate: '2022-08-03',
    totalOrders: 31,
    totalSpent: 12450000,
    status: 'Active',
    addresses: [
      { label: 'Home', line1: '2 Awolowo Road', city: 'Ikoyi', state: 'Lagos', icon: Home },
    ],
    orders: [
      { id: 'ORD-10034', date: '2025-07-06', total: 598500,  status: 'Processing', items: 2 },
      { id: 'ORD-10026', date: '2025-06-18', total: 1480000, status: 'Delivered',  items: 1 },
      { id: 'ORD-10016', date: '2025-05-14', total: 890000,  status: 'Delivered',  items: 1 },
      { id: 'ORD-10005', date: '2025-03-08', total: 320000,  status: 'Delivered',  items: 3 },
    ],
    easyBuy: [
      { product: 'Nikon Z50 Mirrorless Camera', amount: 580000,  status: 'Approved',  date: '2025-07-06', instalments: '6 months' },
      { product: 'MacBook Air M3 16GB',         amount: 1480000, status: 'Completed', date: '2025-06-18', instalments: '12 months' },
    ],
  },
  {
    id: 'CUS-009',
    name: 'Blessing Obi',
    email: 'blessing.o@yahoo.com',
    phone: '+234 802 334 6671',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=48&h=48&fit=crop&crop=face',
    joinDate: '2024-04-17',
    totalOrders: 6,
    totalSpent: 890000,
    status: 'Active',
    addresses: [
      { label: 'Home', line1: '18 Aba Road', city: 'Port Harcourt', state: 'Rivers', icon: Home },
    ],
    orders: [
      { id: 'ORD-10033', date: '2025-07-06', total: 320000, status: 'Delivered',  items: 1 },
      { id: 'ORD-10019', date: '2025-05-22', total: 210000, status: 'Delivered',  items: 2 },
    ],
    easyBuy: [
      { product: 'LG 9kg Front Load Washing Machine', amount: 320000, status: 'Approved', date: '2025-07-06', instalments: '3 months' },
    ],
  },
  {
    id: 'CUS-010',
    name: 'Kelechi Ibe',
    email: 'kelechi.i@gmail.com',
    phone: '+234 705 998 2231',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=48&h=48&fit=crop&crop=face',
    joinDate: '2023-12-01',
    totalOrders: 8,
    totalSpent: 560000,
    status: 'Blocked',
    addresses: [
      { label: 'Home', line1: '6 Zik Avenue', city: 'Awka', state: 'Anambra', icon: Home },
    ],
    orders: [
      { id: 'ORD-10032', date: '2025-07-05', total: 141500, status: 'Refunded',   items: 4 },
      { id: 'ORD-10017', date: '2025-05-16', total: 98000,  status: 'Delivered',  items: 1 },
      { id: 'ORD-10006', date: '2025-03-10', total: 210000, status: 'Cancelled',  items: 2 },
    ],
    easyBuy: [],
  },
  {
    id: 'CUS-011',
    name: 'Hauwa Musa',
    email: 'hauwa.m@gmail.com',
    phone: '+234 813 445 7789',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=48&h=48&fit=crop&crop=face',
    joinDate: '2024-06-08',
    totalOrders: 4,
    totalSpent: 780000,
    status: 'Active',
    addresses: [
      { label: 'Home', line1: '33 Sokoto Road', city: 'Zaria', state: 'Kaduna', icon: Home },
    ],
    orders: [
      { id: 'ORD-10031', date: '2025-07-05', total: 420000, status: 'Pending',   items: 1 },
      { id: 'ORD-10020', date: '2025-05-28', total: 265000, status: 'Delivered',  items: 1 },
    ],
    easyBuy: [
      { product: 'Dyson V15 Detect Vacuum', amount: 420000, status: 'Pending', date: '2025-07-05', instalments: '6 months' },
    ],
  },
  {
    id: 'CUS-012',
    name: 'Rotimi Afolabi',
    email: 'rotimi.a@gmail.com',
    phone: '+234 907 221 3345',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=48&h=48&fit=crop&crop=face',
    joinDate: '2022-05-19',
    totalOrders: 42,
    totalSpent: 18900000,
    status: 'Active',
    addresses: [
      { label: 'Home',   line1: '5 Obafemi Awolowo Blvd', city: 'Ibadan', state: 'Oyo', icon: Home },
      { label: 'Office', line1: '22 Ring Road',           city: 'Ibadan', state: 'Oyo', icon: Building2 },
    ],
    orders: [
      { id: 'ORD-10030', date: '2025-07-04', total: 460000,  status: 'Delivered',  items: 2 },
      { id: 'ORD-10027', date: '2025-06-20', total: 1480000, status: 'Delivered',  items: 1 },
      { id: 'ORD-10013', date: '2025-05-06', total: 980000,  status: 'Delivered',  items: 1 },
      { id: 'ORD-10002', date: '2025-03-03', total: 2100000, status: 'Delivered',  items: 3 },
    ],
    easyBuy: [
      { product: 'Apple iPhone 15 Pro Max',      amount: 1150000, status: 'Completed', date: '2025-06-20', instalments: '6 months' },
      { product: 'MacBook Air M3 16GB',          amount: 1480000, status: 'Completed', date: '2025-05-06', instalments: '12 months' },
      { product: 'Samsung Galaxy S24 Ultra 512GB', amount: 980000, status: 'Completed', date: '2025-03-03', instalments: '6 months' },
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
            placeholder="Search customers..."
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

// ─── Helper Components ────────────────────────────────────────────────────────

function CustomerStatusBadge({ status }) {
  const isActive = status === 'Active'
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        isActive
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-red-100 text-red-600'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
      {status}
    </span>
  )
}

function OrderStatusPill({ status }) {
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
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  )
}

function EasyBuyStatusPill({ status }) {
  const map = {
    Approved:  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    Pending:   { bg: 'bg-amber-100',   text: 'text-amber-700' },
    Completed: { bg: 'bg-blue-100',    text: 'text-blue-700' },
    Rejected:  { bg: 'bg-red-100',     text: 'text-red-600' },
  }
  const s = map[status] || map.Pending
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      {status}
    </span>
  )
}

// ─── Customer Detail Sheet ────────────────────────────────────────────────────

function CustomerSheet({ customer, onClose }) {
  const [tab, setTab] = useState('orders')

  if (!customer) return null

  const tabs = [
    { key: 'orders',    label: 'Orders',     count: customer.orders.length },
    { key: 'addresses', label: 'Addresses',  count: customer.addresses.length },
    { key: 'easybuy',   label: 'Easy Buy',   count: customer.easyBuy.length },
  ]

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
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-border-light flex-shrink-0 bg-bg-secondary">
              <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-base font-bold text-text-primary">{customer.name}</h2>
                <CustomerStatusBadge status={customer.status} />
              </div>
              <p className="text-xs text-text-secondary">{customer.id}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1 text-xs text-text-secondary">
                  <Mail className="w-3 h-3" />
                  {customer.email}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5 text-xs text-text-secondary">
                <Phone className="w-3 h-3" />
                {customer.phone}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-bg-secondary rounded-full transition flex-shrink-0">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Quick stats strip */}
        <div className="grid grid-cols-3 divide-x divide-border-light border-b border-border-light flex-shrink-0">
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-text-secondary font-medium mb-0.5">Joined</p>
            <p className="text-sm font-bold text-text-primary">{customer.joinDate}</p>
          </div>
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-text-secondary font-medium mb-0.5">Orders</p>
            <p className="text-sm font-bold text-brand-orange">{customer.totalOrders}</p>
          </div>
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-text-secondary font-medium mb-0.5">Total Spent</p>
            <p className="text-sm font-bold text-text-primary">₦{(customer.totalSpent / 1000000).toFixed(1)}M</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border-light flex-shrink-0 px-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-1 py-3 mr-6 text-sm font-semibold border-b-2 transition-colors ${
                tab === t.key
                  ? 'border-brand-orange text-brand-orange'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                tab === t.key ? 'bg-orange-100 text-brand-orange' : 'bg-bg-secondary text-text-secondary'
              }`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* ── Orders tab ── */}
          {tab === 'orders' && (
            <div className="space-y-3">
              {customer.orders.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-brand-orange" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm text-text-secondary">No orders yet</p>
                </div>
              ) : (
                customer.orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between gap-3 bg-bg-secondary rounded-xl px-4 py-3 hover:bg-orange-50/40 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-brand-orange">{order.id}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{order.date} · {order.items} item{order.items !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <p className="text-sm font-bold text-text-primary">₦{order.total.toLocaleString()}</p>
                      <OrderStatusPill status={order.status} />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── Addresses tab ── */}
          {tab === 'addresses' && (
            <div className="space-y-3">
              {customer.addresses.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-brand-orange" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm text-text-secondary">No saved addresses</p>
                </div>
              ) : (
                customer.addresses.map((addr, i) => {
                  const AddrIcon = addr.icon
                  return (
                    <div key={i} className="flex items-start gap-4 bg-bg-secondary rounded-xl px-4 py-4">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AddrIcon className="w-4 h-4 text-brand-orange" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">{addr.label}</p>
                        <p className="text-sm font-semibold text-text-primary">{addr.line1}</p>
                        <p className="text-xs text-text-secondary mt-0.5">{addr.city}, {addr.state}</p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}

          {/* ── Easy Buy tab ── */}
          {tab === 'easybuy' && (
            <div className="space-y-3">
              {customer.easyBuy.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-amber-500" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm text-text-secondary">No Easy Buy applications</p>
                </div>
              ) : (
                customer.easyBuy.map((app, i) => (
                  <div key={i} className="bg-bg-secondary rounded-xl px-4 py-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <p className="text-sm font-semibold text-text-primary line-clamp-1">{app.product}</p>
                        </div>
                        <p className="text-xs text-text-secondary">{app.date} · {app.instalments}</p>
                      </div>
                      <EasyBuyStatusPill status={app.status} />
                    </div>
                    <p className="text-base font-bold text-brand-orange">₦{app.amount.toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </motion.div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 8

export default function AdminCustomersPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false)
  const [customers,        setCustomers]        = useState(MOCK_CUSTOMERS)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [search,           setSearch]           = useState('')
  const [statusFilter,     setStatusFilter]     = useState('All')
  const [sortKey,          setSortKey]          = useState('joinDate')
  const [sortDir,          setSortDir]          = useState('desc')
  const [page,             setPage]             = useState(1)

  // ── Filter + Search ──
  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.id.toLowerCase().includes(q)
      const matchStatus = statusFilter === 'All' || c.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [customers, search, statusFilter])

  // ── Sort ──
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

  const toggleBlock = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Active' ? 'Blocked' : 'Active' } : c
      )
    )
    // If the sheet is open for this customer, update it too
    if (selectedCustomer?.id === id) {
      setSelectedCustomer((prev) =>
        prev ? { ...prev, status: prev.status === 'Active' ? 'Blocked' : 'Active' } : prev
      )
    }
  }

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ChevronsUpDown className="w-3 h-3 text-text-secondary opacity-40" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-brand-orange" />
      : <ChevronDown className="w-3 h-3 text-brand-orange" />
  }

  // Stats
  const totalCustomers = customers.length
  const activeCount    = customers.filter((c) => c.status === 'Active').length
  const blockedCount   = customers.filter((c) => c.status === 'Blocked').length
  const totalRevenue   = customers.reduce((a, c) => a + c.totalSpent, 0)

  const cols = [
    { key: 'name',        label: 'Customer'       },
    { key: 'email',       label: 'Email'          },
    { key: 'phone',       label: 'Phone'          },
    { key: 'joinDate',    label: 'Join Date'      },
    { key: 'totalOrders', label: 'Orders'         },
    { key: 'totalSpent',  label: 'Total Spent'    },
    { key: 'status',      label: 'Status'         },
  ]

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
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">People</p>
              <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                Manage Customers
                <span className="text-base font-semibold bg-orange-100 text-brand-orange px-3 py-0.5 rounded-full">
                  {totalCustomers} customers
                </span>
              </h1>
              <p className="text-sm text-text-secondary mt-1">View, search, and manage all registered customers.</p>
            </div>
          </motion.div>

          {/* Stat cards */}
          <motion.div variants={fadeContainer} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Customers', value: totalCustomers,                                    color: 'text-brand-orange',  accent: 'bg-brand-orange',  icon: Users },
              { label: 'Active',          value: activeCount,                                       color: 'text-emerald-600',   accent: 'bg-emerald-500',   icon: ShieldCheck },
              { label: 'Blocked',         value: blockedCount,                                      color: 'text-red-500',       accent: 'bg-red-500',       icon: ShieldOff },
              { label: 'Total Revenue',   value: `₦${(totalRevenue / 1000000).toFixed(1)}M`,        color: 'text-violet-600',    accent: 'bg-violet-500',    icon: Wallet },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeCard}
                  className="bg-white rounded-2xl border border-border-light p-5"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">{stat.label}</p>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.accent} bg-opacity-10`}
                      style={{ background: `${stat.accent === 'bg-brand-orange' ? '#FFF3E8' : stat.accent === 'bg-emerald-500' ? '#ECFDF5' : stat.accent === 'bg-red-500' ? '#FEF2F2' : '#F5F3FF'}` }}>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </div>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  <div className={`mt-4 h-1 rounded-full ${stat.accent} opacity-30`} />
                </motion.div>
              )
            })}
          </motion.div>

          {/* Search + filter bar + table */}
          <motion.div
            variants={fadeCard}
            initial="hidden"
            animate="show"
            className="bg-white rounded-2xl border border-border-light overflow-hidden"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            {/* Search + filter row */}
            <div className="px-5 py-4 border-b border-border-light flex items-center gap-3 flex-wrap">
              {/* Search input */}
              <div className="search-glow flex-1 min-w-[200px] max-w-sm flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border-light bg-bg-secondary">
                <Search className="w-4 h-4 text-text-secondary flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                  placeholder="Search by name, email, phone..."
                  className="bg-transparent outline-none flex-1 text-sm text-text-primary placeholder-text-secondary"
                />
                {search && (
                  <button onClick={() => { setSearch(''); setPage(1) }} className="text-text-secondary hover:text-text-primary transition">
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
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
              </select>

              <p className="text-xs text-text-secondary ml-auto">
                <span className="font-semibold text-text-primary">{sorted.length}</span> of{' '}
                <span className="font-semibold text-text-primary">{totalCustomers}</span> customers
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
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border-light">
                  {paged.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
                            <Users className="w-7 h-7 text-brand-orange" strokeWidth={1.5} />
                          </div>
                          <p className="text-sm font-semibold text-text-primary">No customers found</p>
                          <p className="text-xs text-text-secondary">Try adjusting your search or filter</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paged.map((customer) => (
                      <tr
                        key={customer.id}
                        onClick={() => setSelectedCustomer(customer)}
                        className="hover:bg-bg-secondary/60 transition-colors cursor-pointer"
                      >
                        {/* Customer name + avatar */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden border border-border-light flex-shrink-0 bg-bg-secondary">
                              <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-text-primary">{customer.name}</p>
                              <p className="text-xs text-text-secondary">{customer.id}</p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="text-sm text-text-secondary">{customer.email}</span>
                        </td>

                        {/* Phone */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="text-sm text-text-secondary">{customer.phone}</span>
                        </td>

                        {/* Join date */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                            {customer.joinDate}
                          </div>
                        </td>

                        {/* Total orders */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <ShoppingCart className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
                            <span className="text-sm font-semibold text-text-primary">{customer.totalOrders}</span>
                          </div>
                        </td>

                        {/* Total spent */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="text-sm font-bold text-text-primary">₦{customer.totalSpent.toLocaleString()}</span>
                        </td>

                        {/* Status badge */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <CustomerStatusBadge status={customer.status} />
                        </td>

                        {/* Block / Unblock action */}
                        <td className="px-4 py-3.5 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleBlock(customer.id)}
                            className={`h-8 px-3 text-xs font-semibold gap-1.5 rounded-lg transition-colors ${
                              customer.status === 'Active'
                                ? 'border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400'
                                : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400'
                            }`}
                          >
                            {customer.status === 'Active' ? (
                              <><ShieldOff className="w-3.5 h-3.5" /> Block</>
                            ) : (
                              <><ShieldCheck className="w-3.5 h-3.5" /> Unblock</>
                            )}
                          </Button>
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
                of <span className="font-semibold text-text-primary">{sorted.length}</span> customers
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

          <div className="h-4" />
        </main>
      </div>

      {/* Customer detail sheet */}
      <AnimatePresence>
        {selectedCustomer && (
          <CustomerSheet
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
          />
        )}
      </AnimatePresence>

    </div>
  )
}
