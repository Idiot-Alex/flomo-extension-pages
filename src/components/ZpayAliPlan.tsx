import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { usePlan } from '@/components/ui/use-plan'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { ApiRes, FLOMO_EXTENSION_WEB_URL, type PayOption } from '@/lib/type'
import { createAliOrder } from '@/lib/api'
import { Label } from '@/components/ui/label'
import type { RootState } from '@/store/store'

export function ZpayAliPlan() {
  const user = useSelector((state: RootState) => {
    return state.user
  })
  const plan = usePlan()
  const [pendingPlanMonth, setPendingPlanMonth] = useState<number | null>(null)
  const navigate = useNavigate()

  const aliPlans = [
    {
      color: 'bg-primary',
      title: '数据安全，放心使用',
      desc: '不会存储用户任何 flomo 笔记数据',
    },
    {
      color: 'bg-primary',
      title: 'flomo 用户最优选择',
      desc: '无需 flomo 官方会员 ¥99/年',
    },
    {
      color: 'bg-primary',
      title: '无限制使用次数',
      desc: '使用插件保存 flomo 笔记次数',
    },
    {
      color: 'bg-primary',
      title: '限时特价，flomo 会员价格的 1/10',
      desc: '优惠价 ¥1.9 一个月，年付更划算',
    },
    {
      color: 'bg-primary',
      title: '支付宝支付，更加方便',
      desc: '更多功能敬请期待...',
    }
  ]

  const aliPayList = [
    {
      title: '1 个月',
      month: 1,
      price: 5,
      payPrice: 1.9,
    },
    {
      title: '半年',
      month: 6,
      price: 30,
      payPrice: 5.9,
    },
    {
      title: '一年',
      month: 12,
      price: 60,
      payPrice: 9.9,
    },
  ]

  const renderAliPay = () => {
    const toPay = async (payData: PayOption) => {
      setPendingPlanMonth(payData.month)
      if (!user.email) {
        toast({
          variant: "destructive",
          description: '请先登录账号才能继续支付...',
          action: <ToastAction className="bg-primary rounded-md px-4 py-2" altText="去登录" onClick={() => navigate('/login')}>去登录</ToastAction>,
        })
        setPendingPlanMonth(null)
        return
      }
      toast({
        description: '正在生成订单，请稍后...'
      })
      const params = {
        email: user.email,
        title: `Flomo Extension【Pay】套餐 - ${payData.title}`,
        month: payData.month,
        price: payData.payPrice,
        returnUrl: FLOMO_EXTENSION_WEB_URL,
      }

      try {
        const res: ApiRes = await createAliOrder(params)
        if (res.success) {
          toast({
            description: res.msg
          })
          const orderData = {
            ...res.data,
            channel: 'ali',
            title: params.title,
            price: params.price,
          }
          // 跳转支付页面
          navigate('/pay-order', { 
            state: orderData
          })
        } else {
          toast({
            variant: "destructive",
            description: res.msg
          })
        }
      } catch {
        toast({
          variant: "destructive",
          description: '下单失败'
        })
      } finally {
        setPendingPlanMonth(null)
      }
    }

    return (<>
      {
        aliPayList.map((item) => (
          <div key={item.month} className="grid grid-cols-3 items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
            <Label>{item.title}</Label>
            {
              item.price === item.payPrice ?
              <Label>
                <b className="text-2xl">¥{item.payPrice}</b>
              </Label> : 
              <Label className="flex flex-col">
                <s className="text-muted-foreground">¥{item.price}</s>
                <b className="text-2xl">¥{item.payPrice}</b>
              </Label>
            }
            <Button
              className="w-full"
              disabled={pendingPlanMonth !== null}
              loading={pendingPlanMonth === item.month}
              loadingText="生成中"
              onClick={() => toPay(item)}
            >
              去支付
            </Button>
          </div>
        ))
      }
      </>
    )
  }

  return (<>
    <Card className="flex h-full w-full flex-col border-border bg-card">
      <CardHeader>
        <p className="kami-eyebrow">支付宝</p>
        <CardTitle className="text-2xl">Pay 套餐</CardTitle>
        <CardDescription>
          需要注册账号并付费，每日 <b className="text-foreground">无限</b> 次使用插件保存笔记
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        { plan.renderPlan(aliPlans) }
      </CardContent>
      <CardFooter className="border-t px-6 py-5">
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
                { renderAliPay() }
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  </>)
}
