import { CreditCard, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function EasyBuyBanner() {
  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-brand-orange rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-brand-orange text-white p-4 rounded-full">
              <CreditCard className="w-8 h-8" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Easy Buy – Pay in Installments
          </h2>

          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Shop now, pay later with Easy Buy. Break down your purchase into 3 equal installments with
            <span className="font-bold text-brand-orange"> 0% interest</span>. No credit card required.
          </p>

          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8">
            {[
              { value: '3×', label: 'Equal Payments' },
              { value: '0%', label: 'Interest Rate' },
              { value: '⚡', label: 'Instant Approval' },
            ].map(({ value, label }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1, ease: 'easeOut' }}
              >
                <p className="text-2xl font-bold text-brand-orange">{value}</p>
                <motion.p
                  className="text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary cursor-default"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ opacity: [1, 0.6, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, delay: idx * 0.1 + 0.15, ease: 'easeInOut', repeat: Infinity }}
                >
                  {label}
                </motion.p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/easy-buy" className="no-underline">
              <Button className="bg-brand-orange hover:bg-orange-600 text-white font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Explore Easy Buy Deals
              </Button>
            </Link>
            <Link href="/easy-buy" className="no-underline">
              <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-orange-50">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
