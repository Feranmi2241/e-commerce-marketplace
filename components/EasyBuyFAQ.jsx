import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { motion } from 'framer-motion'

export default function EasyBuyFAQ() {
  const faqs = [
    {
      id: 'late-payment',
      question: 'What happens if I miss a payment?',
      answer: 'If you miss a payment, we give you a 7-day grace period before any late fees are applied. We recommend enabling automatic deductions to ensure you never miss a payment. You can reach out to our support team if you face any hardship.',
    },
    {
      id: 'early-repayment',
      question: 'Can I pay off my Easy Buy early?',
      answer: 'Yes! You can settle your Easy Buy balance at any time without penalties or early repayment fees. Any interest saved from early repayment will be credited back to your account or wallet.',
    },
    {
      id: 'hardship',
      question: 'What if I face financial hardship?',
      answer: 'We understand that circumstances change. Contact our support team if you\'re facing difficulties. We may be able to offer options like payment restructuring or temporary payment breaks.',
    },
    {
      id: 'no-fees',
      question: 'Are there hidden fees?',
      answer: 'No, there are no hidden fees. The only charge is a fixed 5% annual interest on the remaining balance. Everything is transparent and clearly shown in your payment schedule.',
    },
    {
      id: 'eligible-categories',
      question: 'Which product categories are eligible?',
      answer: 'Easy Buy is available for phones, laptops, TVs, fridges, air conditioners, washing machines, generators, electric cookers, and select premium items over ₦130,000. Not all items in a category may be eligible.',
    },
    {
      id: 'instant-approval',
      question: 'How long does the approval process take?',
      answer: 'Most applications are approved instantly! In some cases, we may need to verify additional information, which typically takes less than 2 hours. You\'ll receive updates via SMS and email.',
    },
    {
      id: 'multiple-purchases',
      question: 'Can I use Easy Buy for multiple products?',
      answer: 'Yes, you can have multiple Easy Buy purchases at the same time, as long as each item meets the eligibility requirements and you maintain good payment history.',
    },
    {
      id: 'warranty-returns',
      question: 'What about product warranty and returns?',
      answer: 'Easy Buy purchases come with the same warranty and return policy as regular purchases. If you return an item, any payments made will be refunded to your wallet.',
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <Accordion type="single" collapsible="true" className="space-y-3">
        {faqs.map((faq, idx) => (
          <motion.div key={faq.id} variants={item}>
            <AccordionItem value={faq.id} className="border border-border-light rounded-xl px-6 bg-white hover:border-brand-orange/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-text-primary hover:text-brand-orange transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary pt-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  )
}
