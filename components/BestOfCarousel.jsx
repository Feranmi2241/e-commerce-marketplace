import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import ProductCard from '@/components/ProductCard'

export default function BestOfCarousel({ products, isLoggedIn }) {
  return (
    <div className="w-full px-0 sm:px-12 overflow-hidden">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product, index) => (
            <CarouselItem key={product.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
              <ProductCard product={product} isLoggedIn={isLoggedIn} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-border-light hover:bg-bg-secondary transition-colors" />
        <CarouselNext className="hidden sm:flex absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-border-light hover:bg-bg-secondary transition-colors" />
      </Carousel>
    </div>
  )
}
