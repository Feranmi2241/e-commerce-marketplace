import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function EasyBuyHero() {
  const benefits = [
    'Instant Approval',
    'Flexible Terms',
    'Easy Eligibility',
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative py-20 bg-gradient-to-br from-brand-orange/10 via-white to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.h1
              className="text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight transition-colors duration-200 hover:text-brand-orange cursor-default"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
            >
              Get it now,{' '}
              <span className="text-brand-orange">pay small small</span>
            </motion.h1>
            <motion.p
              className="text-lg text-text-secondary mb-8 transition-colors duration-200 hover:text-text-primary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.3 }}
            >
              Buy your favorite electronics and appliances today with zero stress. Pay a small down payment and spread the rest over manageable monthly installments.
            </motion.p>

            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <motion.span
                    key={idx}
                    className="text-text-primary font-medium transition-colors duration-200 hover:text-brand-orange cursor-default"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: idx * 0.2 }}
                  >
                    {benefit}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border-light">
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-brand-orange/5 to-brand-orange/10 rounded-xl">
                  <p className="text-text-secondary text-sm">Example: ₦250,000 Phone</p>
                  <p className="text-3xl font-bold text-text-primary mt-2">₦75,000</p>
                  <p className="text-text-secondary text-sm mt-2">Down payment (30%)</p>
                </div>
                <div className="border-t border-border-light pt-6">
                  <p className="text-text-secondary text-sm mb-3">Then pay monthly:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-bg-secondary rounded-lg">
                      <p className="text-xs text-text-secondary">6 months</p>
                      <p className="font-bold text-text-primary">₦30,625</p>
                    </div>
                    <div className="p-3 bg-bg-secondary rounded-lg">
                      <p className="text-xs text-text-secondary">12 months</p>
                      <p className="font-bold text-text-primary">₦15,885</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
