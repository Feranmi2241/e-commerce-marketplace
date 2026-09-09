'use client'

import { useState } from 'react'
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
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ShieldOff,
  Check,
  Save,
  LogIn,
  LogOut,
  KeyRound,
  Pencil,
  Trash2,
  AlertTriangle,
  Info,
  MonitorSmartphone,
  Globe,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

// ─── Admin ────────────────────────────────────────────────────────────────────

const ADMIN = {
  name: 'Chukwuemeka Eze',
  firstName: 'Emeka',
  initials: 'CE',
  role: 'Super Admin',
  email: 'emeka.eze@marketplace.ng',
  lastLogin: 'Jul 24, 2025 at 09:14 AM',
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
  { label: 'Settings',   icon: Settings,        href: '/admin/settings' },
  { label: 'Account',    icon: UserCircle,      href: '/admin/account', active: true },
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
            placeholder="Search..."
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

// ─── Shared helpers ───────────────────────────────────────────────────────────

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
      <div className="px-6 py-6">{children}</div>
    </motion.div>
  )
}

function SavedPill({ visible }) {
  if (!visible) return null
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full"
    >
      <Check className="w-3.5 h-3.5 text-emerald-600" />
      <span className="text-xs font-semibold text-emerald-700">Saved!</span>
    </motion.span>
  )
}

// ─── Admin Profile Card ───────────────────────────────────────────────────────

function AdminProfileCard() {
  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      <div className="px-6 py-6 flex items-start gap-5 flex-wrap">

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {ADMIN.initials}
          </div>
          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-white rounded-full" />
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold text-text-primary">{ADMIN.name}</h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-100 text-violet-700 text-xs font-bold rounded-full">
              <ShieldCheck className="w-3 h-3" />
              {ADMIN.role}
            </span>
          </div>
          <p className="text-sm text-text-secondary mt-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            {ADMIN.email}
          </p>
          <p className="text-xs text-text-secondary mt-1 flex items-center gap-1.5">
            <Clock className="w-3 h-3 flex-shrink-0" />
            Last login: {ADMIN.lastLogin}
          </p>
        </div>

        {/* Important notice */}
        <div className="w-full mt-2">
          <div className="flex items-start gap-3 px-4 py-3.5 bg-blue-50 border border-blue-200 rounded-xl">
            <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>This is the only place admin credentials can be changed.</strong>{' '}
              There is no admin sign-up page anywhere in this product. Admin accounts are managed exclusively here by the Super Admin. Keep your credentials secure and do not share them.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section 1: Change Email Address ─────────────────────────────────────────

function ChangeEmailSection() {
  const [newEmail,     setNewEmail]     = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [saved,        setSaved]        = useState(false)
  const [error,        setError]        = useState('')

  const handleSave = () => {
    setError('')
    if (!newEmail) { setError('Please enter a new email address.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) { setError('Please enter a valid email address.'); return }
    if (newEmail !== confirmEmail) { setError('Email addresses do not match.'); return }
    if (newEmail === ADMIN.email) { setError('New email must be different from your current email.'); return }
    setSaved(true)
    setNewEmail('')
    setConfirmEmail('')
    setTimeout(() => setSaved(false), 2500)
  }

  const inputClass = 'w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition'

  return (
    <SectionCard icon={Mail} eyebrow="Credentials" title="Change Email Address" iconBg="bg-blue-50" iconColor="text-blue-600">
      <div className="space-y-4 max-w-lg">

        {/* Current email — read only */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
            Current Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            <input
              type="email"
              value={ADMIN.email}
              readOnly
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light bg-bg-secondary text-sm text-text-secondary cursor-not-allowed select-none"
            />
          </div>
          <p className="text-xs text-text-secondary mt-1">This is your current login email.</p>
        </div>

        {/* New email */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
            New Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            <input
              type="email"
              value={newEmail}
              onChange={(e) => { setNewEmail(e.target.value); setError('') }}
              placeholder="Enter new email address"
              className={inputClass}
            />
          </div>
        </div>

        {/* Confirm new email */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
            Confirm New Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => { setConfirmEmail(e.target.value); setError('') }}
              placeholder="Re-enter new email address"
              className={`${inputClass} ${
                confirmEmail && newEmail && confirmEmail !== newEmail
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-400/10'
                  : confirmEmail && confirmEmail === newEmail
                  ? 'border-emerald-300 focus:border-emerald-400 focus:ring-emerald-400/10'
                  : ''
              }`}
            />
            {confirmEmail && newEmail && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {confirmEmail === newEmail
                  ? <Check className="w-4 h-4 text-emerald-500" />
                  : <X className="w-4 h-4 text-red-400" />
                }
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-xs font-semibold text-red-600">{error}</p>
          </div>
        )}

        {/* Save */}
        <div className="flex items-center gap-3 pt-1">
          <Button
            onClick={handleSave}
            className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-10 px-6 rounded-xl gap-2"
            style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
          >
            <Save className="w-4 h-4" />
            Update Email
          </Button>
          <SavedPill visible={saved} />
        </div>
      </div>
    </SectionCard>
  )
}

// ─── Section 2: Change Password ───────────────────────────────────────────────

function getPasswordStrength(pwd) {
  if (!pwd) return { score: 0, label: '', color: '' }
  let score = 0
  if (pwd.length >= 8)               score++
  if (pwd.length >= 12)              score++
  if (/[A-Z]/.test(pwd))            score++
  if (/[0-9]/.test(pwd))            score++
  if (/[^A-Za-z0-9]/.test(pwd))    score++
  if (score <= 1) return { score, label: 'Weak',      color: 'bg-red-500'    }
  if (score <= 2) return { score, label: 'Fair',      color: 'bg-amber-500'  }
  if (score <= 3) return { score, label: 'Good',      color: 'bg-yellow-400' }
  if (score <= 4) return { score, label: 'Strong',    color: 'bg-emerald-500'}
  return              { score, label: 'Very Strong', color: 'bg-emerald-600' }
}

function PasswordInput({ value, onChange, placeholder, label, required }) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition p-0.5"
          tabIndex={-1}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

function ChangePasswordSection() {
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd,     setNewPwd]     = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [saved,      setSaved]      = useState(false)
  const [error,      setError]      = useState('')

  const strength = getPasswordStrength(newPwd)

  const handleSave = () => {
    setError('')
    if (!currentPwd) { setError('Please enter your current password.'); return }
    if (!newPwd)     { setError('Please enter a new password.'); return }
    if (newPwd.length < 8) { setError('New password must be at least 8 characters.'); return }
    if (newPwd !== confirmPwd) { setError('New passwords do not match.'); return }
    if (newPwd === currentPwd) { setError('New password must be different from your current password.'); return }
    setSaved(true)
    setCurrentPwd('')
    setNewPwd('')
    setConfirmPwd('')
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <SectionCard icon={KeyRound} eyebrow="Credentials" title="Change Password" iconBg="bg-violet-50" iconColor="text-violet-600">
      <div className="space-y-4 max-w-lg">

        {/* Current password */}
        <PasswordInput
          value={currentPwd}
          onChange={(e) => { setCurrentPwd(e.target.value); setError('') }}
          placeholder="Enter your current password"
          label="Current Password"
          required
        />

        {/* New password */}
        <div>
          <PasswordInput
            value={newPwd}
            onChange={(e) => { setNewPwd(e.target.value); setError('') }}
            placeholder="Enter new password (min. 8 characters)"
            label="New Password"
            required
          />

          {/* Strength meter */}
          {newPwd.length > 0 && (
            <div className="mt-2.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      i <= strength.score ? strength.color : 'bg-border-light'
                    }`}
                  />
                ))}
                <span className={`text-xs font-bold ml-1 flex-shrink-0 ${
                  strength.score <= 1 ? 'text-red-500'
                  : strength.score <= 2 ? 'text-amber-500'
                  : strength.score <= 3 ? 'text-yellow-500'
                  : 'text-emerald-600'
                }`}>
                  {strength.label}
                </span>
              </div>
              <p className="text-[11px] text-text-secondary">
                Use 8+ characters, uppercase letters, numbers, and symbols for a stronger password.
              </p>
            </div>
          )}
        </div>

        {/* Confirm new password */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
            Confirm New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            <ConfirmPasswordInput
              value={confirmPwd}
              onChange={(e) => { setConfirmPwd(e.target.value); setError('') }}
              newPwd={newPwd}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-xs font-semibold text-red-600">{error}</p>
          </div>
        )}

        {/* Save */}
        <div className="flex items-center gap-3 pt-1">
          <Button
            onClick={handleSave}
            className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-10 px-6 rounded-xl gap-2"
            style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
          >
            <Save className="w-4 h-4" />
            Update Password
          </Button>
          <SavedPill visible={saved} />
        </div>
      </div>
    </SectionCard>
  )
}

// Confirm password input with inline show/hide + match indicator
function ConfirmPasswordInput({ value, onChange, newPwd }) {
  const [show, setShow] = useState(false)
  const matches = value.length > 0 && value === newPwd
  const mismatch = value.length > 0 && value !== newPwd

  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder="Re-enter new password"
        className={`w-full pl-10 pr-11 py-2.5 rounded-xl border bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 transition ${
          matches  ? 'border-emerald-300 focus:border-emerald-400 focus:ring-emerald-400/10'
          : mismatch ? 'border-red-300 focus:border-red-400 focus:ring-red-400/10'
          : 'border-border-light focus:border-brand-orange focus:ring-brand-orange/10'
        }`}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
        {matches  && <Check className="w-4 h-4 text-emerald-500" />}
        {mismatch && <X className="w-4 h-4 text-red-400" />}
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="text-text-secondary hover:text-text-primary transition p-0.5"
          tabIndex={-1}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

// ─── Section 3: Two-Factor Authentication ────────────────────────────────────

function TwoFactorSection() {
  const [enabled, setEnabled] = useState(false)
  const [saved,   setSaved]   = useState(false)

  const handleToggle = (val) => {
    setEnabled(val)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <SectionCard icon={ShieldCheck} eyebrow="Security" title="Two-Factor Authentication" iconBg="bg-emerald-50" iconColor="text-emerald-600">
      <div className="space-y-5">

        {/* Main toggle row */}
        <div className={`flex items-start gap-4 p-5 rounded-2xl border-2 transition-all ${
          enabled
            ? 'border-emerald-300 bg-emerald-50/50'
            : 'border-border-light bg-bg-secondary'
        }`}>
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
            enabled ? 'bg-emerald-100' : 'bg-white border border-border-light'
          }`}>
            {enabled
              ? <ShieldCheck className="w-6 h-6 text-emerald-600" />
              : <ShieldOff className="w-6 h-6 text-text-secondary" />
            }
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-text-primary">
                  Two-Factor Authentication (2FA)
                </p>
                <p className={`text-xs mt-0.5 font-semibold ${enabled ? 'text-emerald-600' : 'text-text-secondary'}`}>
                  {enabled ? '✓ Enabled — your account is protected' : 'Currently disabled'}
                </p>
              </div>
              <Switch
                checked={enabled}
                onCheckedChange={handleToggle}
                className="data-[state=checked]:bg-emerald-500 flex-shrink-0"
              />
            </div>

            <p className="text-xs text-text-secondary mt-2.5 leading-relaxed">
              When enabled, you will be required to enter a one-time verification code sent to your registered email address each time you log in to the admin panel. This adds an extra layer of security to your account.
            </p>
          </div>
        </div>

        {/* What 2FA protects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: Lock,            label: 'Login Protection',    desc: 'Blocks unauthorised login attempts even if your password is compromised.' },
            { icon: MonitorSmartphone, label: 'Device Verification', desc: 'Verifies every new device or browser that tries to access your admin account.' },
            { icon: Globe,           label: 'Location Alerts',     desc: 'Flags logins from unusual locations or IP addresses for your review.' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-start gap-3 p-4 bg-bg-secondary rounded-xl border border-border-light">
                <div className="w-8 h-8 rounded-lg bg-white border border-border-light flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon className="w-4 h-4 text-brand-orange" />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary">{item.label}</p>
                  <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {saved && (
          <div className="flex items-center gap-2">
            <SavedPill visible={saved} />
            <span className="text-xs text-text-secondary">
              2FA has been {enabled ? 'enabled' : 'disabled'} for your account.
            </span>
          </div>
        )}
      </div>
    </SectionCard>
  )
}

// ─── Section 4: Activity Log ──────────────────────────────────────────────────

const ACTIVITY_LOG = [
  {
    id: 'act-01',
    type: 'login',
    icon: LogIn,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Successful login',
    detail: 'Chrome on Windows · Lagos, Nigeria · 197.210.xx.xx',
    time: 'Today, 09:14 AM',
    badge: 'Login',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
  },
  {
    id: 'act-02',
    type: 'action',
    icon: Pencil,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: 'Updated product — MacBook Air M3',
    detail: 'Changed price from ₦1,200,000 to ₦1,250,000',
    time: 'Today, 09:22 AM',
    badge: 'Edit',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
  },
  {
    id: 'act-03',
    type: 'action',
    icon: ShieldCheck,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    title: 'Approved Easy Buy application — EB-003',
    detail: 'Fatima Bello · MacBook Air M3 · ₦1,250,000',
    time: 'Today, 10:05 AM',
    badge: 'Approval',
    badgeBg: 'bg-violet-100',
    badgeText: 'text-violet-700',
  },
  {
    id: 'act-04',
    type: 'action',
    icon: Trash2,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    title: 'Deleted promotion — Beauty & Cosmetics Weekend',
    detail: 'Promotion PROMO-006 permanently removed',
    time: 'Today, 11:30 AM',
    badge: 'Delete',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-600',
  },
  {
    id: 'act-05',
    type: 'login',
    icon: LogIn,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Successful login',
    detail: 'Firefox on macOS · Lagos, Nigeria · 197.210.xx.xx',
    time: 'Yesterday, 08:47 AM',
    badge: 'Login',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
  },
  {
    id: 'act-06',
    type: 'action',
    icon: Pencil,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: 'Updated site settings — Banner order changed',
    detail: 'Reordered 4 homepage banners',
    time: 'Yesterday, 09:15 AM',
    badge: 'Edit',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
  },
  {
    id: 'act-07',
    type: 'action',
    icon: KeyRound,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    title: 'Password change attempted',
    detail: 'Password update was submitted from admin account settings',
    time: 'Yesterday, 02:10 PM',
    badge: 'Security',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
  },
  {
    id: 'act-08',
    type: 'logout',
    icon: LogOut,
    iconBg: 'bg-gray-50',
    iconColor: 'text-gray-500',
    title: 'Logged out',
    detail: 'Session ended · Chrome on Windows',
    time: 'Yesterday, 06:45 PM',
    badge: 'Logout',
    badgeBg: 'bg-gray-100',
    badgeText: 'text-gray-600',
  },
  {
    id: 'act-09',
    type: 'login',
    icon: LogIn,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Successful login',
    detail: 'Chrome on Windows · Lagos, Nigeria · 197.210.xx.xx',
    time: 'Jul 22, 2025 · 08:30 AM',
    badge: 'Login',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
  },
  {
    id: 'act-10',
    type: 'action',
    icon: AlertTriangle,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    title: 'Failed login attempt',
    detail: 'Unknown device · Abuja, Nigeria · 105.112.xx.xx',
    time: 'Jul 21, 2025 · 11:58 PM',
    badge: 'Alert',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-600',
  },
]

function ActivityLog() {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? ACTIVITY_LOG : ACTIVITY_LOG.slice(0, 6)

  return (
    <motion.div
      variants={fadeCard}
      className="bg-white rounded-2xl border border-border-light overflow-hidden"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-border-light flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
          <Clock className="w-5 h-5 text-text-secondary" />
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">
            Security
          </p>
          <h2 className="text-base font-bold text-text-primary">Recent Activity Log</h2>
        </div>
        <span className="text-xs font-semibold bg-bg-secondary border border-border-light px-2.5 py-1 rounded-full text-text-secondary">
          {ACTIVITY_LOG.length} events
        </span>
      </div>

      {/* Log list */}
      <div className="divide-y divide-border-light">
        {displayed.map((entry, i) => {
          const Icon = entry.icon
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex items-start gap-4 px-6 py-4 hover:bg-bg-secondary/60 transition-colors"
            >
              {/* Icon */}
              <div className={`w-9 h-9 rounded-xl ${entry.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon className={`w-4 h-4 ${entry.iconColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-text-primary">{entry.title}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${entry.badgeBg} ${entry.badgeText}`}>
                    {entry.badge}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-0.5">{entry.detail}</p>
                <p className="text-[11px] text-text-secondary mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  {entry.time}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Show more / less */}
      {ACTIVITY_LOG.length > 6 && (
        <div className="px-6 py-4 border-t border-border-light">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="text-xs font-semibold text-brand-orange hover:text-orange-600 transition flex items-center gap-1"
          >
            {showAll ? 'Show less' : `Show all ${ACTIVITY_LOG.length} events`}
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAll ? 'rotate-90' : ''}`} />
          </button>
        </div>
      )}
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminAccountPage() {
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
                Admin Panel
              </p>
              <h1 className="text-2xl font-bold text-text-primary">Account Settings</h1>
              <p className="text-sm text-text-secondary mt-1">
                Manage your login credentials, security settings, and review recent account activity.
              </p>
            </div>
          </motion.div>

          {/* ── Profile Card ──────────────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
          >
            <AdminProfileCard />
          </motion.div>

          {/* ── Change Email ──────────────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
          >
            <ChangeEmailSection />
          </motion.div>

          {/* ── Change Password ───────────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <ChangePasswordSection />
          </motion.div>

          {/* ── Two-Factor Authentication ─────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <TwoFactorSection />
          </motion.div>

          {/* ── Activity Log ──────────────────────────────────────────────── */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <ActivityLog />
          </motion.div>

          <div className="h-4" />
        </main>
      </div>
    </div>
  )
}
