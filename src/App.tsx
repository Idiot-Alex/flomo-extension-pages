import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { LandingPage } from '@/components/LandingPage'
import { Register } from '@/components/Register'
import { Login } from '@/components/Login'
import { Plans } from '@/components/Plans'
import { ResetPwd } from '@/components/ResetPwd'
import { Account } from '@/components/Account'
import { PayOrder } from '@/components/PayOrder'
import { NotFound } from '@/components/NotFound'
import { Privacy } from '@/components/Privacy'
import { Terms } from '@/components/Terms'
import { Guide } from './components/Guide'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-pwd" element={<ResetPwd />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/guide" element={<Guide />} />
          <Route path='/plans' element={<Plans />} />
          <Route path="/pay-order" element={<PayOrder />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
