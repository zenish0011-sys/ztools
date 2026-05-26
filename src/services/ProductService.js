import {
  collection, getDocs, addDoc,
  updateDoc, deleteDoc, doc
} from 'firebase/firestore'
import { db } from '../lib/firebase'

const COL = 'products'

export const getProducts = async () => {
  const snap = await getDocs(collection(db, COL))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const addProduct = async (product) => {
  return await addDoc(collection(db, COL), product)
}

export const updateProduct = async (id, product) => {
  return await updateDoc(doc(db, COL, id), product)
}

export const deleteProduct = async (id) => {
  return await deleteDoc(doc(db, COL, id))
}