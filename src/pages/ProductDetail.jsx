import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProducts } from '../services/productService'
import { WHATSAPP_NUMBER, TELEGRAM_USERNAME } from '../constants/consts'

const PAYMENT_METHODS = [
  { id:'binance', name:'Binance', icon:'🟡', color:'#F0B90B', bg:'rgba(240,185,11,0.06)', tagline:'Pay with your Binance balance',
    steps:['Open Binance app → Wallet → Send','Send to the Binance ID below','Screenshot the confirmation & submit proof'],
    details:[{label:'Binance ID',value:'123456789',copy:true},{label:'Accepted',value:'USDT, BNB, BTC'}] },
  { id:'binance-gift', name:'Binance Gift Card', icon:'🎁', color:'#F0B90B', bg:'rgba(240,185,11,0.04)', tagline:'Buy a Binance gift card from a trusted platform',
    steps:['Buy a Binance USDT gift card from one of the links below','Copy the gift card code','Paste the code in the proof form — no screenshot needed'],
    details:[], links:[{label:'G2A',url:'https://www.g2a.com/binance-gift-card'},{label:'OffGamers',url:'https://www.offgamers.com/game-card/binance'},{label:'Eneba',url:'https://www.eneba.com/store/gift-cards?currency=USDT'}] },
  { id:'wise', name:'Wise', icon:'💚', color:'#9FE870', bg:'rgba(159,232,112,0.04)', tagline:'International bank transfer via Wise',
    steps:['Log in to Wise → Send money','Use the account details below','Screenshot the transfer receipt & submit proof'],
    details:[{label:'Account Name',value:'Your Name Here',copy:true},{label:'Email',value:'yourwise@email.com',copy:true},{label:'Currency',value:'USD / EUR / GBP'}] },
  { id:'paypal', name:'PayPal', icon:'🔵', color:'#60a5fa', bg:'rgba(96,165,250,0.04)', tagline:'Send via PayPal Friends & Family',
    steps:['Open PayPal → Send Money → Friends & Family','⚠️ MUST use Friends & Family (not Goods & Services)','Send to the email below, screenshot & submit proof'],
    details:[{label:'PayPal Email',value:'yourpaypal@email.com',copy:true},{label:'⚠️ Note',value:'Friends & Family only — no buyer protection'}] },
  { id:'revolut', name:'Revolut', icon:'⚫', color:'#a78bfa', bg:'rgba(167,139,250,0.04)', tagline:'Instant transfer via Revolut',
    steps:['Open Revolut → Payments → Send','Search by username or phone number below','Screenshot the sent confirmation & submit proof'],
    details:[{label:'Revolut Tag',value:'@yourtag',copy:true},{label:'Phone',value:'+1 234 567 8900',copy:true}] },
  { id:'remitly', name:'Remitly', icon:'🌍', color:'#a78bfa', bg:'rgba(167,139,250,0.04)', tagline:'Send money internationally via Remitly',
    steps:['Open Remitly → Send Money','Enter the bank details below as the recipient','Screenshot confirmation & submit proof'],
    details:[{label:'Recipient Name',value:'Your Name Here',copy:true},{label:'Bank',value:'Your Bank Name'},{label:'Account No.',value:'XXXXXXXXXXXX',copy:true}] },
  { id:'upi', name:'UPI', icon:'🇮🇳', color:'#22c55e', bg:'rgba(34,197,94,0.04)', tagline:'Pay instantly via any UPI app',
    steps:['Open any UPI app (GPay, PhonePe, Paytm, etc.)','Send to the UPI ID below','Screenshot the success screen & submit proof'],
    details:[{label:'UPI ID',value:'yourname@upi',copy:true},{label:'Works with',value:'GPay, PhonePe, Paytm, BHIM'}] },
  { id:'crypto', name:'Crypto', icon:'₿', color:'#F7931A', bg:'rgba(247,147,26,0.04)', tagline:'Pay with USDT, BTC, or ETH',
    steps:['Choose your coin below (USDT is preferred)','Send the exact amount to the wallet address','Screenshot the TX hash / confirmation & submit proof'],
    details:[{label:'USDT (TRC20)',value:'TYourTronAddressHere',copy:true},{label:'BTC',value:'bc1qYourBTCAddressHere',copy:true},{label:'ETH (ERC20)',value:'0xYourEthAddressHere',copy:true}] },
]

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800) }
  return (
    <button onClick={copy}
      className={`ml-2 text-xs px-2.5 py-1 rounded-lg border transition-all duration-200 ${copied ? 'border-[var(--color-green)]/30 text-[var(--color-green)] bg-[var(--color-green-dim)]' : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}>
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

function MethodCard({ method, onSelect, selected }) {
  return (
    <button onClick={() => onSelect(method)}
      className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200 hover:translate-y-[-1px] ${!selected && 'hover:bg-[var(--color-surface-hover)]'}`}
      style={{ borderColor: selected ? `${method.color}66` : 'var(--color-border)', background: selected ? method.bg : 'transparent', boxShadow: selected ? `0 4px 20px ${method.color}15` : 'none' }}>
      <span className="text-2xl w-8 text-center">{method.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[var(--color-text)] text-sm">{method.name}</div>
        <div className="text-xs text-[var(--color-text-muted)] truncate">{method.tagline}</div>
      </div>
      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: selected ? method.color : 'var(--color-border-light)' }}>
        {selected && <div className="w-2.5 h-2.5 rounded-full" style={{ background: method.color }} />}
      </div>
    </button>
  )
}

function MethodDetail({ method, onSubmit }) {
  return (
    <div className="rounded-2xl p-5 space-y-4 animate-fade-in-up border" style={{ background: method.bg, borderColor: `${method.color}20` }}>
      <div className="flex items-center gap-3">
        <span className="text-3xl">{method.icon}</span>
        <div>
          <h3 className="font-bold text-[var(--color-text)] text-lg" style={{ fontFamily: 'var(--font-heading)' }}>{method.name}</h3>
          <p className="text-xs" style={{ color: method.color }}>{method.tagline}</p>
        </div>
      </div>
      <div className="space-y-2.5">
        <p className="text-xs uppercase tracking-widest text-[var(--color-text-dim)] font-semibold">How to pay</p>
        {method.steps.map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: method.color, color: '#000' }}>{i + 1}</span>
            <p className="text-sm text-[var(--color-text-muted)]">{step}</p>
          </div>
        ))}
      </div>
      {method.details.length > 0 && (
        <div className="rounded-xl p-4 space-y-2.5 bg-[var(--color-bg)]/50 border border-[var(--color-border)]">
          {method.details.map((d, i) => (
            <div key={i} className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs text-[var(--color-text-dim)]">{d.label}</span>
              <div className="flex items-center">
                <span className="text-sm text-[var(--color-text)] font-[var(--font-mono)]">{d.value}</span>
                {d.copy && <CopyBtn text={d.value} />}
              </div>
            </div>
          ))}
        </div>
      )}
      {method.links && (
        <div className="space-y-2.5">
          <p className="text-xs uppercase tracking-widest text-[var(--color-text-dim)] font-semibold">Buy gift cards here</p>
          <div className="flex flex-wrap gap-2">
            {method.links.map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80" style={{ background: method.color, color: '#000' }}>{l.label} ↗</a>
            ))}
          </div>
        </div>
      )}
      <button onClick={onSubmit} className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all hover:opacity-90 hover:translate-y-[-1px]"
        style={{ background: method.color, color: '#000', boxShadow: `0 4px 20px ${method.color}30` }}>
        ✅ I've Paid — Submit Proof & Get My Product
      </button>
      <p className="text-xs text-[var(--color-text-dim)] text-center">After submitting, we verify & email you the credentials within a few hours.</p>
    </div>
  )
}

function PurchaseModal({ product, onClose, onGoToProof }) {
  const [selected, setSelected] = useState(null)
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl animate-scale-in bg-[var(--color-surface)] border border-[var(--color-border)]">
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
          <div>
            <h2 className="font-bold text-[var(--color-text)] text-lg" style={{ fontFamily: 'var(--font-heading)' }}>Purchase Directly</h2>
            <p className="text-xs text-[var(--color-text-muted)]">{product.name} — <span className="font-[var(--font-mono)] text-[var(--color-green)]">${product.price}</span></p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-5 space-y-5">
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
          <div>
            <p className="text-xs uppercase tracking-widest text-[var(--color-text-dim)] font-semibold mb-3">Step 1 — Choose payment method</p>
            <div className="space-y-2">{PAYMENT_METHODS.map(m => <MethodCard key={m.id} method={m} selected={selected?.id === m.id} onSelect={setSelected} />)}</div>
          </div>
          {selected && (
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--color-text-dim)] font-semibold mb-3">Step 2 — Pay & submit proof</p>
              <MethodDetail method={selected} onSubmit={() => onGoToProof(selected)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getProducts().then(all => setProduct(all.find(p => p.id === id) || null)).finally(() => setLoading(false))
  }, [id])

  const handleGoToProof = (method) => navigate('/payment-proof', { state: { product, method: method.name } })

  if (loading) return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="skeleton h-5 w-20 mb-6" /><div className="skeleton h-64 w-full rounded-2xl mb-6" />
      <div className="skeleton h-8 w-2/3 mb-3" /><div className="skeleton h-4 w-full mb-2" /><div className="skeleton h-4 w-3/4" />
    </div>
  )

  if (!product) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="text-5xl">😕</div>
      <p className="text-[var(--color-text-muted)] text-lg">Product not found.</p>
      <Link to="/" className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">← Back to Store</Link>
    </div>
  )

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(product.whatsapp_message)}`
  const tgLink = `https://t.me/${TELEGRAM_USERNAME}`

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in-up">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          Back to Store
        </Link>

        <div className="relative rounded-2xl overflow-hidden mb-8 border border-[var(--color-border)]">
          <img src={product.image} alt={product.name} className="w-full h-64 sm:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-50" />
        </div>

        <div className="space-y-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-heading)' }}>{product.name}</h1>
            <p className="text-[var(--color-text-muted)] mt-2 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="font-[var(--font-mono)] text-2xl font-bold text-[var(--color-green)]">
              ${product.price}<span className="text-[var(--color-text-dim)] font-normal text-base ml-1.5">/ {product.duration}</span>
            </span>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${product.stock ? 'bg-[var(--color-green-dim)] text-[var(--color-green)] border border-[var(--color-green)]/20' : 'bg-[var(--color-red-dim)] text-[var(--color-red)] border border-[var(--color-red)]/20'}`}>
              {product.stock ? '● In Stock' : '● Out of Stock'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <svg className="w-4 h-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            Warranty: {product.warranty}
          </div>

          {product.features?.length > 0 && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h3 className="font-semibold text-[var(--color-text)] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Features</h3>
              <ul className="space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--color-text-muted)]">
                    <svg className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <p className="text-xs text-[var(--color-text-dim)] text-center font-semibold uppercase tracking-widest">Quick — chat with us directly</p>
            <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:translate-y-[-1px] hover:shadow-lg bg-[#22c55e] text-white hover:bg-[#16a34a]">💬 Buy via WhatsApp</a>
            <a href={tgLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:translate-y-[-1px] hover:shadow-lg bg-[#3b82f6] text-white hover:bg-[#2563eb]">✈️ Buy via Telegram</a>

            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-[var(--color-border)]" />
              <span className="text-xs text-[var(--color-text-dim)]">or pay directly, get it in your email</span>
              <div className="flex-1 h-px bg-[var(--color-border)]" />
            </div>

            <button onClick={() => setShowModal(true)}
              className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm text-[var(--color-text)] transition-all hover:translate-y-[-1px] hover:shadow-lg hover:shadow-[var(--color-accent-glow)] bg-[var(--color-surface)] border-2 border-[var(--color-accent)]/30 hover:border-[var(--color-accent)]/60">
              <span>💳</span><span>Purchase Directly</span>
              <span className="text-xs font-normal text-[var(--color-text-dim)] ml-1 group-hover:text-[var(--color-accent)] transition-colors">→ delivered to your email</span>
            </button>
            <p className="text-xs text-center text-[var(--color-text-dim)]">Pay via Binance, PayPal, UPI, Crypto & more — we verify & send credentials to your inbox.</p>
          </div>
        </div>
      </div>

      {showModal && <PurchaseModal product={product} onClose={() => setShowModal(false)} onGoToProof={handleGoToProof} />}
    </>
  )
}