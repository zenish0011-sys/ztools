import { Link } from 'react-router-dom'

export default function ProductCard({ product, index = 0 }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-lg hover:shadow-[var(--color-accent-glow)] hover:translate-y-[-2px]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-60" />

        {/* Stock badge */}
        <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${
          product.stock
            ? 'bg-[var(--color-green-dim)] text-[var(--color-green)] border border-[var(--color-green)]/20'
            : 'bg-[var(--color-red-dim)] text-[var(--color-red)] border border-[var(--color-red)]/20'
        }`}>
          {product.stock ? '● In Stock' : '● Out of Stock'}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2.5">
        <div>
          <h2 className="font-[var(--font-heading)] text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200 line-clamp-1">
            {product.name}
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5 line-clamp-1">
            {product.tagline}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-[var(--color-border)]">
          <span className="font-[var(--font-mono)] text-sm font-semibold text-[var(--color-green)]">
            ${product.price}
            <span className="text-[var(--color-text-dim)] font-normal text-xs ml-1">/ {product.duration}</span>
          </span>
          <span className="text-xs text-[var(--color-accent)] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
            View
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}