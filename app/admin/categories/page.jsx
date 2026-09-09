'use client'

import { useState } from 'react'
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
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  ImagePlus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

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
  { label: 'Categories', icon: Tag,             href: '/admin/categories', active: true },
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


// ─── Mock Categories ──────────────────────────────────────────────────────────

const MOCK_CATEGORIES = [
  {
    id: 'cat-001',
    name: 'Phones & Tablets',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=48&h=48&fit=crop',
    visible: true,
    subcategories: [
      { id: 'sub-001a', name: 'Smartphones',    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-001b', name: 'Tablets',        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-001c', name: 'Phone Accessories', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=48&h=48&fit=crop', visible: false },
    ],
  },
  {
    id: 'cat-002',
    name: 'Computing',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=48&h=48&fit=crop',
    visible: true,
    subcategories: [
      { id: 'sub-002a', name: 'Laptops',        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-002b', name: 'Desktops',       image: 'https://images.unsplash.com/photo-1593640408182-31c228b29976?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-002c', name: 'Monitors',       image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-002d', name: 'Printers',       image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=48&h=48&fit=crop', visible: false },
    ],
  },
  {
    id: 'cat-003',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=48&h=48&fit=crop',
    visible: true,
    subcategories: [
      { id: 'sub-003a', name: 'TVs & Displays', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-003b', name: 'Cameras',        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-003c', name: 'Audio',          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=48&h=48&fit=crop', visible: true },
    ],
  },
  {
    id: 'cat-004',
    name: 'Home Appliances',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=48&h=48&fit=crop',
    visible: true,
    subcategories: [
      { id: 'sub-004a', name: 'Refrigerators',  image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-004b', name: 'Washing Machines', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-004c', name: 'Air Conditioners', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=48&h=48&fit=crop', visible: false },
      { id: 'sub-004d', name: 'Vacuum Cleaners', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=48&h=48&fit=crop', visible: true },
    ],
  },
  {
    id: 'cat-005',
    name: 'Cosmetics & Beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=48&h=48&fit=crop',
    visible: true,
    subcategories: [
      { id: 'sub-005a', name: 'Skincare',       image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-005b', name: 'Makeup',         image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-005c', name: 'Hair Care',      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=48&h=48&fit=crop', visible: true },
    ],
  },
  {
    id: 'cat-006',
    name: 'Perfumes',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=48&h=48&fit=crop',
    visible: true,
    subcategories: [
      { id: 'sub-006a', name: "Men's Fragrances",   image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-006b', name: "Women's Fragrances", image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=48&h=48&fit=crop', visible: true },
    ],
  },
  {
    id: 'cat-007',
    name: 'Power & Accessories',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=48&h=48&fit=crop',
    visible: true,
    subcategories: [
      { id: 'sub-007a', name: 'Power Banks',    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-007b', name: 'Chargers',       image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=48&h=48&fit=crop', visible: true },
      { id: 'sub-007c', name: 'Cables',         image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=48&h=48&fit=crop', visible: false },
    ],
  },
  {
    id: 'cat-008',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=48&h=48&fit=crop',
    visible: false,
    subcategories: [
      { id: 'sub-008a', name: "Men's Clothing",  image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=48&h=48&fit=crop', visible: false },
      { id: 'sub-008b', name: "Women's Clothing", image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=48&h=48&fit=crop', visible: false },
      { id: 'sub-008c', name: 'Footwear',        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=48&h=48&fit=crop', visible: false },
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
            placeholder="Search categories..."
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


// ─── Add Category Dialog ──────────────────────────────────────────────────────

function AddCategoryDialog({ open, onClose, categories }) {
  const [name, setName]           = useState('')
  const [parent, setParent]       = useState('')
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleIcon = (e) => {
    const file = e.target.files[0]
    if (file) setPreviewUrl(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border-light">
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-0.5">
            New Category
          </p>
          <DialogTitle className="text-lg font-bold text-text-primary">
            Add Category
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Phones & Tablets"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition"
            />
          </div>

          {/* Parent Category */}
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
              Parent Category
            </label>
            <select
              value={parent}
              onChange={(e) => setParent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/10 transition appearance-none cursor-pointer"
            >
              <option value="">None (Top-level category)</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Icon Upload */}
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5">
              Category Icon / Image
            </label>
            <div className="flex items-center gap-4">
              {previewUrl ? (
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-border-light bg-bg-secondary flex-shrink-0">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-xl border-2 border-dashed border-border-light bg-bg-secondary flex items-center justify-center flex-shrink-0">
                  <ImagePlus className="w-5 h-5 text-text-secondary" />
                </div>
              )}
              <label className="flex-1 cursor-pointer">
                <div className="px-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-text-secondary hover:border-brand-orange hover:text-brand-orange transition text-center font-medium">
                  {previewUrl ? 'Change Image' : 'Upload Image'}
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleIcon} />
              </label>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-border-light text-sm font-semibold text-text-secondary hover:bg-bg-secondary transition"
            >
              Cancel
            </button>
            <Button
              type="submit"
              className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-6 h-10 rounded-xl gap-2"
              style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
            >
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


// ─── Category Row ─────────────────────────────────────────────────────────────

function CategoryRow({ category, onToggleVisible, onToggleSubVisible, onDelete, onDeleteSub }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border-light last:border-b-0">
      <div className="flex items-center gap-3 px-4 py-3 hover:bg-bg-secondary/60 transition-colors group">

        {/* Drag handle */}
        <GripVertical className="w-4 h-4 text-text-secondary opacity-40 group-hover:opacity-100 cursor-grab flex-shrink-0" />

        {/* Expand toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="p-1 rounded-lg hover:bg-orange-50 transition flex-shrink-0 cursor-pointer"
          title={open ? 'Collapse category' : 'Expand category'}
        >
          {open
            ? <ChevronUp className="w-4 h-4 text-brand-orange" />
            : <ChevronDown className="w-4 h-4 text-text-secondary" />
          }
        </button>

        {/* Thumbnail */}
        <div className="w-10 h-10 rounded-xl overflow-hidden border border-border-light bg-bg-secondary flex-shrink-0">
          <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
        </div>

        {/* Name + subcategory count */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-primary truncate">{category.name}</p>
          <p className="text-xs text-text-secondary mt-0.5">
            {category.subcategories.length} subcategor{category.subcategories.length === 1 ? 'y' : 'ies'}
          </p>
        </div>

        {/* Visibility switch */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-text-secondary hidden sm:block">
            {category.visible ? 'Visible' : 'Hidden'}
          </span>
          <Switch
            checked={category.visible}
            onCheckedChange={() => onToggleVisible(category.id)}
            className="data-[state=checked]:bg-brand-orange"
          />
        </div>

        {/* Edit / Delete */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button className="p-2 rounded-lg text-text-secondary hover:text-brand-orange hover:bg-orange-50 transition" title="Edit">
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-2 rounded-lg text-text-secondary hover:text-red-500 hover:bg-red-50 transition"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subcategory rows */}
      {open && (
        <div className="border-t border-border-light bg-bg-secondary/40">
          {category.subcategories.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center gap-3 pl-14 pr-4 py-2.5 hover:bg-bg-secondary transition-colors group border-b border-border-light last:border-b-0"
            >
              {/* Drag handle */}
              <GripVertical className="w-3.5 h-3.5 text-text-secondary opacity-30 group-hover:opacity-80 cursor-grab flex-shrink-0" />

              {/* Thumbnail */}
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-border-light bg-white flex-shrink-0">
                <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" />
              </div>

              {/* Name */}
              <p className="flex-1 text-sm text-text-primary truncate">{sub.name}</p>

              {/* Visibility switch */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-text-secondary hidden sm:block">
                  {sub.visible ? 'Visible' : 'Hidden'}
                </span>
                <Switch
                  checked={sub.visible}
                  onCheckedChange={() => onToggleSubVisible(category.id, sub.id)}
                  className="data-[state=checked]:bg-brand-orange"
                />
              </div>

              {/* Edit / Delete */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button className="p-1.5 rounded-lg text-text-secondary hover:text-brand-orange hover:bg-orange-50 transition" title="Edit">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteSub(category.id, sub.id)}
                  className="p-1.5 rounded-lg text-text-secondary hover:text-red-500 hover:bg-red-50 transition"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminCategoriesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false)
  const [dialogOpen,       setDialogOpen]       = useState(false)
  const [categories,       setCategories]       = useState(MOCK_CATEGORIES)

  const toggleVisible = (catId) =>
    setCategories((prev) =>
      prev.map((c) => c.id === catId ? { ...c, visible: !c.visible } : c)
    )

  const toggleSubVisible = (catId, subId) =>
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? { ...c, subcategories: c.subcategories.map((s) => s.id === subId ? { ...s, visible: !s.visible } : s) }
          : c
      )
    )

  const deleteCategory = (catId) =>
    setCategories((prev) => prev.filter((c) => c.id !== catId))

  const deleteSubcategory = (catId, subId) =>
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? { ...c, subcategories: c.subcategories.filter((s) => s.id !== subId) }
          : c
      )
    )

  const totalSubs = categories.reduce((acc, c) => acc + c.subcategories.length, 0)
  const visibleCount = categories.filter((c) => c.visible).length

  return (
    <div className="min-h-screen bg-bg-secondary flex">

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
                Catalogue
              </p>
              <h1 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                Manage Categories
                <span className="text-base font-semibold bg-orange-100 text-brand-orange px-3 py-0.5 rounded-full">
                  {categories.length} categories
                </span>
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Organise your product catalogue with parent categories and subcategories.
              </p>
            </div>

            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-brand-orange hover:bg-orange-600 text-white font-semibold h-10 px-5 rounded-xl gap-2 flex-shrink-0"
              style={{ boxShadow: '0 4px 16px rgba(246,139,30,0.25)' }}
            >
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {[
              { label: 'Total Categories', value: categories.length,  color: 'text-brand-orange', bg: 'bg-orange-50',   accent: 'bg-brand-orange' },
              { label: 'Subcategories',    value: totalSubs,           color: 'text-violet-600',   bg: 'bg-violet-50',   accent: 'bg-violet-500' },
              { label: 'Visible',          value: visibleCount,        color: 'text-emerald-600',  bg: 'bg-emerald-50',  accent: 'bg-emerald-500' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeCard}
                className="bg-white rounded-2xl border border-border-light p-5"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
                <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <div className={`mt-4 h-1 rounded-full ${stat.accent} opacity-30`} />
              </motion.div>
            ))}
          </motion.div>

          {/* Categories list */}
          <motion.div
            variants={fadeCard}
            initial="hidden"
            animate="show"
            className="bg-white rounded-2xl border border-border-light overflow-hidden"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            {/* List header */}
            <div className="px-4 py-3 border-b border-border-light bg-bg-secondary flex items-center gap-3">
              <div className="w-4" /> {/* drag handle space */}
              <div className="w-6" /> {/* expand toggle space */}
              <div className="w-10 text-xs font-semibold text-text-secondary uppercase tracking-wider">Icon</div>
              <div className="flex-1 text-xs font-semibold text-text-secondary uppercase tracking-wider">Name</div>
              <div className="w-28 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden sm:block">Visibility</div>
              <div className="w-20 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Actions</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border-light">
              {categories.length === 0 ? (
                <div className="py-16 flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
                    <Tag className="w-7 h-7 text-brand-orange" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold text-text-primary">No categories yet</p>
                  <p className="text-xs text-text-secondary">Click "Add Category" to get started</p>
                </div>
              ) : (
                categories.map((cat) => (
                  <CategoryRow
                    key={cat.id}
                    category={cat}
                    onToggleVisible={toggleVisible}
                    onToggleSubVisible={toggleSubVisible}
                    onDelete={deleteCategory}
                    onDeleteSub={deleteSubcategory}
                  />
                ))
              )}
            </div>
          </motion.div>

          <div className="h-4" />
        </main>
      </div>

      {/* Add Category Dialog */}
      <AddCategoryDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        categories={categories}
      />

    </div>
  )
}
