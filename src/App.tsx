import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { Register } from './components/Register'
import { Toaster } from './components/ui/toaster'
import { Login } from './components/Login'
import { Plans } from './components/Plans'
import { Home } from './components/Home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} >
            <Route index element={<Home />} />
            <Route path='plans' element={<Plans />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
