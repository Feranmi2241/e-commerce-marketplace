import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Shayo Bolu',
    role: 'Verified Buyer',
    text: 'Amazing products at great prices! The Easy Buy option made it affordable.',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    id: 2,
    name: 'Akanbi Johnson',
    role: 'Verified Buyer',
    text: 'Fast shipping and excellent customer service. Highly recommended!',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    id: 3,
    name: 'Toyin Abigail',
    role: 'Verified Buyer',
    text: 'Found exactly what I was looking for. Great quality and competitive prices.',
    rating: 5,
    avatar: '👩‍🎓',
  },
  {
    id: 4,
    name: 'Bolu John',
    role: 'Verified Buyer',
    text: 'The AI chat helped me find the perfect product. Very helpful!',
    rating: 5,
    avatar: '👨‍💻',
  },
  {
    id: 5,
    name: 'Chukwu Taiwo',
    role: 'Verified Buyer',
    text: 'Beautiful website, easy checkout, and products arrived in perfect condition.',
    rating: 5,
    avatar: '👩‍🎨',
  },
]

export default function TestimonialMarquee() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold mb-2">
            Customer Love
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            What Our Customers Say
          </h2>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 pb-4"
            animate={{ x: [-1000, 0] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = 'paused'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = 'running'
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
                className="flex-shrink-0 w-[90vw] sm:w-96 bg-bg-secondary rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                  ))}
                </div>

                <p className="text-text-primary font-medium mb-4">"{testimonial.text}"</p>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">{testimonial.avatar}</span>
                  <div>
                    <p className="font-semibold text-text-primary text-sm">{testimonial.name}</p>
                    <p className="text-xs text-text-secondary">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Gradient Fade */}
          {/* <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" /> */}
        </div>
      </div>
    </section>
  )
}
