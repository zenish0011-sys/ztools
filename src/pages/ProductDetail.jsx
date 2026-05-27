import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProducts } from '../services/temp1'
import { WHATSAPP_NUMBER, TELEGRAM_USERNAME } from '../constants/consts'
import PurchaseModal from './PurchaseDirect'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getProducts()
      .then(all => setProduct(all.find(p => p.id === id) || null))
      .finally(() => setLoading(false))
  }, [id])

  const handleGoToProof = method =>
    navigate('/payment-proof', { state: { product, method: method.name } })

  if (loading)
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="skeleton h-5 w-20 mb-6" />
        <div className="skeleton h-64 w-full rounded-2xl mb-6" />
        <div className="skeleton h-8 w-2/3 mb-3" />
        <div className="skeleton h-4 w-full mb-2" />
        <div className="skeleton h-4 w-3/4" />
      </div>
    )

  if (!product)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">😕</div>
        <p className="text-[var(--color-text-muted)] text-lg">Product not found.</p>
        <Link to="/" className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
          ← Back to Store
        </Link>
      </div>
    )

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(product.whatsapp_message)}`
  const tgLink = `https://t.me/${TELEGRAM_USERNAME}`

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in-up">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Store
        </Link>

        <div className="relative rounded-2xl overflow-hidden mb-8 border border-[var(--color-border)]">
          <img src={product.image} alt={product.name} className="w-full h-64 sm:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-50" />
        </div>

        <div className="space-y-5">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {product.name}
            </h1>
            <p className="text-[var(--color-text-muted)] mt-2 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="font-[var(--font-mono)] text-2xl font-bold text-[var(--color-green)]">
              ${product.price}
              <span className="text-[var(--color-text-dim)] font-normal text-base ml-1.5">/ {product.duration}</span>
            </span>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                product.stock
                  ? 'bg-[var(--color-green-dim)] text-[var(--color-green)] border border-[var(--color-green)]/20'
                  : 'bg-[var(--color-red-dim)] text-[var(--color-red)] border border-[var(--color-red)]/20'
              }`}
            >
              {product.stock ? '● In Stock' : '● Out of Stock'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <svg className="w-4 h-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Warranty: {product.warranty}
          </div>

          {product.features?.length > 0 && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h3 className="font-semibold text-[var(--color-text)] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--color-text-muted)]">
                    <svg className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <p className="text-xs text-[var(--color-text-dim)] text-center font-semibold uppercase tracking-widest">
              Quick — chat with us directly
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:translate-y-[-1px] hover:shadow-lg bg-[#22c55e] text-white hover:bg-[#16a34a]"
            >
              💬 Buy via WhatsApp
            </a>
            <a
              href={tgLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:translate-y-[-1px] hover:shadow-lg bg-[#3b82f6] text-white hover:bg-[#2563eb]"
            >
              ✈️ Buy via Telegram
            </a>

            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-[var(--color-border)]" />
              <span className="text-xs text-[var(--color-text-dim)]">or pay directly, get it in your email</span>
              <div className="flex-1 h-px bg-[var(--color-border)]" />
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm text-[var(--color-text)] transition-all hover:translate-y-[-1px] hover:shadow-lg hover:shadow-[var(--color-accent-glow)] bg-[var(--color-surface)] border-2 border-[var(--color-accent)]/30 hover:border-[var(--color-accent)]/60"
            >
              <span>💳</span>
              <span>Purchase Directly</span>
              <span className="text-xs font-normal text-[var(--color-text-dim)] ml-1 group-hover:text-[var(--color-accent)] transition-colors">
                → delivered to your email
              </span>
            </button>
            <p className="text-xs text-center text-[var(--color-text-dim)]">
              Pay via Crypto, Binance, PayPal, UPI & more — we verify & send credentials to your inbox.
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <PurchaseModal
          product={product}
          onClose={() => setShowModal(false)}
          onGoToProof={handleGoToProof}
          waLink={waLink}
          tgLink={tgLink}
        />
      )}
    </>
  )
}