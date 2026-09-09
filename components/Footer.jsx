import { Share2, Send, Heart, MessageSquare, Mail, Home } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const paymentIcons = [
  { name: 'Visa', icon: '💳' },
  { name: 'Mastercard', icon: '💳' },
  { name: 'PayPal', icon: '🅿️' },
  { name: 'Apple Pay', icon: '🍎' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer className="bg-text-primary text-white">
      {/* Newsletter Section */}
      <div className="bg-brand-orange py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-sm opacity-90 mb-4">
              Get exclusive deals and latest updates delivered to your inbox
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg text-text-primary outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button className="px-6 py-2 bg-white text-brand-orange font-semibold rounded-lg hover:bg-gray-100 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* About */}
          <div>
            <h4 className="font-bold text-lg mb-4">Marketplace</h4>
            <p className="text-sm opacity-75 mb-4">Your one-stop shop for premium consumer goods and electronics.</p>
            <div className="flex gap-3">
              <button className="p-2 hover:bg-white/10 rounded transition">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded transition">
                <Send className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded transition">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded transition">
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded transition">
                <Mail className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded transition">
                <Home className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  Trending Now
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  Flash Deals
                </Link>
              </li>
              <li>
                <Link href="/easy-buy" className="hover:text-white transition">
                  Easy Buy
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <Link href="/category/electronics" className="hover:text-white transition">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/category/computing" className="hover:text-white transition">
                  Computing
                </Link>
              </li>
              <li>
                <Link href="/category/home-appliances" className="hover:text-white transition">
                  Home Appliances
                </Link>
              </li>
              <li>
                <Link href="/category/cosmetics-beauty" className="hover:text-white transition">
                  Cosmetics & Beauty
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 mb-8">
          {/* Payment Methods */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-4">We Accept</p>
            <div className="flex flex-wrap gap-3">
              {paymentIcons.map((method) => (
                <div key={method.name} className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded">
                  <span className="text-xl">{method.icon}</span>
                  <span className="text-sm">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-75">
          <p>&copy; 2026 Marketplace. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white transition">
              Sitemap
            </Link>
            <Link href="/faq" className="hover:text-white transition">
              Accessibility
            </Link>
            <Link href="/about" className="hover:text-white transition">
              Community
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
