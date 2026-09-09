import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SubcategoryGrid({ subcategories }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subcategories.map((subcategory, index) => {
        const Icon = subcategory.icon
        return (
          <motion.div
            key={subcategory.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={`/search?subcategory=${subcategory.id}`}>
              <div className="group relative bg-white rounded-2xl p-8 card-shadow hover:card-shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-4 p-4 bg-bg-secondary rounded-xl group-hover:bg-brand-orange/10 transition-colors duration-300">
                    <Icon className="w-10 h-10 text-brand-orange" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-brand-orange transition-colors duration-300">
                    {subcategory.name}
                  </h3>
                  <p className="text-sm text-text-secondary mt-2">
                    Browse {subcategory.name.toLowerCase()}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
