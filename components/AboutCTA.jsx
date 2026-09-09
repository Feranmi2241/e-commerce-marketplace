import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutCTA({ isLoggedIn }) {
  return (
    <motion.section
      className="bg-gradient-to-r from-brand-orange to-brand-orange/80 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 transition-colors duration-200 hover:text-white/80 cursor-default">
            Ready to Start Shopping?
          </h2>
          
          <p className="text-lg text-white/90 mb-10 leading-relaxed transition-colors duration-200 hover:text-white">
            Join thousands of satisfied customers enjoying premium products, fast delivery, and secure transactions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button
                size="lg"
                className="bg-white text-brand-orange hover:bg-white/90 font-semibold"
              >
                Start Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            
            {!isLoggedIn && (
              <Link href="/sign-in">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
