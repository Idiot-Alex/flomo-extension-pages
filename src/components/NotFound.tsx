import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function NotFound() {

  const navigate = useNavigate()

  return (
    <main id="main-content" className="flex min-h-dvh w-full flex-col items-center justify-center bg-background px-4 text-center">
      <p className="kami-eyebrow">404 · 迷路了</p>
      <h1 className="mt-4 font-editorial text-4xl font-medium">页面未找到</h1>
      <p className="mt-3 text-sm text-muted-foreground">抱歉，您访问的页面不存在。</p>
      <Button className="mt-6" onClick={() => navigate('/')}>
        返回主页
      </Button>
    </main>
  )
}
