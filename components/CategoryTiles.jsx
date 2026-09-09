import { Package, CreditCard, Zap, Truck, RotateCcw, User } from 'lucide-react'
import { motion } from 'framer-motion'

const iconMap = {
  Package: Package,
  CreditCard: CreditCard,
  Zap: Zap,
  Truck: Truck,
  RotateCcw: RotateCcw,
  User: User,
}

export default function CategoryTiles({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full py-12 px-4 bg-bg-secondary"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon]
            const isSelected = selectedCategory === category.id

            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                className={`p-4 rounded-lg transition-all duration-300 flex flex-col items-center gap-2 ${
                  isSelected
                    ? 'bg-white border-2 border-brand-orange shadow-md'
                    : 'bg-white border border-border-light hover:border-brand-orange hover:shadow-sm'
                }`}
              >
                <IconComponent className={`w-6 h-6 ${isSelected ? 'text-brand-orange' : 'text-text-primary'}`} />
                <span className={`text-sm font-medium text-center ${isSelected ? 'text-brand-orange' : 'text-text-primary'}`}>
                  {category.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
