import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function EligibilityCard() {
  const requirements = [
    { label: 'Valid ID', description: 'Government-issued photo ID' },
    { label: 'Age Requirement', description: 'Minimum 18 years old' },
    { label: 'Active Account', description: 'Account active for 3+ months' },
    { label: 'Item Price', description: '₦130,000 or higher per item' },
  ]

  const eligibleCategories = [
    'Phones & Tablets',
    'Laptops & Computers',
    'TVs & Displays',
    'Fridges & Freezers',
    'Air Conditioners',
    'Washing Machines',
    'Generators',
    'Electric Cookers',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-border-light"
    >
      <motion.h2
        className="text-2xl font-bold text-text-primary mb-8 transition-colors duration-200 hover:text-brand-orange cursor-default"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        animate={{ opacity: [1, 0.6, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
      >
        Eligibility Requirements
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Requirements */}
        <div>
          <motion.h3
            className="text-lg font-semibold text-text-primary mb-6 transition-colors duration-200 hover:text-brand-orange cursor-default"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{ opacity: [1, 0.6, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.2 }}
          >
            To Qualify, You Need:
          </motion.h3>
          <div className="space-y-4">
            {requirements.map((req, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex gap-4"
              >
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                <div>
                <motion.p
                  className="font-semibold text-text-primary transition-colors duration-200 hover:text-brand-orange cursor-default"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ opacity: [1, 0.6, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: idx * 0.1 }}
                >
                  {req.label}
                </motion.p>
                <motion.p
                  className="text-text-secondary text-sm transition-colors duration-200 hover:text-text-primary"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: idx * 0.1 + 0.2 }}
                >{req.description}</motion.p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> We conduct a quick eligibility check at no cost. Your credit score won't be affected during the application process.
            </p>
          </div>
        </div>

        {/* Eligible Categories */}
        <div>
          <motion.h3
            className="text-lg font-semibold text-text-primary mb-6 transition-colors duration-200 hover:text-brand-orange cursor-default"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{ opacity: [1, 0.6, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
          >
            Eligible Categories:
          </motion.h3>
          <div className="grid grid-cols-2 gap-3">
            {eligibleCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-4 bg-bg-secondary rounded-lg border border-border-light text-center"
              >
                <p className="text-text-primary font-medium text-sm">{category}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-success/20">
            <p className="text-sm text-text-primary">
              <strong className="text-success">Minimum Item Price:</strong> ₦130,000
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
