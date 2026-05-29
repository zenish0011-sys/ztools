import { useState, useEffect } from 'react'
import { WHATSAPP_NUMBER, TELEGRAM_USERNAME, PAYMENT_METHODS } from '../constants/consts'
import whatsappLogo from '../assets/social/whatsapp.png'
import telegramLogo from '../assets/social/telegram.png'
import { storage } from '../utils/proofstorage'

export default function About() {
  const customMessage = encodeURIComponent('Hi, Ztools')

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${customMessage}`
  const tgLink = `https://t.me/${TELEGRAM_USERNAME}?text=${customMessage}`

  const [salesCount, setSalesCount] = useState(1250)
  useEffect(() => {
    storage.get('salesCount').then(count => {
      if (count !== undefined) setSalesCount(count)
    })
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[var(--color-accent)]/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-8 text-center relative">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3 animate-fade-in-up" style={{ fontFamily: 'var(--font-heading)' }}>
            About ZTools
          </h1>

          <p
            className="text-[var(--color-text-muted)] text-lg max-w-lg mx-auto animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            A trusted AI tools storefront. Premium subscriptions at affordable prices with fast delivery and warranty on every purchase.
          </p>

          {/* Trust Badge */}
          <div
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-muted)] animate-fade-in-up"
            style={{ animationDelay: '150ms' }}
          >
            ⭐ Trusted by <span className="font-semibold text-[var(--color-text)]">800+</span> customers and{' '}
            <span className="font-semibold text-[var(--color-text)]">10+</span> resellers |{' '}
            <span className="font-semibold text-[var(--color-green)]">{salesCount}+</span> successful sales
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-8">
        {/* Why ZTools */}
        <div
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          <h2
            className="text-lg font-semibold text-[var(--color-text)] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            ✨ Why ZTools?
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '⚡', title: 'Fast Delivery', desc: 'Get your credentials within hours' },
              { icon: '🛡️', title: 'Warranty', desc: 'Every purchase includes replacement warranty' },
              { icon: '📸', title: 'Tons of Proofs', desc: 'Hundreds of verified client vouches & proofs' },
              { icon: '💰', title: 'Best Prices', desc: 'Up to 70% cheaper than official pricing' },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-[var(--color-text)] text-sm mb-1">{item.title}</h3>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 animate-fade-in-up"
          style={{ animationDelay: '300ms' }}
        >
          <h2
            className="text-lg font-semibold text-[var(--color-text)] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            💳 We Accept
          </h2>

          <div className="flex flex-wrap gap-2">
            {PAYMENT_METHODS.map(m => (
              <span
                key={m}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[var(--color-text-muted)] bg-[var(--color-bg)] border border-[var(--color-border)]"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 animate-fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          <h2
            className="text-lg font-semibold text-[var(--color-text)] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            📬 Contact Us
          </h2>

          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            Have questions? Reach out to us on any platform.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-600/20 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] group cursor-pointer"
            >
              <img src={whatsappLogo} alt="WhatsApp" className="w-7 h-7 object-contain transition-transform group-hover:scale-105" />
              <span>WhatsApp</span>
            </a>

            <a
              href={tgLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 bg-sky-600/10 border border-sky-500/20 text-sky-400 hover:bg-sky-600/20 hover:border-sky-500/50 hover:shadow-[0_0_15px_rgba(14,165,233,0.15)] group cursor-pointer"
            >
              <img src={telegramLogo} alt="Telegram" className="w-7 h-7 object-contain transition-transform group-hover:scale-105" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}