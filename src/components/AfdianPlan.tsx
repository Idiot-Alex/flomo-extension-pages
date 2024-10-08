import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { createAfdianOrder } from '@/lib/api'
import { ApiRes } from '@/lib/type'
import { Label } from '@radix-ui/react-dropdown-menu'
import { ToastAction } from '@radix-ui/react-toast'
import { useNavigate } from 'react-router-dom'
import { toast } from './ui/use-toast'
import { useSelector } from 'react-redux'
import { usePlan } from './ui/use-plan'

export function AfdianPlan() {

  const user = useSelector((state: any) => {
    return state.user
  })

  const plan = usePlan()

  const afdianPayPlans = [
    {
      color: 'bg-sky-500',
      title: '数据安全，放心使用',
      desc: '不会存储用户任何 flomo 笔记数据',
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
      title: '原价 ¥5.0 一个月',
      desc: '限时折扣，¥10.0 半年会员，¥15.0 一年会员，赶紧冲哇',
    }
  ]

  const renderAfdianPay = () => {
    const navigate = useNavigate()

    const afdianPayList = [
      {
        title: '半年',
        month: 1,
        price: 30,
        payPrice: 10,
      },
      {
        title: '一年',
        month: 2,
        price: 60,
        payPrice: 15,
      },
    ]

    const toPay = (payData: any) => {
      if (!user.email) {
        toast({
          variant: "destructive",
          description: '请先登录账号才能继续支付...',
          action: <ToastAction altText="去登录" onClick={() => navigate('/login')}>去登录</ToastAction>,
        })
        return
      }
      const params = {
        email: user.email,
        title: `Flomo Extension【Pay】套餐 - ${payData.title}`,
        month: payData.month,
        price: payData.payPrice,
      }
      createAfdianOrder(params).then((res: ApiRes) => {
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
      afdianPayList.map((item, i) => (
        <div key={i} className="grid grid-cols-3 items-center gap-4 border-b pb-4">
          <Label>{item.title}</Label>
          {
            item.price === item.payPrice ?
            <Label>
              <b className="text-2xl">¥{item.payPrice}</b>
            </Label> : 
            <Label className="flex flex-col">
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
    <Card className="mx-auto max-w-sm bg-lightgrey">
      <CardHeader>
        <CardTitle className="text-2xl">Pay 套餐（爱发电渠道）</CardTitle>
        <CardDescription>
          需要注册账号并付费，每日 <b className="text-zinc-600">无限</b> 次使用插件保存笔记
        </CardDescription>
      </CardHeader>
      <CardContent>
        { plan.renderPlan(afdianPayPlans) }
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="w-full" color="orange">立即购买</Button>
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
                { renderAfdianPay() }
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  )
}