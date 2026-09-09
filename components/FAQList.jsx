import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const faqData = {
  orders: [
    {
      id: 'order-1',
      question: 'How do I place an order?',
      answer: 'To place an order, browse our products, add items to your cart, and proceed to checkout. Enter your delivery address and payment details to complete your order.',
    },
    {
      id: 'order-2',
      question: 'Can I modify my order after placing it?',
      answer: 'You can modify your order within 30 minutes of placing it. After that, you\'ll need to cancel and place a new order. Contact our support team if you need assistance.',
    },
    {
      id: 'order-3',
      question: 'How do I track my order?',
      answer: 'Once your order is confirmed, you\'ll receive a tracking number via email. Use this number to track your package in real-time on our platform or the delivery partner\'s website.',
    },
    {
      id: 'order-4',
      question: 'What is your order processing time?',
      answer: 'Most orders are processed and dispatched within 24-48 hours. During peak seasons, processing may take up to 72 hours.',
    },
  ],
  payments: [
    {
      id: 'payment-1',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards (Visa, Mastercard), debit cards, bank transfers, mobile money, and digital wallets.',
    },
    {
      id: 'payment-2',
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard SSL encryption to protect all payment transactions. Your card details are never stored on our servers.',
    },
    {
      id: 'payment-3',
      question: 'Can I use a different payment method at checkout?',
      answer: 'Yes, you can select from any of our available payment methods at checkout. You can also save multiple payment methods for faster checkout next time.',
    },
    {
      id: 'payment-4',
      question: 'How long does payment processing take?',
      answer: 'Most payments are processed instantly. However, bank transfers may take 1-3 business days to reflect in our system.',
    },
  ],
  'easy-buy': [
    {
      id: 'easybuy-1',
      question: 'What is Easy Buy?',
      answer: 'Easy Buy is our buy-now-pay-later service that allows you to purchase items and spread the payment over 3, 6, 9, or 12 months with minimal interest.',
    },
    {
      id: 'easybuy-2',
      question: 'Am I eligible for Easy Buy?',
      answer: 'You need a valid ID, be at least 18 years old, have an active account for 3+ months, and the item must be ₦130,000 or more.',
    },
    {
      id: 'easybuy-3',
      question: 'What is the interest rate for Easy Buy?',
      answer: 'Easy Buy charges 5% simple annual interest distributed evenly across your payment term.',
    },
    {
      id: 'easybuy-4',
      question: 'Can I pay off Easy Buy early?',
      answer: 'Yes, you can pay off your Easy Buy installments anytime without penalty. You\'ll only be charged interest for the period you actually owed the money.',
    },
  ],
  delivery: [
    {
      id: 'delivery-1',
      question: 'How much does delivery cost?',
      answer: 'Delivery is free for orders above ₦10,000 within our coverage areas. Orders below this amount incur a delivery fee of ₦500-₦2,000 depending on location.',
    },
    {
      id: 'delivery-2',
      question: 'What are your delivery times?',
      answer: 'We offer same-day delivery in Lagos, next-day delivery in major cities, and 2-3 business days for other areas.',
    },
    {
      id: 'delivery-3',
      question: 'Can I choose a specific delivery time?',
      answer: 'Yes, during checkout you can select a preferred delivery window (morning 8AM-12PM, afternoon 12PM-4PM, or evening 4PM-8PM).',
    },
    {
      id: 'delivery-4',
      question: 'What if my package is delayed?',
      answer: 'If your package is delayed beyond the promised delivery date, contact our support team for assistance. We may offer a partial refund or discount on your next purchase.',
    },
  ],
  returns: [
    {
      id: 'return-1',
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return policy on most items. Products must be unused, in original packaging, and accompanied by proof of purchase.',
    },
    {
      id: 'return-2',
      question: 'How do I initiate a return?',
      answer: 'Go to your order history, select the item, and click "Return Item". Follow the instructions to print a return label and send the package back.',
    },
    {
      id: 'return-3',
      question: 'How long does refund processing take?',
      answer: 'Once we receive and inspect your returned item, refunds are processed within 3-5 business days.',
    },
    {
      id: 'return-4',
      question: 'Are there items that cannot be returned?',
      answer: 'Perishable items, electronics that have been opened, and custom-made products cannot be returned.',
    },
  ],
  account: [
    {
      id: 'account-1',
      question: 'How do I create an account?',
      answer: 'Click the "Sign Up" button, enter your email or phone number, create a password, and verify your contact information.',
    },
    {
      id: 'account-2',
      question: 'How do I reset my password?',
      answer: 'On the login page, click "Forgot Password", enter your email or phone number, and follow the instructions sent to you.',
    },
    {
      id: 'account-3',
      question: 'Can I have multiple accounts?',
      answer: 'No, only one account per email or phone number is allowed. However, you can update your profile information anytime.',
    },
    {
      id: 'account-4',
      question: 'How do I delete my account?',
      answer: 'Go to Account Settings > Privacy & Security, scroll down, and click "Delete Account". Note that this action is permanent.',
    },
  ],
}

export default function FAQList({ searchQuery, selectedCategory }) {
  const filteredFAQ = useMemo(() => {
    let result = { ...faqData }

    // Filter by category if selected
    if (selectedCategory) {
      result = {
        [selectedCategory]: faqData[selectedCategory] || [],
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const filtered = {}

      Object.entries(result).forEach(([category, items]) => {
        const categoryItems = items.filter(
          (item) =>
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query)
        )
        if (categoryItems.length > 0) {
          filtered[category] = categoryItems
        }
      })

      return filtered
    }

    return result
  }, [searchQuery, selectedCategory])

  const categoryLabels = {
    orders: 'Orders',
    payments: 'Payments',
    'easy-buy': 'Easy Buy',
    delivery: 'Delivery',
    returns: 'Returns',
    account: 'Account',
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full py-16 px-4 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        {Object.entries(filteredFAQ).length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-text-secondary text-lg">No FAQ items found matching your search.</p>
          </motion.div>
        ) : (
          Object.entries(filteredFAQ).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-6 capitalize transition-colors duration-200 hover:text-brand-orange cursor-default">
                {categoryLabels[category]}
              </h2>

              <Accordion type="single" collapsible="true" className="w-full">
                {items.map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                  >
                    <AccordionItem value={item.id} className="border border-border-light rounded-lg mb-3">
                      <AccordionTrigger className="px-4 py-3 text-left hover:bg-bg-secondary transition-colors">
                        <span className="text-text-primary font-medium">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3 bg-bg-secondary text-text-secondary">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          ))
        )}
      </div>
    </motion.section>
  )
}
