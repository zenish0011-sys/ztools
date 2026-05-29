import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SITE_NAME, REDDIT_VOUCH_POST } from '../constants/consts'
import logo from '../assets/logo.png'
import whatsappLogo from '../assets/social/whatsapp.png'
import telegramLogo from '../assets/social/telegram.png'
import redditLogo from '../assets/social/reddit.png'

export default function Navbar() {
  const [proofsOpen, setProofsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setProofsOpen(false)
  }, [location])

  // Track scroll for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProofsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navLinkClass = "text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200"
  const isActive = (path) => location.pathname === path ? 'text-[var(--color-text)]' : ''

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg)]/90 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'bg-[var(--color-bg)]/70 backdrop-blur-md'
      } border-b border-[var(--color-border)]`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logo}
              alt={SITE_NAME}
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-heading text-lg font-bold text-[var(--color-text)] hidden sm:block">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`${navLinkClass} ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/about" className={`${navLinkClass} ${isActive('/about')}`}>
              About
            </Link>

            {/* Proofs dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProofsOpen(!proofsOpen)}
                className={`${navLinkClass} flex items-center gap-1.5`}
              >
                Proofs
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${proofsOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {proofsOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 rounded-xl overflow-hidden animate-slide-down bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl shadow-black/30">
                  <div className="py-1.5">
                    <Link to="/proofs/whatsapp" onClick={() => setProofsOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors">
                      <img src={whatsappLogo} alt="" className="w-4.5 h-4.5 object-contain" /> WhatsApp Proofs
                    </Link>
                    <Link to="/proofs/telegram" onClick={() => setProofsOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors">
                      <img src={telegramLogo} alt="" className="w-4.5 h-4.5 object-contain" /> Telegram Proofs
                    </Link>
                    <Link to="/proofs/reddit" onClick={() => setProofsOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors">
                      <img src={redditLogo} alt="" className="w-4.5 h-4.5 object-contain" /> Reddit Proofs
                    </Link>
                    <div className="mx-3 my-1.5 h-px bg-[var(--color-border)]" />
                    <a href={REDDIT_VOUCH_POST} target="_blank" rel="noreferrer"
                      onClick={() => setProofsOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-orange)] hover:bg-[var(--color-orange-dim)] transition-colors">
                      <img src={redditLogo} alt="" className="w-4.5 h-4.5 object-contain" /> Vouch Post
                      <svg className="w-3 h-3 ml-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden animate-slide-down border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="px-4 py-3 space-y-1">
            <Link to="/" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors">
              Home
            </Link>
            <Link to="/about" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors">
              About
            </Link>
            <div className="pt-1 pb-1">
              <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-dim)]">Proofs</p>
              <Link to="/proofs/whatsapp" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors">
                <img src={whatsappLogo} alt="" className="w-4.5 h-4.5 object-contain" /> WhatsApp
              </Link>
              <Link to="/proofs/telegram" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors">
                <img src={telegramLogo} alt="" className="w-4.5 h-4.5 object-contain" /> Telegram
              </Link>
              <Link to="/proofs/reddit" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors">
                <img src={redditLogo} alt="" className="w-4.5 h-4.5 object-contain" /> Reddit
              </Link>
            </div>
            <a href={REDDIT_VOUCH_POST} target="_blank" rel="noreferrer"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--color-orange)] hover:bg-[var(--color-orange-dim)] transition-colors">
              <img src={redditLogo} alt="" className="w-4.5 h-4.5 object-contain" /> Vouch Post
              <svg className="w-3 h-3 opacity-50 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}