import { Truck, Shield, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'

const items = [
  {
    Icon: Truck,
    iconClass: 'text-brand-orange',
    title: 'Free Delivery',
    desc: 'On orders over ₦50,000 within Lagos. Express delivery available.',
  },
  {
    Icon: Shield,
    iconClass: 'text-green-600',
    title: 'Secure Payment',
    desc: '100% secure transactions with encrypted payments.',
  },
  {
    Icon: RotateCcw,
    iconClass: 'text-blue-600',
    title: 'Easy Returns',
    desc: '30-day money-back guarantee. No questions asked.',
  },
]

export default function DeliveryInfo() {
  return (
    <div className="bg-bg-secondary border-t border-b border-border-light py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map(({ Icon, iconClass, title, desc }, idx) => (
            <motion.div
              key={title}
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: 'easeOut' }}
            >
              <Icon className={`w-8 h-8 ${iconClass} flex-shrink-0 mt-1`} />
              <div>
                <motion.h3
                  className="font-bold text-text-primary mb-1 cursor-default transition-colors duration-200 hover:text-brand-orange"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ opacity: [1, 0.6, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, delay: idx * 0.1 + 0.15, ease: 'easeInOut', repeat: Infinity }}
                >
                  {title}
                </motion.h3>
                <motion.p
                  className="text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ opacity: [1, 0.6, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, delay: idx * 0.1 + 0.25, ease: 'easeInOut', repeat: Infinity }}
                >
                  {desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
