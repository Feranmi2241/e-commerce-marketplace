import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function StatCounter({ end, duration = 2.5 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = (currentTime - startTime) / (duration * 1000)

      if (progress < 1) {
        setCount(Math.floor(end * progress))
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration])

  return count
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  const stats = [
    { label: 'Products Sold', value: 500000 },
    { label: 'Happy Customers', value: 250000 },
    { label: 'Cities Delivered', value: 36 },
    { label: 'Years in Business', value: 4 },
  ]

  return (
    <motion.section
      className="bg-white py-20"
      onViewportEnter={() => setIsVisible(true)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">
                {isVisible ? <StatCounter end={stat.value} /> : '0'}
                {stat.value >= 1000 ? (stat.value >= 100000 ? '' : '') : ''}
              </div>
              <motion.div
                className="text-sm text-text-secondary uppercase tracking-wider font-semibold transition-colors duration-200 hover:text-brand-orange cursor-default"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: index * 0.2 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
