import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { FLOMO_EXTENSION_FILE_URL, FLOMO_EXTENSION_WEB_STORE_URL, FLOMO_EXTENSION_WEB_URL } from '@/lib/type'
import confetti from 'canvas-confetti'
import { usePlan } from './ui/use-plan'

export function FreePlan() {

  const plan = usePlan()

  const freePlans = [
    {
      color: 'bg-sky-500',
      title: '数据安全，放心使用',
      desc: '不会存储任何 flomo 笔记数据',
    },
    {
      color: 'bg-sky-100',
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
    window.open(FLOMO_EXTENSION_FILE_URL)
  }

  const onWebStore = () => {
    onConfetti()
    window.open(FLOMO_EXTENSION_WEB_STORE_URL)
  }

  return (
    <Card className="mx-auto max-w-sm bg-lightgrey">
      <CardHeader>
        <CardTitle className="text-2xl">Free 套餐</CardTitle>
        <CardDescription>
          无需注册账号，每日 2 次机会免费使用插件保存笔记
        </CardDescription>
      </CardHeader>
      <CardContent>
        { plan.renderPlan(freePlans) }
      </CardContent>
      <CardFooter className="border-t px-6 py-4 flex flex-col">
        <Button className="w-full" onClick={onDownload}>立即下载使用</Button>
        <Button className="w-full mt-4" onClick={onWebStore}>浏览器扩展商店安装</Button>
      </CardFooter>
    </Card>
  )
}