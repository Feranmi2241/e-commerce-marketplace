'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import {
  Search,
  Bell,
  ShoppingCart,
  Menu,
  User,
  MapPin,
  Lock,
  Bell as BellIcon,
  ChevronRight,
  Camera,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import ChatButton from '@/components/ChatButton'

// ─── Mock Customer ────────────────────────────────────────────────────────────

const CUSTOMER = {
  name: 'Adaeze Okonkwo',
  firstName: 'Adaeze',
  initials: 'AO',
  email: 'adaeze.o@email.com',
  phone: '+234 801 234 5678',
  avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
}

const TABS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'password', label: 'Change Password', icon: Lock },
  { id: 'notifications', label: 'Notification Preferences', icon: BellIcon },
]

// ─── Animation ────────────────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-border-light backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 md:gap-6">
        <Link href="/" className="flex-shrink-0">
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Marketplace
          </span>
        </Link>

        <div className="flex-1 max-w-md hidden md:block">
          <div className="search-glow rounded-full px-4 py-2 bg-bg-secondary border border-border-light flex items-center gap-2">
            <Search className="w-4 h-4 text-text-secondary flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none flex-1 text-sm text-text-primary placeholder-text-secondary"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-5 text-sm mr-3">
            {[
              { label: 'Shop', href: '/search' },
              { label: 'Categories', href: '#' },
              { label: 'Deals', href: '#' },
              { label: 'Easy Buy', href: '/easy-buy' },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="text-text-primary hover:text-brand-orange transition font-medium">
                {link.label}
              </Link>
            ))}
          </div>

          <button className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <Bell className="w-5 h-5 text-text-primary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full" />
          </button>

          <Link href="/cart" className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <ShoppingCart className="w-5 h-5 text-text-primary" />
            <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">3</span>
          </Link>

          <div className="flex items-center gap-2 pl-2 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
              {CUSTOMER.initials}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-text-primary leading-tight">{CUSTOMER.firstName}</p>
              <p className="text-xs text-text-secondary leading-tight">My Account</p>
            </div>
          </div>

          <button className="md:hidden p-2 hover:bg-bg-secondary rounded-full transition ml-1" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu className="w-5 h-5 text-text-primary" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border-light bg-white px-4 py-3 space-y-1">
          {[
            { label: 'Shop', href: '/shop' },
            { label: 'Categories', href: '/shop?view=categories' },
            { label: 'Deals', href: '/shop' },
            { label: 'Easy Buy', href: '/easy-buy' },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="block py-2 text-sm text-text-primary hover:text-brand-orange transition">
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ activeTab, setActiveTab, avatarSrc }) {
  return (
    <motion.aside variants={item} className="bg-white rounded-2xl border border-border-light overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      {/* Profile summary */}
      <div className="p-6 border-b border-border-light text-center">
        <div className="relative w-20 h-20 mx-auto mb-3">
          <img
            src={avatarSrc || CUSTOMER.avatar}
            alt={CUSTOMER.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-border-light"
          />
        </div>
        <p className="font-bold text-text-primary">{CUSTOMER.name}</p>
        <p className="text-xs text-text-secondary mt-0.5">{CUSTOMER.email}</p>
        <span className="inline-block mt-2 px-2.5 py-0.5 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full border border-orange-100">
          Verified Member
        </span>
      </div>

      {/* Tab nav */}
      <nav className="p-3">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all mb-1 group ${
                isActive
                  ? 'bg-orange-50 text-brand-orange'
                  : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-brand-orange' : 'text-text-secondary group-hover:text-text-primary'}`} />
              {tab.label}
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-brand-orange" />}
            </button>
          )
        })}
      </nav>

      {/* Back to dashboard */}
      <div className="p-4 border-t border-border-light">
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="w-full border-border-light text-text-secondary hover:text-brand-orange hover:border-brand-orange text-xs">
            ← Back to Dashboard
          </Button>
        </Link>
      </div>
    </motion.aside>
  )
}

// ─── Page Shell ───────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('personal')
  const [avatarSrc, setAvatarSrc] = useState(CUSTOMER.avatar)

  return (
    <div className="min-h-screen bg-bg-secondary">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Page header */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-8">
            <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">Your Account</p>
            <h1 className="text-3xl font-bold text-text-primary">Account Settings</h1>
          </motion.div>

          {/* Mobile tab bar */}
          <motion.div variants={item} className="md:hidden flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                    activeTab === tab.id
                      ? 'bg-brand-orange text-white shadow-sm'
                      : 'bg-white text-text-secondary border border-border-light'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              )
            })}
          </motion.div>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-[280px_1fr] gap-6 items-start">
            {/* Sidebar — hidden on mobile (uses top tab bar instead) */}
            <div className="hidden md:block">
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} avatarSrc={avatarSrc} />
            </div>

            {/* Content panel */}
            <motion.div variants={item}>
              <TabContent activeTab={activeTab} avatarSrc={avatarSrc} setAvatarSrc={setAvatarSrc} />
            </motion.div>
          </div>
        </motion.div>
      </main>

      <ChatButton />
    </div>
  )
}

// ─── Tab Content Router ───────────────────────────────────────────────────────

function TabContent({ activeTab, avatarSrc, setAvatarSrc }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {activeTab === 'personal' && <PersonalInfoTab avatarSrc={avatarSrc} setAvatarSrc={setAvatarSrc} />}
        {activeTab === 'addresses' && <AddressesTab />}
        {activeTab === 'password' && <ChangePasswordTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Personal Info Tab ───────────────────────────────────────────────────────

function PersonalInfoTab({ avatarSrc, setAvatarSrc }) {
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({
    name: CUSTOMER.name,
    email: CUSTOMER.email,
    phone: CUSTOMER.phone,
  })
  const [saved, setSaved] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) setAvatarSrc(URL.createObjectURL(file))
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="bg-white rounded-2xl border border-border-light overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      {/* Header strip */}
      <div className="px-8 py-5 border-b border-border-light">
        <h2 className="text-lg font-bold text-text-primary">Personal Information</h2>
        <p className="text-sm text-text-secondary mt-0.5">Update your name, email, and contact details</p>
      </div>

      <div className="p-8">
        {/* Avatar upload */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border-light">
          <div className="relative flex-shrink-0">
            <img
              src={avatarSrc}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-border-light"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
          <div>
            <p className="font-semibold text-text-primary">{form.name}</p>
            <p className="text-sm text-text-secondary mt-0.5">Click the photo to upload a new one</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 text-xs font-medium text-brand-orange hover:underline"
            >
              Change photo
            </button>
          </div>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full h-11 pl-9 pr-4 rounded-xl border border-border-light bg-white text-sm text-text-primary outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Phone Number</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-secondary">📞</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full h-11 pl-9 pr-4 rounded-xl border border-border-light bg-white text-sm text-text-primary outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-secondary">✉️</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-11 pl-9 pr-4 rounded-xl border border-border-light bg-white text-sm text-text-primary outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
            <p className="text-xs text-text-secondary mt-1.5">A verification email will be sent if you change this</p>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <Button
              type="submit"
              className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-8 h-11 rounded-xl"
            >
              Save Changes
            </Button>
            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-emerald-600 font-medium flex items-center gap-1.5"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-xs">✓</span>
                  Saved successfully
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Addresses Tab ───────────────────────────────────────────────────────────────

const MOCK_ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    recipient: 'Adaeze Okonkwo',
    line1: '14 Bode Thomas Street',
    line2: 'Surulere',
    city: 'Lagos',
    state: 'Lagos State',
    zip: '101283',
    phone: '+234 801 234 5678',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Office',
    recipient: 'Adaeze Okonkwo',
    line1: '3rd Floor, Landmark Towers',
    line2: 'Victoria Island',
    city: 'Lagos',
    state: 'Lagos State',
    zip: '101241',
    phone: '+234 801 234 5678',
    isDefault: false,
  },
]

const EMPTY_ADDRESS = { label: '', recipient: '', line1: '', line2: '', city: '', state: '', zip: '', phone: '' }

function AddressesTab() {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES)
  const [defaultId, setDefaultId] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [form, setForm] = useState(EMPTY_ADDRESS)

  const openAdd = () => {
    setEditingAddress(null)
    setForm(EMPTY_ADDRESS)
    setDialogOpen(true)
  }

  const openEdit = (addr) => {
    setEditingAddress(addr.id)
    setForm({ label: addr.label, recipient: addr.recipient, line1: addr.line1, line2: addr.line2, city: addr.city, state: addr.state, zip: addr.zip, phone: addr.phone })
    setDialogOpen(true)
  }

  const handleDelete = (id) => setAddresses((prev) => prev.filter((a) => a.id !== id))

  const handleSave = () => {
    if (editingAddress) {
      setAddresses((prev) => prev.map((a) => a.id === editingAddress ? { ...a, ...form } : a))
    } else {
      setAddresses((prev) => [...prev, { ...form, id: Date.now(), isDefault: false }])
    }
    setDialogOpen(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-border-light overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <div className="px-8 py-5 border-b border-border-light flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-text-primary">Saved Addresses</h2>
          <p className="text-sm text-text-secondary mt-0.5">Manage your delivery addresses</p>
        </div>
        <Button onClick={openAdd} className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-10 px-5 rounded-xl gap-2">
          <span className="text-lg leading-none">+</span> Add New
        </Button>
      </div>

      <div className="p-8 space-y-4">
        {addresses.length === 0 && (
          <div className="text-center py-12 text-text-secondary">
            <MapPin className="w-10 h-10 mx-auto mb-3 text-border-light" />
            <p className="font-medium">No addresses saved yet</p>
            <p className="text-sm mt-1">Add a delivery address to get started</p>
          </div>
        )}

        {addresses.map((addr) => {
          const isDefault = addr.id === defaultId
          return (
            <motion.div
              key={addr.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative rounded-xl border-2 p-5 transition-all ${
                isDefault ? 'border-brand-orange bg-orange-50/40' : 'border-border-light bg-white hover:border-orange-200'
              }`}
            >
              {/* Default badge */}
              {isDefault && (
                <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-brand-orange text-white text-xs font-bold rounded-full">
                  Default
                </span>
              )}

              <div className="flex items-start gap-4">
                {/* Radio circle */}
                <button
                  onClick={() => setDefaultId(addr.id)}
                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    isDefault ? 'border-brand-orange' : 'border-border-light hover:border-brand-orange'
                  }`}
                >
                  {isDefault && <span className="w-2.5 h-2.5 rounded-full bg-brand-orange block" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-text-primary text-sm">{addr.label}</span>
                    <span className="text-xs text-text-secondary bg-bg-secondary px-2 py-0.5 rounded-full">{addr.recipient}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                  <p className="text-sm text-text-secondary">{addr.city}, {addr.state} {addr.zip}</p>
                  <p className="text-xs text-text-secondary mt-1">{addr.phone}</p>

                  <div className="flex items-center gap-3 mt-3">
                    {!isDefault && (
                      <button onClick={() => setDefaultId(addr.id)} className="text-xs font-medium text-brand-orange hover:underline">
                        Set as Default
                      </button>
                    )}
                    <button onClick={() => openEdit(addr)} className="text-xs font-medium text-text-secondary hover:text-text-primary flex items-center gap-1">
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(addr.id)} className="text-xs font-medium text-red-500 hover:text-red-600 flex items-center gap-1">
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
            <DialogDescription>Fill in the delivery address details below</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1.5">Label (e.g. Home)</label>
                <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Home" className="w-full h-10 px-3 rounded-lg border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1.5">Recipient Name</label>
                <input value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} placeholder="Full name" className="w-full h-10 px-3 rounded-lg border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-primary mb-1.5">Address Line 1</label>
              <input value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} placeholder="Street address" className="w-full h-10 px-3 rounded-lg border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-primary mb-1.5">Address Line 2 (optional)</label>
              <input value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} placeholder="Apartment, suite, etc." className="w-full h-10 px-3 rounded-lg border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1.5">City</label>
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Lagos" className="w-full h-10 px-3 rounded-lg border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1.5">State</label>
                <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="Lagos State" className="w-full h-10 px-3 rounded-lg border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1.5">ZIP Code</label>
                <input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} placeholder="100001" className="w-full h-10 px-3 rounded-lg border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-primary mb-1.5">Phone Number</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+234 800 000 0000" className="w-full h-10 px-3 rounded-lg border border-border-light text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-orange-100 transition-all" />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSave} className="bg-brand-orange hover:bg-orange-600 text-white font-semibold">
              {editingAddress ? 'Save Changes' : 'Add Address'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ─── Change Password Tab ────────────────────────────────────────────────────────────

function calcStrength(pwd) {
  let s = 0
  if (pwd.length >= 8) s += 25
  if (pwd.length >= 12) s += 25
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) s += 25
  if (/[0-9]/.test(pwd)) s += 12.5
  if (/[^a-zA-Z0-9]/.test(pwd)) s += 12.5
  return Math.min(s, 100)
}

function strengthMeta(s) {
  if (s < 30) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-500' }
  if (s < 60) return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' }
  if (s < 85) return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-500' }
  return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' }
}

function PasswordField({ label, value, showKey, show, setShow, fields, setFields, errors, setErrors }) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1.5">{label}</label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <input
          type={show[showKey] ? 'text' : 'password'}
          value={value}
          onChange={(e) => { setFields({ ...fields, [showKey]: e.target.value }); setErrors({ ...errors, [showKey]: '' }) }}
          className={`w-full h-11 pl-9 pr-11 rounded-xl border text-sm text-text-primary outline-none transition-all ${
            errors[showKey] ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-border-light focus:border-brand-orange focus:ring-2 focus:ring-orange-100'
          }`}
        />
        <button type="button" onClick={() => setShow({ ...show, [showKey]: !show[showKey] })} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors">
          {show[showKey] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {errors[showKey] && <p className="text-xs text-red-500 mt-1">{errors[showKey]}</p>}
    </div>
  )
}

function ChangePasswordTab() {
  const [fields, setFields] = useState({ current: '', newPwd: '', confirm: '' })
  const [show, setShow] = useState({ current: false, newPwd: false, confirm: false })
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  const strength = calcStrength(fields.newPwd)
  const meta = strengthMeta(strength)
  const passwordsMatch = fields.newPwd.length > 0 && fields.confirm.length > 0 && fields.newPwd === fields.confirm
  const passwordsMismatch = fields.confirm.length > 0 && fields.newPwd !== fields.confirm

  const validate = () => {
    const errs = {}
    if (!fields.current) errs.current = 'Current password is required'
    if (!fields.newPwd) errs.newPwd = 'New password is required'
    else if (fields.newPwd.length < 8) errs.newPwd = 'Must be at least 8 characters'
    else if (strength < 30) errs.newPwd = 'Password is too weak'
    if (!fields.confirm) errs.confirm = 'Please confirm your new password'
    else if (fields.newPwd !== fields.confirm) errs.confirm = 'Passwords do not match'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaved(true)
    setFields({ current: '', newPwd: '', confirm: '' })
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="bg-white rounded-2xl border border-border-light overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <div className="px-8 py-5 border-b border-border-light">
        <h2 className="text-lg font-bold text-text-primary">Change Password</h2>
        <p className="text-sm text-text-secondary mt-0.5">Choose a strong password to keep your account secure</p>
      </div>

      <div className="p-8">
        <AnimatePresence>
          {saved && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
              <p className="text-sm font-medium text-emerald-700">Password updated successfully!</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          <PasswordField label="Current Password" value={fields.current} showKey="current" show={show} setShow={setShow} fields={fields} setFields={setFields} errors={errors} setErrors={setErrors} />

          <div className="h-px bg-border-light" />

          <PasswordField label="New Password" value={fields.newPwd} showKey="newPwd" show={show} setShow={setShow} fields={fields} setFields={setFields} errors={errors} setErrors={setErrors} />

          {/* Strength bar */}
          {fields.newPwd.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
              <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                <motion.div className={`h-full rounded-full ${meta.color}`} initial={{ width: 0 }} animate={{ width: `${strength}%` }} transition={{ duration: 0.3 }} />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Password strength</span>
                <span className={`font-semibold ${meta.text}`}>{meta.label}</span>
              </div>
              {/* Checklist */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {[
                  { label: '8+ characters', pass: fields.newPwd.length >= 8 },
                  { label: 'Uppercase & lowercase', pass: /[a-z]/.test(fields.newPwd) && /[A-Z]/.test(fields.newPwd) },
                  { label: 'At least one number', pass: /[0-9]/.test(fields.newPwd) },
                  { label: 'Special character', pass: /[^a-zA-Z0-9]/.test(fields.newPwd) },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-1.5">
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-white text-[9px] flex-shrink-0 transition-colors ${c.pass ? 'bg-emerald-500' : 'bg-border-light'}`}>{c.pass ? '✓' : ''}</span>
                    <span className={`text-xs ${c.pass ? 'text-emerald-700 font-medium' : 'text-text-secondary'}`}>{c.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <PasswordField label="Confirm New Password" value={fields.confirm} showKey="confirm" show={show} setShow={setShow} fields={fields} setFields={setFields} errors={errors} setErrors={setErrors} />

          {passwordsMatch && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px]">✓</span>
              Passwords match
            </motion.p>
          )}
          {passwordsMismatch && <p className="text-xs text-red-500">Passwords do not match</p>}

          <div className="pt-2">
            <Button type="submit" className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-8 h-11 rounded-xl">
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Notifications Tab ───────────────────────────────────────────────────────────────

const NOTIFICATION_PREFS = [
  {
    id: 'email',
    icon: '✉️',
    label: 'Email Notifications',
    desc: 'Order updates, promotions, and account alerts sent to your email',
    defaultOn: true,
  },
  {
    id: 'sms',
    icon: '💬',
    label: 'SMS Notifications',
    desc: 'Delivery updates and OTP codes sent to your phone number',
    defaultOn: true,
  },
  {
    id: 'push',
    icon: '🔔',
    label: 'Push Notifications',
    desc: 'Real-time alerts in your browser for deals and order status',
    defaultOn: false,
  },
  {
    id: 'deals',
    icon: '🏷️',
    label: 'Flash Deal Alerts',
    desc: 'Be the first to know when a flash sale goes live',
    defaultOn: true,
  },
  {
    id: 'easybuy',
    icon: '⚡',
    label: 'Easy Buy Reminders',
    desc: 'Payment due date reminders for your Easy Buy installment plan',
    defaultOn: true,
  },
]

function NotificationsTab() {
  const [prefs, setPrefs] = useState(
    Object.fromEntries(NOTIFICATION_PREFS.map((p) => [p.id, p.defaultOn]))
  )
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="bg-white rounded-2xl border border-border-light overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <div className="px-8 py-5 border-b border-border-light">
        <h2 className="text-lg font-bold text-text-primary">Notification Preferences</h2>
        <p className="text-sm text-text-secondary mt-0.5">Choose how and when you want to hear from us</p>
      </div>

      <div className="p-8 space-y-2">
        {NOTIFICATION_PREFS.map((pref, idx) => (
          <motion.div
            key={pref.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.06 }}
            className={`flex items-center justify-between gap-4 p-5 rounded-xl border transition-all ${
              prefs[pref.id] ? 'border-orange-100 bg-orange-50/30' : 'border-border-light bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl flex-shrink-0 mt-0.5">{pref.icon}</span>
              <div>
                <p className={`font-semibold text-sm ${prefs[pref.id] ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {pref.label}
                </p>
                <p className="text-xs text-text-secondary mt-0.5 leading-relaxed max-w-sm">{pref.desc}</p>
              </div>
            </div>
            <Switch
              checked={prefs[pref.id]}
              onCheckedChange={(val) => setPrefs({ ...prefs, [pref.id]: val })}
              className="flex-shrink-0"
            />
          </motion.div>
        ))}

        <div className="pt-4 flex items-center gap-4">
          <Button onClick={handleSave} className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-8 h-11 rounded-xl">
            Save Preferences
          </Button>
          <AnimatePresence>
            {saved && (
              <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-sm text-emerald-600 font-medium flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-xs">✓</span>
                Preferences saved
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
