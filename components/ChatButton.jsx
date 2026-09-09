import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ChatButton() {
  return (
    <Link href="/chat">
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-orange hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all z-40"
        style={{
          boxShadow: '0 4px 20px rgba(246, 139, 30, 0.3)',
        }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </Link>
  )
}
