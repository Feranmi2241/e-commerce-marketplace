import { motion } from 'framer-motion'

export default function SpecificationsTable({ specs }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border-light">
      <table className="w-full">
        <tbody>
          {Object.entries(specs).map(([key, value], idx) => (
            <motion.tr
              key={key}
              className={`border-b border-border-light last:border-b-0 ${
                idx % 2 === 0 ? 'bg-white' : 'bg-bg-secondary'
              }`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05, ease: 'easeOut' }}
            >
              <td className="px-6 py-4 font-semibold text-text-primary w-1/3 transition-colors duration-200 hover:text-brand-orange cursor-default">
                {key}
              </td>
              <td className="px-6 py-4 text-text-secondary transition-colors duration-200 hover:text-text-primary">{value}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
