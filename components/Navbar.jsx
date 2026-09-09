import { Search, ShoppingCart, Menu, User, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const router = useRouter()
  const { cartItems } = useCart()
  const cartCount = cartItems.length
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-border-light backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 md:gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Marketplace
          </div>
        </Link>

        {/* Center: Search Bar with Glow */}
        <div className="flex-1 min-w-0 max-w-none md:max-w-md">
          <div className="search-glow rounded-full px-3 md:px-4 py-2 bg-bg-secondary border border-border-light">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none flex-1 min-w-0 text-sm text-text-primary placeholder-text-secondary"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Nav Links & Auth */}
        <div className="flex items-center gap-2 md:gap-6 min-w-0">
          {!isLoggedIn ? (
            <>
              <div className="hidden md:flex gap-6 text-sm">
                <Link href="/shop" className="text-text-primary hover:text-brand-orange transition">
                  Shop
                </Link>
                <Link href="/shop?view=categories" className="text-text-primary hover:text-brand-orange transition">
                  Categories
                </Link>
                <Link href="/shop" className="text-text-primary hover:text-brand-orange transition">
                  Deals
                </Link>
                <Link href="/easy-buy" className="text-text-primary hover:text-brand-orange transition">
                  Easy Buy
                </Link>
              </div>
              <Link href="/sign-in" className="no-underline">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-brand-orange hover:text-brand-orange hover:bg-orange-50"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up" className="no-underline">
                <Button
                  size="sm"
                  className="bg-brand-orange hover:bg-orange-600 text-white"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className="hidden md:flex gap-6 text-sm">
                <Link href="/shop" className="text-text-primary hover:text-brand-orange transition">
                  Shop
                </Link>
                <Link href="/shop?view=categories" className="text-text-primary hover:text-brand-orange transition">
                  Categories
                </Link>
                <Link href="/shop" className="text-text-primary hover:text-brand-orange transition">
                  Deals
                </Link>
                <Link href="/easy-buy" className="text-text-primary hover:text-brand-orange transition">
                  Easy Buy
                </Link>
              </div>
              {/* Cart Icon */}
              <Link href="/cart" className="no-underline">
                <div className="relative">
                  <button className="p-2 hover:bg-bg-secondary rounded-full transition">
                    <ShoppingCart className="w-5 h-5 text-text-primary" />
                  </button>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* User Dropdown Menu */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2 hover:bg-bg-secondary rounded-full transition flex items-center gap-1"
                >
                  <User className="w-5 h-5 text-text-primary" />
                  <ChevronDown className="w-4 h-4 text-text-secondary" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-border-light rounded-lg shadow-lg py-2 z-50">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary transition no-underline"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Dashboard
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary transition no-underline"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary transition no-underline"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Wishlist
                    </Link>
                    <Link
                      href="/notifications"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary transition no-underline"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Notifications
                    </Link>
                    <Link
                      href="/account/payment-methods"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary transition no-underline"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Payment Methods
                    </Link>
                    <Link
                      href="/account/settings"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary transition no-underline"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Account Settings
                    </Link>
                    <Link
                      href="/returns"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary transition no-underline"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Returns/Refunds
                    </Link>

                    <div className="border-t border-border-light my-2"></div>

                    <button
                      onClick={() => {
                        setIsLoggedIn(false)
                        setUserMenuOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary transition"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile Menu */}
          <button className="md:hidden p-2 hover:bg-bg-secondary rounded-full transition">
            <Menu className="w-5 h-5 text-text-primary" />
          </button>
        </div>
      </div>
    </nav>
  )
}
