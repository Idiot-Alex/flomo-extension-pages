import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Header } from './Header'
import { Footer } from './Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reloadUser } from '@/lib/api'
import { useEffect, useState } from 'react'
import type { RootState } from '@/store/store'

export function Account() {
  const navigate = useNavigate()
  const [userInf, setUserInf] = useState({
    email: '',
    plan: '',
    expiredTime: '',
  })
  const [isLoadingUser, setIsLoadingUser] = useState(false)

  const user = useSelector((state: RootState) => {
    return state.user
  })

  // 重新加载用户信息
  useEffect(() => {
    if (!user.email) {
      return
    }

    let cancelled = false
    setIsLoadingUser(true)
    reloadUser({ email: user.email }).then(res => {
      if (!cancelled) {
        if (res.success) {
          setUserInf(res.data)
        } else {
          setUserInf(user)
        }
      }
    }).catch(() => {
      if (!cancelled) {
        setUserInf(user)
      }
    }).finally(() => {
      if (!cancelled) {
        setIsLoadingUser(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [user])

  const toPlan = () => {
    navigate('/plans')
  }

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
                套餐状态会在进入页面时自动同步。支付完成后如未更新，请稍后刷新页面。
              </p>
            </div>

            <Card className="border-border bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-2xl">账户信息</CardTitle>
                <p className="text-sm text-muted-foreground" aria-live="polite">
                  {isLoadingUser ? '正在读取最新账户信息…' : '已同步当前账户状态'}
                </p>
              </CardHeader>
              <CardContent aria-busy={isLoadingUser}>
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
              <CardFooter className="border-t px-6 py-5">
                <Button onClick={toPlan}>查看其他套餐</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
