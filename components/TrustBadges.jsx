import { Shield, Truck, RotateCcw, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const badges = [
  {
    id: 1,
    icon: Shield,
    title: '100% Secure',
    description: 'Your payments are encrypted and protected',
  },
  {
    id: 2,
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your order within 2-5 business days',
  },
  {
    id: 3,
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy',
  },
  {
    id: 4,
    icon: MessageCircle,
    title: '24/7 Support',
    description: 'Chat with our support team anytime',
  },
]

export default function TrustBadges() {
  return (
    <section className="bg-bg-secondary py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {badges.map((badge, idx) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="bg-brand-orange/10 p-3 rounded-full">
                    <Icon className="w-6 h-6 text-brand-orange" />
                  </div>
                </div>
                <motion.h3
                  className="font-semibold text-text-primary text-sm mb-1 cursor-default transition-colors duration-200 hover:text-brand-orange"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ opacity: [1, 0.6, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.15, duration: 3, ease: 'easeInOut', repeat: Infinity }}
                >
                  {badge.title}
                </motion.h3>
                <motion.p
                  className="text-xs text-text-secondary transition-colors duration-200 hover:text-text-primary"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ opacity: [1, 0.6, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.25, duration: 3, ease: 'easeInOut', repeat: Infinity }}
                >
                  {badge.description}
                </motion.p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
