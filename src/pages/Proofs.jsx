import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { REDDIT_VOUCH_POST } from '../constants/consts'
import { storage } from '../utils/proofstorage'
import whatsappLogo from '../assets/social/whatsapp.png'
import telegramLogo from '../assets/social/telegram.png'
import redditLogo from '../assets/social/reddit.png'

const SECTION_META = {
  whatsapp: { label: 'WhatsApp Proofs', description: 'Customers who bought via WhatsApp.', accent: '#22c55e', logo: whatsappLogo },
  telegram: { label: 'Telegram Proofs', description: 'Customers who bought via Telegram.', accent: '#3b82f6', logo: telegramLogo },
  reddit:   { label: 'Reddit Proofs',   description: 'Reddit DM proofs and vouches.', accent: '#f97316', logo: redditLogo },
}

export default function Proofs() {
  const { type } = useParams()
  const meta = SECTION_META[type]
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)
  const [page, setPage] = useState(1)

  const IMAGES_PER_PAGE = 12

  useEffect(() => {
    if (type) {
      setLoading(true)
      setPage(1)
      storage.get(type)
        .then(res => setImages(res || []))
        .finally(() => setLoading(false))
    }
  }, [type])

  if (!meta) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">😕</div>
        <p className="text-[var(--color-text-muted)] text-lg">Section not found.</p>
        <Link to="/" className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">← Back to Store</Link>
      </div>
    )
  }

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE)
  const paginatedImages = images.slice((page - 1) * IMAGES_PER_PAGE, page * IMAGES_PER_PAGE)

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in-up">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          Back to Store
        </Link>

        <h1 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>
          <img src={meta.logo} alt="" className="w-8 h-8 object-contain" />
          <span>{meta.label}</span>
        </h1>
        <p className="text-[var(--color-text-muted)] mb-6">{meta.description}</p>

        <a href={REDDIT_VOUCH_POST} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2.5 mb-8 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:translate-y-[-1px] bg-[var(--color-orange-dim)] border border-[var(--color-orange)]/20 text-[var(--color-orange)] hover:border-[var(--color-orange)]/40 group">
          <img src={redditLogo} alt="Reddit" className="w-6 h-6 object-contain transition-transform group-hover:scale-105" />
          <span>View our Reddit Vouch Post</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
        </a>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)]">
            <div className="w-10 h-10 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-[var(--color-text-dim)] font-medium">Loading verified proofs...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="text-4xl mb-3">📸</div>
            <p className="text-[var(--color-text-muted)]">Proofs coming soon!</p>
            <p className="text-sm text-[var(--color-text-dim)] mt-1">Check back later for verified purchase screenshots.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginatedImages.map((url, i) => (
                <button key={i} onClick={() => setLightbox(url)}
                  className="group relative rounded-xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent-glow)]">
                  <img src={url} alt={`proof-${i}`} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
                  </div>
                </button>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-10 pt-6 border-t border-[var(--color-border)]/60">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:translate-y-[-1px] disabled:hover:translate-y-0 cursor-pointer"
                >
                  ← Previous
                </button>
                <span className="text-xs uppercase tracking-widest text-[var(--color-text-dim)] font-semibold font-[var(--font-mono)]">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:translate-y-[-1px] disabled:hover:translate-y-0 cursor-pointer"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox outside the transform hierarchy to prevent stacking context clipping */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8" style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(10px)' }}
          onClick={() => setLightbox(null)}>
          <div className="relative max-w-full max-h-[90vh] flex items-center justify-center animate-scale-in" onClick={e => e.stopPropagation()}>
            <img src={lightbox} alt="proof" className="max-w-full max-h-[85vh] sm:max-h-[88vh] md:max-h-[90vh] object-contain rounded-xl border border-[var(--color-border)] shadow-2xl" />
            <button onClick={() => setLightbox(null)} className="absolute -top-3 -right-3 md:-top-4 md:-right-4 p-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-all shadow-lg hover:scale-105 z-10">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}