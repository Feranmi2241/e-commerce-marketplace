import { motion } from 'framer-motion'
import { ShoppingBag, CreditCard, Calendar, ArrowRight } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: ShoppingBag,
      title: 'Choose Your Product',
      description: 'Browse and select from our wide range of eligible products',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: CreditCard,
      title: 'Pay Down Payment',
      description: 'Pay a small down payment starting from 30% of the price',
      color: 'bg-green-50',
      iconColor: 'text-success',
    },
    {
      icon: Calendar,
      title: 'Spread Over Months',
      description: 'Complete the balance in flexible 3, 6, 9, or 12-month terms',
      color: 'bg-orange-50',
      iconColor: 'text-brand-orange',
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div>
      <div className="text-center mb-12">
        <motion.p
          className="text-text-secondary text-sm uppercase tracking-widest mb-2 transition-colors duration-200 hover:text-brand-orange cursor-default"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          HOW IT WORKS
        </motion.p>
        <motion.h2
          className="text-3xl font-bold text-text-primary transition-colors duration-200 hover:text-brand-orange cursor-default"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        >
          Get Started in 3 Easy Steps
        </motion.h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center justify-between gap-8"
      >
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div key={index} variants={item} className="flex-1 relative">
              <div className={`${step.color} rounded-2xl p-8 text-center`}>
                <div className={`w-16 h-16 rounded-full ${step.color} border-4 border-white shadow-md mx-auto mb-6 flex items-center justify-center bg-white`}>
                  <Icon className={`w-8 h-8 ${step.iconColor}`} />
                </div>
                <motion.h3
                  className="text-xl font-bold text-text-primary mb-2 transition-colors duration-200 hover:text-brand-orange cursor-default"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: index * 0.2 }}
                >{step.title}</motion.h3>
                <motion.p
                  className="text-text-secondary transition-colors duration-200 hover:text-text-primary"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: index * 0.2 + 0.3 }}
                >{step.description}</motion.p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/3 -right-6 transform translate-x-2">
                  <ArrowRight className="w-6 h-6 text-border-light" />
                </div>
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
