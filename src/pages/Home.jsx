import { useEffect, useState } from 'react'
import { getProducts } from '../services/productservice'
import ProductCard from '../components/ProductCard'
import { WHATSAPP_NUMBER, TELEGRAM_USERNAME } from '../constants/consts'
import whatsappLogo from '../assets/social/whatsapp.png'
import telegramLogo from '../assets/social/telegram.png'
import redditLogo from '../assets/social/reddit.png'

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
  const [activeTab, setActiveTab] = useState('single')

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  const filteredProducts = products.filter(p => 
    activeTab === 'bundle' ? p.isBundle === true : !p.isBundle
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const pinA = a.isPinned ? 1 : 0
    const pinB = b.isPinned ? 1 : 0
    return pinB - pinA
  })

  const waRedditLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi ZTools, I'm coming from Reddit! I'd like to buy some premium AI tools and get set up.")}`
  const tgRedditLink = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent("Hi ZTools, I'm coming from Reddit! I'd like to buy some premium AI tools and get set up.")}`

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
            Get Gemini, ChatGPT, Youtube & more at unbeatable prices.
          </p>
          <p className="text-sm text-[var(--color-text-dim)] animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            Fast delivery • Warranty included • 24/7 support
          </p>
        </div>
      </div>

      {/* Reddit Welcome Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
        <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-zinc-900/40 backdrop-blur-xl p-5 sm:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Subtle glowing backgrounds inside the banner */}
          <div className="absolute -top-10 -right-10 w-[200px] h-[100px] bg-orange-500/10 rounded-full blur-[40px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-[150px] h-[80px] bg-indigo-500/10 rounded-full blur-[30px] pointer-events-none" />
          
          <div className="flex items-center gap-4.5 text-center md:text-left flex-col sm:flex-row relative z-10">
            {/* Reddit icon/badge with orange glow */}
            <div className="relative flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
              <img src={redditLogo} alt="Reddit" className="w-8 h-8 object-contain" />
              {/* Pulsing online indicator */}
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500 border-2 border-zinc-950 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100 flex items-center justify-center md:justify-start gap-2">
                Buying from Reddit?
              </h3>
              <p className="text-sm text-zinc-400 mt-0.5">
                Chat with us directly for instant setup!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 w-full md:w-auto justify-center relative z-10">
            <a 
              href={waRedditLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-600/10 border border-emerald-500/30 hover:bg-emerald-600/20 hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] group cursor-pointer"
            >
              <img src={whatsappLogo} alt="WhatsApp" className="w-7 h-7 object-contain transition-transform group-hover:scale-105" />
              <span>WhatsApp</span>
            </a>

            <a 
              href={tgRedditLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-sky-600/10 border border-sky-500/30 hover:bg-sky-600/20 hover:border-sky-500/60 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_15px_rgba(14,165,233,0.05)] hover:shadow-[0_0_25px_rgba(14,165,233,0.15)] group cursor-pointer"
            >
              <img src={telegramLogo} alt="Telegram" className="w-7 h-7 object-contain transition-transform group-hover:scale-105" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text)]">
              {activeTab === 'single' ? 'Single Tools' : 'Bundle Packs'}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
              {loading ? 'Loading...' : `${filteredProducts.length} option${filteredProducts.length !== 1 ? 's' : ''} available`}
            </p>
          </div>

          <div className="flex p-0.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'single'
                  ? 'bg-[var(--color-accent)] text-white shadow'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <span>👤</span> Single Tools
            </button>
            <button
              onClick={() => setActiveTab('bundle')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'bundle'
                  ? 'bg-[var(--color-accent)] text-white shadow'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <span>📦</span> Bundle Packs
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">{activeTab === 'bundle' ? '📦' : '👤'}</div>
            <p className="text-[var(--color-text-muted)] text-lg">No {activeTab === 'bundle' ? 'bundles' : 'single accounts'} available right now.</p>
            <p className="text-[var(--color-text-dim)] text-sm mt-1">Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedProducts.map((p, i) => (
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