'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Slider } from '@/components/ui/slider'

export default function EasyBuyCalculator() {
  const [itemPrice, setItemPrice] = useState(250000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(30)
  const [term, setTerm] = useState(6)

  const terms = [3, 6, 9, 12]
  const ANNUAL_INTEREST_RATE = 0.05 // 5% annual interest

  // Calculate all values
  const calculations = useMemo(() => {
    const downPayment = itemPrice * (downPaymentPercent / 100)
    const balance = itemPrice - downPayment
    
    // Simple interest calculation: Interest = Principal × Rate × Time
    // Time in years = term / 12
    const interestAmount = balance * ANNUAL_INTEREST_RATE * (term / 12)
    const totalRepayment = balance + interestAmount
    const monthlyPayment = totalRepayment / term

    return {
      downPayment: Math.round(downPayment),
      balance: Math.round(balance),
      interestAmount: Math.round(interestAmount),
      totalRepayment: Math.round(totalRepayment),
      monthlyPayment: Math.round(monthlyPayment),
    }
  }, [itemPrice, downPaymentPercent, term])

  const formatNaira = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid md:grid-cols-2 gap-8"
    >
      {/* Input Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-border-light">
        <h3 className="text-xl font-bold text-text-primary mb-8">Calculate Your Payment</h3>

        <div className="space-y-8">
          {/* Item Price Input */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-3">
              Item Price
            </label>
            <div className="flex items-center gap-4 bg-bg-secondary rounded-lg p-4">
              <span className="text-text-secondary font-medium">₦</span>
              <input
                type="number"
                value={itemPrice}
                onChange={(e) => setItemPrice(Math.max(130000, Number(e.target.value)))}
                className="bg-transparent text-2xl font-bold text-text-primary outline-none w-full"
                min="130000"
                max="5000000"
              />
            </div>
            <p className="text-xs text-text-secondary mt-2">Minimum: ₦130,000</p>
          </div>

          {/* Down Payment Slider */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-3">
              Down Payment: {downPaymentPercent}%
            </label>
            <Slider
              value={[downPaymentPercent]}
              onValueChange={(value) => setDownPaymentPercent(value[0])}
              min={10}
              max={50}
              step={5}
              className="w-full"
            />
            <p className="text-text-secondary text-sm mt-3">
              Pay now: {formatNaira(calculations.downPayment)}
            </p>
          </div>

          {/* Term Selection */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-3">
              Payment Term
            </label>
            <div className="grid grid-cols-4 gap-3">
              {terms.map((t) => (
                <button
                  key={t}
                  onClick={() => setTerm(t)}
                  className={`py-3 rounded-lg font-semibold transition-all duration-200 ${
                    term === t
                      ? 'bg-brand-orange text-white shadow-md'
                      : 'bg-bg-secondary text-text-primary border border-border-light hover:border-brand-orange'
                  }`}
                >
                  {t}M
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-gradient-to-br from-brand-orange/10 to-brand-orange/5 rounded-2xl p-8 border border-brand-orange/20"
        >
          <p className="text-text-secondary text-sm mb-2">Monthly Payment</p>
          <p className="text-4xl font-bold text-brand-orange">
            {formatNaira(calculations.monthlyPayment)}
          </p>
          <p className="text-text-secondary text-sm mt-3">
            for {term} months
          </p>
        </motion.div>

        {/* Breakdown Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white rounded-xl p-5 border border-border-light shadow-sm"
          >
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-2">Down Payment</p>
            <p className="text-xl font-bold text-text-primary">
              {formatNaira(calculations.downPayment)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-xl p-5 border border-border-light shadow-sm"
          >
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-2">Balance</p>
            <p className="text-xl font-bold text-text-primary">
              {formatNaira(calculations.balance)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-white rounded-xl p-5 border border-border-light shadow-sm"
          >
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-2">Interest (5%)</p>
            <p className="text-xl font-bold text-text-primary">
              {formatNaira(calculations.interestAmount)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-xl p-5 border border-border-light shadow-sm"
          >
            <p className="text-text-secondary text-xs uppercase tracking-wider mb-2">Total Repay</p>
            <p className="text-xl font-bold text-text-primary">
              {formatNaira(calculations.totalRepayment)}
            </p>
          </motion.div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="bg-bg-secondary rounded-xl p-5 text-sm text-text-secondary border border-border-light"
        >
          <p>
            <strong>Payment Summary:</strong> Pay {formatNaira(calculations.downPayment)} today, then{' '}
            <strong>{formatNaira(calculations.monthlyPayment)}/month</strong> for {term} months. Total amount to repay:{' '}
            <strong className="text-text-primary">{formatNaira(calculations.totalRepayment)}</strong>
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
