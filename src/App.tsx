import './App.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { LandingPage } from '@/components/LandingPage'
import { RouteMeta } from '@/components/RouteMeta'

const Register = lazy(() => import('@/components/Register').then(({ Register }) => ({ default: Register })))
const Login = lazy(() => import('@/components/Login').then(({ Login }) => ({ default: Login })))
const Plans = lazy(() => import('@/components/Plans').then(({ Plans }) => ({ default: Plans })))
const ResetPwd = lazy(() => import('@/components/ResetPwd').then(({ ResetPwd }) => ({ default: ResetPwd })))
const Account = lazy(() => import('@/components/Account').then(({ Account }) => ({ default: Account })))
const PayOrder = lazy(() => import('@/components/PayOrder').then(({ PayOrder }) => ({ default: PayOrder })))
const NotFound = lazy(() => import('@/components/NotFound').then(({ NotFound }) => ({ default: NotFound })))
const Privacy = lazy(() => import('@/components/Privacy').then(({ Privacy }) => ({ default: Privacy })))
const Guide = lazy(() => import('@/components/Guide').then(({ Guide }) => ({ default: Guide })))
const Posts = lazy(() => import('@/components/Posts').then(({ Posts }) => ({ default: Posts })))
const TermsPage = lazy(() => import('@/components/TermsPage').then(({ TermsPage }) => ({ default: TermsPage })))

function RouteLoading() {
  return (
    <main id="main-content" className="flex min-h-[60vh] items-center justify-center" aria-live="polite">
      <p className="text-sm text-muted-foreground">页面加载中…</p>
    </main>
  )
}

function App() {
  return (
    <>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          跳到主要内容
        </a>
        <RouteMeta />
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-pwd" element={<ResetPwd />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:slug" element={<Posts />} />
            <Route path='/plans' element={<Plans />} />
            <Route path="/pay-order" element={<PayOrder />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
