import { useState, useRef, useEffect } from 'react'

// Import payment logos from src/assets/paymentslogos
import cryptoLogo from '../assets/paymentslogos/crypto.webp'
import binanceLogo from '../assets/paymentslogos/binance.png'
import bybitLogo from '../assets/paymentslogos/bybit.jpg'
import binanceGiftLogo from '../assets/paymentslogos/binance-gift.jpg'
import paypalLogo from '../assets/paymentslogos/paypal.png'
import upiLogo from '../assets/paymentslogos/upi.webp'
import wiseLogo from '../assets/paymentslogos/wise.png'
import revolutLogo from '../assets/paymentslogos/revoult.png'
import remitlyLogo from '../assets/paymentslogos/remitly.png'

export const PAYMENT_METHODS = [
  // ── PRIMARY (self-serve) ─────────────────────────────────────────────────
  {
    id: 'crypto',
    name: 'Crypto',
    icon: null,
    logo: cryptoLogo,
    color: '#F7931A',
    bg: 'rgba(247,147,26,0.06)',
    tagline: 'USDT, USDC, BTC, ETH, SOL & more',
    contactOnly: false,
    steps: [
      'Choose your preferred coin & network below',
      'Send the exact amount to the matching wallet address',
      'Screenshot the TX hash / confirmation & submit proof',
    ],
    details: [
      { label: 'BTC',           value: '1249w3j5LYAoHj9qEoeqGsCYs2Gabuw6jW',       copy: true },
      { label: 'USDT / USDC / ETH (BEP-20 / ERC-20)', value: '0x1d8fd627d4cbf8bc1b3bead35c0edfc2a4804844', copy: true },
      { label: 'USDT (TRC-20)', value: 'THTQAhjbNunqnk3mRqy1PXhyTZqr2ZxaGL',       copy: true },
      { label: 'SOL',           value: '6ttEw86Hxj8Yu4ELkNDnjsZ3yq4b1oZbXU1LgD4Qasq8', copy: true },
    ],
  },
  {
    id: 'binance',
    name: 'Binance',
    icon: null,
    logo: binanceLogo,
    color: '#F0B90B',
    bg: 'rgba(240,185,11,0.06)',
    tagline: 'Pay with your Binance balance',
    contactOnly: false,
    steps: [
      'Open Binance app → Wallet → Send',
      'Send to the Binance ID or username below',
      'Screenshot the confirmation & submit proof',
    ],
    details: [
      { label: 'Binance ID', value: '1177443390', copy: true },
      { label: 'Username',   value: 'alpha106',   copy: true },
      { label: 'Accepted',   value: 'USDT, BNB, BTC' },
    ],
  },
  {
    id: 'bybit',
    name: 'Bybit',
    icon: null,
    logo: bybitLogo,
    color: '#F7A600',
    bg: 'rgba(247,166,0,0.06)',
    tagline: 'Pay via your Bybit account',
    contactOnly: false,
    steps: [
      'Open Bybit app → Assets → Send',
      'Send to the Bybit UID below',
      'Screenshot the confirmation & submit proof',
    ],
    details: [
      { label: 'Bybit UID', value: '555070467', copy: true },
      { label: 'Accepted',  value: 'USDT, BTC, ETH' },
    ],
  },
  {
    id: 'binance-gift',
    name: 'Binance Gift Card',
    icon: null,
    logo: binanceGiftLogo,
    color: '#F0B90B',
    bg: 'rgba(240,185,11,0.04)',
    tagline: 'Buy a Binance USDT gift card & send the code',
    contactOnly: false,
    steps: [
      'Buy a Binance USDT gift card from one of the links below',
      'Copy the gift card code you receive',
      'Paste the code in the proof form — no screenshot needed',
    ],
    details: [],
    links: [
      { label: 'OffGamers (Primary)', url: 'https://www.offgamers.com/product/binance-gift-cards' },
      { label: 'G2A (Backup)',        url: 'https://www.g2a.com/binance-gift-card-10-usdt-key-i10000301475008' },
      { label: 'Eneba (PayPal / Apple Pay)', url: 'https://www.eneba.com/binance-binance-gift-card-usdt-10-usd-key-global' },
    ],
    note: "Once you have the code, send it here and we'll confirm instantly!",
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: null,
    logo: paypalLogo,
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.04)',
    tagline: 'Send via PayPal Friends & Family',
    contactOnly: false,
    steps: [
      'Open PayPal → Send Money → Friends & Family',
      '⚠️ MUST use Friends & Family (not Goods & Services)',
      'Send to the email below, screenshot & submit proof',
    ],
    details: [
      { label: 'PayPal Email', value: 'vnnybhatta@gmail.com', copy: true },
      { label: '⚠️ Note',      value: 'Friends & Family only — no buyer protection' },
    ],
  },
  {
    id: 'upi',
    name: 'UPI / GPay',
    icon: null,
    logo: upiLogo,
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.04)',
    tagline: 'Pay instantly via GPay, PhonePe, Paytm or any UPI app',
    contactOnly: false,
    steps: [
      'Open GPay, PhonePe, Paytm, or any UPI app',
      'Send to the UPI ID below (GPay works directly too)',
      'Screenshot the success screen & submit proof',
    ],
    details: [
      { label: 'Name',       value: 'Vipluv Prajapati' },
      { label: 'UPI ID',     value: '7897385531@nyes', copy: true },
      { label: 'Works with', value: 'GPay, PhonePe, Paytm, BHIM & all UPI apps' },
    ],
  },

  // ── CONTACT-ONLY (guided) ────────────────────────────────────────────────
  {
    id: 'wise',
    name: 'Wise',
    icon: null,
    logo: wiseLogo,
    color: '#9FE870',
    bg: 'rgba(159,232,112,0.04)',
    tagline: 'International bank transfer via Wise',
    contactOnly: true,
    steps: [],
    details: [],
  },
  {
    id: 'revolut',
    name: 'Revolut',
    icon: null,
    logo: revolutLogo,
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.04)',
    tagline: 'Instant transfer via Revolut',
    contactOnly: true,
    steps: [],
    details: [],
  },
  {
    id: 'remitly',
    name: 'Remitly',
    icon: null,
    logo: remitlyLogo,
    color: '#818cf8',
    bg: 'rgba(129,140,248,0.04)',
    tagline: 'Send money internationally via Remitly',
    contactOnly: true,
    steps: [],
    details: [],
  },
]

// ─── Logo image component ─────────────────────────────────────────────────
function PayLogo({ src, alt }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden bg-black/40 border border-white/[0.06] p-1.5 transition-all duration-300"
      style={{
        width: 40,
        height: 40,
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        onError={e => { e.currentTarget.style.display = 'none' }}
      />
    </div>
  )
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button
      onClick={copy}
      className={`ml-2 text-xs px-2.5 py-1 rounded-lg border transition-all duration-200 cursor-pointer ${
        copied
          ? 'border-[var(--color-green)]/30 text-[var(--color-green)] bg-[var(--color-green-dim)]'
          : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/[0.04]'
      }`}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

function MethodCard({ method, onSelect, selected }) {
  return (
    <button
      onClick={() => onSelect(method)}
      className="flex items-center gap-3.5 w-full px-4.5 py-4 rounded-xl border text-left transition-all duration-300 hover:translate-y-[-2px] cursor-pointer"
      style={{
        borderColor: selected ? `${method.color}99` : 'rgba(39, 39, 42, 0.6)',
        background: selected ? `${method.color}12` : 'rgba(24, 24, 27, 0.4)',
        boxShadow: selected ? `0 8px 30px ${method.color}15` : 'none',
      }}
    >
      <PayLogo src={method.logo} alt={method.name} />

      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[var(--color-text)] text-sm">{method.name}</div>
        <div className="text-xs text-[var(--color-text-muted)] truncate">{method.tagline}</div>
      </div>

      {method.contactOnly && (
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--color-surface-hover)] text-[var(--color-text-dim)] border border-[var(--color-border)] flex-shrink-0">
          Contact us
        </span>
      )}

      <div
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
        style={{ borderColor: selected ? method.color : 'var(--color-border-light)' }}
      >
        {selected && (
          <div className="w-2.5 h-2.5 rounded-full animate-scale-in" style={{ background: method.color }} />
        )}
      </div>
    </button>
  )
}

function ContactOnlyDetail({ method, waLink, tgLink }) {
  return (
    <div
      className="rounded-2xl p-5 space-y-4 animate-fade-in-up border transition-all duration-300"
      style={{
        background: `linear-gradient(180deg, ${method.color}08, rgba(24, 24, 27, 0.4))`,
        borderColor: `${method.color}25`,
        boxShadow: `0 8px 30px rgba(0, 0, 0, 0.2)`
      }}
    >
      <div className="flex items-center gap-3">
        <PayLogo src={method.logo} alt={method.name} />
        <div>
          <h3 className="font-bold text-[var(--color-text)] text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
            {method.name}
          </h3>
          <p className="text-xs" style={{ color: method.color }}>{method.tagline}</p>
        </div>
      </div>

      <div className="rounded-xl p-4 bg-[var(--color-bg)]/50 border border-[var(--color-border)] space-y-2">
        <p className="text-sm text-[var(--color-text-muted)]">
          This payment method involves a few extra steps — we'll guide you through the whole process personally so everything goes smoothly. 🙌
        </p>
        <p className="text-xs text-[var(--color-text-dim)]">
          Reach out on WhatsApp or Telegram and mention you want to pay via <strong>{method.name}</strong>.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-110 hover:translate-y-[-1px] bg-[#22c55e] text-white cursor-pointer"
        >
          💬 Contact on WhatsApp
        </a>
        <a
          href={tgLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-110 hover:translate-y-[-1px] bg-[#3b82f6] text-white cursor-pointer"
        >
          ✈️ Contact on Telegram
        </a>
      </div>
    </div>
  )
}

function MethodDetail({ method, onSubmit, waLink, tgLink }) {
  if (method.contactOnly) {
    return <ContactOnlyDetail method={method} waLink={waLink} tgLink={tgLink} />
  }

  return (
    <div
      className="rounded-2xl p-5 space-y-5 animate-fade-in-up border transition-all duration-300"
      style={{
        background: `linear-gradient(180deg, ${method.color}08, rgba(24, 24, 27, 0.4))`,
        borderColor: `${method.color}25`,
        boxShadow: `0 8px 30px rgba(0, 0, 0, 0.2)`
      }}
    >
      <div className="flex items-center gap-3">
        <PayLogo src={method.logo} alt={method.name} />
        <div>
          <h3 className="font-bold text-[var(--color-text)] text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
            {method.name}
          </h3>
          <p className="text-xs" style={{ color: method.color }}>{method.tagline}</p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2.5">
        <p className="text-xs uppercase tracking-widest text-[var(--color-text-dim)] font-semibold">How to pay</p>
        {method.steps.map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span
              className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: method.color, color: '#0d0d12' }}
            >
              {i + 1}
            </span>
            <p className="text-sm text-[var(--color-text-muted)]">{step}</p>
          </div>
        ))}
      </div>

      {/* Details */}
      {method.details.length > 0 && (
        <div className="rounded-xl p-4 space-y-2.5 bg-black/30 border border-[var(--color-border)]/50 backdrop-blur-sm">
          {method.details.map((d, i) => (
            <div key={i} className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs text-[var(--color-text-dim)]">{d.label}</span>
              <div className="flex items-center">
                <span className="text-sm text-[var(--color-text)] font-[var(--font-mono)] break-all">{d.value}</span>
                {d.copy && <CopyBtn text={d.value} />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gift card links */}
      {method.links && (
        <div className="space-y-2.5">
          <p className="text-xs uppercase tracking-widest text-[var(--color-text-dim)] font-semibold">Buy gift cards here</p>
          <div className="flex flex-wrap gap-2">
            {method.links.map(l => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:brightness-110 cursor-pointer"
                style={{ background: method.color, color: '#0d0d12' }}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
          {method.note && (
            <p className="text-xs text-[var(--color-text-dim)] italic">{method.note}</p>
          )}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={onSubmit}
        className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0"
        style={{
          background: method.color,
          color: '#0d0d12',
          boxShadow: `0 8px 24px ${method.color}25`
        }}
      >
        ✅ I've Paid — Submit Proof & Get My Product
      </button>
      <p className="text-xs text-[var(--color-text-dim)] text-center">
        After submitting, we verify & email you the credentials within a few hours.
      </p>
    </div>
  )
}

export default function PurchaseModal({ product, onClose, onGoToProof, waLink, tgLink }) {
  const [selected, setSelected] = useState(null)
  const detailRef = useRef(null)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    if (selected && detailRef.current && scrollContainerRef.current) {
      const timer = setTimeout(() => {
        const container = scrollContainerRef.current
        const target = detailRef.current
        if (container && target) {
          const containerRect = container.getBoundingClientRect()
          const targetRect = target.getBoundingClientRect()
          const scrollTarget = container.scrollTop + (targetRect.top - containerRect.top) - 16
          container.scrollTo({
            top: scrollTarget,
            behavior: 'smooth',
          })
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [selected])

  const primary = PAYMENT_METHODS.filter(m => !m.contactOnly)
  const contact = PAYMENT_METHODS.filter(m => m.contactOnly)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(9,9,11,0.8)', backdropFilter: 'blur(12px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={scrollContainerRef}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl animate-scale-in bg-[var(--color-surface)]/80 backdrop-blur-xl border border-[var(--color-border)] shadow-2xl relative"
      >
        {/* Glow background effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[150px] bg-[var(--color-accent)]/8 rounded-full blur-[60px] pointer-events-none" />

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-[var(--color-surface)]/85 backdrop-blur-md border-b border-[var(--color-border)]">
          <div>
            <h2 className="font-bold text-[var(--color-text)] text-lg tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Purchase Directly
            </h2>
            <p className="text-xs text-[var(--color-text-muted)]">
              {product.name} —{' '}
              <span className="font-[var(--font-mono)] text-[var(--color-green)]">${product.price}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-5 relative z-1">
          {/* How it works */}
          <div className="rounded-xl px-4 py-3 flex gap-3 items-start bg-[var(--color-accent-subtle)] border border-[var(--color-accent)]/15">
            <span className="text-xl">💡</span>
            <div className="text-xs text-[var(--color-text-muted)] space-y-0.5">
              <p className="text-[var(--color-text)] font-semibold text-sm">How this works</p>
              <p>1. Pick your payment method below</p>
              <p>2. Follow the instructions & send the exact amount</p>
              <p>3. Submit your payment proof (screenshot / TX hash)</p>
              <p>4. We verify & email you the product credentials 📬</p>
            </div>
          </div>

          {/* Primary methods */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--color-text-dim)] font-semibold mb-3">
              Step 1 — Choose payment method
            </p>
            <div className="space-y-2.5">
              {primary.map(m => (
                <MethodCard key={m.id} method={m} selected={selected?.id === m.id} onSelect={setSelected} />
              ))}
            </div>
          </div>

          {/* Contact-only divider */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-[var(--color-border)]" />
              <span className="text-xs text-[var(--color-text-dim)] whitespace-nowrap">Guided payment (we help you)</span>
              <div className="flex-1 h-px bg-[var(--color-border)]" />
            </div>
            <div className="space-y-2.5">
              {contact.map(m => (
                <MethodCard key={m.id} method={m} selected={selected?.id === m.id} onSelect={setSelected} />
              ))}
            </div>
          </div>

          {/* Detail panel */}
          {selected && (
            <div ref={detailRef} className="pt-2">
              {!selected.contactOnly && (
                <p className="text-xs uppercase tracking-widest text-[var(--color-text-dim)] font-semibold mb-3">
                  Step 2 — Pay & submit proof
                </p>
              )}
              <MethodDetail
                method={selected}
                onSubmit={() => onGoToProof(selected)}
                waLink={waLink}
                tgLink={tgLink}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}