import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Dashboard } from '@/components/Dashboard'
import { Register } from '@/components/Register'
import { Login } from '@/components/Login'
import { Plans } from '@/components/Plans'
import { Home } from '@/components/Home'
import { ResetPwd } from '@/components/ResetPwd'
import { Account } from '@/components/Account'
import { PayOrder } from './components/PayOrder'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} >
            <Route index element={<Home />} />
            <Route path='plans' element={<Plans />} />
            <Route path="/account" element={<Account />} />
            <Route path="/pay-order" element={<PayOrder />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-pwd" element={<ResetPwd />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
