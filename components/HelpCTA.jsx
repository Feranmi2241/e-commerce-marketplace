import { motion } from 'framer-motion'
import { Mail, MessageSquare } from 'lucide-react'

export default function HelpCTA() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full py-16 px-4 bg-brand-orange"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-200 hover:text-white/80 cursor-default">
            Still need help?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto transition-colors duration-200 hover:text-white">
            Our support team is ready to assist you. Reach out through your preferred channel and we’ll get back to you as quickly as possible.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="mailto:support@marketplace.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-orange font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email Support
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              Live Chat
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
