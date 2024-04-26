import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { Register } from './components/Register'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register.Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
