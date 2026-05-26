import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import PaymentProof from './pages/PaymentProof'
import Proofs from './pages/Proofs'
import About from './pages/About'
import AdminUpload from './pages/AdminUpload'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/payment-proof" element={<PaymentProof />} />
        <Route path="/proofs/:type" element={<Proofs />} />
<Route path="/zt-admin-x9k2" element={<AdminUpload />} />
        <Route path="/about" element={<About />} />
        
      </Routes>
    </BrowserRouter>
  )
}