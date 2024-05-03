import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { useSelector } from 'react-redux'
import { useToast } from '@/components/ui/use-toast'
import { createOrder } from '@/lib/api'
import { ApiRes } from '@/lib/type'

export function Plans() {
  const user = useSelector((state: any) => {
    return state.user
  })
  const { toast } = useToast()

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

  const payPlans = [
    {
      color: 'bg-sky-500',
      title: '数据安全，放心使用',
      desc: '不会存储任何 flomo 笔记数据',
    },
    {
      color: 'bg-sky-500',
      title: '需要注册并登录账号',
      desc: '使用邮箱账号注册或者登录',
    },
    {
      color: 'bg-sky-500',
      title: '每日使用次数无限制',
      desc: '使用插件保存 flomo 笔记次数',
    },
    {
      color: 'bg-sky-500',
      title: '¥5.0 一个月',
      desc: '限时折扣，满五赠一，花 5 个月的钱，享受 6 个月的服务',
    }
  ]

  // const proPlans = [
  //   {
  //     color: 'bg-sky-500',
  //     title: '数据安全，放心使用',
  //     desc: '不会存储任何 flomo 笔记数据',
  //   },
  //   {
  //     color: 'bg-sky-500',
  //     title: '需要注册并登录账号',
  //     desc: '使用邮箱账号注册或者登录',
  //   },
  //   {
  //     color: 'bg-sky-500',
  //     title: '每日使用次数无限制',
  //     desc: '使用插件保存 flomo 笔记次数',
  //   },
  //   {
  //     color: 'bg-sky-500',
  //     title: '¥4.9 一个月',
  //     desc: '每月仅需 4.9 元',
  //   },
  //   {
  //     color: 'bg-sky-500',
  //     title: '后续升级服务免费享受',
  //     desc: '更多功能一网打尽',
  //   }
  // ]

  const renderPlan = (plans: Array<any>) => {
    return (
      plans.map((item, i) => (
        <div key={i} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className={`flex h-2 w-2 translate-y-1 rounded-full ${item.color}`}/>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {item.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {item.desc}
            </p>
          </div>
        </div>
      ))
    )
  }

  const payList = [
    {
      title: '一个月',
      month: 1,
      price: 5,
      payPrice: 5,
    },
    {
      title: '半年',
      month: 5,
      price: 30,
      payPrice: 25,
    },
    {
      title: '一年',
      month: 10,
      price: 60,
      payPrice: 50,
    },
  ]

  const renderPay = () => {
    const toPay = (payData: any) => {
      if (!user.email) {
        toast({
          variant: "destructive",
          description: '请先登录账号才能继续支付...'
        })
        return
      }
      const params = {
        email: user.email,
        title: `Flomo Extension套餐${payData.title}`,
        month: payData.month,
        price: payData.payPrice,
      }
      createOrder(params).then((res: ApiRes) => {
        if (res.success) {
          window.open(res.data)
        } else {
          toast({
            variant: "destructive",
            description: res.msg
          })
        }
      })
    }
    return (
      payList.map((item, i) => (
        <div key={i} className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="width">{item.title}</Label>
          {
            item.price === item.payPrice ?
            <Label htmlFor="width">
              <b className="text-2xl">¥{item.payPrice}</b>
            </Label> : 
            <Label htmlFor="width" className="flex flex-col">
              <s className="text-gray-400">¥{item.price}</s>
              <b className="text-2xl">¥{item.payPrice}</b>
            </Label>
          }
          <Button className="w-full" onClick={() => toPay(item)}>去支付</Button>
        </div>
      ))
    )
  }

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold"><a href="/">Flomo Extension</a> 套餐计划</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-2 md:grid-cols-2 lg:grid-cols-2">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Free 套餐</CardTitle>
            <CardDescription>
              无需注册账号，每日 2 次机会免费使用插件保存笔记
            </CardDescription>
          </CardHeader>
          <CardContent>
            { renderPlan(freePlans) }
            <Button className="w-full">立即使用</Button>
          </CardContent>
        </Card>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Pay 套餐</CardTitle>
            <CardDescription>
              需要注册账号并付费，每日 <b className="text-zinc-600">无限</b> 次使用插件保存笔记
            </CardDescription>
          </CardHeader>
          <CardContent>
            { renderPlan(payPlans) }
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full">立即购买</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">套餐选择</h4>
                    <p className="text-sm text-muted-foreground">
                      请选择下面任意一个套餐前往支付
                    </p>
                  </div>
                  <div className="grid gap-2">
                    { renderPay() }
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>
        {/* <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Pro 套餐</CardTitle>
            <CardDescription>
            需要注册账号并付费，每日<b className="text-zinc-600">无限</b>次使用插件保存笔记
            </CardDescription>
          </CardHeader>
          <CardContent>
            { renderPlan(proPlans) }
          </CardContent>
        </Card> */}
      </div>
    </>
  )
}