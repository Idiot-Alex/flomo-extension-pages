import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { FLOMO_EXTENSION_FILE_URL, FLOMO_EXTENSION_WEB_STORE_URL } from '@/lib/type'
import confetti from 'canvas-confetti'
import { usePlan } from './ui/use-plan'

export function FreePlan() {

  const plan = usePlan()

  const freePlans = [
    {
      color: 'bg-primary',
      title: '草稿保存在浏览器本地',
      desc: '笔记正文不经过 Extension 账户 API，保存由 flomo 网页完成',
    },
    {
      color: 'bg-primary',
      title: '无需 Flomo Extension 账户',
      desc: '免费模式不用注册；保存前仍需登录可用的 flomo 网页账户',
    },
    {
      color: 'bg-border',
      title: '每日 2 次保存机会',
      desc: '按浏览器本地日期，并在 flomo 页面脚本返回正向结果后计数',
    },
  ]

  const onConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const onDownload = () => {
    onConfetti()
    window.open(FLOMO_EXTENSION_FILE_URL, '_blank', 'noopener,noreferrer')
  }

  const onWebStore = () => {
    onConfetti()
    window.open(FLOMO_EXTENSION_WEB_STORE_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card className="flex h-full w-full flex-col border-border bg-card">
      <CardHeader>
        <p className="kami-eyebrow">轻量体验</p>
        <CardTitle className="text-2xl">Free 套餐</CardTitle>
        <CardDescription>
          无需注册 Flomo Extension 账户；当前每天提供 2 次保存机会
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        { plan.renderPlan(freePlans) }
      </CardContent>
      <CardFooter className="flex flex-col border-t px-6 py-5">
        <Button className="w-full" onClick={onWebStore}>前往 Chrome 扩展商店</Button>
        <Button className="mt-3 w-full" variant="outline" onClick={onDownload}>下载 ZIP 安装包</Button>
      </CardFooter>
    </Card>
  )
}
