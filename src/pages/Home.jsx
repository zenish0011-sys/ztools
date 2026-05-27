import { useEffect, useState } from 'react'
import { getProducts } from '../services/productservice'
import ProductCard from '../components/ProductCard'

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="skeleton h-44 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="pt-2 border-t border-[var(--color-border)]">
          <div className="skeleton h-4 w-1/3" />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--color-accent)]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[200px] h-[200px] bg-indigo-400/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent-subtle)] mb-6 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
            <span className="text-xs font-medium text-[var(--color-accent)]">Trusted by 500+ customers</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Premium AI Tools
          </h1>
          <p className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-xl mx-auto mb-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Get ChatGPT, Midjourney, Claude & more at unbeatable prices.
          </p>
          <p className="text-sm text-[var(--color-text-dim)] animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            Fast delivery • Warranty included • 24/7 support
          </p>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text)]">All Products</h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
              {loading ? 'Loading...' : `${products.length} tool${products.length !== 1 ? 's' : ''} available`}
            </p>
          </div>
          <div className="h-px flex-1 ml-6 bg-gradient-to-r from-[var(--color-border)] to-transparent" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-[var(--color-text-muted)] text-lg">No products available right now.</p>
            <p className="text-[var(--color-text-dim)] text-sm mt-1">Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p, i) => (
              <div key={p.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}