import { motion } from 'framer-motion'
import { CheckCircle, Zap, Lock, RotateCcw } from 'lucide-react'

export default function WhyChooseUs() {
  const values = [
    {
      icon: CheckCircle,
      title: 'Verified Products',
      description: 'Every product is authenticated and quality-checked before reaching you. We partner with trusted brands only.',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Same-day or next-day delivery in major cities. Real-time tracking so you always know where your order is.',
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      description: 'Encrypted transactions and multiple payment options. Your financial information is always protected.',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day return window on most items. Hassle-free refunds if you change your mind or receive a faulty product.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section className="bg-bg-secondary py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase letter-spacing tracking-wider text-text-secondary font-semibold mb-2">
            Why Choose Us
          </p>
          <h2 className="text-4xl font-bold text-text-primary">
            Built for Your Trust
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand-orange" />
                  </div>
                </div>
                
                <motion.h3
                  className="text-lg font-bold text-text-primary mb-2 transition-colors duration-200 hover:text-brand-orange cursor-default"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: index * 0.2 }}
                >
                  {value.title}
                </motion.h3>
                
                <motion.p
                  className="text-text-secondary text-sm leading-relaxed transition-colors duration-200 hover:text-text-primary"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: index * 0.2 + 0.3 }}
                >
                  {value.description}
                </motion.p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
