import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { Register } from './components/Register'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
