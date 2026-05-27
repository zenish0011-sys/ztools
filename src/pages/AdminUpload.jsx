import { useState, useEffect } from 'react'
import { uploadToCloudinary } from '../utils/uploadtocloudinary'
import { storage } from '../utils/proofstorage'
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/productservice'

const TABS = ['🖼️ Logo & Proofs', '📦 Products']
const PROOF_SECTIONS = [
  { key: 'whatsapp', label: '💬 WhatsApp', folder: 'ztools/proofs/whatsapp' },
  { key: 'telegram', label: '✈️ Telegram', folder: 'ztools/proofs/telegram' },
  { key: 'reddit',   label: '🟠 Reddit',   folder: 'ztools/proofs/reddit'   },
]
const EMPTY = { name:'', tagline:'', description:'', price:'', currency:'USD', duration:'1 Month', stock:true, warranty:'30 days replacement', whatsapp_message:'', image:'', features:[''] }

export default function AdminUpload() {
  const [tab, setTab] = useState(0)
  const [uploading, setUploading] = useState('')
  const [logo, setLogo] = useState('')
  const [proofs, setProofs] = useState({ whatsapp:[], telegram:[], reddit:[] })
  const [products, setProducts] = useState([])
  const [prodLoading, setProdLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [imgUploading, setImgUploading] = useState(false)

  useEffect(() => { setLogo(storage.get('logo')); setProofs({ whatsapp:storage.get('whatsapp'), telegram:storage.get('telegram'), reddit:storage.get('reddit') }); loadProducts() }, [])

  const loadProducts = () => { setProdLoading(true); getProducts().then(setProducts).finally(() => setProdLoading(false)) }
  const refreshMedia = () => { setLogo(storage.get('logo')); setProofs({ whatsapp:storage.get('whatsapp'), telegram:storage.get('telegram'), reddit:storage.get('reddit') }) }

  const handleLogoUpload = async (e) => { const file = e.target.files[0]; if (!file) return; setUploading('logo'); try { const url = await uploadToCloudinary(file, 'ztools/logo'); storage.add('logo', url); refreshMedia() } catch { alert('Upload failed') } finally { setUploading(''); e.target.value = '' } }
  const handleProofUpload = async (e, key, folder) => { const file = e.target.files[0]; if (!file) return; setUploading(key); try { const url = await uploadToCloudinary(file, folder); storage.add(key, url); refreshMedia() } catch { alert('Upload failed') } finally { setUploading(''); e.target.value = '' } }
  const deleteProof = (key, url) => { if (!confirm('Remove?')) return; storage.remove(key, url); refreshMedia() }

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowForm(true) }
  const openEdit = (p) => { setForm({ name:p.name, tagline:p.tagline, description:p.description, price:p.price, currency:p.currency, duration:p.duration, stock:p.stock, warranty:p.warranty, whatsapp_message:p.whatsapp_message, image:p.image, features:p.features?.length ? p.features : [''] }); setEditId(p.id); setShowForm(true) }
  const handleDelete = async (id) => { if (!confirm('Delete this product?')) return; await deleteProduct(id); loadProducts() }
  const handleImageUpload = async (e) => { const file = e.target.files[0]; if (!file) return; setImgUploading(true); try { const url = await uploadToCloudinary(file, 'ztools/products'); setForm(f => ({ ...f, image: url })) } catch { alert('Image upload failed') } finally { setImgUploading(false); e.target.value = '' } }

  const setFeature = (i, val) => { const f = [...form.features]; f[i] = val; setForm(p => ({ ...p, features: f })) }
  const addFeature = () => setForm(p => ({ ...p, features: [...p.features, ''] }))
  const removeFeature = (i) => setForm(p => ({ ...p, features: p.features.filter((_, x) => x !== i) }))

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image) return alert('Name, price and image are required')
    setSaving(true)
    const payload = { ...form, price: Number(form.price), features: form.features.filter(f => f.trim() !== '') }
    try { if (editId) await updateProduct(editId, payload); else await addProduct(payload); setShowForm(false); loadProducts() } catch { alert('Save failed') } finally { setSaving(false) }
  }

  const inputClass = "w-full rounded-xl px-4 py-3 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)]/50 transition-all"
  const btnPrimary = "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all hover:translate-y-[-1px]"
  const btnSecondary = "bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] border border-[var(--color-border)] text-sm px-4 py-2 rounded-xl transition-all"

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-2xl font-bold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-heading)' }}>Admin Panel</h1>
        <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]/20 font-medium">Secret</span>
      </div>
      <p className="text-[var(--color-text-dim)] text-sm mb-6">Manage your store content</p>

      {/* Tab switcher */}
      <div className="flex gap-1 mb-8 p-1 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] w-fit">
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${tab === i ? 'bg-[var(--color-accent)] text-white shadow-md' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* TAB 0: LOGO & PROOFS */}
      {tab === 0 && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-heading)' }}>🖼️ Logo</h2>
                <p className="text-xs text-[var(--color-text-dim)]">New upload replaces current</p>
              </div>
              <label className={`cursor-pointer ${btnPrimary} ${uploading === 'logo' ? 'opacity-50 pointer-events-none' : ''}`}>
                {uploading === 'logo' ? 'Uploading...' : logo ? 'Replace' : '+ Upload'}
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploading === 'logo'} />
              </label>
            </div>
            {logo ? (
              <div className="relative inline-block">
                <img src={logo} alt="logo" className="h-20 rounded-xl border border-[var(--color-border)] object-contain bg-[var(--color-bg)] px-3 py-2" />
                <button onClick={() => { storage.remove('logo', logo); refreshMedia() }}
                  className="absolute -top-2 -right-2 bg-[var(--color-red)] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600 transition-colors">✕</button>
              </div>
            ) : <p className="text-[var(--color-text-dim)] text-sm">No logo yet.</p>}
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>📸 Customer Proofs</h2>
            <p className="text-xs text-[var(--color-text-dim)] mb-6">Images append. Hover to delete.</p>
            <div className="space-y-8">
              {PROOF_SECTIONS.map(({ key, label, folder }, idx) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-[var(--color-text)]">{label}</h3>
                    <label className={`cursor-pointer ${btnSecondary} ${uploading === key ? 'opacity-50 pointer-events-none' : ''}`}>
                      {uploading === key ? 'Uploading...' : '+ Add Proof'}
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleProofUpload(e, key, folder)} disabled={uploading === key} />
                    </label>
                  </div>
                  {proofs[key].length === 0 ? (
                    <p className="text-[var(--color-text-dim)] text-xs">No proofs yet.</p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {proofs[key].map((url, i) => (
                        <div key={i} className="relative group rounded-xl overflow-hidden border border-[var(--color-border)]">
                          <img src={url} alt="" className="w-full h-24 object-cover" />
                          <button onClick={() => deleteProof(key, url)}
                            className="absolute top-1 right-1 bg-[var(--color-red)] text-white rounded-full w-5 h-5 text-xs hidden group-hover:flex items-center justify-center transition-colors">✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                  {idx < PROOF_SECTIONS.length - 1 && <div className="mt-6 h-px bg-[var(--color-border)]" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: PRODUCTS */}
      {tab === 1 && (
        <div>
          {!showForm && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-heading)' }}>
                {prodLoading ? 'Loading...' : `${products.length} Product${products.length !== 1 ? 's' : ''}`}
              </h2>
              <button onClick={openAdd} className={btnPrimary}>+ Add Product</button>
            </div>
          )}

          {!showForm && !prodLoading && (
            <div className="space-y-3">
              {products.length === 0 && <p className="text-[var(--color-text-dim)] text-sm">No products yet. Add your first one!</p>}
              {products.map(p => (
                <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-border-light)] transition-colors">
                  <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--color-text)] truncate">{p.name}</p>
                    <p className="text-sm text-[var(--color-text-muted)] font-[var(--font-mono)]">${p.price} / {p.duration}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.stock ? 'bg-[var(--color-green-dim)] text-[var(--color-green)]' : 'bg-[var(--color-red-dim)] text-[var(--color-red)]'}`}>
                      {p.stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => openEdit(p)} className={btnSecondary}>Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-sm border border-[var(--color-red)]/20 text-[var(--color-red)] px-4 py-2 rounded-xl hover:bg-[var(--color-red-dim)] transition-colors">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showForm && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-heading)' }}>{editId ? 'Edit Product' : 'New Product'}</h2>
                <button onClick={() => setShowForm(false)} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">← Cancel</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Product Image *</label>
                  {form.image && <img src={form.image} alt="preview" className="w-full h-40 object-cover rounded-xl border border-[var(--color-border)] mb-2 bg-[var(--color-bg)]" />}
                  <label className={`cursor-pointer inline-block ${btnSecondary} ${imgUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    {imgUploading ? 'Uploading...' : form.image ? 'Change Image' : '+ Upload Image'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={imgUploading} />
                  </label>
                </div>
                <div><label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Name *</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. ChatGPT Plus" className={inputClass} /></div>
                <div><label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Tagline</label><input value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} placeholder="e.g. GPT-4o access, no limits" className={inputClass} /></div>
                <div><label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Description</label><textarea value={form.description} rows={3} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Full product description..." className={inputClass} /></div>

                <div className="grid grid-cols-3 gap-3">
                  <div><label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Price *</label><input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="15" className={inputClass} /></div>
                  <div><label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Currency</label><select value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))} className={inputClass}><option>USD</option><option>EUR</option><option>GBP</option></select></div>
                  <div><label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Duration</label><select value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className={inputClass}><option>1 Month</option><option>3 Months</option><option>6 Months</option><option>1 Year</option><option>18 Months</option><option>Lifetime</option></select></div>
                </div>

                <div><label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Warranty</label><input value={form.warranty} onChange={e => setForm(f => ({ ...f, warranty: e.target.value }))} placeholder="e.g. 30 days replacement" className={inputClass} /></div>
                <div><label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">WhatsApp Pre-fill Message</label><input value={form.whatsapp_message} onChange={e => setForm(f => ({ ...f, whatsapp_message: e.target.value }))} placeholder="e.g. Hi, I want to buy ChatGPT Plus ($15/month)" className={inputClass} /></div>

                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-[var(--color-text)]">In Stock</label>
                  <button type="button" onClick={() => setForm(f => ({ ...f, stock: !f.stock }))}
                    className={`w-11 h-6 rounded-full transition-colors ${form.stock ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`}>
                    <span className={`block w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${form.stock ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                  <span className={`text-sm ${form.stock ? 'text-[var(--color-green)]' : 'text-[var(--color-text-dim)]'}`}>{form.stock ? 'In Stock' : 'Out of Stock'}</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Features</label>
                  <div className="space-y-2">
                    {form.features.map((f, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={f} onChange={e => setFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`} className={`flex-1 ${inputClass}`} />
                        {form.features.length > 1 && <button onClick={() => removeFeature(i)} className="text-[var(--color-red)] hover:text-red-400 px-2 transition-colors">✕</button>}
                      </div>
                    ))}
                    <button onClick={addFeature} className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">+ Add Feature</button>
                  </div>
                </div>

                <button onClick={handleSave} disabled={saving}
                  className={`w-full py-3.5 rounded-xl font-semibold disabled:opacity-50 ${btnPrimary}`}>
                  {saving ? 'Saving...' : editId ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}