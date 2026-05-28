import { WHATSAPP_NUMBER, TELEGRAM_USERNAME, PAYMENT_METHODS } from '../constants/consts'

export default function About() {
  const customMessage = encodeURIComponent('Hi, Ztools')

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${customMessage}`
  const tgLink = `https://t.me/${TELEGRAM_USERNAME}?text=${customMessage}`

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
            ⭐ Trusted by <span className="font-semibold text-[var(--color-text)]">500+</span> customers and{' '}
            <span className="font-semibold text-[var(--color-text)]">10+</span> resellers
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

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '⚡', title: 'Fast Delivery', desc: 'Get your credentials within hours' },
              { icon: '🛡️', title: 'Warranty', desc: 'Every purchase includes replacement warranty' },
              { icon: '💰', title: 'Best Prices', desc: 'Up to 70% cheaper than official pricing' },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)]"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-[var(--color-text)] text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p>
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:translate-y-[-1px] hover:shadow-lg bg-[#22c55e] text-white hover:bg-[#16a34a]"
            >
              💬 WhatsApp
            </a>

            <a
              href={tgLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:translate-y-[-1px] hover:shadow-lg bg-[#3b82f6] text-white hover:bg-[#2563eb]"
            >
              ✈️ Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}