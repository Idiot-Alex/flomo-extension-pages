import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Header } from './Header'
import { Footer } from './Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reloadUser } from '@/lib/api'
import { useEffect, useState } from 'react'
import type { RootState } from '@/store/store'

type AccountLoadState = 'idle' | 'loading' | 'success' | 'error'

export function Account() {
  const navigate = useNavigate()
  const [userInf, setUserInf] = useState({
    email: '',
    plan: '',
    expiredTime: '',
  })
  const [accountLoadState, setAccountLoadState] = useState<AccountLoadState>('idle')
  const [reloadRequest, setReloadRequest] = useState(0)

  const user = useSelector((state: RootState) => {
    return state.user
  })

  // 重新加载用户信息
  useEffect(() => {
    if (!user.email) {
      setUserInf({
        email: '',
        plan: '',
        expiredTime: '',
      })
      setAccountLoadState('idle')
      return
    }

    let cancelled = false
    setAccountLoadState('loading')
    reloadUser({ email: user.email }).then(res => {
      if (!cancelled) {
        if (res.success) {
          setUserInf(res.data)
          setAccountLoadState('success')
        } else {
          setUserInf(user)
          setAccountLoadState('error')
        }
      }
    }).catch(() => {
      if (!cancelled) {
        setUserInf(user)
        setAccountLoadState('error')
      }
    })

    return () => {
      cancelled = true
    }
  }, [reloadRequest, user])

  const toPlan = () => {
    navigate('/plans')
  }

  const retryLoadUser = () => {
    setReloadRequest((current) => current + 1)
  }

  const accountStatusText = accountLoadState === 'loading'
    ? '正在读取最新账户信息…'
    : accountLoadState === 'success'
      ? '已读取最新账户状态'
      : accountLoadState === 'error'
        ? '读取失败，当前展示本地缓存'
        : '尚未登录 Flomo Extension 账户'

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <div className="kami-page py-16 sm:py-20">
          <header className="border-b border-border pb-10 sm:pb-14">
            <p className="kami-eyebrow">个人中心</p>
            <h1 className="kami-page-title mt-5">我的账户</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">查看账户信息和当前订阅状态。</p>
          </header>

          <div className="grid gap-8 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:py-16">
            <div>
              <p className="kami-eyebrow">00 · 账户概览</p>
              <p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
                支付确认后后台会更新账户权益。若本页读取失败，可重新读取；若扩展仍显示 Free，请在扩展内退出，并使用购买时同一 Flomo Extension 账户重新登录。
              </p>
            </div>

            <Card className="border-border bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-2xl">账户信息</CardTitle>
                <p className="text-sm text-muted-foreground" aria-live="polite">
                  {accountStatusText}
                </p>
              </CardHeader>
              <CardContent aria-busy={accountLoadState === 'loading'}>
                {accountLoadState === 'error' && (
                  <div role="alert" className="mt-5 border-l-2 border-primary bg-accent/55 px-4 py-3 text-sm leading-6 text-muted-foreground">
                    未能从账户服务读取最新状态，以下内容来自本地缓存。请点击“重新读取账户状态”；若多次失败，可退出本站账户后重新登录。
                  </div>
                )}
                <dl>
                  {[
                    ['邮箱', userInf.email || '—'],
                    ['当前套餐', userInf.plan || '—'],
                    ['套餐到期时间', userInf.expiredTime ? new Date(userInf.expiredTime).toLocaleString() : '—'],
                  ].map(([label, value]) => (
                    <div key={label} className="grid gap-2 border-b border-border py-5 last:border-0 sm:grid-cols-[10rem_1fr] sm:items-baseline">
                      <dt className="text-sm text-muted-foreground">{label}</dt>
                      <dd className="break-all font-editorial text-lg font-medium text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-3 border-t px-6 py-5">
                <Button onClick={toPlan}>查看其他套餐</Button>
                <Button
                  variant="outline"
                  onClick={retryLoadUser}
                  disabled={!user.email || accountLoadState === 'loading'}
                  loading={accountLoadState === 'loading'}
                  loadingText="读取中"
                >
                  重新读取账户状态
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
