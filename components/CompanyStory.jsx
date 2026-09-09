import { motion } from 'framer-motion'

export default function CompanyStory() {
  return (
    <section className="bg-bg-secondary py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div>
                <motion.p
                  className="text-sm uppercase letter-spacing tracking-wider text-text-secondary font-semibold mb-2 transition-colors duration-200 hover:text-brand-orange cursor-default"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ opacity: [1, 0.6, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
                >
                  Our Story
                </motion.p>
                <motion.h2
                  className="text-4xl font-bold text-text-primary mb-4 transition-colors duration-200 hover:text-brand-orange cursor-default"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  animate={{ opacity: [1, 0.6, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.2 }}
                >
                  From Vision to Reality
                </motion.h2>
              </div>

              <motion.p
                className="text-lg text-text-secondary leading-relaxed transition-colors duration-200 hover:text-text-primary"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ opacity: [1, 0.6, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.3 }}
              >
                Founded in 2020, our marketplace started with a simple observation: Nigerians were struggling
                to find reliable shopping platforms with competitive prices and fast delivery. We decided to change that.
              </motion.p>

              <motion.p
                className="text-lg text-text-secondary leading-relaxed transition-colors duration-200 hover:text-text-primary"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ opacity: [1, 0.6, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
              >
                Today, we've grown into a trusted platform serving thousands of customers across Nigeria,
                offering everything from electronics and phones to home appliances and cosmetics. Our commitment
                to quality, affordability, and customer satisfaction drives every decision we make.
              </motion.p>

              <motion.p
                className="text-lg text-text-secondary leading-relaxed transition-colors duration-200 hover:text-text-primary"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ opacity: [1, 0.6, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.7 }}
              >
                We've built partnerships with top brands and verified sellers to ensure every product meets
                our high standards. Whether you're buying a phone or a refrigerator, we've got you covered.
              </motion.p>
            </div>
          </motion.div>

          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="w-full aspect-square bg-gradient-to-br from-brand-orange/10 to-brand-orange/5 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-1/2 h-1/2 text-brand-orange/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
