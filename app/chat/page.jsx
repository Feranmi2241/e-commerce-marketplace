'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Send,
  Bot,
  ShoppingCart,
  Zap,
  User,
  Sparkles,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'


// ─── Customer ─────────────────────────────────────────────────────────────────

const CUSTOMER = {
  name: 'Adaeze Okonkwo',
  firstName: 'Adaeze',
  initials: 'AO',
}

// ─── Canned AI replies (rotate through these for simulated responses) ─────────

const CANNED_REPLIES = [
  {
    type: 'text',
    content: "Great question! Let me check our catalog for you. We have a wide range of products that might match what you're looking for.",
  },
  {
    type: 'text',
    content: "I found something that might interest you! Here's a product that matches your request perfectly.",
  },
  {
    type: 'text',
    content: "Sure! You can also browse our full catalog on the Shop page. Is there anything specific — brand, price range, or category — I can help narrow down?",
  },
  {
    type: 'text',
    content: "That's a popular item! It's currently in stock and available for both direct purchase and Easy Buy instalment plan. Would you like to proceed?",
  },
]

// ─── Mock conversation history ────────────────────────────────────────────────
// Simulates returning to a previous conversation — fully populated on load

const INITIAL_MESSAGES = [
  {
    id: 'm1',
    role: 'ai',
    type: 'text',
    content: "Hi Adaeze! 👋 Welcome back. How can I help you find what you're looking for today?",
    time: '10:02 AM',
  },
  {
    id: 'm2',
    role: 'customer',
    type: 'text',
    content: 'Do you have a Samsung fridge? Something around ₦200,000.',
    time: '10:03 AM',
  },
  {
    id: 'm3',
    role: 'ai',
    type: 'product',
    content: "Yes! Here's one that fits your budget perfectly:",
    product: {
      name: 'Samsung 350L Double Door Refrigerator',
      price: 198000,
      image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=120&h=120&fit=crop',
      href: '/product',
    },
    time: '10:03 AM',
  },
  {
    id: 'm4',
    role: 'ai',
    type: 'actions',
    content: 'Ready to get it? Choose how you want to proceed:',
    time: '10:03 AM',
  },
  {
    id: 'm5',
    role: 'customer',
    type: 'text',
    content: "I'll go with Easy Buy — I'd rather pay in instalments.",
    time: '10:05 AM',
  },
  {
    id: 'm6',
    role: 'ai',
    type: 'text',
    content: "Perfect choice! Easy Buy lets you spread the cost over 3–12 months with zero interest on select plans. I've linked you to the Easy Buy page for this product. You'll need to fill in a short application form.",
    time: '10:05 AM',
  },
  {
    id: 'm7',
    role: 'ai',
    type: 'link',
    content: 'Helpful resources:',
    links: [
      { label: 'Easy Buy FAQ', href: '/help-center' },
      { label: 'Returns & Refunds Policy', href: '/returns' },
    ],
    time: '10:06 AM',
  },
  {
    id: 'm8',
    role: 'customer',
    type: 'text',
    content: 'Thanks! One more thing — do you have Sony noise-cancelling headphones?',
    time: '10:08 AM',
  },
  {
    id: 'm9',
    role: 'ai',
    type: 'product',
    content: "Absolutely! This is one of our best-selling audio products:",
    product: {
      name: 'Sony WH-1000XM5 Wireless Headphones',
      price: 189000,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop',
      href: '/product',
    },
    time: '10:08 AM',
  },
  {
    id: 'm10',
    role: 'ai',
    type: 'actions',
    content: 'Would you like to purchase this?',
    time: '10:08 AM',
  },
  {
    id: 'm11',
    role: 'customer',
    type: 'text',
    content: "I'll think about it. But actually my last order arrived damaged — I'm not happy about it.",
    time: '10:12 AM',
  },
  {
    id: 'm12',
    role: 'ai',
    type: 'text',
    content: "I'm really sorry to hear that, Adaeze. That's not the experience we want for you. Let me connect you with a human agent who can resolve this right away.",
    time: '10:12 AM',
  },
  {
    id: 'm13',
    role: 'system',
    type: 'system',
    content: 'Connecting you to an admin, please hold on...',
    time: '10:12 AM',
  },
  {
    id: 'm14',
    role: 'system',
    type: 'system',
    content: 'An admin has joined the chat.',
    isJoined: true,
    time: '10:13 AM',
  },
  {
    id: 'm15',
    role: 'ai',
    type: 'text',
    content: "Hi Adaeze, this is Emeka from the support team. I can see your order ORD-28471. I'll raise a replacement request for you immediately — you'll receive a confirmation email within the hour.",
    isAdmin: true,
    time: '10:14 AM',
  },
]

// ─── Animation variants ───────────────────────────────────────────────────────
// One-time entrance only — no looping anywhere on this page

const msgVariantAI = {
  hidden: { opacity: 0, x: -18, y: 6 },
  show:   { opacity: 1, x: 0,   y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
}

const msgVariantCustomer = {
  hidden: { opacity: 0, x: 18, y: 6 },
  show:   { opacity: 1, x: 0,  y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
}

const msgVariantSystem = {
  hidden: { opacity: 0, scale: 0.94 },
  show:   { opacity: 1, scale: 1,   transition: { duration: 0.25, ease: 'easeOut' } },
}

// ─── AI Avatar ────────────────────────────────────────────────────────────────

function AIAvatar({ isAdmin }) {
  if (isAdmin) {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
        CE
      </div>
    )
  }
  return (
    <div
      className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-sm"
      style={{ boxShadow: '0 2px 8px rgba(246,139,30,0.3)' }}
    >
      <Bot className="w-4 h-4 text-white" />
    </div>
  )
}

// ─── Customer Avatar ──────────────────────────────────────────────────────────

function CustomerAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
      {CUSTOMER.initials}
    </div>
  )
}

// ─── Embedded Product Card (renders inside an AI bubble) ──────────────────────

function ProductCardBubble({ product }) {
  return (
    <Link href={product.href}>
      <div
        className="mt-2.5 flex items-center gap-3 bg-white rounded-xl border border-border-light p-3 hover:shadow-md transition-all group cursor-pointer"
        style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}
      >
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-bg-secondary flex-shrink-0 border border-border-light">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-text-primary line-clamp-2 leading-snug group-hover:text-brand-orange transition-colors">
            {product.name}
          </p>
          <p className="text-sm font-bold text-brand-orange mt-1">
            ₦{product.price.toLocaleString()}
          </p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-text-secondary flex-shrink-0 group-hover:text-brand-orange transition-colors" />
      </div>
    </Link>
  )
}

// ─── Action Chips (Interested in Purchase + Go for Easy Buy) ──────────────────

function ActionChips() {
  return (
    <div className="mt-2.5 flex flex-wrap gap-2">
      <Link href="/cart">
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-brand-orange text-white hover:bg-orange-600 transition-all"
          style={{ boxShadow: '0 4px 12px rgba(246,139,30,0.3)' }}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Interested in Purchase
        </button>
      </Link>
      <Link href="/easy-buy">
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-white border-2 border-brand-orange text-brand-orange hover:bg-orange-50 transition-all">
          <Zap className="w-3.5 h-3.5" />
          Go for Easy Buy
        </button>
      </Link>
    </div>
  )
}

// ─── Link Chips (general page links inside an AI bubble) ─────────────────────

function LinkChips({ links }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-2">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-50 text-brand-orange border border-orange-200 hover:bg-orange-100 transition-colors cursor-pointer">
            <ExternalLink className="w-3 h-3" />
            {link.label}
          </span>
        </Link>
      ))}
    </div>
  )
}

// ─── System Message Bubble ────────────────────────────────────────────────────

function SystemBubble({ message }) {
  const isJoined = message.isJoined
  return (
    <motion.div
      variants={msgVariantSystem}
      initial="hidden"
      animate="show"
      className="flex justify-center my-1"
    >
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border ${
          isJoined
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
            : 'bg-bg-secondary border-border-light text-text-secondary'
        }`}
      >
        {isJoined
          ? <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
          : <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
        }
        {message.content}
      </div>
    </motion.div>
  )
}

// ─── Message Bubble ───────────────────────────────────────────────────────────
// Handles: text, product, actions, link, system — for both AI and customer roles

function MessageBubble({ message }) {
  const isCustomer = message.role === 'customer'
  const isSystem   = message.role === 'system'
  const isAdmin    = message.isAdmin

  if (isSystem) {
    return <SystemBubble message={message} />
  }

  const variant = isCustomer ? msgVariantCustomer : msgVariantAI

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      animate="show"
      className={`flex items-end gap-2.5 ${isCustomer ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      {isCustomer ? <CustomerAvatar /> : <AIAvatar isAdmin={isAdmin} />}

      {/* Bubble content */}
      <div className={`max-w-[72%] sm:max-w-[60%] ${isCustomer ? 'items-end' : 'items-start'} flex flex-col`}>

        {/* Sender label */}
        <p className={`text-[10px] font-semibold mb-1 px-1 ${
          isCustomer ? 'text-right text-text-secondary' : 'text-left text-text-secondary'
        }`}>
          {isCustomer
            ? CUSTOMER.firstName
            : isAdmin
              ? 'Emeka · Support'
              : 'AI Assistant'
          }
        </p>

        {/* The bubble itself */}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isCustomer
              ? 'bg-brand-orange text-white rounded-br-sm'
              : isAdmin
                ? 'bg-violet-50 border border-violet-200 text-text-primary rounded-bl-sm'
                : 'bg-white border border-border-light text-text-primary rounded-bl-sm'
          }`}
          style={
            isCustomer
              ? { boxShadow: '0 2px 10px rgba(246,139,30,0.2)' }
              : { boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }
          }
        >
          {/* Text content — always shown */}
          {message.content && (
            <p>{message.content}</p>
          )}

          {/* Product card — only for type=product */}
          {message.type === 'product' && message.product && (
            <ProductCardBubble product={message.product} />
          )}

          {/* Action chips — only for type=actions */}
          {message.type === 'actions' && (
            <ActionChips />
          )}

          {/* Link chips — only for type=link */}
          {message.type === 'link' && message.links && (
            <LinkChips links={message.links} />
          )}
        </div>

        {/* Timestamp */}
        <p className={`text-[10px] text-text-secondary mt-1 px-1 ${isCustomer ? 'text-right' : 'text-left'}`}>
          {message.time}
        </p>
      </div>
    </motion.div>
  )
}

// ─── "Handled by AI" section divider ─────────────────────────────────────────
// Visually separates the AI-handled portion from the human-handled portion

function AIHandledDivider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-border-light" />
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200">
        <Sparkles className="w-3 h-3 text-brand-orange" />
        <span className="text-[10px] font-semibold text-brand-orange uppercase tracking-wide">
          Handled by AI
        </span>
      </div>
      <div className="flex-1 h-px bg-border-light" />
    </div>
  )
}

// ─── Typing indicator (three animated dots) ───────────────────────────────────

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.2 }}
      className="flex items-end gap-2.5"
    >
      <AIAvatar />
      <div
        className="bg-white border border-border-light rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1"
        style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-text-secondary"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────
// Simplified: logo + "Back to Shop" link only — no full Navbar

function ChatTopBar() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border-light backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Marketplace
          </span>
        </Link>

        {/* Back to Shop */}
        <Link
          href="/search"
          className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-brand-orange transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>
    </header>
  )
}

// ─── Chat Header (below top bar, above message thread) ───────────────────────

function ChatHeader() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 pb-4">
      <div
        className="bg-white rounded-2xl border border-border-light px-5 py-4 flex items-center gap-4"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      >
        {/* AI badge */}
        <div
          className="relative w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center flex-shrink-0"
          style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.3)' }}
        >
          <Bot className="w-6 h-6 text-white" />
          {/* Online dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-text-primary">Chat with our AI</h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Ask about products, orders, Easy Buy, or anything store-related
          </p>
        </div>

        {/* Status pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold text-emerald-700">Online</span>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [messages,    setMessages]    = useState(INITIAL_MESSAGES)
  const [inputValue,  setInputValue]  = useState('')
  const [isTyping,    setIsTyping]    = useState(false)
  const [cannedIndex, setCannedIndex] = useState(0)
  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)

  // Auto-scroll to bottom whenever messages change or typing indicator appears
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // ── Send a message ──────────────────────────────────────────────────────────
  const handleSend = () => {
    const text = inputValue.trim()
    if (!text) return

    const now = new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })

    // 1. Append customer message immediately
    const customerMsg = {
      id: `m${Date.now()}`,
      role: 'customer',
      type: 'text',
      content: text,
      time: now,
    }
    setMessages((prev) => [...prev, customerMsg])
    setInputValue('')
    setIsTyping(true)

    // 2. After a short delay, append a canned AI reply
    setTimeout(() => {
      const reply = CANNED_REPLIES[cannedIndex % CANNED_REPLIES.length]
      const aiMsg = {
        id: `m${Date.now() + 1}`,
        role: 'ai',
        type: reply.type,
        content: reply.content,
        time: new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiMsg])
      setCannedIndex((i) => i + 1)
      setIsTyping(false)
    }, 1400)
  }

  // ── Handle Enter key (Shift+Enter = newline, Enter alone = send) ────────────
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // ── Escalate to human ───────────────────────────────────────────────────────
  const handleEscalate = () => {
    const now = new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
    setMessages((prev) => [
      ...prev,
      {
        id: `m${Date.now()}`,
        role: 'system',
        type: 'system',
        content: 'Connecting you to an admin, please hold on...',
        time: now,
      },
    ])
    setTimeout(() => {
      const now2 = new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
      setMessages((prev) => [
        ...prev,
        {
          id: `m${Date.now() + 1}`,
          role: 'system',
          type: 'system',
          content: 'An admin has joined the chat.',
          isJoined: true,
          time: now2,
        },
      ])
    }, 2200)
  }

  // ── Find the index where the human handoff begins (first system message) ────
  const handoffIndex = messages.findIndex((m) => m.role === 'system')

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col">

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <ChatTopBar />

      {/* ── Chat header ─────────────────────────────────────────────────────── */}
      <ChatHeader />

      {/* ── Message thread ──────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 pb-4">

          {/* Scrollable message list */}
          <div className="space-y-4">
            {messages.map((msg, index) => {
              // Insert the "Handled by AI" divider just before the first system message
              const showDivider = handoffIndex !== -1 && index === handoffIndex
              return (
                <div key={msg.id}>
                  {showDivider && <AIHandledDivider />}
                  <MessageBubble message={msg} />
                </div>
              )
            })}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && <TypingIndicator key="typing" />}
            </AnimatePresence>

            {/* Invisible anchor for auto-scroll */}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      {/* ── Input area ──────────────────────────────────────────────────────── */}
      <div className="sticky bottom-0 bg-white border-t border-border-light">
        <div className="max-w-4xl mx-auto px-4 py-3">

          {/* "Talk to a human" link — above the input */}
          <div className="flex justify-center mb-2.5">
            <button
              onClick={handleEscalate}
              className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-brand-orange transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              Talk to a human / Lodge a complaint
            </button>
          </div>

          {/* Input row */}
          <div className="flex items-end gap-3">
            {/* Customer avatar */}
            <div className="flex-shrink-0 mb-0.5">
              <CustomerAvatar />
            </div>

            {/* Textarea with search-glow */}
            <div className="flex-1 search-glow rounded-2xl border border-border-light bg-bg-secondary overflow-hidden">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about a product, order, or anything store-related..."
                rows={1}
                className="resize-none border-0 bg-transparent px-4 py-3 text-sm text-text-primary placeholder-text-secondary outline-none w-full min-h-[44px] max-h-32 leading-relaxed"
              />
            </div>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="flex-shrink-0 w-11 h-11 rounded-full bg-brand-orange hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all"
              style={{ boxShadow: inputValue.trim() ? '0 4px 14px rgba(246,139,30,0.35)' : 'none' }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Hint text */}
          <p className="text-center text-[10px] text-text-secondary mt-2">
            Press <kbd className="px-1 py-0.5 rounded bg-bg-secondary border border-border-light font-mono text-[10px]">Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded bg-bg-secondary border border-border-light font-mono text-[10px]">Shift+Enter</kbd> for new line
          </p>
        </div>
      </div>

    </div>
  )
}
