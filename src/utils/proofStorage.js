const KEYS = {
  logo:      'zt_logo',
  whatsapp:  'zt_proofs_whatsapp',
  telegram:  'zt_proofs_telegram',
  reddit:    'zt_proofs_reddit',
}

export const storage = {
  get: (key) => {
    try {
      const val = localStorage.getItem(KEYS[key])
      return val ? JSON.parse(val) : (key === 'logo' ? '' : [])
    } catch { return key === 'logo' ? '' : [] }
  },

  add: (key, url) => {
    if (key === 'logo') {
      localStorage.setItem(KEYS[key], JSON.stringify(url))
    } else {
      const current = storage.get(key)
      localStorage.setItem(KEYS[key], JSON.stringify([...current, url]))
    }
  },

  remove: (key, url) => {
    if (key === 'logo') {
      localStorage.removeItem(KEYS[key])
    } else {
      const updated = storage.get(key).filter(u => u !== url)
      localStorage.setItem(KEYS[key], JSON.stringify(updated))
    }
  },
}