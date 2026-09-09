'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Package, Tag, ShoppingBag, Users, BarChart2,
  Star, Percent, Zap, MessageSquare, Settings, UserCircle,
  Bell, Search, ChevronLeft, ChevronRight, Menu, X,
  Bot, Send, Sparkles, Circle, CheckCheck, Clock,
} from 'lucide-react'


const ADMIN = {
  name: 'Chukwuemeka Eze',
  firstName: 'Emeka',
  initials: 'CE',
  role: 'Super Admin',
}

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
  { label: 'Account',    icon: UserCircle,      href: '/admin/account' },
]

const STATUS_CONFIG = {
  'AI handling':                    { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  'Escalated — awaiting response':  { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500' },
  'Resolved':                       { bg: 'bg-emerald-100',text: 'text-emerald-700',dot: 'bg-emerald-500' },
}

const MOCK_CONVERSATIONS = [
  {
    id: 'c1',
    customer: { name: 'Adaeze Okonkwo', initials: 'AO', avatar: 'from-orange-400 to-amber-500' },
    status: 'Escalated — awaiting response',
    lastMessage: 'My last order arrived damaged — I need help.',
    lastTime: '10:14 AM',
    unread: 2,
    thread: [
      { id: 't1', role: 'ai',       type: 'text',    content: "Hi Adaeze! How can I help you today?",                                                                    time: '10:02 AM' },
      { id: 't2', role: 'customer', type: 'text',    content: 'Do you have a Samsung fridge around ₦200,000?',                                                           time: '10:03 AM' },
      { id: 't3', role: 'ai',       type: 'product', content: "Yes! Here's one that fits your budget:",
        product: { name: 'Samsung 350L Double Door Refrigerator', price: 198000, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=80&h=80&fit=crop' },
        time: '10:03 AM' },
      { id: 't4', role: 'customer', type: 'text',    content: "I'll go with Easy Buy.",                                                                                   time: '10:05 AM' },
      { id: 't5', role: 'ai',       type: 'text',    content: "Perfect! Easy Buy lets you spread the cost over 3–12 months. I've linked you to the Easy Buy page.",      time: '10:05 AM' },
      { id: 't6', role: 'customer', type: 'text',    content: 'My last order arrived damaged — I need help.',                                                             time: '10:12 AM' },
      { id: 't7', role: 'ai',       type: 'text',    content: "I'm sorry to hear that. Let me connect you with a human agent right away.",                               time: '10:12 AM' },
      { id: 't8', role: 'system',   type: 'system',  content: 'Connecting you to an admin, please hold on...',                                                           time: '10:12 AM' },
      { id: 't9', role: 'system',   type: 'system',  content: 'An admin has joined the chat.', isJoined: true,                                                           time: '10:13 AM' },
    ],
    handoffIndex: 7,
  },
  {
    id: 'c2',
    customer: { name: 'Tunde Adeyemi', initials: 'TA', avatar: 'from-blue-400 to-blue-600' },
    status: 'AI handling',
    lastMessage: 'What is the warranty on the Sony headphones?',
    lastTime: '9:48 AM',
    unread: 0,
    thread: [
      { id: 't1', role: 'ai',       type: 'text', content: "Hi Tunde! How can I help you today?",                                                                        time: '9:40 AM' },
      { id: 't2', role: 'customer', type: 'text', content: 'What is the warranty on the Sony headphones?',                                                               time: '9:48 AM' },
      { id: 't3', role: 'ai',       type: 'text', content: "The Sony WH-1000XM5 comes with a 1-year manufacturer warranty covering manufacturing defects. Would you like to add it to your cart?", time: '9:48 AM' },
    ],
    handoffIndex: -1,
  },
  {
    id: 'c3',
    customer: { name: 'Ngozi Eze', initials: 'NE', avatar: 'from-violet-400 to-purple-500' },
    status: 'Resolved',
    lastMessage: 'Thank you so much, the refund came through!',
    lastTime: 'Yesterday',
    unread: 0,
    thread: [
      { id: 't1', role: 'ai',       type: 'text',   content: "Hi Ngozi! How can I help you today?",                                                                      time: 'Yesterday 2:10 PM' },
      { id: 't2', role: 'customer', type: 'text',   content: 'I returned a blender 2 weeks ago but no refund yet.',                                                      time: 'Yesterday 2:11 PM' },
      { id: 't3', role: 'ai',       type: 'text',   content: "I'm sorry for the delay. Let me escalate this to our support team immediately.",                           time: 'Yesterday 2:11 PM' },
      { id: 't4', role: 'system',   type: 'system', content: 'Connecting you to an admin, please hold on...',                                                            time: 'Yesterday 2:11 PM' },
      { id: 't5', role: 'system',   type: 'system', content: 'An admin has joined the chat.', isJoined: true,                                                            time: 'Yesterday 2:12 PM' },
      { id: 't6', role: 'ai',       type: 'text',   content: "Hi Ngozi, this is Emeka. I've processed your refund of ₦85,000 — it will reflect in 2–3 business days.", isAdmin: true, time: 'Yesterday 2:15 PM' },
      { id: 't7', role: 'customer', type: 'text',   content: 'Thank you so much, the refund came through!',                                                              time: 'Yesterday 4:30 PM' },
    ],
    handoffIndex: 3,
  },
  {
    id: 'c4',
    customer: { name: 'Chidi Okafor', initials: 'CO', avatar: 'from-emerald-400 to-teal-500' },
    status: 'AI handling',
    lastMessage: 'Do you have the iPhone 15 Pro Max in stock?',
    lastTime: '8:22 AM',
    unread: 1,
    thread: [
      { id: 't1', role: 'ai',       type: 'text',    content: "Hi Chidi! What can I help you find today?",                                                               time: '8:20 AM' },
      { id: 't2', role: 'customer', type: 'text',    content: 'Do you have the iPhone 15 Pro Max in stock?',                                                             time: '8:22 AM' },
      { id: 't3', role: 'ai',       type: 'product', content: "Yes, we have it! Here's the listing:",
        product: { name: 'Apple iPhone 15 Pro Max 256GB', price: 1187000, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=80&h=80&fit=crop' },
        time: '8:22 AM' },
      { id: 't4', role: 'ai',       type: 'actions', content: 'Ready to get it?',                                                                                        time: '8:22 AM' },
    ],
    handoffIndex: -1,
  },
  {
    id: 'c5',
    customer: { name: 'Fatima Bello', initials: 'FB', avatar: 'from-rose-400 to-pink-500' },
    status: 'Escalated — awaiting response',
    lastMessage: 'I was charged twice for the same order!',
    lastTime: 'Yesterday',
    unread: 3,
    thread: [
      { id: 't1', role: 'ai',       type: 'text',   content: "Hi Fatima! How can I help you today?",                                                                     time: 'Yesterday 11:05 AM' },
      { id: 't2', role: 'customer', type: 'text',   content: 'I was charged twice for the same order!',                                                                  time: 'Yesterday 11:06 AM' },
      { id: 't3', role: 'ai',       type: 'text',   content: "That's very concerning. I'm escalating this to our billing team immediately.",                             time: 'Yesterday 11:06 AM' },
      { id: 't4', role: 'system',   type: 'system', content: 'Connecting you to an admin, please hold on...',                                                            time: 'Yesterday 11:06 AM' },
      { id: 't5', role: 'system',   type: 'system', content: 'An admin has joined the chat.', isJoined: true,                                                            time: 'Yesterday 11:07 AM' },
    ],
    handoffIndex: 3,
  },
]

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

const msgVariantAI = {
  hidden: { opacity: 0, x: -14 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.22, ease: 'easeOut' } },
}

const msgVariantCustomer = {
  hidden: { opacity: 0, x: 14 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.22, ease: 'easeOut' } },
}

const msgVariantSystem = {
  hidden: { opacity: 0, scale: 0.94 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.22, ease: 'easeOut' } },
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`hidden md:flex flex-col bg-white border-r border-border-light transition-all duration-300 flex-shrink-0 ${collapsed ? 'w-16' : 'w-56'}`}
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
          const isActive = item.href === '/admin/chats'
          return (
            <Link key={item.label} href={item.href}>
              <div
                className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'bg-orange-50 text-brand-orange' : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
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
          {collapsed
            ? <ChevronRight className="w-4 h-4" />
            : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>
          }
        </button>
      </div>
    </aside>
  )
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar({ onMobileMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border-light flex items-center gap-4 px-4 md:px-6 py-3">
      <button onClick={onMobileMenuToggle} className="md:hidden p-2 hover:bg-bg-secondary rounded-full transition flex-shrink-0">
        <Menu className="w-5 h-5 text-text-primary" />
      </button>
      <span className="md:hidden text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent flex-shrink-0">Admin</span>

      <div className="flex-1 max-w-sm hidden sm:block">
        <div className="search-glow rounded-full px-4 py-2 bg-bg-secondary border border-border-light flex items-center gap-2">
          <Search className="w-4 h-4 text-text-secondary flex-shrink-0" />
          <input type="text" placeholder="Search chats..." className="bg-transparent outline-none flex-1 text-sm text-text-primary placeholder-text-secondary" />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Link href="/admin/notifications">
          <button className="relative p-2 hover:bg-bg-secondary rounded-full transition">
            <Bell className="w-5 h-5 text-text-primary" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">5</span>
          </button>
        </Link>
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

// ─── Thread pieces ────────────────────────────────────────────────────────────

function ThreadProductCard({ product }) {
  return (
    <div className="mt-2 flex items-center gap-3 p-2 rounded-xl bg-white border border-border-light">
      <img
        src={product.image}
        alt={product.name}
        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-text-primary line-clamp-2 leading-snug">{product.name}</p>
        <p className="text-sm font-bold text-brand-orange mt-0.5">₦{product.price.toLocaleString()}</p>
      </div>
    </div>
  )
}

function ThreadSystemBubble({ msg, muted }) {
  return (
    <motion.div
      variants={msgVariantSystem} initial="hidden" animate="show"
      className={`flex justify-center my-1 ${muted ? 'opacity-50' : ''}`}
    >
      <span className={`inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full ${
        msg.isJoined
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold'
          : 'bg-bg-secondary text-text-secondary border border-border-light'
      }`}>
        {msg.isJoined && <CheckCheck className="w-3 h-3" />}
        {msg.content}
      </span>
    </motion.div>
  )
}

function ThreadMessage({ msg, muted }) {
  const isCustomer = msg.role === 'customer'
  const isSystem   = msg.role === 'system'
  const isAdmin    = msg.isAdmin

  if (isSystem) return <ThreadSystemBubble msg={msg} muted={muted} />

  const variant = isCustomer ? msgVariantCustomer : msgVariantAI

  return (
    <motion.div variants={variant} initial="hidden" animate="show"
      className={`flex items-end gap-2 ${isCustomer ? 'flex-row-reverse' : 'flex-row'} ${muted ? 'opacity-50' : ''}`}
    >
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 ${
        isCustomer ? 'bg-gradient-to-br from-orange-400 to-amber-500' : isAdmin ? 'bg-gradient-to-br from-violet-500 to-purple-600' : 'bg-gradient-to-br from-orange-400 to-amber-500'
      }`}>
        {isCustomer ? 'C' : isAdmin ? 'CE' : <Bot className="w-3.5 h-3.5" />}
      </div>

      <div className={`max-w-[68%] flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}>
        <p className="text-[10px] text-text-secondary mb-1 px-1">
          {isCustomer ? 'Customer' : isAdmin ? 'Emeka · Admin' : 'AI Assistant'}
        </p>
        <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isCustomer
            ? 'bg-brand-orange text-white rounded-br-sm'
            : isAdmin
              ? 'bg-violet-50 border border-violet-200 text-text-primary rounded-bl-sm'
              : muted
                ? 'bg-bg-secondary border border-border-light text-text-secondary rounded-bl-sm'
                : 'bg-white border border-border-light text-text-primary rounded-bl-sm'
        }`} style={isCustomer ? { boxShadow: '0 2px 8px rgba(246,139,30,0.2)' } : { boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          {msg.content && <p>{msg.content}</p>}
          {msg.type === 'product' && msg.product && <ThreadProductCard product={msg.product} />}
          {msg.type === 'actions' && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-orange/10 text-brand-orange border border-brand-orange/20">Interested in Purchase</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-200">Go for Easy Buy</span>
            </div>
          )}
        </div>
        <p className="text-[10px] text-text-secondary mt-1 px-1">{msg.time}</p>
      </div>
    </motion.div>
  )
}

function AIHandledDivider() {
  return (
    <div className="flex items-center gap-3 my-3">
      <div className="flex-1 h-px bg-border-light" />
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200">
        <Sparkles className="w-3 h-3 text-brand-orange" />
        <span className="text-[10px] font-semibold text-brand-orange uppercase tracking-wide">Handled by AI</span>
      </div>
      <div className="flex-1 h-px bg-border-light" />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminChatsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false)
  const [selectedId,       setSelectedId]       = useState('c1')
  const [replyText,        setReplyText]        = useState('')
  const [conversations,    setConversations]    = useState(MOCK_CONVERSATIONS)
  const [mobileShowThread, setMobileShowThread] = useState(false)

  const selected = conversations.find((c) => c.id === selectedId)

  const handleSelectConv = (id) => {
    setSelectedId(id)
    setMobileShowThread(true)
    // Mark as read
    setConversations((prev) => prev.map((c) => c.id === id ? { ...c, unread: 0 } : c))
  }

  const handleSendReply = () => {
    const text = replyText.trim()
    if (!text || !selected) return
    const now = new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
    const newMsg = { id: `t${Date.now()}`, role: 'ai', type: 'text', content: text, isAdmin: true, time: now }
    setConversations((prev) => prev.map((c) =>
      c.id === selectedId
        ? { ...c, thread: [...c.thread, newMsg], lastMessage: text, lastTime: now, status: 'Resolved' }
        : c
    ))
    setReplyText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendReply() }
  }

  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0)

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
              <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Marketplace Admin</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 hover:bg-bg-secondary rounded-full">
                <X className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
            <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto">
              {SIDEBAR_NAV.map((item) => {
                const Icon = item.icon
                const isActive = item.href === '/admin/chats'
                return (
                  <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                    <div className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all ${isActive ? 'bg-orange-50 text-brand-orange' : 'text-text-secondary hover:bg-bg-secondary'}`}>
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

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">

          {/* Page heading */}
          <motion.div variants={fadeIn} initial="hidden" animate="show" className="flex items-center justify-between gap-4 mb-5 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-1">Support</p>
              <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                Customer Chats
                {totalUnread > 0 && (
                  <span className="text-sm font-semibold bg-brand-orange text-white px-2.5 py-0.5 rounded-full">{totalUnread} new</span>
                )}
              </h1>
              <p className="text-sm text-text-secondary mt-1">Monitor AI conversations and step in when customers need human support.</p>
            </div>
          </motion.div>

          {/* WhatsApp-style two-column panel */}
          <motion.div
            variants={fadeIn} initial="hidden" animate="show"
            className="flex-1 bg-white rounded-2xl border border-border-light overflow-hidden flex min-h-0"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)', height: 'calc(100vh - 220px)' }}
          >

            {/* ── Left column: conversation list ── */}
            <div className={`w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-border-light flex flex-col ${mobileShowThread ? 'hidden md:flex' : 'flex'}`}>

              {/* List header */}
              <div className="px-4 py-3.5 border-b border-border-light">
                <div className="search-glow rounded-full px-3 py-2 bg-bg-secondary border border-border-light flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
                  <input type="text" placeholder="Search conversations..." className="bg-transparent outline-none flex-1 text-xs text-text-primary placeholder-text-secondary" />
                </div>
              </div>

              {/* Conversation rows */}
              <div className="flex-1 overflow-y-auto divide-y divide-border-light">
                {conversations.map((conv) => {
                  const cfg = STATUS_CONFIG[conv.status]
                  const isSelected = conv.id === selectedId
                  return (
                    <button
                      key={conv.id}
                      onClick={() => handleSelectConv(conv.id)}
                      className={`w-full text-left px-4 py-3.5 flex items-start gap-3 hover:bg-bg-secondary transition-colors ${isSelected ? 'bg-orange-50 border-l-2 border-l-brand-orange' : ''}`}
                    >
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${conv.customer.avatar} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {conv.customer.initials}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className={`text-sm font-semibold truncate ${isSelected ? 'text-brand-orange' : 'text-text-primary'}`}>
                            {conv.customer.name}
                          </p>
                          <span className="text-[10px] text-text-secondary flex-shrink-0 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />{conv.lastTime}
                          </span>
                        </div>

                        <p className="text-xs text-text-secondary truncate mb-1.5">{conv.lastMessage}</p>

                        <div className="flex items-center justify-between gap-2">
                          {/* Status badge */}
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {conv.status}
                          </span>
                          {/* Unread count */}
                          {conv.unread > 0 && (
                            <span className="w-5 h-5 rounded-full bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Right column: thread view ── */}
            <div className={`flex-1 flex flex-col min-w-0 ${!mobileShowThread ? 'hidden md:flex' : 'flex'}`}>

              {selected ? (
                <>
                  {/* Thread header */}
                  <div className="px-5 py-3.5 border-b border-border-light flex items-center gap-3">
                    {/* Mobile back button */}
                    <button onClick={() => setMobileShowThread(false)} className="md:hidden p-1.5 hover:bg-bg-secondary rounded-full transition flex-shrink-0">
                      <ChevronLeft className="w-4 h-4 text-text-secondary" />
                    </button>

                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${selected.customer.avatar} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {selected.customer.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-text-primary">{selected.customer.name}</p>
                      <p className="text-xs text-text-secondary">{selected.thread.length} messages</p>
                    </div>
                    {/* Status badge */}
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${STATUS_CONFIG[selected.status].bg} ${STATUS_CONFIG[selected.status].text}`}>
                      <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[selected.status].dot}`} />
                      {selected.status}
                    </span>
                  </div>

                  {/* Message thread */}
                  <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-bg-secondary/40">

                    {/* "Handled by AI" label at top — only when there is a handoff */}
                    {selected.handoffIndex !== -1 && (
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="w-3.5 h-3.5 text-text-secondary" />
                        <p className="text-[11px] text-text-secondary font-medium italic">
                          The section below was handled by the AI assistant
                        </p>
                      </div>
                    )}

                    {selected.thread.map((msg, index) => {
                      const isMuted    = selected.handoffIndex !== -1 && index < selected.handoffIndex
                      const showDivider = selected.handoffIndex !== -1 && index === selected.handoffIndex
                      return (
                        <div key={msg.id}>
                          {showDivider && <AIHandledDivider />}
                          <ThreadMessage msg={msg} muted={isMuted} />
                        </div>
                      )
                    })}
                  </div>

                  {/* Admin reply input */}
                  <div className="px-5 py-4 border-t border-border-light bg-white">
                    <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-wide mb-2 flex items-center gap-1">
                      <CheckCheck className="w-3 h-3" /> Reply as Emeka · Admin
                    </p>
                    <div className="flex items-end gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        CE
                      </div>
                      <div className="flex-1 search-glow rounded-2xl border border-border-light bg-bg-secondary overflow-hidden">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your reply to the customer..."
                          rows={1}
                          className="resize-none border-0 bg-transparent px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary outline-none w-full min-h-[40px] max-h-28 leading-relaxed"
                        />
                      </div>
                      <button
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-orange hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all"
                        style={{ boxShadow: replyText.trim() ? '0 4px 12px rgba(246,139,30,0.35)' : 'none' }}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                    <MessageSquare className="w-7 h-7 text-brand-orange" strokeWidth={1.5} />
                  </div>
                  <p className="text-base font-bold text-text-primary">Select a conversation</p>
                  <p className="text-sm text-text-secondary mt-1 max-w-xs">Choose a customer chat from the left to view the full thread.</p>
                </div>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}