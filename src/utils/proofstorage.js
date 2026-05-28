import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

const SETTINGS_DOC = doc(db, 'settings', 'global')

const getGlobalSettings = async () => {
  try {
    const snap = await getDoc(SETTINGS_DOC)
    if (snap.exists()) {
      const data = snap.data()
      return {
        logo: data.logo || '',
        whatsapp: data.whatsapp || [],
        telegram: data.telegram || [],
        reddit: data.reddit || [],
      }
    }
  } catch (err) {
    console.error('Error fetching global settings:', err)
  }
  return { logo: '', whatsapp: [], telegram: [], reddit: [] }
}

export const storage = {
  get: async (key) => {
    const data = await getGlobalSettings()
    return data[key]
  },

  add: async (key, url) => {
    const data = await getGlobalSettings()
    if (key === 'logo') {
      data.logo = url
    } else {
      if (!data[key].includes(url)) {
        data[key] = [...data[key], url]
      }
    }
    await setDoc(SETTINGS_DOC, data)
  },

  remove: async (key, url) => {
    const data = await getGlobalSettings()
    if (key === 'logo') {
      data.logo = ''
    } else {
      data[key] = data[key].filter(u => u !== url)
    }
    await setDoc(SETTINGS_DOC, data)
  }
}