import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <section className="bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight transition-colors duration-200 hover:text-brand-orange cursor-default"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
          >
            Connecting Nigerians to Quality Products
          </motion.h1>

          <motion.p
            className="text-xl text-text-secondary leading-relaxed transition-colors duration-200 hover:text-text-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.3 }}
          >
            Our mission is to make shopping convenient, affordable, and trustworthy for every Nigerian.
            We believe everyone deserves access to premium products at fair prices, delivered with excellence.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
