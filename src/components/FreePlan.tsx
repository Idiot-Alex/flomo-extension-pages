import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { FLOMO_EXTENSION_FILE_URL, FLOMO_EXTENSION_WEB_STORE_URL } from '@/lib/type'
import confetti from 'canvas-confetti'
import { usePlan } from './ui/use-plan'

export function FreePlan() {

  const plan = usePlan()

  const freePlans = [
    {
      color: 'bg-sky-500',
      title: '数据安全，放心使用',
      desc: '不会存储用户任何 flomo 笔记数据',
    },
    {
      color: 'bg-sky-500',
      title: '轻量级使用用户最佳选择',
      desc: '无需登录注册、每天重置使用次数',
    },
    {
      color: 'bg-sky-500',
      title: '无需注册账号',
      desc: '不需要注册或者登录',
    },
    {
      color: 'bg-sky-100',
      title: '每日使用次数 2',
      desc: '使用插件保存 flomo 笔记次数',
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
    <Card className="mx-auto flex h-full w-full max-w-sm flex-col border-border/80 bg-white shadow-sm">
      <CardHeader>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">轻量体验</p>
        <CardTitle className="text-2xl">Free 套餐</CardTitle>
        <CardDescription>
          无需注册账号，每日 2 次机会免费使用插件保存笔记
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        { plan.renderPlan(freePlans) }
      </CardContent>
      <CardFooter className="flex flex-col border-t px-6 py-5">
        <Button className="w-full" onClick={onDownload}>立即下载使用</Button>
        <Button className="mt-3 w-full" variant="outline" onClick={onWebStore}>浏览器扩展商店安装</Button>
      </CardFooter>
    </Card>
  )
}
