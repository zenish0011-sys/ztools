import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, PAYMENT_METHODS } from '../constants/consts'
import { uploadToCloudinary } from '../utils/uploadToCloudinary'

export default function PaymentProof() {
  const location = useLocation()
  const prefill = location.state || {}
  const formRef = useRef()
  const [status, setStatus] = useState('idle')
  const [preview, setPreview] = useState('')
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const f = e.dataTransfer.files[0]
    if (!f || !f.type.startsWith('image/')) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return alert('Please attach a screenshot')
    setStatus('loading')
    const formData = new FormData(formRef.current)
    try {
      const screenshotUrl = await uploadToCloudinary(file, 'ztools/payment-proofs')
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        product_name: formData.get('product_name'),
        payment_method: formData.get('payment_method'),
        user_email: formData.get('user_email'),
        screenshot_url: screenshotUrl,
      }, EMAILJS_PUBLIC_KEY)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center animate-fade-in-up">
        <div className="w-16 h-16 rounded-full bg-[var(--color-green-dim)] border border-[var(--color-green)]/20 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-[var(--color-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Proof Submitted!</h2>
        <p className="text-[var(--color-text-muted)] mb-2">We've received your payment proof.</p>
        <p className="text-[var(--color-text-muted)] mb-6">Once verified, <span className="font-semibold text-[var(--color-text)]">your product credentials will be sent to your email</span> — usually within a few hours.</p>
        <div className="rounded-xl p-4 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text-muted)] mb-6 text-left space-y-1.5">
          <p>📬 Check your inbox (and spam folder)</p>
          <p>⏱ Verification takes 1–4 hours on average</p>
          <p>💬 Need faster? Message us on WhatsApp/Telegram</p>
        </div>
        <Link to="/" className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">← Back to Store</Link>
      </div>
    )
  }

  const inputClass = "w-full rounded-xl px-4 py-3 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)]/50 transition-all"

  return (
    <div className="max-w-lg mx-auto px-4 py-8 animate-fade-in-up">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-6">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
        Back to Store
      </Link>

      <h1 className="text-2xl font-bold text-[var(--color-text)] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Submit Payment Proof</h1>
      <p className="text-[var(--color-text-muted)] text-sm mb-6">Fill in your details below. Once we verify your payment, we'll email you the product credentials.</p>

      <div className="rounded-xl px-4 py-3 mb-6 text-sm space-y-1 bg-[var(--color-accent-subtle)] border border-[var(--color-accent)]/15">
        <p className="font-semibold text-[var(--color-text)]">📬 How delivery works</p>
        <p className="text-[var(--color-text-muted)]">1. Fill the form & upload your payment screenshot</p>
        <p className="text-[var(--color-text-muted)]">2. We receive your proof and verify the payment</p>
        <p className="text-[var(--color-text-muted)]">3. Your credentials / activation link are sent to your email</p>
        <p className="text-xs text-[var(--color-accent)] pt-1">⏱ Typical wait: 1–4 hours • Available 9am–11pm</p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Product Name <span className="text-[var(--color-red)]">*</span></label>
          <input name="product_name" required defaultValue={prefill.product?.name || ''} placeholder="e.g. ChatGPT Plus" className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Payment Method <span className="text-[var(--color-red)]">*</span></label>
          <select name="payment_method" required defaultValue={prefill.method || ''} className={inputClass}>
            <option value="" disabled>Select method...</option>
            {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Your Email <span className="text-[var(--color-red)]">*</span></label>
          <input name="user_email" type="email" required placeholder="you@example.com" className={inputClass} />
          <p className="text-xs text-[var(--color-text-dim)] mt-1.5">📬 Credentials will be sent to this address</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Payment Screenshot <span className="text-[var(--color-red)]">*</span></label>
          <p className="text-xs text-[var(--color-text-dim)] mb-2">Attach a clear screenshot showing the payment confirmation (amount, date, and recipient).</p>

          <div
            className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${dragActive ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)]' : 'border-[var(--color-border)] hover:border-[var(--color-border-light)] bg-[var(--color-surface)]'}`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            <input type="file" accept="image/*" required={!file} onChange={handleFile} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            {!preview ? (
              <div>
                <svg className="w-8 h-8 mx-auto mb-2 text-[var(--color-text-dim)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                <p className="text-sm text-[var(--color-text-muted)]">Drop your screenshot here or <span className="text-[var(--color-accent)]">browse</span></p>
                <p className="text-xs text-[var(--color-text-dim)] mt-1">PNG, JPG up to 10MB</p>
              </div>
            ) : (
              <img src={preview} alt="preview" className="rounded-xl max-h-40 mx-auto object-cover" />
            )}
          </div>
        </div>

        {status === 'error' && (
          <div className="rounded-xl px-4 py-3 text-sm bg-[var(--color-red-dim)] border border-[var(--color-red)]/20">
            <p className="font-semibold text-[var(--color-red)] mb-1">⚠️ Something went wrong</p>
            <p className="text-[var(--color-text-muted)]">Please try again, or contact us directly:</p>
            <p className="font-medium text-[var(--color-text-muted)] mt-1">WhatsApp / Telegram — links in the store</p>
          </div>
        )}

        <button type="submit" disabled={status === 'loading'}
          className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:translate-y-[-1px] hover:shadow-lg hover:shadow-[var(--color-accent-glow)] disabled:opacity-50 disabled:hover:translate-y-0 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)]">
          {status === 'loading' ? '⏳ Uploading & Sending...' : '📤 Submit Proof — Get It in My Email'}
        </button>

        <p className="text-xs text-center text-[var(--color-text-dim)] pb-4">
          By submitting, you confirm the payment was made in full. Refunds are not available for digital products.
        </p>
      </form>
    </div>
  )
}