'use client'

import { CreditCard, Plus, ShieldCheck, MapPin, ChevronRight } from 'lucide-react'

const paymentMethods = [
  {
    id: 'visa-1',
    type: 'Visa ending in 4242',
    brand: 'Visa',
    expiry: 'Expires 08/29',
    default: true,
  },
  {
    id: 'mastercard-1',
    type: 'Mastercard ending in 0842',
    brand: 'Mastercard',
    expiry: 'Expires 12/28',
    default: false,
  },
]

const addresses = [
  {
    id: 'home-1',
    label: 'Home',
    detail: '12 Victoria Crescent, Lekki Phase 1, Lagos',
    default: true,
  },
  {
    id: 'office-1',
    label: 'Office',
    detail: '88 Allen Avenue, Ikeja, Lagos',
    default: false,
  },
]

export default function PaymentMethodsPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-text-secondary font-semibold mb-2">
            Account
          </p>
          <h1 className="text-3xl font-bold text-text-primary">Payment Methods & Addresses</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="bg-white border border-border-light rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-brand-orange">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">Saved Cards</h2>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border-light text-sm font-medium text-text-primary hover:bg-bg-secondary transition-colors">
                <Plus className="w-4 h-4" />
                Add card
              </button>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border-light bg-bg-secondary/40 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-border-light flex items-center justify-center text-brand-orange">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{method.type}</p>
                      <p className="text-sm text-text-secondary">{method.expiry}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {method.default && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1">
                        <ShieldCheck className="w-3 h-3" />
                        Default
                      </span>
                    )}
                    <button className="text-sm font-medium text-text-primary hover:text-brand-orange transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-border-light rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-brand-orange">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">Saved Addresses</h2>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border-light text-sm font-medium text-text-primary hover:bg-bg-secondary transition-colors">
                <Plus className="w-4 h-4" />
                Add address
              </button>
            </div>

            <div className="space-y-3">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border-light bg-bg-secondary/40 p-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-text-primary">{address.label}</p>
                      {address.default && (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">{address.detail}</p>
                  </div>

                  <button className="inline-flex items-center gap-1 text-sm font-medium text-text-primary hover:text-brand-orange transition-colors">
                    Edit
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
