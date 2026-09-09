import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HelpHero({ searchQuery, setSearchQuery }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full py-20 px-4 bg-white"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3 transition-colors duration-200 hover:text-brand-orange cursor-default">
            How can we help?
          </h1>
          <p className="text-text-secondary text-lg transition-colors duration-200 hover:text-text-primary">
            Search our help articles or browse by category below
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="search-glow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-border-light rounded-lg focus:outline-none focus:ring-0 transition-shadow duration-300"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
