import { Smartphone, Zap, Laptop, Home, Sparkles, Droplet, Shirt, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const categories = [
  { id: 1, name: 'Phones & Tablets', slug: 'phones-tablets', icon: Smartphone, color: 'from-blue-100 to-cyan-100' },
  { id: 2, name: 'Electronics', slug: 'electronics', icon: Zap, color: 'from-yellow-100 to-amber-100' },
  { id: 3, name: 'Computing', slug: 'computing', icon: Laptop, color: 'from-purple-100 to-pink-100' },
  { id: 4, name: 'Home Appliances', slug: 'home-appliances', icon: Home, color: 'from-orange-100 to-red-100' },
  { id: 5, name: 'Cosmetics & Beauty', slug: 'cosmetics-beauty', icon: Sparkles, color: 'from-pink-100 to-rose-100' },
  { id: 6, name: 'Perfumes', slug: 'perfumes', icon: Droplet, color: 'from-violet-100 to-purple-100' },
  { id: 7, name: 'Fashion', slug: 'fashion', icon: Shirt, color: 'from-green-100 to-emerald-100' },
  { id: 8, name: 'Trending Now', slug: 'trending-now', icon: TrendingUp, color: 'from-indigo-100 to-blue-100' },
]

export default function CategoryGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">
            Shop by
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Browse Categories
          </h2>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category, idx) => {
            const Icon = category.icon
            return (
              <Link key={category.id} href={`/category/${category.slug}`} className="no-underline">
                <motion.button
                  variants={itemVariants}
                  className={`bg-gradient-to-br ${category.color} p-6 rounded-xl hover:shadow-md transition-all group cursor-pointer w-full`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <Icon className="w-8 h-8 text-text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold text-text-primary text-center group-hover:text-brand-orange transition">
                      {category.name}
                    </span>
                  </div>
                </motion.button>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
